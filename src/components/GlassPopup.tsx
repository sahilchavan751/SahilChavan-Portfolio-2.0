"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function GlassPopup() {
  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggle = () => {
    setShow(true);
    timerRef.current = setTimeout(() => setShow(false), 5000);
  };

  useEffect(() => {
    const initial = setTimeout(() => {
      toggle();
      const interval = setInterval(toggle, 30000);
      return () => clearInterval(interval);
    }, 3000);

    return () => {
      clearTimeout(initial);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div id="github-popup" className={`glass-popup ${show ? "show" : ""}`}>
      <div className="popup-content">
        <p>
          Visit the <Link href="/contact">Connect page</Link> to find my GitHub!
        </p>
        <button id="close-popup" onClick={() => setShow(false)}>
          ×
        </button>
      </div>
    </div>
  );
}
