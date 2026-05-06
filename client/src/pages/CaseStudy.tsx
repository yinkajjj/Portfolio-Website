import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLocation, useRoute } from "wouter";

type Study = {
  title: string;
  category: string;
  summary: string;
  challenge: string;
  constraints: string[];
  decisions: string[];
  outcome: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
};

const STUDIES: Record<string, Study> = {
  "prompt-wise": {
    title: "Prompt Wise",
    category: "AI Workflow Product",
    summary:
      "A guided prompt workflow product designed to help users move from vague ideas to useful AI outputs quickly.",
    challenge:
      "Most users struggled to get repeatable quality from AI tools. They had ideas, but no structure for discovering, adapting, and applying prompts confidently.",
    constraints: [
      "Need to be usable by non-technical users.",
      "Flow had to be clear on both desktop and mobile.",
      "Content had to be practical, not theoretical.",
    ],
    decisions: [
      "Designed a guided browse-and-apply experience instead of a blank-text interface.",
      "Prioritized clarity in copy and progressive disclosure in the UI.",
      "Focused on fast iteration using real usage feedback.",
    ],
    outcome:
      "Established a practical product direction and a usable workflow model that turns prompt experimentation into repeatable execution.",
    links: [
      { label: "Back to Portfolio", href: "/" },
      { label: "GitHub Profile", href: "https://github.com/yinkajjj", external: true },
    ],
  },
  "amethyst-care": {
    title: "Amethyst Care & Support Group",
    category: "Client Website Delivery",
    summary:
      "A production website built for a care and support provider to improve trust, accessibility, and service clarity.",
    challenge:
      "The organization needed a stronger digital presence that explained services clearly while maintaining a credible, professional tone for families and partners.",
    constraints: [
      "Content had to be accessible and easy to understand.",
      "Visual direction needed to feel warm and professional.",
      "Information architecture had to reduce friction for inquiries.",
    ],
    decisions: [
      "Structured service pages around user intent and common questions.",
      "Used clean typography, clear hierarchy, and trust-building layout patterns.",
      "Streamlined key contact paths to make next steps obvious.",
    ],
    outcome:
      "Delivered a clear and trustworthy digital front door that better represents the organization and supports client conversion.",
    links: [
      { label: "Back to Portfolio", href: "/" },
      { label: "Visit Live Site", href: "https://amethystcsg.co.uk", external: true },
    ],
  },
  "i-invest-ng": {
    title: "I-Invest NG",
    category: "Business Website Strategy",
    summary:
      "A business website focused on positioning clarity, trust, and direct user action.",
    challenge:
      "The brand needed to communicate value faster and reduce hesitation for users evaluating financial offerings online.",
    constraints: [
      "Messaging needed to be concise and confidence-building.",
      "Navigation had to keep users oriented through key sections.",
      "Calls-to-action needed to be visible but not intrusive.",
    ],
    decisions: [
      "Clarified positioning through tighter page narrative and service framing.",
      "Simplified layouts for quicker scanning and faster comprehension.",
      "Placed conversion actions at high-intent points in the journey.",
    ],
    outcome:
      "Shipped a focused web experience that supports trust and helps users move from interest to action with less friction.",
    links: [
      { label: "Back to Portfolio", href: "/" },
      { label: "Visit Live Site", href: "https://i-investng.com/", external: true },
    ],
  },
  afrimash: {
    title: "Afrimash",
    category: "Commerce Experience",
    summary:
      "A production web experience centered on product clarity and straightforward navigation.",
    challenge:
      "Users needed to evaluate products quickly while understanding value and options without confusion.",
    constraints: [
      "Dense information had to remain scannable.",
      "Navigation needed to reduce drop-off risk.",
      "Layout needed to support trust and practical exploration.",
    ],
    decisions: [
      "Improved information flow for better decision-making.",
      "Applied a cleaner hierarchy to reduce cognitive load.",
      "Highlighted key paths that guide users to meaningful actions.",
    ],
    outcome:
      "Created a clearer commerce journey that helps users find, assess, and act faster.",
    links: [
      { label: "Back to Portfolio", href: "/" },
      { label: "Visit Live Site", href: "https://afrimash.com/", external: true },
    ],
  },
  "mohsam-cleaning": {
    title: "Mohsam Cleaning Services",
    category: "Service Website",
    summary:
      "A service-led website designed to increase trust and make customer inquiries easier.",
    challenge:
      "The business needed a clear online presence that communicated service value quickly and encouraged contact.",
    constraints: [
      "Needed to work well for local service audiences.",
      "Service offerings had to be clear at first glance.",
      "Contact pathways had to be simple and obvious.",
    ],
    decisions: [
      "Structured the homepage around services, credibility, and action.",
      "Kept visual language clean and business-appropriate.",
      "Reduced friction from discovery to inquiry.",
    ],
    outcome:
      "Delivered a practical conversion-oriented site that improves trust and supports lead generation.",
    links: [
      { label: "Back to Portfolio", href: "/" },
      { label: "Visit Live Site", href: "https://mohsamcleaningservices.org/", external: true },
    ],
  },
};

export default function CaseStudy() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/case-studies/:slug");
  const study = match ? STUDIES[params.slug] : undefined;

  if (!study) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900">
        <div className="container py-20">
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
          <h1 className="font-serif text-4xl mb-4">Case study not found</h1>
          <p className="text-stone-500">This project story is not available yet.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="container py-10 md:py-16">
        <button
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <section className="rounded-2xl border border-stone-200/60 bg-white p-6 md:p-10 mb-8">
          <div className="font-mono text-xs tracking-widest uppercase text-sage-600 mb-4">{study.category}</div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">{study.title}</h1>
          <p className="text-stone-600 leading-relaxed max-w-3xl">{study.summary}</p>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <article className="rounded-xl border border-stone-200/60 bg-white p-6">
            <h2 className="font-semibold text-xl mb-3">Challenge</h2>
            <p className="text-stone-600 leading-relaxed">{study.challenge}</p>
          </article>

          <article className="rounded-xl border border-stone-200/60 bg-white p-6">
            <h2 className="font-semibold text-xl mb-3">Outcome</h2>
            <p className="text-stone-600 leading-relaxed">{study.outcome}</p>
          </article>
        </section>

        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <article className="rounded-xl border border-stone-200/60 bg-white p-6">
            <h2 className="font-semibold text-xl mb-4">Constraints</h2>
            <ul className="space-y-3">
              {study.constraints.map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600 text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-stone-200/60 bg-white p-6">
            <h2 className="font-semibold text-xl mb-4">Decisions</h2>
            <ul className="space-y-3">
              {study.decisions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-stone-600 text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="flex flex-wrap gap-3">
          {study.links.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors"
                >
                  {link.label}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => setLocation(link.href)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors"
              >
                {link.label}
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}
