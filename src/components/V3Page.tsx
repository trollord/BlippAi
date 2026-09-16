import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { BlippLogo } from "@/components/BlippLogo";

const NAV = [
  { label: "The shift", href: "#shift" },
  { label: "Solutions", href: "#solutions" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Deployment", href: "#deployment" },
  { label: "Industries", href: "#industries" },
  { label: "Security", href: "#security" },
  { label: "Get in touch", href: "#contact" },
];

const SHIFT = [
  "For thirty years, software meant a license. You bought a seat, adapted your workflow to someone else's product, and paid again every year to keep using it.",
  "That model is upgraded with AI. The value isn't a static tool anymore. It's a system that has to be trained on your organisation, held to your standards, and run inside your walls. That can't be bought off a shelf. It has to be built as a service, delivered into your environment, and owned by you when it's done.",
  "That's the category we build in. Not software you rent. A system you own.",
];

const CAPABILITIES = [
  "Runs on the infrastructure you already operate.",
  "Cloud, private cloud, or fully on premise. Your data never leaves.",
  "Embedded into existing workflows, never layered on top.",
  "Modelled on the language, rules and constraints of your sector.",
  "Trained exclusively on your knowledge, documents and processes.",
  "Specialised small models running on an inference engine under your control.",
];

const HOW_IT_WORKS = [
  "BlippAI's deployed systems form the intelligence layer between your enterprise data and every person, system, and application that depends on it.",
  "It starts with what you already own. Your knowledge. Your documents. Your databases. Your systems. Running on infrastructure you already control.",
  "One custom AI system spans all of it, trained exclusively for your organization to solve your specific problems. A proprietary foundation model. Specialized SLMs. An enterprise inference engine.",
  "It reaches every person, application, workflow, and system that keeps the organization running.",
  "Most AI stops at information. We build systems that solve real problems through verified, ranked outputs designed to be acted on, with or without human review.",
];

const DEPLOYMENT = [
  { title: "Cloud", body: "Rapid deployment on managed infrastructure." },
  { title: "Private cloud", body: "Dedicated environments inside your own network." },
  { title: "On premise", body: "Your data center. Full residency and sovereignty." },
  { title: "Fully restricted", body: "Air gapped, with no external connectivity." },
];

const INDUSTRIES = [
  "Enterprises & multinationals",
  "Governments & public institutions",
  "Finance & banking",
  "Insurance",
  "Healthcare & life sciences",
  "Energy & utilities",
  "Telecom",
  "Defense & aerospace",
  "Manufacturing",
  "Automotive",
  "Logistics & supply chain",
  "Education & research",
];

const GOVERNANCE = [
  { title: "Access", body: "Granular permissions by role across knowledge and workflows." },
  { title: "Audit", body: "Every action logged. Every answer traceable to its source." },
  { title: "Residency", body: "Run inside your network or on premise. Data never leaves." },
  { title: "Governance", body: "Policies that match how your organisation already operates." },
];

/* Custom line diagram: your data, one system, everyone who depends on it. */
function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 720 260"
      className="mt-12 w-full text-primary"
      role="img"
      aria-label="Diagram: your data and systems feed one owned AI layer, which serves your people, applications and workflows."
    >
      <g fill="none" stroke="currentColor" strokeOpacity="0.45">
        {[30, 100, 170].map((y) => (
          <rect key={y} x="1" y={y} width="170" height="52" rx="3" />
        ))}
        <rect x="275" y="60" width="170" height="140" rx="4" strokeOpacity="0.9" />
        {[30, 100, 170].map((y) => (
          <rect key={`r${y}`} x="549" y={y} width="170" height="52" rx="3" />
        ))}
      </g>
      <g stroke="currentColor" strokeOpacity="0.35" fill="none">
        {[56, 126, 196].map((y) => (
          <path key={y} d={`M171 ${y} C 225 ${y}, 225 130, 275 130`} />
        ))}
        {[56, 126, 196].map((y) => (
          <path key={`o${y}`} d={`M445 130 C 495 130, 495 ${y}, 549 ${y}`} />
        ))}
      </g>
      <g
        fill="currentColor"
        fillOpacity="0.85"
        fontSize="13"
        fontFamily="Manrope, sans-serif"
        textAnchor="middle"
      >
        <text x="86" y="61">
          Knowledge & documents
        </text>
        <text x="86" y="131">
          Databases
        </text>
        <text x="86" y="201">
          Existing systems
        </text>
        <text x="360" y="124">
          BlippAI's Custom AI Systems
        </text>
        <text x="360" y="146" fillOpacity="0.6">
          model, SLMs, inference
        </text>
        <text x="634" y="61">
          People
        </text>
        <text x="634" y="131">
          Applications
        </text>
        <text x="634" y="201">
          Workflows
        </text>
      </g>
    </svg>
  );
}

