"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import RevealOnScroll from "./RevealOnScroll";

export default function HeroSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector(".hero-section");
    const heroTopText = document.querySelector(".hero-top-text");
    const heroBottom = document.querySelector(".hero-bottom");

    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onEnter: () => hero.classList.add("hero-active"),
        onLeaveBack: () => hero.classList.remove("hero-active"),
      });
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <RevealOnScroll className="hero-section">
      <Navbar />

      {/* === TOP HALF: White background + massive text === */}
      <div className="hero-top">
        <div className="hero-top-text">
          <h1>Sahil</h1>
        </div>
      </div>

      {/* === BOTTOM HALF: Image with rounded mask === */}
      <div className="hero-bottom">
        <div className="hero-bottom-mask">
          <img
            src="/hero-bg/19.jpg"
            alt="Silhouette portrait"
            className="hero-bottom-img"
          />
          <div className="hero-bottom-overlay" />
        </div>
      </div>
    </RevealOnScroll>
  );
}
