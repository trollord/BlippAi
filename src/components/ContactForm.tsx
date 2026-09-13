import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry } from "@/lib/contact.functions";

const field =
  "mt-2 w-full border-b border-border bg-transparent pb-2 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";
const label = "block text-sm text-muted-foreground";

export function ContactForm() {
  const send = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      await send({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          organisation: String(data.get("organisation") ?? ""),
          message: String(data.get("message") ?? ""),
        },
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. You can also email hello@blippai.com directly.");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-10 max-w-xl text-lg leading-relaxed text-foreground">
        Thank you. Your message has reached our team and we will get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-xl">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-12">
        <div>
          <label className={label} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required maxLength={120} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Work email
          </label>
          <input id="email" name="email" type="email" required maxLength={200} className={field} />
        </div>
      </div>

      <div className="mt-8">
        <label className={label} htmlFor="organisation">
          Organisation
        </label>
        <input id="organisation" name="organisation" maxLength={160} className={field} />
      </div>

      <div className="mt-8">
        <label className={label} htmlFor="message">
          What are you trying to solve?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
          className={field + " resize-none"}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button type="submit" disabled={status === "sending"} className="btn-base btn-signal">
          {status === "sending" ? "Sending…" : "Get in touch"}
        </button>
        <a
          href="mailto:hello@blippai.com"
          className="text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          hello@blippai.com
        </a>
      </div>

      {error ? <p className="mt-6 text-base text-muted-foreground">{error}</p> : null}
    </form>
  );
}
