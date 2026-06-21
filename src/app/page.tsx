"use client";

import React, { useState, useEffect } from "react";

const roles = [
  "Associate System Engineer",
  "Web Developer",
  "Product Marketing Specialist",
  "Full Stack Developer",
  "UI/UX Designer"
];

function TypingEffect() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          setIsDeleting(true);
          setTypingSpeed(2500); // Hold the completed word for 2.5s
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400); // Pause briefly before starting next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <span className="text-pink-magenta-gradient font-heading font-semibold inline-block border-r-2 border-brand pr-1 select-none">
      {currentText}
      <span className="animate-cursor-blink text-brand ml-0.5">|</span>
    </span>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("technical");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !messageInput) return;
    setFormStatus("sending");
    // Mocking email send to simulate behavior
    setTimeout(() => {
      setFormStatus("success");
      setEmailInput("");
      setMessageInput("");
    }, 1500);
  };

  const handleDownloadCV = () => {
    // Attempt download of resume
    const link = document.createElement("a");
    link.href = "/images/SERMARAJA V_Resume-1.pdf";
    link.download = "Sermaraja_V_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-brand selection:text-white relative bg-grid-pattern">
      
      {/* Decorative Glow Elements */}
      <div className="glow-sphere w-[400px] h-[400px] bg-brand/10 top-[-100px] right-[-50px]"></div>
      <div className="glow-sphere w-[500px] h-[500px] bg-brand/5 bottom-[10%] left-[-100px]"></div>

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-heading text-xl font-bold tracking-tight text-white hover:text-brand transition-colors">
            SERMARAJA<span className="text-brand">.V</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" className="text-zinc-400 hover:text-white transition-colors">About</a>
            <a href="#skills" className="text-zinc-400 hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="text-zinc-400 hover:text-white transition-colors">Experience</a>
            <a href="#education" className="text-zinc-400 hover:text-white transition-colors">Education & Accomplishments</a>
            <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded border border-brand/30 hover:border-brand hover:text-white transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>

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
            <a onClick={() => setIsMobileMenuOpen(false)} href="#about" className="text-zinc-400 hover:text-white transition-colors py-1">About</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#skills" className="text-zinc-400 hover:text-white transition-colors py-1">Skills</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#experience" className="text-zinc-400 hover:text-white transition-colors py-1">Experience</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#education" className="text-zinc-400 hover:text-white transition-colors py-1">Education & Accomplishments</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href="#contact" className="text-zinc-400 hover:text-white transition-colors py-1">Contact</a>
            <a 
              onClick={() => setIsMobileMenuOpen(false)}
              href="#contact" 
              className="inline-block text-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded bg-brand hover:bg-brand/80 text-white transition-all"
            >
              Let's Talk
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
          
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs font-medium text-zinc-400 hover:border-brand/50 transition-all select-none">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
            Available for Opportunities
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-2 font-heading">
            Hello, I'm
          </h3>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight mb-4 text-silver-gradient select-none">
            Sermaraja V
          </h1>

          <div className="text-xl sm:text-3xl md:text-4xl font-heading font-medium tracking-tight mb-8 h-12 flex items-center justify-center">
            <span className="text-zinc-400 mr-2 select-none">I am a</span>
            <TypingEffect />
          </div>

          <p className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 text-center px-4">
            A passionate Web Developer and System Associate with expertise in creating innovative digital solutions. 
            I specialize in building responsive websites and applications with modern technologies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 items-center justify-center w-full max-w-md">
            <a 
              href="#contact" 
              className="w-full sm:w-auto px-8 py-4 rounded font-heading font-semibold text-sm bg-pink-magenta-gradient text-white shadow-lg hover:shadow-brand/10 transition-all duration-300 text-center hover:scale-[1.02]"
            >
              Contact Me
            </a>
            
            <button 
              onClick={handleDownloadCV}
              className="w-full sm:w-auto px-8 py-4 rounded font-heading font-semibold text-sm border border-zinc-700 hover:border-brand text-zinc-300 hover:text-white hover:bg-zinc-950 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download CV
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a 
              href="https://github.com/Sermaraja" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-brand flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
            </a>

            <a 
              href="https://www.linkedin.com/in/sermaraja-v09022005/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-brand flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>

            <a 
              href="mailto:sermarajav.offcl@gmail.com" 
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-brand flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
          </div>

        </div>

        {/* Backdrop Grid Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,0,0,0)_10%,#000_90%)] pointer-events-none z-0"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-silver-gradient mb-4">About Me</h2>
            <div className="h-1 w-20 bg-brand rounded"></div>
            <p className="text-zinc-500 mt-6 text-sm font-medium tracking-wider uppercase font-heading">
              My Journey & Drive
            </p>
          </div>
          <div className="md:col-span-2 space-y-6 text-zinc-400 text-base leading-relaxed">
            <p>
              I am a dedicated and passionate web developer with a strong foundation in computer science. 
              Currently working as a <strong className="text-white">System Associate at Devopstrio</strong>, 
              I bring expertise in both web development and system administration.
            </p>
            <p>
              My journey in technology started with a curiosity about how websites work, which evolved into a passion 
              for creating digital solutions that make a difference. I enjoy turning complex problems into simple, 
              beautiful, and intuitive designs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>Email: sermarajav.offcl@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                <span>Location: Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-silver-gradient mb-4">Core Competencies</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Categorized technical capabilities and achievements
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-4 mb-12">
          {["technical", "system", "accomplishments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded font-heading text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab 
                  ? "bg-brand text-white shadow-md shadow-brand/10" 
                  : "bg-zinc-950 text-zinc-500 border border-zinc-900 hover:border-zinc-800 hover:text-zinc-300"
              }`}
            >
              {tab === "technical" && "Technical Skills"}
              {tab === "system" && "System / Engineering"}
              {tab === "accomplishments" && "Prizes & Recognition"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[250px]">
          {activeTab === "technical" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fadeIn">
              {["HTML5", "CSS3 / Sass", "JavaScript (ES6+)", "React.js", "Next.js", "Git & GitHub", "Tailwind CSS", "Responsive Design"].map((skill) => (
                <div key={skill} className="p-5 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/30 transition-all text-center">
                  <p className="text-sm font-semibold text-white">{skill}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "system" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fadeIn">
              {["System Associate Engineer", "Linux OS", "Server Deployment", "Devopstrio Infrastructure", "IT Hardware Admin", "Networking", "Shell Scripting", "System Security"].map((skill) => (
                <div key={skill} className="p-5 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/30 transition-all text-center">
                  <p className="text-sm font-semibold text-white">{skill}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "accomplishments" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="p-6 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/30 transition-all">
                <div className="inline-block px-3 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold uppercase tracking-wider mb-4">
                  1st Prize
                </div>
                <h4 className="font-heading font-bold text-white mb-2">PPT Presentation (SmartDust)</h4>
                <p className="text-xs text-zinc-500 mb-3">SRNM College, Sattur — 2025</p>
                <p className="text-sm text-zinc-400">
                  Won first place for presenting a research paper on "SmartDust" technology, highlighting micro-electromechanical systems (MEMS).
                </p>
              </div>

              <div className="p-6 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/30 transition-all">
                <div className="inline-block px-3 py-1 rounded bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
                  Competitor Award
                </div>
                <h4 className="font-heading font-bold text-white mb-2">Cyber Security PPT</h4>
                <p className="text-xs text-zinc-500 mb-3">Imperia 2K24, MTNC Madurai</p>
                <p className="text-sm text-zinc-400">
                  Presented advanced concepts, threats, and mitigation strategies on enterprise Cyber Security.
                </p>
              </div>

              <div className="p-6 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/30 transition-all">
                <div className="inline-block px-3 py-1 rounded bg-zinc-400/10 border border-zinc-400/20 text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  2nd Prize
                </div>
                <h4 className="font-heading font-bold text-white mb-2">E-Waste Management Presentation</h4>
                <p className="text-xs text-zinc-500 mb-3">National Level Science Meet</p>
                <p className="text-sm text-zinc-400">
                  Awarded second prize for designing an innovative framework addressing green-computing and recycling.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experience & Timeline Section */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-silver-gradient mb-4">Experience & Timeline</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Professional trajectory and projects
          </p>
        </div>

        <div className="relative timeline-line pl-8 md:pl-0">
          
          {/* Card 1: Devopstrio */}
          <div className="relative md:flex md:justify-between items-start mb-16">
            <div className="hidden md:block w-5/12 text-right pr-8">
              <span className="text-sm font-semibold tracking-wider text-brand font-heading">
                Present
              </span>
              <p className="text-xs text-zinc-500 mt-1">Associate System Engineer</p>
            </div>
            
            <div className="absolute left-[-20px] md:left-1/2 md:translate-x-[-50%] w-10 h-10 rounded-full bg-zinc-950 border-2 border-brand flex items-center justify-center text-brand z-10 font-bold text-sm">
              1
            </div>

            <div className="w-full md:w-5/12 p-6 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/20 transition-all">
              <div className="md:hidden mb-2">
                <span className="text-xs font-bold text-brand uppercase tracking-widest">Present</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">Devopstrio</h3>
              <p className="text-xs font-semibold text-zinc-500 uppercase mb-4 tracking-wider">Associate System Engineer & Web Developer</p>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                  <span>Designed and developed responsive web applications for clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                  <span>Created engaging, interactive, user-friendly UI/UX interfaces.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                  <span>Maintained server configurations, network setups, and systems administration duties.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 max-w-6xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-silver-gradient mb-4">Academic Background</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Formal education history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/20 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-brand uppercase tracking-widest mb-4">
                Undergraduate Degree
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Bachelor of Science (HONORS) – Computer Science
              </h3>
              <p className="text-sm text-zinc-400 mb-6 font-medium">
                G. Venkataswamy Naidu College, Kovilpatti
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Specialized in advanced computer science concepts, programming algorithms, database management systems, and software engineering.
              </p>
            </div>
            <div className="border-t border-zinc-900 mt-8 pt-4 text-xs font-semibold text-zinc-500">
              GRADUATED
            </div>
          </div>

          <div className="p-8 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/20 transition-all flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-brand uppercase tracking-widest mb-4">
                Higher Secondary Certificate
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                HSC - 12th Computer Science
              </h3>
              <p className="text-sm text-zinc-400 mb-6 font-medium">
                Nadar Higher Secondary School, Kovilpatti
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Completed secondary education with core focus on computer science, fundamentals of programming languages, mathematics, and science.
              </p>
            </div>
            <div className="border-t border-zinc-900 mt-8 pt-4 text-xs font-semibold text-zinc-500">
              GRADUATED
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-silver-gradient mb-4">Get In Touch</h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Have an idea or a collaboration in mind? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Direct contact details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-xl font-heading font-bold text-white">Contact Information</h3>
              <p className="text-zinc-400 leading-relaxed">
                Feel free to reach out for any questions, inquiries or project opportunities. I'm always open to discussing new ideas.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Email Address</p>
                    <a href="mailto:sermarajav.offcl@gmail.com" className="text-white hover:text-brand transition-colors">
                      sermarajav.offcl@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Location</p>
                    <p className="text-white">Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-8 mt-8">
              <p className="text-xs text-zinc-500">
                Designed and built by Sermaraja V. 
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 rounded bg-zinc-950 border border-zinc-900 relative">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Your Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com" 
                  required
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                  Message Details
                </label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Tell me about your project or inquiry..." 
                  required
                  className="w-full bg-black border border-zinc-800 rounded px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors text-sm resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={formStatus === "sending"}
                className="w-full py-4 rounded font-heading font-semibold text-sm bg-pink-magenta-gradient text-white hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center cursor-pointer"
              >
                {formStatus === "sending" ? "Sending Details..." : "Send Message"}
              </button>

              {formStatus === "success" && (
                <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm rounded flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                  <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h4 className="font-heading font-bold text-white text-lg mb-1">Message Sent!</h4>
                  <p className="text-zinc-400 text-sm mb-6">
                    Thank you. I'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-2 rounded bg-zinc-900 border border-zinc-800 text-xs font-semibold hover:border-brand transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              )}
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center">
          <div className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Sermaraja V. All rights reserved.
          </div>
          <div className="text-zinc-500 text-xs tracking-wider uppercase font-heading">
            Turning code into meaningful experiences.
          </div>
        </div>
      </footer>

    </div>
  );
}
