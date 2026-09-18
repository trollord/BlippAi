import { createFileRoute } from "@tanstack/react-router";
import { V3Page } from "@/components/V3Page";

// Page metadata lives in the root route (src/lib/site-meta.ts) so there is a
// single source of truth; a head() here would silently override it.
export const Route = createFileRoute("/")({
  component: V3Page,
});
