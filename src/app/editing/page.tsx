"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function EditingPage() {
  const bgRef = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${sc * 0.3}px)`;
      if (panelRef.current) panelRef.current.style.transform = `translateY(${sc * 0.6}px)`;
      if (axisRef.current) axisRef.current.style.transform = `rotate(${sc * 0.25}deg)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .ed-body { font-family:"Helvetica Neue",Arial,sans-serif; background:#000; overflow-x:hidden; height:200vh; }
        .ed-container { position:relative; width:100vw; height:100vh; overflow:hidden; }
        .ed-bg { position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:1; will-change:transform; }
        .ed-top-nav { position:absolute; top:0; left:0; right:0; padding:20px 40px; display:flex; justify-content:space-between; font-size:11px; color:rgba(255,255,255,0.8); z-index:10; }
        .ed-nav-left,.ed-nav-right { display:flex; gap:30px; letter-spacing:1px; }
        .ed-side-label { position:absolute; writing-mode:vertical-rl; font-size:10px; letter-spacing:2px; color:rgba(255,255,255,0.5); z-index:10; }
        .ed-label-left { left:20px; top:50%; transform:translateY(-50%) rotate(180deg); }
        .ed-label-right { right:20px; bottom:15%; }
        .ed-big-text { position:absolute; top:57%; left:50%; transform:translate(-50%,-50%); font-size:175px; font-weight:900; letter-spacing:-1px; color:#fff; mix-blend-mode:difference; z-index:999; white-space:nowrap; pointer-events:none; }
        .ed-asterisk { position:absolute; top:48%; right:15%; font-size:clamp(50px,8vw,120px); color:rgba(255,255,255,0.3); z-index:6; }
        .ed-glass-panel { position:absolute; top:0; right:0; width:50%; height:100%; background:rgba(255,255,255,0.03); backdrop-filter:blur(20px); border-left:1px solid rgba(255,255,255,0.1); z-index:7; will-change:transform; }
        .ed-border-line { position:absolute; background:rgba(255,255,255,0.25); }
        .ed-line-top { top:0; left:0; right:0; height:1px; }
        .ed-line-bottom { bottom:0; left:0; right:0; height:1px; }
        .ed-line-left { top:0; left:0; bottom:0; width:1px; }
        .ed-gallery { position:absolute; top:20%; left:50%; transform:translateX(-50%); display:flex; gap:15px; z-index:9; }
        .ed-product { width:80px; height:100px; background:rgba(255,255,255,0.9); border-radius:4px; overflow:hidden; display:flex; }
        .ed-product img { width:100%; height:100%; object-fit:cover; }
        .ed-content { position:absolute; bottom:25%; right:8%; width:35%; color:rgba(255,255,255,0.7); z-index:9; }
        .ed-tagline { position:absolute; bottom:22%; right:8%; font-size:10px; letter-spacing:1px; color:rgba(255,255,255,0.6); z-index:9; }
        .ed-bottom { position:absolute; bottom:20px; right:8%; font-size:9px; letter-spacing:1px; color:rgba(255,255,255,0.5); z-index:9; text-align:right; }
        .ed-scanlines { position:absolute; top:0; left:0; width:100%; height:100%; background:repeating-linear-gradient(transparent 0px,transparent 2px,rgba(255,255,255,0.03) 3px); pointer-events:none; mix-blend-mode:difference; z-index:999; }
        .ed-axis { position:absolute; top:45%; right:22%; width:60px; height:60px; z-index:999; opacity:0.6; mix-blend-mode:difference; transform-origin:center; will-change:transform; }
        .ed-axis svg line { stroke:white; stroke-width:2; }
        .ed-vector { position:absolute; z-index:20; opacity:0.45; mix-blend-mode:difference; }
        .ed-vector svg { stroke:white; stroke-width:2; fill:none; }
        .ed-ctl { top:15%; left:5%; width:45px; height:45px; }
        .ed-cbr { bottom:12%; right:10%; width:45px; height:45px; }
        .ed-ticks { top:70%; left:50%; transform:translateX(-50%); width:140px; height:20px; }
        .ed-cross { top:32%; right:30%; width:22px; height:22px; }
        .ed-back { position:absolute; top:2rem; left:2rem; z-index:1000; color:white; }
        @media (max-width: 768px) {
          .ed-top-nav { padding: 15px 20px; justify-content: center; flex-direction: column; gap: 10px; align-items: center; }
          .ed-big-text { font-size: clamp(3rem, 15vw, 6rem); top: 45%; }
          .ed-glass-panel { width: 100%; height: 50%; top: auto; bottom: 0; right: 0; border-left: none; border-top: 1px solid rgba(255,255,255,0.1); }
          .ed-content { width: 85%; left: 50%; transform: translateX(-50%); right: auto; bottom: 22%; text-align: center; }
          .ed-tagline { left: 50%; transform: translateX(-50%); right: auto; bottom: 18%; text-align: center; width: 100%; }
          .ed-bottom { left: 50%; transform: translateX(-50%); right: auto; bottom: 15px; text-align: center; width: 100%; }
          .ed-gallery { top: 12%; width: 90%; flex-wrap: wrap; justify-content: center; gap: 8px; }
          .ed-product { width: 60px; height: 80px; }
          .ed-side-label { display: none; }
          .ed-back { top: 1rem; left: 1rem; }
          .ed-asterisk { right: 5%; top: 35%; font-size: 60px; }
          .ed-axis, .ed-vector { display: none; }
        }
      `}</style>
      <div className="ed-body">
        <div className="ed-container">
          <img ref={bgRef} src="/images/ChatGPT Image Jan 1, 2026, 06_52_49 PM.png" className="ed-bg" alt="" />
          <Link href="/" className="ed-back" aria-label="Back to Home">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
          <div className="ed-top-nav">
            <div className="ed-nav-left"><span>ID_014.BRND</span></div>
            <div className="ed-nav-right"><span>SYS_V1.3/DSP</span></div>
          </div>
          <div className="ed-side-label ed-label-left">BRAND_OPERATIONS_UNIT</div>
          <div className="ed-side-label ed-label-right">VISUAL_IDENTITY_SYSTEM</div>
          <div className="ed-asterisk">*</div>
          <div className="ed-big-text">VENTURES</div>

          <div className="ed-vector ed-ctl"><svg viewBox="0 0 50 50"><polyline points="5,5 5,45 45,45" /></svg></div>
          <div className="ed-vector ed-cbr"><svg viewBox="0 0 50 50"><polyline points="45,5 45,45 5,45" /></svg></div>
          <div className="ed-vector ed-ticks"><svg viewBox="0 0 140 20"><line x1="10" y1="10" x2="130" y2="10" /><line x1="10" y1="5" x2="10" y2="15" /><line x1="50" y1="5" x2="50" y2="15" /><line x1="90" y1="5" x2="90" y2="15" /><line x1="130" y1="5" x2="130" y2="15" /></svg></div>
          <div className="ed-vector ed-cross"><svg viewBox="0 0 20 20"><line x1="10" y1="2" x2="10" y2="18" /><line x1="2" y1="10" x2="18" y2="10" /></svg></div>

          <div className="ed-scanlines" />
          <div ref={axisRef} className="ed-axis">
            <svg viewBox="0 0 100 100"><line x1="10" y1="50" x2="90" y2="50" /><line x1="50" y1="10" x2="50" y2="90" /><line x1="20" y1="20" x2="80" y2="80" /></svg>
          </div>

          <div ref={panelRef} className="ed-glass-panel">
            <div className="ed-border-line ed-line-top" />
            <div className="ed-border-line ed-line-bottom" />
            <div className="ed-border-line ed-line-left" />
          </div>

          <div className="ed-gallery">
            {["ChatGPT Image Jan 1, 2026, 06_52_49 PM.png","ChatGPT Image Jan 1, 2026, 06_56_44 PM.png","ChatGPT Image Jan 1, 2026, 06_59_12 PM.png","ChatGPT Image Jan 1, 2026, 07_04_09 PM.png"].map((img, i) => (
              <div className="ed-product" key={i}><img src={`/images/${img}`} alt="" /></div>
            ))}
          </div>

          <div className="ed-tagline">BRAND LANGUAGE PROTOCOL</div>
          <div className="ed-content">
            <div>IDENTITY FRAMEWORK DIVISION</div>
            <div>Developing scalable identity systems. Engineering form, structure, and brand perception. Creating unified visual architecture.</div>
          </div>
          <div className="ed-bottom">EST. 2025<br />CULTURAL AMPLIFICATION UNIT<br />SYMBOL ENGINEERING OFFICE<br />MODERN BRAND CONSTRUCTION</div>
        </div>
      </div>
    </>
  );
}
