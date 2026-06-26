"use client";

import React, { useState, useEffect, useRef } from "react";

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

  const majorProjects = projects.filter(p => p.category === "major");
  const freelanceProjects = projects.filter(p => p.category === "freelance");

  const getCounts = () => {
    return devopstrioCloudProjects.length + majorProjects.length + freelanceProjects.length;
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-brand selection:text-white relative bg-grid-pattern pb-24 overflow-x-hidden">
      
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
            <div className="flex items-center gap-4 mb-10 reveal-item">
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

            {/* Cloud Project Cards — Full-width with Image */}
            <div className="space-y-8">
              {devopstrioCloudProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl bg-zinc-950/50 border border-zinc-900/80 hover:border-sky-500/25 transition-all duration-600 overflow-hidden backdrop-blur-sm relative hover:shadow-[0_8px_40px_rgba(14,165,233,0.08)] reveal-item"
                >
                  {/* Ambient glow on hover */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-sky-500/0 group-hover:bg-sky-500/5 rounded-full filter blur-[80px] transition-all duration-700 pointer-events-none"></div>

                  {/* Left side: Project Image */}
                  <div className="lg:col-span-5 relative overflow-hidden aspect-video lg:aspect-auto">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-out"
                    />
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/90 hidden lg:block"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-overlay`}></div>
                    
                    {/* Badges on Image */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-brand/90 border border-brand/40 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                        {project.label}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/90 border border-emerald-400/40 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                        {project.status}
                      </span>
                    </div>

                    {/* Project number badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="text-5xl font-heading font-black text-white/10 select-none leading-none">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Project Details */}
                  <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-center space-y-5">
                    {/* Title & Overview */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Devopstrio • Cloud Engineering</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-sky-400 transition-colors duration-300 leading-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {project.overview}
                      </p>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-heading flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Responsibilities
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {project.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-sm text-zinc-300">
                            <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies & Tags */}
                    <div className="space-y-3 pt-2 border-t border-zinc-900/80">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 font-heading mr-1">Technologies</span>
                        {project.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-semibold transition-colors duration-300 hover:bg-sky-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-zinc-900/80 text-zinc-500 text-[9px] font-medium border border-zinc-800/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {majorProjects.map((project, idx) => (
                <div 
                  key={project._id || idx}
                  className="group flex flex-col justify-between rounded-2xl bg-zinc-950/40 border border-zinc-900/80 hover:border-brand/30 hover:shadow-[0_8px_40px_rgba(197,2,72,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-sm reveal-item"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-video overflow-hidden border-b border-zinc-900">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-brand/80 border border-brand/40 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                          {project.label}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/80 border border-emerald-400/40 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                          {project.duration}
                        </span>
                        <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand transition-colors duration-300 leading-snug">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-3">
                        {project.description}
                      </p>

                      {/* Features list */}
                      <div className="space-y-1.5 pt-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-heading">Key Accomplishments</h4>
                        <ul className="space-y-1">
                          {project.features?.slice(0, 3).map((feat: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                              <span className="text-emerald-500 shrink-0">✓</span>
                              <span className="line-clamp-2">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom tech stack */}
                  <div className="p-6 pt-0 space-y-4">
                    <div className="space-y-1.5 border-t border-zinc-900 pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies?.map((tech: string, tIdx: number) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-brand/10 border border-brand/20 text-brand text-[10px] font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tags?.map((tag: string, tIdx: number) => (
                          <span key={tIdx} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 text-[8px] font-medium border border-zinc-900/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.link && (
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-zinc-600 font-medium">Code Repository</span>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-0.5 text-brand hover:text-brand-light font-bold hover:underline transition-colors"
                        >
                          Source Code ↗
                        </a>
                      </div>
                    )}
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

            <div className="space-y-8">
              {freelanceProjects.map((project, idx) => (
                <div 
                  key={project._id || idx}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-0 bg-zinc-950/50 border border-zinc-900/80 rounded-2xl overflow-hidden backdrop-blur-md relative hover:border-emerald-500/20 transition-all duration-600 hover:shadow-[0_8px_40px_rgba(16,185,129,0.08)] reveal-item"
                >
                  {/* Visual Glow */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/0 group-hover:bg-emerald-500/5 rounded-full filter blur-[80px] transition-all duration-700 pointer-events-none"></div>

                  {/* Left side: Project Image */}
                  <div className="lg:col-span-5 relative overflow-hidden aspect-video lg:aspect-auto">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/90 hidden lg:block"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                    
                    {/* Badges on Image */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-brand/90 border border-brand/40 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                        {project.label}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/90 border border-emerald-400/40 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Right side: Project Details */}
                  <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-center space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 self-start shrink-0">
                        {project.duration}
                      </span>
                    </div>
                    
                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-heading flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {project.features?.map((feat: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2 text-sm text-zinc-300">
                            <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-zinc-900/80">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 font-heading mr-1">Technologies</span>
                        {project.technologies?.map((tech: string, tIdx: number) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold hover:bg-emerald-500/20 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.map((tag: string, tIdx: number) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-zinc-900/80 text-zinc-500 text-[9px] font-medium border border-zinc-800/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.client && (
                      <div className="border-t border-zinc-900 pt-4 flex items-center justify-between text-xs text-zinc-500">
                        <span><strong className="text-zinc-400">Client:</strong> {project.client}</span>
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-brand hover:text-brand-light font-bold hover:underline transition-colors group/link"
                          >
                            View Project 
                            <svg className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
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
