import { createFileRoute } from "@tanstack/react-router";
import { V3Page } from "@/components/V3Page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlippAI. Sovereign AI you own and run." },
      {
        name: "description",
        content:
          "Custom AI systems built around your data, running on your infrastructure, and fully owned by you.",
      },
      { property: "og:title", content: "BlippAI. Sovereign AI you own and run." },
      {
        property: "og:description",
        content:
          "Custom AI systems built around your data, running on your infrastructure, and fully owned by you.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "BlippAI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BlippAI. Sovereign AI you own and run." },
      {
        name: "twitter:description",
        content:
          "Custom AI systems built around your data, running on your infrastructure, and fully owned by you.",
      },
      { name: "twitter:image", content: "/og-image.png" },
    ],
  }),
  component: V3Page,
});
