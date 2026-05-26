 "use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const PROFILE_FRAME_COUNT = 120;

export default function ProfileSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [sequenceAvailable, setSequenceAvailable] = useState<boolean | null>(null);

  const frameUrls = useMemo(() => {
    return Array.from({ length: PROFILE_FRAME_COUNT }, (_, index) => {
      const frameNumber = String(index + 1).padStart(3, "0");
      return `/bg-profile/bg-no-watermark_${frameNumber}.jpg`;
    });
  }, []);

  useEffect(() => {
    if (!frameUrls.length) return;

    // Verify the sequence exists before switching away from fallback.
    const probe = new Image();
    probe.onload = () => setSequenceAvailable(true);
    probe.onerror = () => setSequenceAvailable(false);
    probe.src = frameUrls[0];
  }, [frameUrls]);

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

  const currentSrc = sequenceAvailable === true ? frameUrls[activeFrame] : "/images/profile_silhouette.png";

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
        <img
          src={currentSrc}
          alt="Profile Silhouette"
        />
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
