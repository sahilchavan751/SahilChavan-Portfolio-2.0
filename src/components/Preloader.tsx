"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const TOTAL_BARS = 34;
const LOAD_DURATION = 2800;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  useEffect(() => {
    const step = 100 / TOTAL_BARS;
    let current = 0;
    let barIndex = 0;

    const getDelay = (i: number) => {
      // Ease-out: fast at start, slow at end
      const t = i / TOTAL_BARS;
      const baseDelay = LOAD_DURATION / TOTAL_BARS;
      return baseDelay * (0.3 + t * 2.5);
    };

    const tick = () => {
      current += step;
      barIndex++;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setVisible(false);
            handleComplete();
          }, 800);
        }, 400);
      } else {
        setProgress(current);
        intervalRef.current = setTimeout(tick, getDelay(barIndex));
      }
    };

    intervalRef.current = setTimeout(tick, getDelay(0));

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [handleComplete]);

  const activeBars = Math.floor((progress / 100) * TOTAL_BARS);
  const displayPercent = Math.round(progress);

  if (!visible) return null;

  return (
    <div className={`preloader ${fadeOut ? "preloader--fade-out" : ""}`}>
      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .preloader--fade-out {
          opacity: 0;
          transform: scale(1.05);
          pointer-events: none;
        }

        /* BG */
        .preloader__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .preloader__bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Bars at top */
        .preloader__bars-area {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20%;
          display: flex;
          align-items: stretch;
          padding: 0.5% 1% 0 1%;
          gap: clamp(3px, 0.5vw, 7px);
          box-sizing: border-box;
          z-index: 1;
        }
        .preloader__bar {
          flex: 1;
          opacity: 0;
          background: linear-gradient(180deg, #fff 0%, #dbdbdb 100%);
          transition: opacity 0.15s ease;
        }
        .preloader__bar--active {
          opacity: 1;
        }

        /* Labels */
        .preloader__labels {
          position: absolute;
          top: calc(20% + 0.5rem);
          left: 1%;
          right: 1%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 4;
        }
        .preloader__label-left {
          height: clamp(9px, 1vw, 16px);
          opacity: 0;
          animation: labelFadeIn 0.8s ease-out 1.2s forwards;
        }
        .preloader__label-percent {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: clamp(11px, 1.2vw, 20px);
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.5px;
          min-width: 3.5em;
          text-align: right;
          opacity: 0;
          animation: labelFadeIn 0.8s ease-out 1.4s forwards;
        }

        /* Silhouette — anchored to bottom, centered, large */
        .preloader__silhouette {
          position: absolute;
          bottom: 0;
          left: 55%;
          transform: translateX(-50%);
          z-index: 2;
          height: 115%;
          width: auto;
          max-width: none;
          object-fit: contain;
          object-position: bottom center;
          
          /* NEW: Animations */
          opacity: 0;
          animation: silhouetteAppear 1.2s cubic-bezier(0.2, 1, 0.2, 1) forwards,
                     silhouetteFloat 8s ease-in-out infinite 1.2s;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
        }
        .preloader__silhouette:hover {
          transform: translateX(-50%) scale(1.03) translateY(-1%);
          // filter: brightness(1.15) drop-shadow(0 0 20px rgba(255,255,255,0.1));
        }

        /* Name images — small, bottom corners */
        .preloader__name-left {
          position: absolute;
          bottom: 1.5%;
          left: 2%;
          z-index: 5;
          height: clamp(22px, 5.1vw, 70px);
          object-fit: contain;
          
          /* NEW: Animations - Sequenced after silhouette */
          opacity: 0;
          animation: nameAppearLeft 1.8s cubic-bezier(0.1, 1, 0.1, 1) 0.8s forwards,
                     textPulse 4s ease-in-out infinite 3s;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .preloader__name-left:hover {
          transform: scale(1.1) rotate(-2deg);
        }

        .preloader__name-right {
          position: absolute;
          bottom: 1.5%;
          right: 2%;
          z-index: 5;
          height: clamp(22px, 5.1vw, 70px);
          object-fit: contain;
          
          /* NEW: Animations - Sequenced after silhouette */
          opacity: 0;
          animation: nameAppearRight 1.8s cubic-bezier(0.1, 1, 0.1, 1) 1s forwards,
                     textPulse 4s ease-in-out infinite 3.5s;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .preloader__name-right:hover {
          transform: scale(1.1) rotate(2deg);
        }

        /* KEYFRAMES */
        @keyframes silhouetteAppear {
          0% { transform: translateX(-50%) translateY(10%) scale(0.95); opacity: 0; }
          100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
        }
        @keyframes silhouetteFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          25% { transform: translateX(-51.2%) translateY(0); }
          75% { transform: translateX(-48.8%) translateY(0); }
        }
        @keyframes nameAppearLeft {
          0% { transform: translateX(-60px) scale(0.9); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes nameAppearRight {
          0% { transform: translateX(60px) scale(0.9); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes textPulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.2)); }
        }
        @keyframes labelFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0.8; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .preloader__bars-area {
            height: 16%;
            gap: clamp(3px, 1vw, 10px);
          }
          .preloader__labels {
            top: calc(16% + 0.3rem);
          }
          .preloader__silhouette {
            height: 80%;
            left:60%;
          }
          .preloader__name-left,
          .preloader__name-right {
            height: clamp(22px, 5.5vw, 55px);
            bottom: 1%;
          }
        }
        @media (max-width: 480px) {
          .preloader__bars-area {
            height: 12%;
            gap: clamp(2px, 0.8vw, 6px);
          }
          .preloader__labels {
            top: calc(12% + 0.2rem);
          }
          .preloader__silhouette {
            height: 65%;
            left: 60%;
          }
          .preloader__name-left,
          .preloader__name-right {
            height: clamp(18px, 7vw, 45px);
            bottom: 1%;
          }
        }
      `}</style>

      {/* Background */}
      <div className="preloader__bg">
        <img src="/preloader/bg.svg" alt="" draggable={false} />
      </div>

      {/* Top Bars */}
      <div className="preloader__bars-area">
        {Array.from({ length: TOTAL_BARS }).map((_, i) => (
          <div
            key={i}
            className={`preloader__bar ${i < activeBars ? "preloader__bar--active" : ""}`}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="preloader__labels">
        <img
          src="/preloader/WAIT FOR LOADING.png"
          alt="Wait for loading"
          className="preloader__label-left"
          draggable={false}
        />
        <span className="preloader__label-percent">{displayPercent}%</span>
      </div>

      {/* Silhouette — big, bottom-center */}
      <img
        src="/preloader/profile_silhouette-bg-removed.png"
        alt=""
        className="preloader__silhouette"
        draggable={false}
      />

      {/* Name images — small, bottom-left and bottom-right */}
      <img
        src="/preloader/sahil.png"
        alt="Sahil"
        className="preloader__name-left"
        draggable={false}
      />
      <img
        src="/preloader/chavan.png"
        alt="Chavan"
        className="preloader__name-right"
        draggable={false}
      />
    </div>
  );
}
