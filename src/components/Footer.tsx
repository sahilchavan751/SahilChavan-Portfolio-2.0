"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useState } from "react";

const FOOTER_FRAME_COUNT = 120;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [sequenceAvailable, setSequenceAvailable] = useState<boolean | null>(null);

  const frameUrls = useMemo(() => {
    return Array.from({ length: FOOTER_FRAME_COUNT }, (_, index) => {
      const frameNumber = String(index + 1).padStart(3, "0");
      return `/footer-frames/footer-no-watermark_${frameNumber}.jpg`;
    });
  }, []);

  // Draw a specific frame onto the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Cover-fit the image (like object-fit: cover)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      if (!footerRef.current) return;
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Check if sequence exists
  useEffect(() => {
    if (!frameUrls.length) return;
    const probe = new Image();
    probe.onload = () => setSequenceAvailable(true);
    probe.onerror = () => setSequenceAvailable(false);
    probe.src = frameUrls[0];
  }, [frameUrls]);

  // Preload ALL images into memory
  useEffect(() => {
    if (sequenceAvailable !== true || !frameUrls.length) return;

    const images: HTMLImageElement[] = [];

    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (i === 0) {
          drawFrame(0);
        }
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, [frameUrls, sequenceAvailable, drawFrame]);

  // Scroll handler — directly draws to canvas, no React state involved
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

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
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
  }, [frameUrls, sequenceAvailable, drawFrame]);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="footer-frame-bg" aria-hidden="true">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>
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
