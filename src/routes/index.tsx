import { createFileRoute } from "@tanstack/react-router";
import { V3Page } from "@/components/V3Page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlippAI — Sovereign AI systems you own and run" },
      {
        name: "description",
        content:
          "BlippAI designs custom AI systems built, owned and run inside your own infrastructure — for governments, enterprises and regulated industries.",
      },
      { property: "og:title", content: "BlippAI — Sovereign AI systems you own and run" },
      {
        property: "og:description",
        content:
          "Custom AI infrastructure trained on your data, deployed in your environment, governed by your policies.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/blippai-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: V3Page,
});
