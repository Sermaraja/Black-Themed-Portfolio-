"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DevopstrioProject {
  id: string;
  title: string;
  overview: string;
  responsibilities: string[];
  technologies: string[];
  tags: string[];
  label: string;
  status: string;
  image: string;
  gradient: string;
  icon: string;
}

const devopstrioCloudProjects: DevopstrioProject[] = [
  {
    id: "dt-cloud-1",
    title: "Enterprise Azure Migration & Infrastructure Modernization",
    label: "Cloud Migration",
    status: "Completed",
    gradient: "from-sky-600 via-blue-700 to-indigo-900",
    icon: "🚀",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    overview: "Supported an enterprise Azure migration project by assisting with infrastructure analysis, migration planning, and technical documentation across multiple environments.",
    responsibilities: [
      "Assisted in infrastructure assessment across multiple enterprise environments.",
      "Supported Azure Site Recovery (ASR) replication and migration activities.",
      "Analyzed server inventories and workload classifications using Microsoft Excel.",
      "Assisted with application deployment and environment configuration.",
      "Prepared cloud migration documentation and operational runbooks.",
      "Collaborated with senior engineers during migration planning and validation."
    ],
    technologies: ["Azure", "Azure Site Recovery", "Windows Server", "VMware", "Microsoft Excel"],
    tags: ["Cloud", "Migration", "Infrastructure", "ASR"]
  },
  {
    id: "dt-cloud-2",
    title: "Enterprise Azure Monitoring & Cloud Operations",
    label: "Cloud Operations",
    status: "Completed",
    gradient: "from-emerald-600 via-teal-700 to-cyan-900",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    overview: "Supported Azure monitoring and cloud operations by analyzing alerts, preparing operational reports, and assisting with infrastructure monitoring.",
    responsibilities: [
      "Assisted in Azure alert monitoring and classification.",
      "Analyzed infrastructure alerts and recurring warning patterns.",
      "Supported Azure cost optimization reporting.",
      "Prepared operational reports using Microsoft Excel.",
      "Assisted in documenting monitoring processes and operational procedures.",
      "Contributed to cloud operations documentation and reporting."
    ],
    technologies: ["Azure Monitor", "Azure Portal", "Log Analytics", "Microsoft Excel"],
    tags: ["Monitoring", "Alerts", "Cost Optimization", "Operations"]
  },
  {
    id: "dt-cloud-3",
    title: "Enterprise VMware Infrastructure Assessment",
    label: "Virtualization",
    status: "Completed",
    gradient: "from-violet-600 via-purple-700 to-fuchsia-900",
    icon: "🖥️",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=80",
    overview: "Supported VMware infrastructure assessment and virtualization documentation for enterprise infrastructure modernization.",
    responsibilities: [
      "Assisted in analyzing VMware ESXi infrastructure.",
      "Prepared infrastructure assessment reports and technical documentation.",
      "Supported documentation for StarWind VSAN architecture.",
      "Created technical Word documents and PowerPoint presentations.",
      "Assisted in documenting virtualization environments and cluster configurations.",
      "Collaborated with the infrastructure team during technical assessments."
    ],
    technologies: ["VMware ESXi", "StarWind VSAN", "Windows Server", "Microsoft Office"],
    tags: ["VMware", "VSAN", "Assessment", "Virtualization"]
  },
  {
    id: "dt-cloud-4",
    title: "Azure QA Replication & Migration Support",
    label: "QA & Testing",
    status: "Completed",
    gradient: "from-rose-600 via-pink-700 to-red-900",
    icon: "🔄",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    overview: "Supported Azure replication testing and migration readiness activities for enterprise workloads.",
    responsibilities: [
      "Assisted with Azure QA replication activities.",
      "Verified replication status and migration readiness.",
      "Supported migration validation and testing.",
      "Updated migration tracking documents.",
      "Collaborated with cloud engineers during migration activities.",
      "Maintained technical documentation for migration tasks."
    ],
    technologies: ["Azure", "Azure Site Recovery", "Windows Server", "Microsoft Excel"],
    tags: ["Replication", "QA", "Testing", "Migration"]
  }
];

