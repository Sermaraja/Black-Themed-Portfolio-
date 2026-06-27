"use client";

import React, { useState } from "react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
  category: "development" | "engineering" | "business" | "writing" | "ai" | "achievement";
  credentialId: string;
  skills: string[];
  description: string;
  date: string;
}

const certifications: Certificate[] = [
  {
    id: "cert-1",
    title: "Web Development Using React.js",
    issuer: "NoviTech R&D Private Limited",
    image: "/IMG/Certificates/Sermaraja Certificate 001.jpg",
    category: "development",
    credentialId: "Novi-React-2025-092",
    date: "January 2025",
    skills: ["ReactJS", "Hooks API", "State Management", "Component Architecture"],
    description: "Certified proficiency in modern React.js web development. Project work demonstrated building single-page applications, dynamic state flows, and custom modular component creation."
  },
  {
    id: "cert-2",
    title: "Introduction to MongoDB for Students",
    issuer: "MongoDB University",
    image: "/IMG/Certificates/Sermaraja-Certificate-002.jpg",
    category: "development",
    credentialId: "MDB-STU-8827-01",
    date: "December 2024",
    skills: ["MongoDB Database", "NoSQL Schema", "CRUD Operations", "Aggregation Framework"],
    description: "Introductory developer training covering Document Model schemas, querying, document validation, indexing, and pipeline aggregation in MongoDB database environments."
  },
  {
    id: "cert-3",
    title: "Full Stack Development Internship",
    issuer: "NoviTech R&D Private Limited",
    image: "/IMG/Certificates/Sermaraja V-Certificate-FSD-001.jpg",
    category: "development",
    credentialId: "Novi-FSD-2024-345",
    date: "January 2024",
    skills: ["Full Stack", "MERN Stack", "NodeJS REST APIs", "Database Integration"],
    description: "A comprehensive developer program implementing full-stack web architectures. Built and deployed responsive frontends connected to secure NodeJS backends and databases."
  },
  {
    id: "cert-4",
    title: "Python Mastery",
    issuer: "Udemy Professional Training",
    image: "/IMG/Certificates/Sermaraja V-Certificate-Udemy-001.jpg",
    category: "engineering",
    credentialId: "UDM-PY-9201-998",
    date: "August 2024",
    skills: ["Python 3", "Object-Oriented Programming", "Automation Scripts", "Data Structures"],
    description: "Complete Python core logic training. Focuses on object-oriented structures, algorithms, automated scripting routines, database connection adapters, and coding best practices."
  },
  {
    id: "cert-5",
    title: "Communication Skills: Be a Star Presenter",
    issuer: "Udemy Business",
    image: "/IMG/Certificates/Sermaraja V-Certificate-Udemy-002.jpg",
    category: "business",
    credentialId: "UDM-CS-4411-209",
    date: "May 2024",
    skills: ["Public Speaking", "PPT Presentation Design", "Panel Moderation", "Professional Communication"],
    description: "Professional coaching program focused on public presentation engineering. Explores speech delivery mechanics, slide styling, storytelling structures, and executive discussions."
  },
  {
    id: "cert-6",
    title: "Publication Certificate",
    issuer: "Yaappu Publishing House",
    image: "/IMG/Certificates/Sermaraja V-Certificate-Yappu-002.jpg",
    category: "writing",
    credentialId: "YPP-PUB-AUTH-2025",
    date: "February 2025",
    skills: ["Anthology Drafting", "Creative Writing", "Technical Reviewing", "Editing"],
    description: "Certified co-authorship recognition for contribution to the anthology. Verified editing, writing execution, and publication coordination."
  },
  {
    id: "cert-7",
    title: "Web Development Internship",
    issuer: "Soft Stor Technology Solutions",
    image: "/IMG/Certificates/Sermaraja V-Certificate-Internship-001.png",
    category: "development",
    credentialId: "SFT-INT-2024-811",
    date: "May 2024",
    skills: ["Frontend Development", "Responsive Layouts", "UI/UX Mockups", "Quality Testing"],
    description: "Collaborated in development sprints building clean responsive layout interfaces, performing component modular testing, and translating design wireframes into optimized code."
  },
  {
    id: "cert-8",
    title: "Digital Marketing for Beginners",
    issuer: "Udemy Professional Training",
    image: "/IMG/Certificates/Sermaraja V-Certificate-Udemy-003.jpg",
    category: "business",
    credentialId: "UDM-DM-7809-544",
    date: "July 2024",
    skills: ["SEO Metrics", "Brand Marketing", "Google Analytics", "Marketing Funnels"],
    description: "Foundational training in search optimization metrics, marketing funnel structures, digital brand distribution, and analytics-driven conversion tracking."
  },
  {
    id: "cert-9",
    title: "Collaboration Champion Award – Devopstrio Employee Recognition 2026",
    issuer: "Devopstrio Ltd.",
    image: "/IMG/Certificates/SERMARAJA EMA CERTIFIVATE.png",
    category: "achievement",
    credentialId: "DEVOPS-COA-2026-002",
    date: "June 2026",
    skills: ["Team Collaboration", "Cross-functional Collaboration", "Technical Mentorship", "Knowledge Sharing", "Leadership", "Communication", "Team Building", "Problem Solving", "Process Improvement", "Organizational Contribution"],
    description: "Recognized with the Collaboration Champion Award by Devopstrio Ltd. for demonstrating exceptional teamwork, cross-functional collaboration, technical knowledge sharing, mentorship, and continuous support to colleagues. This award acknowledges outstanding contributions toward fostering a collaborative workplace culture, improving team productivity, and driving organizational excellence through leadership and effective communication."
  },
  {
    id: "cert-10",
    title: "AI Skills Fest 2026",
    issuer: "AI Skills Fest",
    image: "/IMG/Certificates/ai-skills-fest-2026.png",
    category: "ai",
    credentialId: "AISF-2026-SV",
    date: "June 2026",
    skills: ["Artificial Intelligence", "Machine Learning", "AI Applications", "Prompt Engineering"],
    description: "Certification earned at the AI Skills Fest 2026, demonstrating proficiency in modern AI technologies, machine learning concepts, and practical AI application development."
  }
];

