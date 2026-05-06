/*
 * DESIGN: Structured Minimalism
 * - Warm stone palette (#E8E4DF base) with sage green (#7A8B6F) accents
 * - Instrument Serif for display, Instrument Sans for body
 * - Asymmetric layouts with generous whitespace
 * - Paper-grain texture, thin dividers, dot navigation cues
 * - Restrained animations: gentle fade + drift
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ChevronRight,
  Code2,
  Server,
  Brain,
  FileText,
  Cloud,
  MessageSquare,
  Wrench,
  Lightbulb,
  Star,
  GitFork,
  ExternalLink,
} from "lucide-react";

// --- Constants ---
const PORTRAIT_FORMAL = "/images/portfolio-photo-1.png";
const PORTRAIT_CASUAL = "/images/portfolio-photo-2.png";

const HERO_BG = PORTRAIT_FORMAL;
const PROJECT_AMETHYST = "/images/portfolio-photo-3.png";
const PROJECT_PROMPTWISE_HOME = "/images/portfolio-photo-4.png";
const PROJECT_PROMPTWISE_BROWSE = "/images/portfolio-photo-2.png";
const JOEL_HERO_PHOTO = PORTRAIT_FORMAL;
const JOEL_DESK_PHOTO = PORTRAIT_CASUAL;
const SKILLS_PATTERN = PORTRAIT_CASUAL;

const NAV_ITEMS = [
  {
    label: "Story",
    href: "#about",
    tabClass: "text-[#2f4f9f] hover:text-[#1e3775] hover:bg-[#e6eeff]",
  },
  {
    label: "Case Studies",
    href: "#projects",
    tabClass: "text-[#0f766e] hover:text-[#0b5d57] hover:bg-[#dff8f4]",
  },
  {
    label: "Build Log",
    href: "#github",
    tabClass: "text-[#9a3412] hover:text-[#7c2d12] hover:bg-[#ffeddc]",
  },
  {
    label: "Expertise",
    href: "#skills",
    tabClass: "text-[#7e22ce] hover:text-[#6b21a8] hover:bg-[#f3e8ff]",
  },
  {
    label: "Contact",
    href: "#contact",
    tabClass: "text-[#be123c] hover:text-[#9f1239] hover:bg-[#ffe4ea]",
  },
];

const SECTION_TONES: Record<string, { number: string; line: string; label: string }> = {
  Story: {
    number: "text-[#2f4f9f]",
    line: "bg-[#bed0ff]",
    label: "text-[#2f4f9f] bg-[#e6eeff] border border-[#c9d8ff]",
  },
  Timeline: {
    number: "text-[#0f766e]",
    line: "bg-[#99e7da]",
    label: "text-[#0f766e] bg-[#dff8f4] border border-[#b8efe6]",
  },
  "Case Study": {
    number: "text-[#9a3412]",
    line: "bg-[#ffcba8]",
    label: "text-[#9a3412] bg-[#ffeddc] border border-[#ffd7bd]",
  },
  "Client Outcomes": {
    number: "text-[#7e22ce]",
    line: "bg-[#dfb9ff]",
    label: "text-[#7e22ce] bg-[#f3e8ff] border border-[#e9d5ff]",
  },
  "Build Log": {
    number: "text-[#1d4ed8]",
    line: "bg-[#b6d0ff]",
    label: "text-[#1d4ed8] bg-[#e8f0ff] border border-[#ccddff]",
  },
  Expertise: {
    number: "text-[#a21caf]",
    line: "bg-[#edb8ff]",
    label: "text-[#a21caf] bg-[#fae8ff] border border-[#f5d0fe]",
  },
  Contact: {
    number: "text-[#be123c]",
    line: "bg-[#ffc0d0]",
    label: "text-[#be123c] bg-[#ffe4ea] border border-[#ffc8d6]",
  },
};

const SKILLS = [
  { name: "HTML & CSS", desc: "Semantic layouts & modern styling", icon: Code2 },
  { name: "JavaScript", desc: "Interactive user experiences", icon: Code2 },
  { name: "Git & GitHub", desc: "Version control & collaboration", icon: Github },
  { name: "IT Administration", desc: "Systems & user management", icon: Server },
  { name: "Azure Cloud", desc: "Growing cloud expertise", icon: Cloud },
  { name: "AI & Prompting", desc: "Practical AI tool building", icon: Brain },
  { name: "Documentation", desc: "Clear technical writing", icon: FileText },
  { name: "Problem Solving", desc: "User-centered solutions", icon: Lightbulb },
];

const PHRASES = [
  "Building modern websites that leave an impression.",
  "Turning practical ideas into digital experiences.",
  "Making AI tools more useful with Prompt Wise.",
  "Solving real problems with support, systems & code.",
];

const JOURNEY_MILESTONES = [
  {
    period: "2021",
    title: "Support Foundation",
    detail:
      "Started in high-touch technical support, learning fast diagnosis, user empathy, and reliable issue ownership.",
  },
  {
    period: "2022-2023",
    title: "Systems Thinking",
    detail:
      "Expanded into IT administration and operations, improving workflows, documentation quality, and service consistency.",
  },
  {
    period: "2024-2025",
    title: "Product Delivery",
    detail:
      "Delivered production client websites focused on trust, clarity, and conversion-ready user journeys.",
  },
  {
    period: "Now",
    title: "AI Workflow Builder",
    detail:
      "Building Prompt Wise and practical AI workflows that turn complex tasks into guided, usable outcomes.",
  },
];

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// --- Components ---
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  const tone = SECTION_TONES[label] ?? {
    number: "text-sage-500",
    line: "bg-stone-300",
    label: "text-stone-500 border border-stone-200 bg-stone-50",
  };

  return (
    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
      <span className={`font-mono text-sm tracking-widest ${tone.number}`}>{number}</span>
      <div className={`h-px w-12 ${tone.line}`} />
      <span className={`font-mono text-sm tracking-widest uppercase px-3 py-1 rounded-full ${tone.label}`}>
        {label}
      </span>
    </motion.div>
  );
}

function Typewriter() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 50);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 25);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="font-serif italic text-sage-600 text-lg md:text-xl">
      {text}
      <span className="animate-pulse ml-0.5 inline-block w-0.5 h-5 bg-sage-500 align-middle" />
    </span>
  );
}

// --- GitHub Repos ---
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

function useGitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/yinkajjj/repos?sort=updated&per_page=12")
      .then((res) => res.json())
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
          .slice(0, 6);
        setRepos(filtered);
      })
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading };
}

// --- Main Page ---
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { repos, loading } = useGitHubRepos();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ─── Navigation ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-stone-200/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-sage-600 flex items-center justify-center text-white text-sm font-semibold tracking-tight">
              JO
            </div>
            <span className="font-semibold text-stone-800 hidden sm:block">Joel Onarinde</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm transition-colors rounded-md ${item.tabClass}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/yinkajjj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:border-stone-300 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/joel-onarinde-4b5614ba"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:border-stone-300 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors"
            >
              Work With Me
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="container">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
            {/* Left column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                <span className="font-mono text-sm text-stone-500 tracking-wide">
                  Open to opportunities
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-stone-900 leading-[1.05] mb-6"
              >
                From support
                <br />
                <span className="text-sage-600">operations to digital</span>
                <br />
                product delivery.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-stone-500 text-lg leading-relaxed max-w-xl mb-4"
              >
                I started by solving day-to-day user and system problems in IT support,
                then moved that same problem-solving mindset into web development and
                AI workflow design. Today, I build practical digital products that are
                clear, usable, and tied to business outcomes.
              </motion.p>

              <motion.div variants={fadeUp} className="mb-8 h-7">
                <Typewriter />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Read My Case Studies
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors"
                >
                  Contact Me
                </a>
                <a
                  href="mailto:yonarinde@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-stone-200"
              >
                {[
                  { num: "4+", label: "Years in IT & Support Ops" },
                  { num: "4", label: "Live Client Websites" },
                  { num: "1", label: "AI Product in Progress" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-3xl md:text-4xl text-stone-900">{stat.num}</div>
                    <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column — Joel's photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-stone-200/60 shadow-xl">
                  <img
                    src={JOEL_HERO_PHOTO}
                    alt="Joel Onarinde"
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white border border-stone-200 rounded-xl px-5 py-3 shadow-lg">
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-1">Focus</div>
                  <div className="text-sm font-medium text-stone-800">Systems &middot; Product &middot; AI Workflows</div>
                </div>
                {/* Small secondary photo */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                  <img
                    src={JOEL_DESK_PHOTO}
                    alt="Joel at work"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <Section id="about">
        <div className="container">
          <SectionLabel number="01" label="Story" />

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
            <motion.div variants={fadeUp}>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
                How I got here,
                <br />
                and how I build now.
              </h2>
              <p className="text-stone-500 leading-relaxed mb-6">
                My foundation is in technical support and IT administration, where I
                learned to diagnose fast, communicate clearly, and keep systems reliable
                under pressure. That experience shaped how I approach every product problem.
              </p>
              <p className="text-stone-500 leading-relaxed">
                I now apply the same discipline to web products and AI-enabled workflows:
                understand the user friction, design a practical flow, ship cleanly, and
                iterate based on feedback. The result is work that is not just polished,
                but useful in the real world.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              {/* Current Focus */}
              <div className="p-6 rounded-xl bg-sage-50/60 border border-sage-200/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-sage-700" />
                  </div>
                  <h3 className="font-semibold text-stone-800">What I solve now</h3>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Turning unclear requirements into structured digital experiences:
                  client-facing websites, operational workflows, and practical AI tools
                  that reduce friction for teams and users.
                </p>
              </div>

              {/* Strengths */}
              <div className="p-6 rounded-xl bg-stone-50 border border-stone-200/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-stone-600" />
                  </div>
                  <h3 className="font-semibold text-stone-800">How I work</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Discovery & Clarification",
                    "Technical Troubleshooting",
                    "User-Centered Design",
                    "Documentation & Handover",
                    "Cross-Functional Communication",
                    "Reliable Delivery",
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[
                  "IT Operations",
                  "Web Development",
                  "AI Workflow Design",
                  "Product Thinking",
                  "Client Delivery",
                  "Continuous Learning",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-mono tracking-wide text-sage-700 bg-sage-50 border border-sage-200/50 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── Timeline ─── */}
      <Section id="timeline" className="bg-stone-50/50">
        <div className="container">
          <SectionLabel number="01.5" label="Timeline" />

          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-4">
              Career progression at a glance
            </h2>
            <p className="text-stone-500 max-w-2xl leading-relaxed">
              A quick view of how my work evolved from support and systems into delivery,
              product thinking, and AI-enabled solutions.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="space-y-4">
            {JOURNEY_MILESTONES.map((milestone) => (
              <motion.article
                key={milestone.period + milestone.title}
                variants={fadeUp}
                className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 p-5 md:p-6 rounded-xl border border-stone-200/60 bg-white"
              >
                <div className="font-mono text-xs tracking-widest text-sage-600 uppercase pt-1">
                  {milestone.period}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-stone-900 mb-2">{milestone.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{milestone.detail}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── Featured Project: Prompt Wise ─── */}
      <Section id="promptwise" className="bg-stone-50/50">
        <div className="container">
          <SectionLabel number="02" label="Case Study" />

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-stone-200/60 bg-white overflow-hidden shadow-sm"
          >
            <div className="grid lg:grid-cols-2">
              {/* Info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="font-mono text-xs tracking-widest text-sage-600 uppercase mb-4">
                  Story 01: Prompt Wise
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                  Prompt Wise
                </h2>
                <p className="text-stone-500 leading-relaxed mb-6">
                  Prompt Wise started from one question: how do we make AI output useful,
                  not noisy? I designed this product as a guided workflow where users can
                  discover, adapt, and apply prompts quickly without technical overhead.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Problem Framing", "Workflow UX", "Prompt Engineering", "Iteration"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium text-sage-700 bg-sage-50 border border-sage-200/50 rounded-md"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/case-studies/prompt-wise"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    Read case study
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/yinkajjj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </div>
              </div>

              {/* Screenshots — stacked with overlap */}
              <div className="relative bg-stone-100 p-6 md:p-8 flex flex-col gap-4 min-h-[400px] justify-center">
                <div className="rounded-lg overflow-hidden shadow-lg border border-stone-200/40">
                  <img
                    src={PROJECT_PROMPTWISE_HOME}
                    alt="Prompt Wise home page — Ideas on tap for any topic"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg border border-stone-200/40">
                  <img
                    src={PROJECT_PROMPTWISE_BROWSE}
                    alt="Prompt Wise browse page — Browse Prompts catalog"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─── Projects ─── */}
      <Section id="projects">
        <div className="container">
          <SectionLabel number="03" label="Client Outcomes" />

          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-4">
              Proof from real delivery
            </h2>
            <p className="text-stone-500 max-w-xl leading-relaxed">
              These projects show how I translate business goals into practical websites:
              clearer messaging, stronger trust, and better user paths.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid md:grid-cols-2 gap-8">
            {/* Project 1: Amethyst */}
            <motion.article
              variants={fadeUp}
              className="group rounded-2xl border border-stone-200/60 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={PROJECT_AMETHYST}
                  alt="Amethyst Care & Support Group website"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="font-mono text-xs tracking-widest text-stone-400 uppercase mb-2">
                  Website 01
                </div>
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  Amethyst Care & Support Group
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  Built for a CQC-registered care provider that needed stronger digital
                  credibility. I translated service complexity into a clear, accessible,
                  and trustworthy web experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/case-studies/amethyst-care"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors"
                  >
                    Read Case Study
                  </a>
                  <a
                    href="https://amethystcsg.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sage-700 bg-sage-50 border border-sage-200/50 rounded-md hover:bg-sage-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live Site
                  </a>
                </div>
              </div>
            </motion.article>

            {/* Project 2: I-Invest NG */}
            <motion.article
              variants={fadeUp}
              className="group rounded-2xl border border-stone-200/60 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden bg-stone-100 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center mx-auto mb-3">
                    <ExternalLink className="w-5 h-5 text-stone-400" />
                  </div>
                  <p className="text-stone-500 text-sm font-medium">i-investng.com</p>
                  <p className="text-stone-400 text-xs mt-1">Investment-focused client website</p>
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono text-xs tracking-widest text-stone-400 uppercase mb-2">
                  Website 02
                </div>
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  I-Invest NG
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  Designed to improve trust and decision clarity for an investment brand.
                  The structure focuses on concise positioning and direct conversion paths.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/case-studies/i-invest-ng"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors"
                  >
                    Read Case Study
                  </a>
                  <a
                    href="https://i-investng.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sage-700 bg-sage-50 border border-sage-200/50 rounded-md hover:bg-sage-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live Site
                  </a>
                </div>
              </div>
            </motion.article>

            {/* Project 3: Afrimash */}
            <motion.article
              variants={fadeUp}
              className="group rounded-2xl border border-stone-200/60 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden bg-stone-100 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center mx-auto mb-3">
                    <ExternalLink className="w-5 h-5 text-stone-400" />
                  </div>
                  <p className="text-stone-500 text-sm font-medium">afrimash.com</p>
                  <p className="text-stone-400 text-xs mt-1">Commercial website project</p>
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono text-xs tracking-widest text-stone-400 uppercase mb-2">
                  Website 03
                </div>
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  Afrimash
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  Reworked information flow for a commerce-focused experience where users
                  can quickly scan options, understand value, and move with confidence.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/case-studies/afrimash"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors"
                  >
                    Read Case Study
                  </a>
                  <a
                    href="https://afrimash.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sage-700 bg-sage-50 border border-sage-200/50 rounded-md hover:bg-sage-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live Site
                  </a>
                </div>
              </div>
            </motion.article>

            {/* Project 4: Mohsam Cleaning Services */}
            <motion.article
              variants={fadeUp}
              className="group rounded-2xl border border-stone-200/60 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden bg-stone-100 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center mx-auto mb-3">
                    <ExternalLink className="w-5 h-5 text-stone-400" />
                  </div>
                  <p className="text-stone-500 text-sm font-medium">mohsamcleaningservices.org</p>
                  <p className="text-stone-400 text-xs mt-1">Service business website</p>
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono text-xs tracking-widest text-stone-400 uppercase mb-2">
                  Website 04
                </div>
                <h3 className="font-semibold text-lg text-stone-900 mb-2">
                  Mohsam Cleaning Services
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  Created as a service-first sales asset with clear offerings, trust cues,
                  and contact actions to shorten the path from visitor to inquiry.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/case-studies/mohsam-cleaning"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-300 rounded-md hover:bg-stone-200 transition-colors"
                  >
                    Read Case Study
                  </a>
                  <a
                    href="https://mohsamcleaningservices.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sage-700 bg-sage-50 border border-sage-200/50 rounded-md hover:bg-sage-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live Site
                  </a>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </Section>

      {/* ─── GitHub Showcase ─── */}
      <Section id="github" className="bg-stone-50/50">
        <div className="container">
          <SectionLabel number="04" label="Build Log" />

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-4">
                How I think in code
              </h2>
              <p className="text-stone-500 max-w-xl leading-relaxed">
                A live view of my repositories, showing the systems, experiments, and
                implementation choices behind my work.
              </p>
            </div>
            <a
              href="https://github.com/yinkajjj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap"
            >
              <Github className="w-4 h-4" />
              View Full Profile
            </a>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-5 rounded-xl border border-stone-200/60 bg-white animate-pulse">
                  <div className="h-5 bg-stone-100 rounded w-2/3 mb-3" />
                  <div className="h-4 bg-stone-100 rounded w-full mb-2" />
                  <div className="h-4 bg-stone-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : repos.length > 0 ? (
            <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <motion.a
                  key={repo.id}
                  variants={fadeUp}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-xl border border-stone-200/60 bg-white hover:border-sage-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-stone-900 group-hover:text-sage-700 transition-colors">
                      {repo.name.replace(/[-_]/g, " ")}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-sage-500 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {repo.description || "A project from my GitHub portfolio showcasing development work and learning."}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-stone-400">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sage-400" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeUp} className="p-8 rounded-xl border border-stone-200/60 bg-white text-center">
              <p className="text-stone-500 mb-4">Could not load repositories right now.</p>
              <a
                href="https://github.com/yinkajjj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
              >
                Visit GitHub Profile
              </a>
            </motion.div>
          )}
        </div>
      </Section>

      {/* ─── Skills ─── */}
      <Section id="skills">
        <div className="container">
          <SectionLabel number="05" label="Expertise" />

          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-4">
              Capability stack
            </h2>
            <p className="text-stone-500 max-w-xl leading-relaxed">
              The technical and operational strengths I use to move from ambiguity to
              shipped outcomes.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  className="p-5 rounded-xl border border-stone-200/60 bg-white hover:border-sage-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-sage-50 border border-sage-200/40 flex items-center justify-center mb-4 group-hover:bg-sage-100 transition-colors">
                    <Icon className="w-5 h-5 text-sage-600" />
                  </div>
                  <h3 className="font-medium text-stone-900 text-sm mb-1">{skill.name}</h3>
                  <p className="text-stone-400 text-xs leading-relaxed">{skill.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Decorative pattern */}
          <motion.div variants={fadeUp} className="mt-12 rounded-2xl overflow-hidden border border-stone-200/40 opacity-50">
            <img src={SKILLS_PATTERN} alt="" className="w-full h-32 object-cover" />
          </motion.div>
        </div>
      </Section>

      {/* ─── Contact ─── */}
      <Section id="contact" className="bg-stone-50/50">
        <div className="container">
          <SectionLabel number="06" label="Contact" />

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20">
            <motion.div variants={fadeUp}>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
                If this story fits
                <br />
                your team, let's talk.
              </h2>
              <p className="text-stone-500 leading-relaxed mb-8 max-w-lg">
                I am open to roles where technical depth meets user impact, especially in
                IT operations, digital product delivery, web development, and AI-enabled
                workflow design.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:yonarinde@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-stone-200/60 bg-white hover:border-sage-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-sage-50 flex items-center justify-center group-hover:bg-sage-100 transition-colors">
                    <Mail className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-900">Email</div>
                    <div className="text-sm text-stone-500">yonarinde@gmail.com</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-300 ml-auto group-hover:text-sage-500 transition-colors" />
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-200/60 bg-white">
                  <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-stone-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-900">Location</div>
                    <div className="text-sm text-stone-500">Calgary, Alberta, Canada</div>
                  </div>
                </div>

                <a
                  href="https://github.com/yinkajjj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-stone-200/60 bg-white hover:border-sage-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center group-hover:bg-sage-100 transition-colors">
                    <Github className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-900">GitHub</div>
                    <div className="text-sm text-stone-500">github.com/yinkajjj</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-300 ml-auto group-hover:text-sage-500 transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/joel-onarinde-4b5614ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-stone-200/60 bg-white hover:border-sage-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center group-hover:bg-sage-100 transition-colors">
                    <Linkedin className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-900">LinkedIn</div>
                    <div className="text-sm text-stone-500">Joel Onarinde</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-stone-300 ml-auto group-hover:text-sage-500 transition-colors" />
                </a>
              </div>
            </motion.div>

            {/* Right side — CTA card */}
            <motion.div variants={fadeUp} className="flex items-center">
              <div className="w-full p-8 md:p-10 rounded-2xl bg-stone-900 text-white">
                <div className="font-mono text-xs tracking-widest text-stone-400 uppercase mb-4">
                  Available for
                </div>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 leading-tight">
                  IT roles, web projects
                  <br />& AI collaborations
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  I bring a unique combination of IT administration experience, web
                  development skills, and AI product thinking. Let's build something
                  meaningful together.
                </p>
                <a
                  href="mailto:yonarinde@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send me an email
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── Footer ─── */}
      <footer className="py-8 border-t border-stone-200">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-sage-600 flex items-center justify-center text-white text-xs font-semibold">
              JO
            </div>
            <span className="text-sm text-stone-500">
              &copy; {new Date().getFullYear()} Joel Onarinde
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yinkajjj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/joel-onarinde-4b5614ba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:yonarinde@gmail.com"
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
