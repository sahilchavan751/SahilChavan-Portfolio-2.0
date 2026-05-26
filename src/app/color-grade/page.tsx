"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function ColorGradePage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bg = bgRef.current;
    if (!overlay) return;

    overlay.style.transform = "translateY(10px)";
    overlay.style.opacity = "0";
    overlay.style.transition = "transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease-out";

    requestAnimationFrame(() => {
      overlay.style.transform = "translateY(0)";
      overlay.style.opacity = "1";
    });

    const onScroll = () => {
      const scrollY = window.scrollY;
      if (bg) bg.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (overlay) {
        overlay.style.transform = `translateY(${scrollY * 0.35}px)`;
        overlay.style.opacity = String(Math.max(0, 1 - scrollY / 600));
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .cg-body { height:200vh; overflow-x:hidden; }
        .cg-hero { position:relative; height:100vh; overflow:hidden; }
        .cg-hero-bg, .cg-hero-overlay { position:absolute; inset:0; background-size:cover; background-position:center; background-repeat:no-repeat; will-change:transform,opacity; }
        .cg-hero-bg { background-image:url("/images/page with bg.png"); z-index:1; }
        .cg-hero-overlay { background-image:url("/images/PAGE.png"); z-index:2; pointer-events:none; }
        .cg-nav { position:absolute; top:0; left:0; width:100%; padding:3rem; display:flex; justify-content:flex-start; padding-left:12%; gap:3rem; z-index:10; }
        .cg-nav-btn { background:none; border:none; font-size:0.81rem; color:#ffe600; font-family:Helvetica,sans-serif; text-transform:uppercase; font-weight:700; cursor:pointer; letter-spacing:1px; opacity:0; animation:cgNavFade 1s 1s forwards; }
        .cg-back { position:absolute; top:2rem; left:2rem; z-index:20; color:white; }
        @keyframes cgNavFade { to{opacity:1;} }
      `}</style>
      <div className="cg-body">
        <div className="cg-hero">
          <div ref={bgRef} className="cg-hero-bg" />
          <div ref={overlayRef} className="cg-hero-overlay" />
          <Link href="/" className="cg-back" aria-label="Back to Home">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
          <nav className="cg-nav">
            <button className="cg-nav-btn">Home</button>
            <button className="cg-nav-btn">Archive</button>
            <button className="cg-nav-btn">Shop</button>
          </nav>
        </div>
      </div>
    </>
  );
}