function RuledList({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="mt-10 grid border-b border-border sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3 border-t border-border py-4 pr-8">
          <span aria-hidden="true" className="body-base shrink-0 text-primary">
            —
          </span>
          <span className={`body-base ${muted ? "text-muted-foreground" : "text-foreground"}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  glow,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <section
      id={id}
      className={`lux-section lux-section-${id}${glow ? " lux-section-emphasis" : ""}`}
    >
      <div aria-hidden="true" className="lux-section-aura" />
      <div className="shell relative z-10 grid gap-y-7 py-16 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-x-16 md:py-28 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="eyebrow">{eyebrow}</p>
        </div>
        <Reveal className="min-w-0 max-w-3xl">
          <h2 className="text-3xl leading-[1.15] sm:text-4xl">{title}</h2>
          {lede ? <p className="mt-6 body-lg text-muted-foreground">{lede}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function useHeaderVisibility() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      setScrolled(y > 8);
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 160);
        lastY = y;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { hidden, scrolled };
}

export function V3Page() {
  const { hidden, scrolled } = useHeaderVisibility();
  const [menuOpen, setMenuOpen] = useState(false);

  /* The drop-down only exists below md, so close it on Escape or once the desktop nav takes over. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  return (
    <div className="lux-page min-h-dvh bg-background">
      {/* Sits outside the header: the header's backdrop-filter would otherwise make it the
          containing block for this fixed scrim and collapse it to the header's own box. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="lux-nav-scrim md:hidden"
        data-open={menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <header
        className="lux-header"
        data-hidden={hidden && !menuOpen}
        data-scrolled={scrolled || menuOpen}
        data-menu={menuOpen}
      >
        <div className="shell flex items-center justify-between gap-6 py-4 md:grid md:grid-cols-[14rem_minmax(0,1fr)] md:gap-x-16 md:py-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <a href="#top" className="flex items-center" aria-label="BlippAI, back to top">
            <BlippLogo className="h-9 w-auto md:h-10" />
          </a>
          <button
            type="button"
            className="lux-nav-toggle md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="lux-nav-toggle-icon">
              <span className="lux-nav-toggle-bar" />
              <span className="lux-nav-toggle-bar" />
              <span className="lux-nav-toggle-bar" />
            </span>
          </button>
          <nav className="hidden flex-wrap gap-x-7 gap-y-2 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div
          id="mobile-nav"
          className="lux-nav-panel md:hidden"
          data-open={menuOpen}
          aria-hidden={!menuOpen}
        >
          <nav className="shell flex flex-col pb-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? undefined : -1}
                className="lux-nav-panel-link"
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:hello@blippai.com"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? undefined : -1}
              className="lux-nav-panel-mail"
            >
              hello@blippai.com
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="top" className="lux-hero relative overflow-hidden">
          <div aria-hidden="true" className="lux-hero-aura" />
          <div aria-hidden="true" className="lux-hero-sheen" />
          <div className="shell relative grid gap-y-8 pt-12 pb-16 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-x-16 md:pt-24 md:pb-28 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <p className="eyebrow md:pt-3">Sovereign AI</p>
            <Reveal className="min-w-0 max-w-4xl">
              <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Custom AI systems.
                <span className="mt-4 block text-muted-foreground">
                  Built, owned and run inside your own infrastructure.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl body-lg text-muted-foreground">
                Sovereign AI for organisations that cannot hand their data, models or decisions to
                someone else.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href="#contact" className="btn-base btn-signal">
                  Define your problem
                </a>
                <p className="text-base text-muted-foreground">
                  or reach us directly at{" "}
                  <a href="mailto:hello@blippai.com" className="text-foreground link-underline">
                    hello@blippai.com
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Section id="shift" eyebrow="The shift" title="Services: The New Software." glow>
          <div className="mt-8 space-y-6">
            {SHIFT.map((para) => (
              <p key={para} className="body-lg text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
        </Section>

        <Section
          id="solutions"
          eyebrow="Solutions"
          title="Infrastructure, not another application."
          lede="Most AI today is an external tool running on someone else's model, hosted on someone else's servers, with your data passing through it. We build the opposite: sovereign AI infrastructure that lives inside your environment and is built exclusively for you."
        >
          <RuledList items={CAPABILITIES} muted />
        </Section>

        <Section
          id="how-it-works"
          eyebrow="How it works"
          title="A custom AI system trained on your organization."
          glow
        >
          <div className="mt-8 space-y-6">
            {HOW_IT_WORKS.map((para) => (
              <p key={para} className="body-lg text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
          {/* <ArchitectureDiagram /> */}
        </Section>

        <Section
          id="deployment"
          eyebrow="Deployment"
          title="Deploy inside the environment you already trust."
        >
          <div className="mt-8 sm:hidden">
            {DEPLOYMENT.map((item) => (
              <details key={item.title} className="group border-b border-border py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg text-foreground">
                  {item.title}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 body-base text-muted-foreground">{item.body}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 hidden gap-10 sm:grid sm:grid-cols-2 sm:gap-x-12">
            {DEPLOYMENT.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 body-base text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="industries"
          eyebrow="Industries"
          title="AI as a true internal capability."
          lede="We build for sectors that demand ownership, control and continuity, including but not limited to:"
        >
          <RuledList items={INDUSTRIES} />
        </Section>

        <Section
          id="security"
          eyebrow="Security & governance"
          title="Built for regulated, mission critical work."
          lede="You keep the keys. You keep the data. You keep the control."
          glow
        >
          <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-x-12">
            {GOVERNANCE.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 body-base text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 body-base text-muted-foreground">
            Designed to meet GDPR, ISO 27001, SOC 2 and other similar requirements. Full data
            residency control. You own the model weights, the data, and the deployment. Zero vendor
            lock in.
          </p>
        </Section>

        <Section
          id="contact"
          eyebrow="Get in touch"
          title="Bring reliable AI into your operations."
          lede="Tell us what you are trying to solve. We will get back to you."
        >
          <ContactForm />
        </Section>
      </main>

      <footer className="lux-footer">
        <div className="shell grid gap-y-8 py-12 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-x-16 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="flex items-start">
            <BlippLogo className="h-10 w-auto" />
          </div>
          <div className="min-w-0">
            <p className="max-w-md body-base text-foreground">
              Sovereign AI infrastructure for governments and enterprises.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base text-muted-foreground">
              <a
                href="mailto:hello@blippai.com"
                className="link-underline transition-colors hover:text-foreground"
              >
                hello@blippai.com
              </a>
              {/* <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="link-underline transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a href="#" className="link-underline transition-colors hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="link-underline transition-colors hover:text-foreground">
                Terms
              </a> */}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              &copy; 2026 BlippAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
