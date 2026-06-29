"use client";

import React, { useState, useEffect } from "react";

interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  date: string;
  likes: number;
  views: number;
  commentsCount: number;
  tags: string[];
}

const galleryPosts: GalleryItem[] = [
  {
    id: "post-1",
    image: "/IMG/Awards/Gallery/gallarey post sermaraj 01.png",
    caption: "Extremely honored to receive the Collaboration Champion Award 2025-26 at Devopstrio! Grateful for the support of my team, mentors, and leadership. Continuous knowledge sharing and teamwork drive our collective success.",
    date: "June 2026",
    likes: 24,
    views: 142,
    commentsCount: 8,
    tags: ["#CollaborationChampion", "#Devopstrio", "#EmployeeRecognition", "#TechMentorship"]
  },
  {
    id: "post-2",
    image: "/IMG/Awards/Gallery/gallarey post sermaraj 02.jpg",
    caption: "A memorable moment from the employee award ceremony. Receiving recognition for cross-functional collaboration and technical guidance across enterprise operations.",
    date: "June 2026",
    likes: 31,
    views: 189,
    commentsCount: 12,
    tags: ["#AwardCeremony", "#Leadership", "#Teamwork", "#WorkExcellence"]
  },
  {
    id: "post-3",
    image: "/IMG/Awards/Gallery/gallarey post sermaraj 03.png",
    caption: "Official Certificate of Appreciation presented by Devopstrio Ltd. Dedicated to driving organizational growth and empowering fellow team members every day.",
    date: "June 2026",
    likes: 19,
    views: 128,
    commentsCount: 6,
    tags: ["#CertificateOfAppreciation", "#ProfessionalGrowth", "#SystemAssociate"]
  },
  {
    id: "post-4",
    image: "/IMG/Awards/Gallery/gallarey post sermaraj 04.jpg",
    caption: "Celebrating teamwork and shared milestones with colleagues. Looking forward to achieving higher benchmarks together in the coming year!",
    date: "June 2026",
    likes: 27,
    views: 165,
    commentsCount: 9,
    tags: ["#TeamDevopstrio", "#MilestoneAchieved", "#ContinuousLearning"]
  }
];

