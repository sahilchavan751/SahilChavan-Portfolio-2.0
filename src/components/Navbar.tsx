import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`magazine-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Left: Name */}
        <div className="nav-brand">
          <Link href="/" className="nav-brand-link">
            sahil chavan , 22
          </Link>
        </div>

        {/* Center-Right: Page links */}
        <div className="nav-center">
          <Link href="/#about">about</Link>
          <span className="nav-comma">,</span>
          <Link href="/#projects">projects</Link>
          <span className="nav-comma">,</span>
          <Link href="/contact">contact</Link>
        </div>

        {/* Far Right: Socials */}
        <div className="nav-socials">
          <a href="https://www.instagram.com/sahnoir_/" target="_blank" rel="noopener noreferrer">ig</a>
          <span className="nav-comma">,</span>
          <a href="https://www.youtube.com/@odinnn" target="_blank" rel="noopener noreferrer">yt</a>
          <span className="nav-comma">,</span>
          <a href="https://github.com/sahilchavan751" target="_blank" rel="noopener noreferrer">git</a>
          <span className="nav-comma">,</span>
          <a href="#" target="_blank" rel="noopener noreferrer">fb</a>
        </div>
      </div>
    </nav>
  );
}
