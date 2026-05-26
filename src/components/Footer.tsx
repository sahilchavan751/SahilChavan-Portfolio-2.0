"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useState } from "react";

const FOOTER_FRAME_COUNT = 120;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [sequenceAvailable, setSequenceAvailable] = useState<boolean | null>(null);

  const frameUrls = useMemo(() => {
    return Array.from({ length: FOOTER_FRAME_COUNT }, (_, index) => {
      const frameNumber = String(index + 1).padStart(3, "0");
      return `/footer-frames/footer-no-watermark_${frameNumber}.jpg`;
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Small delay to let layout settle after preloader
    const timer = setTimeout(() => {
      if (!footerRef.current) return;

      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!frameUrls.length) return;
    const probe = new Image();
    probe.onload = () => setSequenceAvailable(true);
    probe.onerror = () => setSequenceAvailable(false);
    probe.src = frameUrls[0];
  }, [frameUrls]);

  useEffect(() => {
    if (sequenceAvailable !== true) return;

    const updateFrameFromScroll = () => {
      if (!footerRef.current || !frameUrls.length) return;
      const rect = footerRef.current.getBoundingClientRect();
      const start = window.innerHeight * 0.95;
      const end = -rect.height * 0.15;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.min(Math.max(progress, 0), 1);
      const frameIndex = Math.round(clamped * (frameUrls.length - 1));
      setActiveFrame(frameIndex);
    };

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFrameFromScroll);
    };

    updateFrameFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [frameUrls, sequenceAvailable]);

  useEffect(() => {
    if (sequenceAvailable !== true || !frameUrls.length) return;
    
    // Eagerly preload all frames in the background to prevent stuttering on production
    frameUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [frameUrls, sequenceAvailable]);

  const currentBgSrc = sequenceAvailable === true ? frameUrls[activeFrame] : "";

  return (
    <footer ref={footerRef} className="site-footer">
      {currentBgSrc ? (
        <div className="footer-frame-bg" aria-hidden="true">
          <img src={currentBgSrc} alt="" />
        </div>
      ) : null}
      <div className="footer-container">
        <div className="footer-name footer-name-spacer" aria-hidden="true">
          Sahil
        </div>
        <div className="footer-left">
          <img
            src="/images/LS1-removebg-preview.png"
            alt="Layerstop logo"
            className="footer-logo"
          />
          <p className="footer-tagline ttcommons">
            Designed visuals, branding, and systems
            <br />
            built with clarity and intent.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <span className="footer-title">Navigate</span>
            <Link href="/">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/#projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <span className="footer-title">Connect</span>
            <a href="#" target="_blank">Behance</a>
            <a href="https://www.instagram.com/sahnoir_/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.youtube.com/@odinnn" target="_blank">yt</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom ttcommons">
        © 2026 Sahil • Built with design,
      </div>
    </footer>
  );
}
