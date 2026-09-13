import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organisation: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(4000),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_enquiries").insert({
      name: data.name,
      email: data.email,
      organisation: data.organisation || null,
      message: data.message,
    });
    if (error) throw new Error("Could not save your message. Please try again.");

    const { isMailConfigured, sendEnquiryEmail } = await import("@/lib/mail.server");
    if (!isMailConfigured()) {
      console.warn("[contact] MAIL_USER / MAIL_PASS are not set — enquiry saved but not emailed.", {
        email: data.email,
      });
      return { ok: true as const, notified: false };
    }

    try {
      await sendEnquiryEmail(data);
    } catch (mailError) {
      console.error("[contact] enquiry saved but delivery failed", mailError);
      return { ok: true as const, notified: false };
    }

    return { ok: true as const, notified: true };
  });
