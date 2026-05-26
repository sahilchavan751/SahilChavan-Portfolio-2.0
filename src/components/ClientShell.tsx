"use client";

import { useState, useCallback } from "react";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={handleComplete} />}
      <CustomCursor />
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
        {children}
      </div>
    </>
  );
}
