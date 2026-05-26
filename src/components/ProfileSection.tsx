 "use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";

const PROFILE_FRAME_COUNT = 120;

export default function ProfileSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [sequenceAvailable, setSequenceAvailable] = useState<boolean | null>(null);

  const frameUrls = useMemo(() => {
    return Array.from({ length: PROFILE_FRAME_COUNT }, (_, index) => {
      const frameNumber = String(index + 1).padStart(3, "0");
      return `/bg-profile/bg-no-watermark_${frameNumber}.jpg`;
    });
  }, []);

  // Draw a specific frame onto the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Match canvas internal size to displayed size for crisp rendering
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Contain-fit the image (show full image, centered, no cropping)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;
    let dw, dh, dx, dy;
    if (imgRatio > canvasRatio) {
      dw = canvas.width;
      dh = canvas.width / imgRatio;
    } else {
      dh = canvas.height;
      dw = canvas.height * imgRatio;
    }
    dx = (canvas.width - dw) / 2;
    dy = (canvas.height - dh) / 2;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, dw, dh);
  }, []);

  // Check if sequence exists
  useEffect(() => {
    if (!frameUrls.length) return;
    const probe = new Image();
    probe.onload = () => setSequenceAvailable(true);
    probe.onerror = () => setSequenceAvailable(false);
    probe.src = frameUrls[0];
  }, [frameUrls]);

  // Preload ALL images into memory and pre-decode them
  useEffect(() => {
    if (sequenceAvailable !== true || !frameUrls.length) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        // Draw the first frame as soon as it loads
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
      if (!sectionRef.current || !frameUrls.length) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = -rect.height * 0.2;
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
    <div ref={sectionRef}>
      <RevealOnScroll className="profile-about-section" id="about">
      <div className="about-details about-left">
        <h3>Education</h3>
        <ul>
          <li>Sandip University — Undergraduate</li>
          <li>Sandip Foundation — <br />Pre University</li>
          <li>RKM College — Schooling</li>
        </ul>

        <h3>Experience</h3>
        <p>Independent projects for myself and close collaborators</p>

        <h3>Achievements</h3>
        <p>Dont Have Time To Count</p>
      </div>

      <div className="profile-image-container">
        {sequenceAvailable === true ? (
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        ) : (
          <img
            src="/images/profile_silhouette.png"
            alt="Profile Silhouette"
          />
        )}
      </div>

      <div className="about-details about-right">
        <h3>Languages</h3>
        <ul>
          <li>Hindi</li>
          <li>English</li>
          <li>React , .net</li>
        </ul>

        <h3>Software</h3>
        <p>Listed below</p>

        <h3>Contact</h3>
        <p>Please visit the <Link href="/contact">Connect page</Link></p>

        <h3>Interests</h3>
        <p>Entrepreneurship</p>
      </div>
      </RevealOnScroll>
    </div>
  );
}