export default function WorksPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "devopstrio" | "major" | "freelance">("all");
  const [activeDevopstrioTab, setActiveDevopstrioTab] = useState<"cloud" | "docs">("cloud");
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setProjectsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Staggered scroll-reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-item");
    elements.forEach((el, idx) => {
      (el as HTMLElement).style.transitionDelay = `${idx * 60}ms`;
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [projects, projectsLoading, activeFilter]);

  // GSAP ScrollTrigger Pinned Scrollytelling & Stacking Cards Effect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('.scrolly-section');
      
      sections.forEach((section) => {
        const cards = section.querySelectorAll('.scrolly-card');
        cards.forEach((card, idx) => {
          if (idx < cards.length - 1) {
            const nextCard = cards[idx + 1];
            ScrollTrigger.create({
              trigger: nextCard,
              start: "top 90%",
              end: "top 25%",
              scrub: 0.5,
              onUpdate: (self: any) => {
                const progress = self.progress;
                const scale = 1 - progress * 0.08; // clear 3D scale down
                const opacity = 1 - progress * 0.55; // smooth fade into background
                const brightness = 1 - progress * 0.45; // subtle dim
                gsap.set(card, {
                  scale: scale,
                  opacity: opacity,
                  filter: `brightness(${brightness}) blur(${progress * 1.5}px)`,
                  transformOrigin: "center top"
                });
              }
            });
          }
        });
      });

      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, [projects, projectsLoading, activeFilter]);

  const majorProjects = projects.filter(p => p.category === "major");
  const freelanceProjects = projects.filter(p => p.category === "freelance");

  const getCounts = () => {
    return devopstrioCloudProjects.length + majorProjects.length + freelanceProjects.length;
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-brand selection:text-white relative bg-grid-pattern pb-24 overflow-clip">
      
      {/* Background Ambient Glows */}
      <div className="glow-sphere w-[550px] h-[550px] bg-brand/10 top-[-150px] left-[15%]"></div>
      <div className="glow-sphere w-[450px] h-[450px] bg-sky-500/5 bottom-[20%] right-[-5%]"></div>
      <div className="glow-sphere w-[350px] h-[350px] bg-brand/5 top-[40%] left-[-8%]"></div>

      {/* Header */}
      <header className="bg-black/70 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-heading text-xl font-bold tracking-tight text-white hover:text-brand transition-colors">
            SERMARAJA<span className="text-brand">.V</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="/" className="text-zinc-400 hover:text-white transition-colors">Home</a>
            <a href="/#about" className="text-zinc-400 hover:text-white transition-colors">About</a>
            <a href="/#skills" className="text-zinc-400 hover:text-white transition-colors">Skills</a>
            <a href="/#experience" className="text-zinc-400 hover:text-white transition-colors">Experience</a>
            <a href="/#projects" className="text-zinc-400 hover:text-white transition-colors">Projects</a>
            <a href="/#education" className="text-zinc-400 hover:text-white transition-colors">Timeline</a>
            <a href="/#contact" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zinc-950/95 border-b border-zinc-900 py-4 px-6 flex flex-col space-y-4 animate-fadeIn">
            <a onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-zinc-400 hover:text-white transition-colors py-1">Home</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#about" className="text-zinc-400 hover:text-white transition-colors py-1">About</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#skills" className="text-zinc-400 hover:text-white transition-colors py-1">Skills</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#experience" className="text-zinc-400 hover:text-white transition-colors py-1">Experience</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#projects" className="text-zinc-400 hover:text-white transition-colors py-1">Projects</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#education" className="text-zinc-400 hover:text-white transition-colors py-1">Timeline</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#contact" className="text-zinc-400 hover:text-white transition-colors py-1">Contact</a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main ref={mainRef} className="max-w-6xl mx-auto px-6 pt-16">
        
        {/* Page Hero Header */}
        <div className="text-center mb-20 select-none relative z-10 reveal-item">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold text-zinc-400 mb-6 tracking-wider uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
            {!projectsLoading ? `${getCounts()} Projects Completed` : "Loading Projects..."}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-5 text-white">
            All My <span className="text-pink-magenta-gradient">Works</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            A comprehensive showcase of professional work, major projects, and freelance engagements across cloud engineering, web development, and more.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand/40"></div>
            <div className="w-2 h-2 rounded-full bg-brand/60"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand/40"></div>
          </div>
        </div>

        {/* Category Filters with animation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10 reveal-item">
          {(["all", "devopstrio", "major", "freelance"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-lg font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-400 cursor-pointer ${
                activeFilter === cat
                  ? "bg-brand text-white shadow-lg shadow-brand/20 scale-[1.03]"
                  : "bg-zinc-950 text-zinc-500 border border-zinc-900 hover:border-brand/30 hover:text-zinc-300 hover:scale-[1.02]"
              }`}
            >
              {cat === "all" && "All Works"}
              {cat === "devopstrio" && "Work @ Devopstrio"}
              {cat === "major" && "Major Projects"}
              {cat === "freelance" && "Freelance Work"}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DEVOPSTRIO CLOUD ENGINEERING PROJECTS                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "devopstrio") && (
          <div className="mb-20 relative z-10 animate-fadeIn">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8 reveal-item">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-xl shrink-0 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                ☁️
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Work @ Devopstrio</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Cloud Engineering & Infrastructure Projects</p>
              </div>
              <div className="ml-auto hidden sm:block">
                <span className="px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-wider">
                  {devopstrioCloudProjects.length} Projects
                </span>
              </div>
            </div>

            {/* NDA Confidentiality Disclaimer */}
            <div className="mb-8 p-5 rounded-xl border border-sky-500/20 bg-sky-950/20 backdrop-blur-md text-left max-w-4xl mx-auto relative overflow-hidden shadow-lg reveal-item">
              <div className="flex items-start gap-3">
                <span className="text-sky-400 text-lg shrink-0 mt-0.5">ℹ️</span>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                  The projects featured in this section were completed as part of my professional role at <strong className="text-white font-semibold">Devopstrio Ltd.</strong> To respect client confidentiality and non-disclosure agreements (NDAs), certain client names, project titles, and implementation details have been anonymized or generalized. The responsibilities, technologies, and technical contributions accurately represent my work and experience.
                </p>
              </div>
            </div>

            {/* Sub-tab Controls */}
            <div className="flex justify-center gap-3 mb-10 reveal-item">
              <button
                onClick={() => setActiveDevopstrioTab("cloud")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeDevopstrioTab === "cloud"
                    ? "bg-gradient-to-r from-sky-500/20 to-blue-600/20 border border-sky-500/40 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                    : "bg-zinc-900/40 border border-zinc-800/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <span className="text-base">☁️</span>
                Cloud Engineering
              </button>
              <button
                onClick={() => setActiveDevopstrioTab("docs")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeDevopstrioTab === "docs"
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : "bg-zinc-900/40 border border-zinc-800/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <span className="text-base">📄</span>
                Technical Documentation
              </button>
            </div>

            {/* Cloud Project Cards — Pinned Scrollytelling Deck */}
            {activeDevopstrioTab === "cloud" && (
              <div className="scrolly-section space-y-12 relative pb-16 animate-fadeIn">
              {devopstrioCloudProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="scrolly-card group sticky grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl bg-[#090D14] border border-sky-950/80 hover:border-sky-500/40 transition-colors duration-500 overflow-hidden backdrop-blur-xl relative shadow-[0_20px_50px_rgba(0,0,0,0.9)] reveal-item will-change-transform"
                  style={{
                    top: `calc(6.5rem + ${idx * 1.25}rem)`,
                    zIndex: idx + 10,
                  }}
                >
                  {/* Left side: Project Image */}
                  <div className="lg:col-span-5 relative overflow-hidden aspect-video lg:aspect-auto min-h-[220px] sm:min-h-[260px] lg:min-h-[380px] p-4 sm:p-5 flex flex-col justify-between">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-[#090D14] hidden lg:block z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-transparent to-black/30 z-0"></div>
                    
                    {/* Top Badges */}
                    <div className="relative z-10 flex flex-col items-start gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#C50248] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                        {project.label}
                      </span>
                      <span className="px-3.5 py-1 rounded-full bg-[#00C896] text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        {project.status}
                      </span>
                    </div>

                    {/* Project number badge */}
                    <div className="relative z-10">
                      <span className="text-6xl lg:text-7xl font-heading font-black text-white/15 select-none pointer-events-none leading-none">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Project Details */}
                  <div className="lg:col-span-7 p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-6 z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">DEVOPSTRIO • CLOUD ENGINEERING</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-sky-400 group-hover:text-cyan-300 transition-colors duration-300 leading-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        {project.overview}
                      </p>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-heading flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        KEY RESPONSIBILITIES
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {project.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                            <span className="text-emerald-400 shrink-0 mt-0.5 font-bold">✓</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies & Tags */}
                    <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-heading mr-1">TECHNOLOGIES</span>
                        {project.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-700/60 text-sky-300 text-xs font-medium hover:bg-sky-900/60 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-500 text-[10px] font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Technical Documentation */}
            {activeDevopstrioTab === "docs" && (
              <div className="animate-fadeIn">
                <div className="text-center py-20 px-6 rounded-2xl border border-zinc-900/80 bg-zinc-950/40 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-3xl mx-auto mb-6">
                    📄
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3">Technical Documentation</h3>
                  <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                    Technical documentation projects and contributions will be showcased here soon.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    Coming Soon
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* MAJOR PROJECTS                                             */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "major") && !projectsLoading && majorProjects.length > 0 && (
          <div className="mb-20 relative z-10 animate-fadeIn">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10 reveal-item">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand text-xl shrink-0 shadow-[0_0_20px_rgba(197,2,72,0.1)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Major Projects</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Academic & personal development projects</p>
              </div>
              <div className="ml-auto hidden sm:block">
                <span className="px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-wider">
                  {majorProjects.length} Projects
                </span>
              </div>
            </div>

            <div className="scrolly-section space-y-12 relative pb-16">
              {majorProjects.map((project, idx) => (
                <div 
                  key={project._id || idx}
                  className="scrolly-card group sticky grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl bg-[#090D14] border border-sky-950/80 hover:border-sky-500/40 transition-colors duration-500 overflow-hidden backdrop-blur-xl relative shadow-[0_20px_50px_rgba(0,0,0,0.9)] reveal-item will-change-transform"
                  style={{
                    top: `calc(6.5rem + ${idx * 1.25}rem)`,
                    zIndex: idx + 10,
                  }}
                >
                  {/* Left side: Project Image */}
                  <div className="lg:col-span-5 relative overflow-hidden aspect-video lg:aspect-auto min-h-[220px] sm:min-h-[260px] lg:min-h-[380px] p-4 sm:p-5 flex flex-col justify-between">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-[#090D14] hidden lg:block z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-transparent to-black/30 z-0"></div>
                    
                    {/* Top Badges */}
                    <div className="relative z-10 flex flex-col items-start gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#C50248] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                        {project.label || "MAJOR PROJECT"}
                      </span>
                      <span className="px-3.5 py-1 rounded-full bg-[#00C896] text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        {project.status || "COMPLETED"}
                      </span>
                    </div>

                    {/* Project number badge */}
                    <div className="relative z-10">
                      <span className="text-6xl lg:text-7xl font-heading font-black text-white/15 select-none pointer-events-none leading-none">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Project Details */}
                  <div className="lg:col-span-7 p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-6 z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">PORTFOLIO • MAJOR PROJECT</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-sky-400 group-hover:text-cyan-300 transition-colors duration-300 leading-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Accomplishments */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-heading flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        KEY ACCOMPLISHMENTS
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {project.features?.map((feat: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                            <span className="text-emerald-400 shrink-0 mt-0.5 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies & Tags */}
                    <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-heading mr-1">TECHNOLOGIES</span>
                        {project.technologies?.map((tech: string, tIdx: number) => (
                          <span key={tIdx} className="px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-700/60 text-sky-300 text-xs font-medium hover:bg-sky-900/60 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags?.map((tag: string, tIdx: number) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-500 text-[10px] font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sky-400 hover:text-cyan-300 font-bold text-xs hover:underline transition-colors"
                          >
                            Source Code ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FREELANCE PROJECTS                                         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "freelance") && !projectsLoading && freelanceProjects.length > 0 && (
          <div className="mb-20 relative z-10 animate-fadeIn">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10 reveal-item">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Freelance Work</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Client projects & professional engagements</p>
              </div>
              <div className="ml-auto hidden sm:block">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  {freelanceProjects.length} Projects
                </span>
              </div>
            </div>

            <div className="scrolly-section space-y-12 relative pb-16">
              {freelanceProjects.map((project, idx) => (
                <div 
                  key={project._id || idx}
                  className="scrolly-card group sticky grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl bg-[#090D14] border border-sky-950/80 hover:border-sky-500/40 transition-colors duration-500 overflow-hidden backdrop-blur-xl relative shadow-[0_20px_50px_rgba(0,0,0,0.9)] reveal-item will-change-transform"
                  style={{
                    top: `calc(6.5rem + ${idx * 1.25}rem)`,
                    zIndex: idx + 10,
                  }}
                >
                  {/* Left side: Project Image */}
                  <div className="lg:col-span-5 relative overflow-hidden aspect-video lg:aspect-auto min-h-[220px] sm:min-h-[260px] lg:min-h-[380px] p-4 sm:p-5 flex flex-col justify-between">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-[#090D14] hidden lg:block z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-transparent to-black/30 z-0"></div>
                    
                    {/* Top Badges */}
                    <div className="relative z-10 flex flex-col items-start gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#C50248] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                        {project.label || "FREELANCE"}
                      </span>
                      <span className="px-3.5 py-1 rounded-full bg-[#00C896] text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        {project.status || "COMPLETED"}
                      </span>
                    </div>

                    {/* Project number badge */}
                    <div className="relative z-10">
                      <span className="text-6xl lg:text-7xl font-heading font-black text-white/15 select-none pointer-events-none leading-none">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Project Details */}
                  <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6 z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">CLIENT ENGAGEMENT • FREELANCE</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-sky-400 group-hover:text-cyan-300 transition-colors duration-300 leading-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-heading flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        KEY FEATURES
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                        {project.features?.map((feat: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                            <span className="text-emerald-400 shrink-0 mt-0.5 font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies & Tags */}
                    <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-heading mr-1">TECHNOLOGIES</span>
                        {project.technologies?.map((tech: string, tIdx: number) => (
                          <span key={tIdx} className="px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-700/60 text-sky-300 text-xs font-medium hover:bg-sky-900/60 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1 text-xs text-zinc-400">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags?.map((tag: string, tIdx: number) => (
                            <span key={tIdx} className="px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-500 text-[10px] font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {project.client && (
                          <span><strong className="text-zinc-300">Client:</strong> {project.client}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {projectsLoading && (activeFilter === "all" || activeFilter === "major" || activeFilter === "freelance") && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="flex flex-col rounded-2xl bg-zinc-950/40 border border-zinc-900/80 p-6 space-y-4 animate-pulse"
              >
                <div className="aspect-video bg-zinc-900/60 rounded-xl w-full"></div>
                <div className="h-6 bg-zinc-900/60 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-900/60 rounded w-1/2"></div>
                <div className="space-y-2 pt-4">
                  <div className="h-3 bg-zinc-900/60 rounded w-full"></div>
                  <div className="h-3 bg-zinc-900/60 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mb-24 relative z-10 reveal-item">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider bg-zinc-950 border border-zinc-900 hover:border-brand text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back to Home</span>
          </a>
        </div>

        {/* Call To Action */}
        <section className="py-16 px-8 rounded-2xl bg-zinc-950/40 border border-zinc-900/60 backdrop-blur-md text-center max-w-3xl mx-auto relative z-10 overflow-hidden shadow-2xl reveal-item">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(197,2,72,0.1),transparent_70%)] pointer-events-none"></div>
          <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white mb-3">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Have an idea, project, or collaboration in mind? Let&apos;s discuss details and bring your concepts to life.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-heading font-bold text-xs uppercase tracking-wider bg-brand hover:bg-brand/80 text-white shadow-lg hover:shadow-brand/20 transition-all duration-300 hover:scale-105 group"
          >
            Get In Touch
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </section>

      </main>

      {/* Backdrop Grid Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,0,0,0)_10%,#000_90%)] pointer-events-none z-0"></div>
    </div>
  );
}