export default function CertificationsPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [filterCategory, setFilterCategory] = useState<"all" | "development" | "engineering" | "business" | "writing" | "ai" | "achievement">("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredCertifications = certifications.filter(
    (cert) => filterCategory === "all" || cert.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-brand selection:text-white relative bg-grid-pattern pb-24 overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="glow-sphere w-[550px] h-[550px] bg-brand/10 top-[-150px] left-[15%]"></div>
      <div className="glow-sphere w-[450px] h-[450px] bg-brand/5 bottom-[10%] right-[10%]"></div>

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
          <div className="md:hidden bg-zinc-950/95 border-b border-zinc-900 py-4 px-6 flex flex-col space-y-4">
            <a onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-zinc-400 hover:text-white transition-colors py-1">Home</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#about" className="text-zinc-400 hover:text-white transition-colors py-1">About</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#skills" className="text-zinc-400 hover:text-white transition-colors py-1">Skills</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#experience" className="text-zinc-400 hover:text-white transition-colors py-1">Experience</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#education" className="text-zinc-400 hover:text-white transition-colors py-1">Timeline</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="/#contact" className="text-zinc-400 hover:text-white transition-colors py-1">Contact</a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-16">
        
        {/* Page Hero Header */}
        <div className="text-center mb-16 select-none relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold text-zinc-400 mb-4 tracking-wider uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
            10 Professional Credentials Verified
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-4 text-white">
            Exhibition of <span className="text-brand">Credentials</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto leading-relaxed">
            A comprehensive vault of verified courses, specializations, and professional internships representing technical skillsets.
          </p>
          <div className="h-0.5 w-32 bg-brand/50 mx-auto rounded mt-6"></div>
        </div>

        {/* Dynamic Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
          {(["all", "development", "engineering", "business", "writing", "ai", "achievement"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2.5 rounded-lg font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filterCategory === cat
                  ? "bg-brand text-white shadow-lg shadow-brand/20 scale-102"
                  : "bg-zinc-950 text-zinc-500 border border-zinc-900 hover:border-brand/30 hover:text-zinc-300"
              }`}
            >
              {cat === "all" && "All Credentials"}
              {cat === "development" && "Software Development"}
              {cat === "engineering" && "Programming & Systems"}
              {cat === "business" && "Marketing & Presentations"}
              {cat === "writing" && "Publications"}
              {cat === "ai" && "AI & Machine Learning"}
              {cat === "achievement" && "Achievements"}
            </button>
          ))}
        </div>

        {/* Certifications Unique Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 relative z-10">
          {filteredCertifications.map((cert) => (
            <div 
              key={cert.id}
              onClick={() => setSelectedCertificate(cert)}
              className="glass-card rounded-xl p-5 flex flex-col justify-between cursor-pointer hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top grid lines decor */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand/40 to-transparent"></div>

              <div>
                {/* Image frame (Strictly 4:3 Aspect-ratio and Contain fit to avoid stretching) */}
                <div className="w-full aspect-[4/3] relative overflow-hidden rounded-lg border border-zinc-900 bg-zinc-950 flex items-center justify-center p-2 mb-5">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    loading="lazy"
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px] gap-2">
                    <span className="px-4 py-2 rounded-full bg-brand text-white text-[11px] font-semibold uppercase tracking-wider scale-90 group-hover:scale-100 transition-transform shadow-lg">
                      Open Credential
                    </span>
                    <span className="text-[10px] text-zinc-400">ID: {cert.credentialId}</span>
                  </div>
                </div>

                {/* Badge Row */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[9px] font-extrabold tracking-widest text-brand uppercase bg-brand/5 px-2 py-0.5 rounded border border-brand/10">
                    VERIFIED
                  </span>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {cert.date}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-base font-bold text-white group-hover:text-brand transition-colors leading-snug mb-1 font-heading">
                  {cert.title}
                </h3>
                <p className="text-xs text-zinc-400 font-semibold mb-4">{cert.issuer}</p>

                {/* Core Verified Topics */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {cert.skills.slice(0, 3).map((skill, sIdx) => (
                    <span key={sIdx} className="text-[10px] text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-900">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-[10px] text-brand bg-zinc-900/50 px-2 py-1 rounded border border-zinc-900">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="border-t border-zinc-900/60 mt-6 pt-4 flex items-center justify-between text-xs text-zinc-500 font-medium group-hover:text-brand transition-colors">
                <span>View Full Details</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mb-24 relative z-10">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider bg-zinc-950 border border-zinc-900 hover:border-brand text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back to Home</span>
          </a>
        </div>

        {/* Call To Action */}
        <section className="py-16 px-8 rounded-2xl bg-zinc-950/40 border border-zinc-900/60 backdrop-blur-md text-center max-w-3xl mx-auto relative z-10 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(197,2,72,0.1),transparent_70%)] pointer-events-none"></div>
          <h2 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white mb-3">
            Let's Build Something Great Together
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Have an idea, project, or collaboration in mind? Let's discuss details and bring your concepts to life.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 rounded-lg font-heading font-bold text-xs uppercase tracking-wider bg-brand hover:bg-brand/80 text-white shadow-lg hover:shadow-brand/20 transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </a>
        </section>

      </main>

      {/* Unique Detail split-screen Modal Viewer */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-30 text-zinc-400 hover:text-white text-3xl font-light focus:outline-none w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/80 rounded-full transition-colors"
              onClick={() => setSelectedCertificate(null)}
            >
              &times;
            </button>

            {/* Left side: Certificate Image view */}
            <div className="w-full md:w-7/12 bg-zinc-950 p-4 md:p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-zinc-900/60 max-h-[40vh] md:max-h-[85vh]">
              <div className="w-full h-full flex items-center justify-center relative rounded overflow-hidden">
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.title} 
                  className="max-w-full max-h-[35vh] md:max-h-[70vh] object-contain rounded border border-zinc-900/80 shadow-2xl"
                />
              </div>
            </div>

            {/* Right side: Detailed Information panel */}
            <div className="w-full md:w-5/12 p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] bg-zinc-950/20 backdrop-blur-md relative">
              {/* Radial gradient background accent in sidebar */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(197,2,72,0.06),transparent_60%)] pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-extrabold tracking-widest text-green-500 uppercase bg-green-500/5 px-2 py-0.5 rounded border border-green-500/10">
                      Active & Verified
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-heading font-black text-white leading-tight mb-2">
                    {selectedCertificate.title}
                  </h2>
                  <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">{selectedCertificate.issuer}</p>
                </div>

                <div className="border-t border-zinc-900/60 pt-4 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5">Description</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5">Verification Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-zinc-400">
                      <div>
                        <span className="block text-[10px] text-zinc-600 uppercase font-medium">Date Issued</span>
                        <span className="text-zinc-300">{selectedCertificate.date}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-zinc-600 uppercase font-medium">Credential ID</span>
                        <span className="text-zinc-300 font-mono truncate block max-w-full">{selectedCertificate.credentialId}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">Verified Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCertificate.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 border-t border-zinc-900/60 pt-6 mt-8 flex flex-col gap-2">
                <a 
                  href={selectedCertificate.image}
                  download
                  className="w-full py-3 rounded-lg font-heading font-bold text-xs uppercase tracking-wider bg-brand hover:bg-brand/80 text-white text-center transition-all flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop Grid Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,0,0,0)_10%,#000_90%)] pointer-events-none z-0"></div>
    </div>
  );
}
