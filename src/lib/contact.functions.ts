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
    const { isMailConfigured, sendEnquiryEmail } = await import("@/lib/mail.server");

    if (!isMailConfigured()) {
      console.error("[contact] MAIL_USER / MAIL_PASS are not set — enquiry not delivered.", {
        email: data.email,
      });
      throw new Error("The enquiry form is not connected yet. Please email hello@blippai.com.");
    }

    try {
      await sendEnquiryEmail(data);
    } catch (error) {
      console.error("[contact] delivery failed", error);
      throw new Error("We could not send that just now. Please email hello@blippai.com.");
    }

    return { ok: true as const };
  });
