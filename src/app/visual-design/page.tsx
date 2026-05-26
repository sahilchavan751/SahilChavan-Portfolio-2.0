"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function VisualDesignPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const folders = document.querySelectorAll<HTMLDivElement>(".vd-folder");

    const controllers: { stop: () => void }[] = [];

    folders.forEach((folder) => {
      let isInteracting = false;
      const speed = parseFloat(folder.getAttribute("data-speed") || "0.5");
      let animId = 0;

      const onEnter = () => (isInteracting = true);
      const onLeave = () => (isInteracting = false);

      folder.addEventListener("mouseenter", onEnter);
      folder.addEventListener("mouseleave", onLeave);
      folder.addEventListener("touchstart", onEnter, { passive: true });
      folder.addEventListener("touchend", onLeave);

      function step() {
        if (!isInteracting) {
          folder.scrollTop += speed;
          if (folder.scrollTop >= folder.scrollHeight - folder.offsetHeight) {
            folder.scrollTop = 0;
          }
        }
        animId = requestAnimationFrame(step);
      }

      animId = requestAnimationFrame(step);

      controllers.push({
        stop: () => {
          cancelAnimationFrame(animId);
          folder.removeEventListener("mouseenter", onEnter);
          folder.removeEventListener("mouseleave", onLeave);
          folder.removeEventListener("touchstart", onEnter);
          folder.removeEventListener("touchend", onLeave);
        },
      });
    });

    return () => controllers.forEach((c) => c.stop());
  }, []);

  return (
    <main className="vd-page">
      <style>{`
        .vd-page {
          background: #2a2a2a;
          min-height: 100vh;
          overflow-x: auto;
          overflow-y: hidden;
          height: 100vh;
        }

        .vd-back {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 100;
          color: #fff;
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          padding: 0.6rem 1.2rem;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.3s ease;
        }
        .vd-back:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
        }

        .vd-container {
          display: flex;
          height: 100vh;
          width: max-content;
          min-width: 100vw;
        }

        .vd-folder {
          width: 280px;
          height: 100vh;
          position: relative;
          flex-shrink: 0;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .vd-folder::-webkit-scrollbar { display: none; }

        /* Folder 1 - Beige */
        .vd-folder-1 { background: #d4c4a8; padding: 40px 30px; }

        .vd-folder-1 .vd-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 72px;
          font-weight: 900;
          color: #4a4a3a;
          letter-spacing: -2px;
          position: absolute;
          left: -20px;
          top: 40px;
        }

        .vd-folder-1 .vd-content { margin-top: 100px; margin-left: 60px; }

        .vd-folder-1 .vd-label {
          font-size: 11px;
          font-weight: bold;
          color: #4a4a3a;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .vd-folder-1 .vd-box {
          width: 100%;
          height: 120px;
          margin-bottom: 20px;
          background-color: #5a5a4a;
          background-image: url("/images/LS1-removebg-preview.png");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        .vd-barcode {
          width: 60px;
          height: 30px;
          background: linear-gradient(90deg, #000 0%, #000 10%, transparent 10%, transparent 20%, #000 20%, #000 25%, transparent 25%, transparent 35%, #000 35%, #000 40%, transparent 40%, transparent 50%, #000 50%, #000 55%, transparent 55%, transparent 60%, #000 60%, #000 70%, transparent 70%, transparent 80%, #000 80%, #000 90%, transparent 90%);
          margin: 20px 0;
        }

        .vd-text-block {
          font-size: 10px;
          color: #4a4a3a;
          line-height: 1.6;
          margin-top: 20px;
        }

        .vd-image-placeholder {
          width: 100%;
          background-image: url("/images/a2f80558-0d16-4be3-8a40-65161bcdac5f-md.jpeg");
          background-size: cover;
          background-position: center;
          height: 150px;
          margin: 15px 0;
        }

        .vd-rounded-frame {
          border: 3px solid #4a4a3a;
          border-radius: 0 0 50px 50px;
          padding: 30px 20px;
          margin: 20px 0;
        }

        .vd-diagonal-stripe {
          position: relative;
          width: 100%;
          height: 60px;
          background: #2a2a2a;
          margin: 20px 0;
          overflow: hidden;
        }
        .vd-diagonal-stripe::before {
          content: 'UI · UX · CODE';
          position: absolute;
          font-size: 20px;
          font-weight: 900;
          color: #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-15deg);
          letter-spacing: 2px;
        }

        .vd-plus-pattern {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 20px 0;
        }

        .vd-plus-icon {
          width: 100%;
          aspect-ratio: 1;
          position: relative;
        }
        .vd-plus-icon::before,
        .vd-plus-icon::after {
          content: '';
          position: absolute;
          background: #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .vd-plus-icon::before { width: 60%; height: 3px; }
        .vd-plus-icon::after { width: 3px; height: 60%; }

        .vd-circle-dots {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 20px 0;
        }

        .vd-dot {
          width: 12px;
          height: 12px;
          background: #4a4a3a;
          border-radius: 50%;
        }

        .vd-tech-label {
          background: #2a2a2a;
          color: #fff;
          padding: 8px 15px;
          font-size: 9px;
          letter-spacing: 1px;
          display: inline-block;
          margin: 10px 0;
        }

        .vd-file-tab {
          background: #c4b49a;
          width: 120px;
          height: 40px;
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          color: #2a2a2a;
          margin: 20px 0;
        }

        .vd-encrypted-label {
          border: 2px solid #2a2a2a;
          padding: 10px;
          font-size: 8px;
          text-align: center;
          margin: 15px 0;
          background: rgba(255, 255, 255, 0.1);
        }

        .vd-grid-pattern {
          width: 100%;
          height: 100px;
          background-image:
            linear-gradient(0deg, transparent 49%, rgba(0,0,0,0.3) 49%, rgba(0,0,0,0.3) 51%, transparent 51%),
            linear-gradient(90deg, transparent 49%, rgba(0,0,0,0.3) 49%, rgba(0,0,0,0.3) 51%, transparent 51%);
          background-size: 20px 20px;
          margin: 20px 0;
        }

        .vd-arrow-right {
          width: 0;
          height: 0;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          border-left: 25px solid #4a4a3a;
          margin: 20px 0;
        }

        .vd-code-block {
          font-family: 'Courier New', monospace;
          font-size: 9px;
          background: rgba(0,0,0,0.3);
          padding: 15px;
          color: #fff;
          margin: 15px 0;
          line-height: 1.6;
        }

        .vd-hexagon {
          width: 60px;
          height: 34.64px;
          background: #4a4a3a;
          position: relative;
          margin: 30px auto;
        }
        .vd-hexagon::before,
        .vd-hexagon::after {
          content: "";
          position: absolute;
          width: 0;
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          left: 0;
        }
        .vd-hexagon::before { bottom: 100%; border-bottom: 17.32px solid #4a4a3a; }
        .vd-hexagon::after { top: 100%; border-top: 17.32px solid #4a4a3a; }

        .vd-progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.2);
          margin: 15px 0;
          position: relative;
          overflow: hidden;
        }
        .vd-progress-bar::after {
          content: '';
          position: absolute;
          width: 60%;
          height: 100%;
          background: #7a8a3a;
          left: 0;
        }

        /* Folder colors */
        .vd-folder-2 { background: #b4c4d4; padding: 30px 25px; }
        .vd-folder-3 { background: #5a6a7a; padding: 30px 25px; }
        .vd-folder-4 { background: #a88a5a; padding: 30px 25px; }
        .vd-folder-5 { background: #1a1a1a; padding: 30px 25px; }
        .vd-folder-6 { background: #2a3a2a; padding: 30px 25px; }

        .vd-folder-2 .vd-header { text-align: center; margin-bottom: 30px; }
        .vd-folder-2 .vd-time { font-size: 14px; color: #2a2a2a; margin-bottom: 10px; }
        .vd-folder-2 .vd-log-label {
          font-size: 11px;
          font-weight: bold;
          color: #2a2a2a;
          border: 2px solid #2a2a2a;
          padding: 5px 15px;
          display: inline-block;
        }

        .vd-image-box img,
        .vd-image-dark img,
        .vd-content-box img {
          width: 100%;
          height: auto;
          display: block;
        }

        .vd-folder-4 .vd-image-tall {
          width: 100%;
          height: 400px;
          margin: 20px 0;
          overflow: hidden;
        }
        .vd-folder-4 .vd-image-tall img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vd-folder-5 .vd-icon-box {
          width: 100%;
          height: 200px;
          background: #2a2a2a;
          margin: 20px 0;
          overflow: hidden;
        }
        .vd-folder-5 .vd-icon-box video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vd-folder-6 .vd-circuit {
          position: absolute;
          right: 20px;
          top: 40%;
          width: 3px;
          height: 300px;
          background: #7a8a3a;
        }

        .vd-image-box {
          width: 100%;
          margin: 20px 0;
        }

        .vd-image-dark {
          width: 100%;
          margin: 20px 0;
        }

        .vd-content-box {
          width: 100%;
          margin: 20px 0;
        }
      `}</style>

      <Link href="/" className="vd-back">← Back</Link>

      <div className="vd-container" ref={containerRef}>
        {/* Folder 1 - Beige */}
        <div className="vd-folder vd-folder-1" data-speed="0.5">
          <div className="vd-title">TIMEPASS</div>
          <div className="vd-content">
            <div className="vd-label">PROJECTS SHOW</div>
            <div className="vd-box" />
            <div className="vd-barcode" />
            <div className="vd-text-block">
              DESIGNED WITH PURPOSE,<br />
              BUILT FOR IMPACT,<br />
              CRAFTED TO SCALE.
            </div>
            <div className="vd-rounded-frame">
              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#4a4a3a", marginBottom: "10px" }}>PROCESS</div>
              <div style={{ fontSize: "9px", color: "#4a4a3a", lineHeight: 1.6 }}>
                EVERY PROJECT STARTS WITH RESEARCH AND ENDS WITH PIXEL-PERFECT EXECUTION.
              </div>
            </div>
            <div className="vd-circle-dots">
              <div className="vd-dot" />
              <div className="vd-dot" />
              <div className="vd-dot" />
              <div className="vd-dot" />
            </div>
            <div className="vd-image-placeholder" />
            <div className="vd-hexagon" />
            <div style={{ fontSize: "9px", color: "#4a4a3a", marginTop: "30px" }}>
              DESIGN SYSTEMS<br />COMPONENTS · GRIDS · TOKENS
            </div>
          </div>
        </div>

        {/* Folder 2 - Blue-Grey */}
        <div className="vd-folder vd-folder-2" data-speed="0.5">
          <div className="vd-header">
            <div className="vd-time">BUILD LOG</div>
            <div className="vd-log-label">CLIENT<br />WORK<br />PROJECTS</div>
          </div>
          <div className="vd-file-tab">FREELANCE BUILDS</div>
          <div className="vd-encrypted-label">UI/UX SYSTEMS<br />INTERFACE DRIVEN DESIGN</div>
          <div className="vd-grid-pattern" />
          <div className="vd-image-dark">
            <img src="/images/AOT CLUB shashish submisison.png" alt="Event poster" />
          </div>
          <div style={{ fontSize: "9px", marginTop: "20px" }}>
            BRAND IDENTITY<br />USER ENGAGEMENT
          </div>
          <div className="vd-arrow-right" />
          <div className="vd-image-dark">
            <img src="/images/shashish independence day.png" alt="Independence Day poster" />
          </div>
        </div>

        {/* Folder 3 - Slate */}
        <div className="vd-folder vd-folder-3" data-speed="0.5">
          <div className="vd-tech-label">INTERFACE · FLOW<br />WIREFRAME · PROTOTYPE</div>
          <div className="vd-content-box">
            <img src="/images/DONDA-1.png" alt="Visual design project" />
          </div>
          <div className="vd-diagonal-stripe" />
          <div className="vd-content-box">
            <img src="/images/call me if your lost tyler -1.png" alt="Creative direction project" />
          </div>
          <div className="vd-plus-pattern">
            <div className="vd-plus-icon" />
            <div className="vd-plus-icon" />
            <div className="vd-plus-icon" />
          </div>
          <div className="vd-content-box">
            <img src="/images/TRIOLOGY.png" alt="Editing showcase" />
          </div>
        </div>

        {/* Folder 4 - Gold */}
        <div className="vd-folder vd-folder-4" data-speed="0.5">
          <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "10px", letterSpacing: "2px", marginBottom: "30px" }}>
            SOFTWARE VISUALS
          </div>
          <div className="vd-image-tall">
            <img src="/images/ChatGPT Image Jan 1, 2026, 06_59_12 PM.png" alt="" />
          </div>
          <div className="vd-image-dark">
            <img src="/images/hav final.png" alt="" />
          </div>
        </div>

        {/* Folder 5 - Dark */}
        <div className="vd-folder vd-folder-5" data-speed="0.5">
          <div className="vd-tech-label">FULL-STACK · RESPONSIVE BUILDS</div>
          <div className="vd-icon-box">
            <video src="/videos/marketing.mp4" autoPlay loop muted playsInline />
          </div>
          <div className="vd-code-block">
            ENGINEERED FOR USERS<br />SHIPPED FOR PRODUCTION
          </div>
          <div className="vd-image-box">
            <img src="/images/Gemini_Generated_Image_gvm11gvm11gvm11g.png" alt="" />
          </div>
          <div className="vd-progress-bar" />
          <div className="vd-image-box">
            <img src="/images/Gemini_Generated_Image_i7byli7byli7byli.png" alt="" />
          </div>
        </div>

        {/* Folder 6 - Forest */}
        <div className="vd-folder vd-folder-6" data-speed="0.5">
          <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "10px", color: "#7a8a3a", letterSpacing: "2px", marginBottom: "30px" }}>
            EDITING REELS
          </div>
          <div className="vd-image-box">
            <img src="/images/DS4EVER.png" alt="" />
          </div>
          <div className="vd-image-box">
            <img src="/images/GOOD KID MAAD CITY.png" alt="" />
          </div>
          <div className="vd-circuit" />
        </div>
      </div>
    </main>
  );
}
