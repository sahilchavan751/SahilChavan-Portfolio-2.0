"use client";

import { useEffect } from "react";
import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";

const CATEGORIES = [
  {
    id: "01",
    title: "Photography",
    href: "/photography",
    type: "image",
    src: "/images/ChatGPT Image Jan 1, 2026, 06_52_49 PM.png",
    description: "Capturing moments through a high-contrast cinematic lens."
  },
  {
    id: "02",
    title: "Color Grade",
    href: "/color-grade",
    type: "video",
    src: "/videos/ls-2.mp4",
    description: "Expert color science and atmospheric grading for digital media."
  },
  {
    id: "03",
    title: "Interfaces",
    href: "/visual-design",
    type: "image",
    src: "/images/Gemini_Generated_Image_i7byli7byli7byli.png",
    description: "Minimalist UI/UX design with a focus on fluid interactions."
  },
  {
    id: "04",
    title: "Editing",
    href: "/editing",
    type: "video",
    src: "/videos/ventures.mp4",
    description: "Precision cutting and narrative-driven post-production."
  }
];

export default function CategoriesSection() {
  useEffect(() => {
    const videos = document.querySelectorAll(".category-video") as NodeListOf<HTMLVideoElement>;
    videos.forEach(v => {
      v.muted = true;
      v.play().catch(() => { });
    });
  }, []);

  return (
    <section className="categories-wrapper" id="projects">
      <style>{`
        .categories-wrapper {
          --bg: #000000;
          --text: #E6E3D8;
          --border: rgba(230, 227, 216, 0.2);
          background: var(--bg);
          width: 100%;
          padding: 4rem 2rem;
          color: var(--text);
        }

        .categories-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .magazine-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--border);
          gap: 1px;
          border: 1px solid var(--border);
        }

        .grid-header {
          grid-column: span 4;
          background: var(--bg);
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }

        .grid-header h2 {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(3rem, 12vw, 12rem);
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          margin: 0;
        }

        .header-meta {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
        }

        .category-card {
          grid-column: span 2;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: block;
          transition: background 0.4s ease;
        }

        @media (max-width: 900px) {
          .magazine-grid { grid-template-columns: 1fr; }
          .grid-header, .category-card, .grid-filler { grid-column: span 1 !important; }
          .grid-header { padding: 3rem 1.5rem; }
          .grid-header h2 { font-size: clamp(2.5rem, 14vw, 5rem); }
          .header-meta { margin-top: 1.5rem; font-size: 0.6rem; }
          .category-info { padding: 1.5rem; }
          .card-title { font-size: 1.8rem; }
          .categories-wrapper { padding: 2rem 1rem; }
          .magazine-grid { max-width: 100%; box-sizing: border-box; }
        }

        .category-media {
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
          height: 400px;
        }

        @media (max-width: 900px) {
          .category-media { height: 300px; }
        }

        .category-thumb, .category-video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .category-card:hover .category-thumb,
        .category-card:hover .category-video {
          transform: scale(1.05);
        }

        .category-info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--bg);
          border-top: 1px solid var(--border);
          transition: transform 0.4s ease;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          opacity: 0.5;
        }

        .card-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: 2.5rem;
          text-transform: uppercase;
          margin: 0;
          line-height: 1;
        }

        .card-desc {
          font-size: 0.85rem;
          max-width: 300px;
          line-height: 1.5;
          opacity: 0.7;
          font-family: 'Inter', sans-serif;
        }

        .card-arrow {
          position: absolute;
          top: 2rem;
          right: 2rem;
          width: 40px;
          height: 40px;
          border: 1px solid var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(5px);
          transition: all 0.4s ease;
        }

        .category-card:hover .card-arrow {
          background: var(--text);
          color: var(--bg);
          transform: rotate(45deg);
        }

        /* Filling grid items for magazine look */
        .grid-filler {
          background: var(--bg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0.4;
        }


      `}</style>

      <div className="categories-inner">
        <RevealOnScroll className="magazine-grid">
          <div className="grid-header">
            <div className="header-meta">
              <span>Selected Works</span>
              <span>2024 — 2026</span>
            </div>
            <h2>Portfolio</h2>
            <div className="header-meta">
              <span>Design × Direction</span>
              <span>Available for Freelance</span>
            </div>
          </div>

          {CATEGORIES.map((cat, index) => (
            <Link key={cat.id} href={cat.href} className="category-card">
              <div className="category-media">
                <div className="card-arrow">→</div>
                {cat.type === "image" ? (
                  <img src={cat.src} alt={cat.title} className="category-thumb" />
                ) : (
                  <video
                    className="category-video"
                    src={cat.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                  />
                )}
              </div>
              <div className="category-info">
                <div className="card-top">
                  <span>{cat.id}</span>
                  <span>{cat.title}</span>
                </div>
                <h3 className="card-title">{cat.title}</h3>
                <p className="card-desc">{cat.description}</p>
              </div>
            </Link>
          ))}

          <div className="grid-filler" style={{ gridColumn: "span 4" }}>
            <p style={{ textAlign: "right" }}>Precision Prompting / Creative Development / Visual Engineering</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