export default function AwardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("/IMG/Awards/SERMARAJA EMA CERTIFIVATE.png");
  const [modalTitle, setModalTitle] = useState<string>("Collaboration Champion Award Certificate");

  // Real Persistent State for Visitor Likes, Views & Bookmarks
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<{ [key: string]: boolean }>({});
  const [postLikesCount, setPostLikesCount] = useState<{ [key: string]: number }>({
    "post-1": 24,
    "post-2": 31,
    "post-3": 19,
    "post-4": 27
  });
  const [postViewsCount, setPostViewsCount] = useState<{ [key: string]: number }>({
    "post-1": 142,
    "post-2": 189,
    "post-3": 128,
    "post-4": 165
  });

  // Load Real Visitor Data from localStorage on Mount and Record Page View
  useEffect(() => {
    try {
      // Load saved likes state & counts
      const savedLikes = localStorage.getItem("portfolio_award_post_likes");
      const savedLikedStatus = localStorage.getItem("portfolio_award_post_liked_status");
      const savedViews = localStorage.getItem("portfolio_award_post_views");

      if (savedLikes) {
        setPostLikesCount(JSON.parse(savedLikes));
      }
      if (savedLikedStatus) {
        setLikedPosts(JSON.parse(savedLikedStatus));
      }

      // Handle real visitor views
      let currentViews: Record<string, number> = {
        "post-1": 142,
        "post-2": 189,
        "post-3": 128,
        "post-4": 165
      };

      if (savedViews) {
        currentViews = JSON.parse(savedViews);
      }

      // Record real page visit view increment once per session
      const sessionVisited = sessionStorage.getItem("portfolio_award_page_visited");
      if (!sessionVisited) {
        sessionStorage.setItem("portfolio_award_page_visited", "true");
        Object.keys(currentViews).forEach((key) => {
          currentViews[key] = (currentViews[key] || 0) + 1;
        });
        localStorage.setItem("portfolio_award_post_views", JSON.stringify(currentViews));
      }

      setPostViewsCount(currentViews);
    } catch (e) {
      console.error("Storage access error:", e);
    }
  }, []);

  // Real Visitor Toggle Like with Persistence
  const toggleLike = (postId: string) => {
    setLikedPosts((prevLiked) => {
      const isCurrentlyLiked = !!prevLiked[postId];
      const newLikedState = !isCurrentlyLiked;
      const updatedLiked = { ...prevLiked, [postId]: newLikedState };

      setPostLikesCount((prevCounts) => {
        const newCount = prevCounts[postId] + (newLikedState ? 1 : -1);
        const updatedCounts = { ...prevCounts, [postId]: newCount };
        try {
          localStorage.setItem("portfolio_award_post_likes", JSON.stringify(updatedCounts));
          localStorage.setItem("portfolio_award_post_liked_status", JSON.stringify(updatedLiked));
        } catch (e) {
          console.error(e);
        }
        return updatedCounts;
      });

      return updatedLiked;
    });
  };

  // Toggle Bookmark
  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Open Lightbox and Record Real Post View Click
  const openModal = (imageSrc: string, title: string, postId?: string) => {
    if (postId) {
      setPostViewsCount((prevViews) => {
        const updatedViews = {
          ...prevViews,
          [postId]: (prevViews[postId] || 0) + 1
        };
        try {
          localStorage.setItem("portfolio_award_post_views", JSON.stringify(updatedViews));
        } catch (e) {
          console.error(e);
        }
        return updatedViews;
      });
    }
    setModalImage(imageSrc);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-brand selection:text-white relative bg-grid-pattern pb-24 overflow-x-hidden">
      {/* Background Ambient Glow Spheres */}
      <div className="glow-sphere w-[550px] h-[550px] bg-brand/10 top-[-150px] left-[15%]"></div>
      <div className="glow-sphere w-[450px] h-[450px] bg-brand/5 bottom-[10%] right-[10%]"></div>

      {/* Header Navigation */}
      <header className="bg-black/70 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-heading text-xl font-bold tracking-tight text-white hover:text-brand transition-colors">
            SERMARAJA<span className="text-brand">.V</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-heading font-semibold tracking-wider text-zinc-400 hover:text-white uppercase transition-colors px-4 py-2 rounded bg-zinc-950 border border-zinc-900 hover:border-brand/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        {/* Page Section Header */}
        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="px-3 py-1 rounded bg-brand/10 border border-brand/20 text-brand text-[10px] font-heading font-bold uppercase tracking-wider inline-block mb-3">
              ACHIEVEMENTS & HONORS
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-silver-gradient tracking-tight mb-3">
              Awards & Recognition
            </h1>
            <p className="text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed font-sans">
              Milestones that reflect my commitment to excellence, collaboration, and continuous growth.
            </p>
          </div>

          {/* Top Right Wreath Emblem */}
          <div className="hidden md:flex items-center justify-center relative w-20 h-20 shrink-0 opacity-80">
            <div className="absolute inset-0 rounded-full border border-brand/20 bg-[radial-gradient(circle_at_center,rgba(197,2,72,0.15)_0%,transparent_70%)]"></div>
            <svg className="w-14 h-14 text-brand/90 drop-shadow-[0_0_12px_rgba(197,2,72,0.4)]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="24" r="5" fill="currentColor" />
              <path d="M32 14L34.5 20.5L41 21.5L36 26.5L37.5 33L32 30L26.5 33L28 26.5L23 21.5L29.5 20.5L32 14Z" fill="currentColor" opacity="0.9"/>
              <path d="M18 42C14 38 12 32 13 26C13.5 23 15 20 17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M46 42C50 38 52 32 51 26C50.5 23 49 20 47 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Main Award Showcase Card */}
        <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 md:p-10 shadow-2xl relative backdrop-blur-md overflow-hidden mb-16 hover:border-brand/20 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left Column: Trophy Presentation Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                onClick={() => openModal("/IMG/Awards/sermaraja collabration champion award.png", "Collaboration Champion Award Trophy")}
                className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-black p-6 border border-zinc-800/80 hover:border-brand/40 transition-all duration-500 flex items-center justify-center min-h-[380px] md:min-h-[420px] shadow-2xl group cursor-pointer"
              >
                {/* Backlight Glow */}
                <div className="absolute w-52 h-52 bg-brand/15 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:bg-brand/25 transition-all duration-500"></div>

                {/* Trophy Image */}
                <img 
                  src="/IMG/Awards/sermaraja collabration champion award.png" 
                  alt="Devopstrio Collaboration Champion Award 2025-26" 
                  className="max-h-[360px] w-auto object-contain z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-full bg-brand text-white text-xs font-heading font-semibold uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    View Trophy
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Award Details & Actions */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand/10 border border-brand/20 text-brand text-[10px] font-heading font-bold uppercase tracking-wider mb-3">
                  FEATURED AWARD
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight leading-snug">
                  Collaboration Champion Award
                </h2>

                <div className="text-xl md:text-2xl font-heading font-bold text-brand mt-1">
                  2025 – 26
                </div>

                <div className="flex items-center gap-2.5 text-zinc-400 text-sm md:text-base mt-3.5 font-medium">
                  <svg className="w-5 h-5 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0V5" />
                  </svg>
                  <span>Awarded by <strong className="text-white font-semibold">Devopstrio</strong></span>
                </div>

                <div className="h-px bg-zinc-900 w-full my-6"></div>

                <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-sans font-normal mb-6">
                  Recognized for actively supporting team members through knowledge sharing, technical guidance, and conducting valuable technical and process training sessions.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openModal("/IMG/Awards/SERMARAJA EMA CERTIFIVATE.png", "Collaboration Champion Award Certificate")}
                  className="px-6 py-3 rounded font-heading text-xs font-semibold uppercase tracking-wider text-white bg-brand hover:bg-brand/90 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-brand/10"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Certificate</span>
                </button>

                <a
                  href="/IMG/Awards/SERMARAJA EMA CERTIFIVATE.png"
                  download="Sermaraja_V_Collaboration_Champion_Award_Certificate.png"
                  className="px-6 py-3 rounded font-heading text-xs font-semibold uppercase tracking-wider text-zinc-300 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Certificate</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Grateful for This Milestone Section */}
        <div className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 md:p-10 shadow-2xl relative backdrop-blur-md mb-16">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white flex items-center gap-3">
              <span className="text-brand">💜</span> Grateful for This Milestone
            </h3>
            <p className="text-zinc-500 text-sm md:text-base mt-2 max-w-3xl leading-relaxed font-sans">
              This recognition is more than an award—it is a reminder that every opportunity to learn, share knowledge, and support others contributes to a stronger team and a brighter future.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-900 hover:border-brand/30 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <div>
                <h4 className="text-base font-heading font-bold text-white mb-1">To My Mentors</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  Thank you for your guidance, encouragement, and for inspiring me to continuously improve both personally and professionally.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-900 hover:border-brand/30 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              </div>
              <div>
                <h4 className="text-base font-heading font-bold text-white mb-1">To My Colleagues & Team</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  Thank you for your trust, collaboration, and the opportunity to learn and grow together every day.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-900 hover:border-brand/30 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
              </div>
              <div>
                <h4 className="text-base font-heading font-bold text-white mb-1">To the Leadership Team</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  Thank you for recognizing my contributions and encouraging a culture where teamwork and knowledge sharing are truly valued.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-900 hover:border-brand/30 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0V5"/></svg>
              </div>
              <div>
                <h4 className="text-base font-heading font-bold text-white mb-1">To Devopstrio</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                  Thank you for providing an environment that empowers learning, innovation, collaboration, and professional growth. I am proud to be part of this journey.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20 text-center">
            <div className="text-white font-heading font-bold text-base flex items-center justify-center gap-2 mb-1">
              <span className="text-brand">✨</span> Every milestone is a new beginning.
            </div>
            <p className="text-zinc-400 text-xs font-sans">
              Looking forward to learning more, contributing more, and creating a greater impact.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* INSTAGRAM-STYLE PROFESSIONAL GALLERY SECTION              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="px-3 py-1 rounded bg-brand/10 border border-brand/20 text-brand text-[10px] font-heading font-bold uppercase tracking-wider inline-block mb-2">
                MEDIA HIGHLIGHTS
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white flex items-center gap-3">
                <span>📸</span> Recognition Gallery
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 font-heading bg-zinc-900/60 px-3.5 py-1.5 rounded-full border border-zinc-800">
              <span className="text-zinc-300">@sermaraja_v</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-bold">REAL VISITOR METRICS</span>
            </div>
          </div>

          {/* Instagram Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryPosts.map((post) => {
              const isLiked = !!likedPosts[post.id];
              const isBookmarked = !!bookmarkedPosts[post.id];
              const likesCount = postLikesCount[post.id];
              const viewsCount = postViewsCount[post.id];

              return (
                <div 
                  key={post.id} 
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 group"
                >
                  {/* Instagram Post Header */}
                  <div className="p-4 border-b border-zinc-900/80 flex items-center justify-between bg-zinc-900/40">
                    <div className="flex items-center gap-3">
                      {/* Perfect Instagram Story Ring Avatar Container */}
                      <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-[#C50248] to-purple-600 shrink-0 shadow-md">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black p-[1.5px]">
                          <img 
                            src="/IMG/serma_profile_face.jpg" 
                            alt="Sermaraja V" 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading font-bold text-sm text-white hover:text-brand transition-colors cursor-pointer tracking-tight">
                            sermaraja_v
                          </span>
                          {/* Verified Badge using requested icons8 badge */}
                          <img 
                            src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" 
                            alt="Verified Badge" 
                            className="w-4.5 h-4.5 object-contain inline-block shrink-0 select-none"
                            onError={(e) => {
                              // If image fails, replace with exact SVG checkmark
                              const target = e.target as HTMLElement;
                              target.style.display = 'none';
                              if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'inline-block';
                              }
                            }}
                          />
                          <svg className="w-4 h-4 text-[#0095F6] fill-current shrink-0 hidden" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Devopstrio Ltd. • Employee Honors</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-heading font-semibold text-zinc-400 flex items-center gap-1">
                        <svg className="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        {viewsCount.toLocaleString()} views
                      </span>
                    </div>
                  </div>

                  {/* Instagram Post Image Box */}
                  <div 
                    onClick={() => openModal(post.image, `Gallery Image - ${post.date}`, post.id)}
                    className="relative aspect-square sm:aspect-[4/3] bg-black overflow-hidden cursor-pointer group/img flex items-center justify-center"
                  >
                    <img 
                      src={post.image} 
                      alt={post.caption} 
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="px-4 py-2 rounded-full bg-[#C50248] text-white text-xs font-heading font-semibold uppercase tracking-wider shadow-lg flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                        Tap to View Full Screen
                      </span>
                    </div>
                  </div>

                  {/* Instagram Action Bar & Content */}
                  <div className="p-5 space-y-3 bg-zinc-950">
                    {/* Action Icons Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Perfect Crisp Heart Outline & Solid Fill */}
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 transition-colors cursor-pointer group/heart p-0.5"
                          title={isLiked ? "Unlike" : "Like"}
                        >
                          <svg 
                            className={`w-6 h-6 transition-transform duration-300 group-hover/heart:scale-125 ${
                              isLiked 
                                ? "text-[#C50248] fill-[#C50248] animate-bounce" 
                                : "text-zinc-300 hover:text-[#C50248] fill-none"
                            }`} 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>

                        {/* Comment Icon */}
                        <button className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-0.5" title="Comment">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                        </button>

                        {/* Share Icon */}
                        <button className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-0.5" title="Share">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </div>

                      {/* Bookmark Icon */}
                      <button 
                        onClick={() => toggleBookmark(post.id)}
                        className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-0.5"
                        title={isBookmarked ? "Remove Bookmark" : "Save Post"}
                      >
                        <svg 
                          className={`w-6 h-6 ${isBookmarked ? "text-white fill-white" : "fill-none"}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                    </div>

                    {/* Real Visitor Likes & Views Metrics */}
                    <div className="flex items-center gap-3 font-heading font-bold text-xs">
                      <span className="text-white">{likesCount.toLocaleString()} likes</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400 font-medium">{viewsCount.toLocaleString()} views</span>
                    </div>

                    {/* Caption */}
                    <div className="text-xs text-zinc-300 font-sans leading-relaxed space-y-1.5">
                      <p>
                        <strong className="font-heading font-bold text-white mr-2">sermaraja_v</strong>
                        {post.caption}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[#C50248] text-[11px] font-semibold hover:underline cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Post Date */}
                    <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider pt-1 font-heading">
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Callout Card */}
        <div className="bg-[#0a0612]/90 border border-zinc-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
              Let’s Build Something Great Together
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-sans leading-relaxed pt-1">
              Have an idea, project, or collaboration in mind? Let’s discuss details and bring your concepts to life.
            </p>
            <div className="pt-6">
              <a 
                href="mailto:sermarajav.offcl@gmail.com"
                className="inline-block px-8 py-4 rounded-xl bg-[#C50248] hover:bg-[#a0013a] text-white text-xs font-heading font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(197,2,72,0.4)] transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/60">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-brand/10 border border-brand/20 text-brand text-xs font-heading font-bold uppercase">Media View</span>
                <h4 className="text-base font-heading font-bold text-white">{modalTitle}</h4>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6 flex items-center justify-center bg-black/80 min-h-[400px]">
              <img 
                src={modalImage} 
                alt={modalTitle} 
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex justify-end gap-3">
              <a 
                href={modalImage} 
                download={modalImage.split('/').pop()}
                className="px-5 py-2.5 rounded bg-[#C50248] hover:bg-[#a0013a] text-white text-xs font-heading font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
