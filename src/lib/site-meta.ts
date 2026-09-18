import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const SITE_NAME = "BlippAI";
export const SITE_TITLE = "BlippAI. Sovereign AI you own and run.";
export const SITE_DESCRIPTION =
  "Custom AI systems built around your data, running on your infrastructure, and fully owned by you.";

/** The full white BlippAI logo on black, sized 1200x630 for link previews. */
const OG_IMAGE_PATH = "/og-image.png";
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";

/**
 * Link preview crawlers (WhatsApp, Facebook, X, Slack) ignore relative og:image
 * paths — Facebook's spec requires an absolute URL, and WhatsApp falls back to
 * the site icon when it can't resolve one. The deployment host isn't fixed
 * (*.vercel.app preview deploys today, a custom domain later), so read it off
 * the incoming request rather than hardcoding it. Set VITE_SITE_URL to pin a
 * canonical origin once the production domain is final.
 */
const getRequestOrigin = createIsomorphicFn()
  .server(() => {
    try {
      const { headers, url } = getRequest();
      const host = headers.get("x-forwarded-host") ?? headers.get("host");
      if (!host) return "";
      const proto = headers.get("x-forwarded-proto") ?? new URL(url).protocol.replace(":", "");
      return `${proto}://${host}`;
    } catch {
      // Outside a request context (or if the API shape moves) fall back to a
      // relative path: previews degrade, the page itself is unaffected.
      return "";
    }
  })
  .client(() => window.location.origin);

export function siteMeta() {
  const origin = import.meta.env["VITE_SITE_URL"] || getRequestOrigin() || "";
  const ogImage = `${origin}${OG_IMAGE_PATH}`;

  return [
    { title: SITE_TITLE },
    { name: "description", content: SITE_DESCRIPTION },
    { name: "author", content: SITE_NAME },

    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: SITE_TITLE },
    { property: "og:description", content: SITE_DESCRIPTION },
    { property: "og:type", content: "website" },
    ...(origin ? [{ property: "og:url", content: `${origin}/` }] : []),
    { property: "og:image", content: ogImage },
    { property: "og:image:secure_url", content: ogImage },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:alt", content: SITE_NAME },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SITE_TITLE },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:image", content: ogImage },
  ];
}
