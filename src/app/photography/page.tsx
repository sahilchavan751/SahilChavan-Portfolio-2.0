"use client";

import Link from "next/link";

export default function PhotographyPage() {
  const col1 = [
    "/images/GOOD KID MAAD CITY.png",
    "/images/hav final.png",
    "/images/heroes_and_villains.png",
    "/images/interstellar.png",
  ];
  const col2 = [
    "/images/ldr ultraviolence.png",
    "/images/Screenshot 2024-03-11 151240.png",
    "/images/seedhe_maut.png",
    "/images/shashish independence day.png",
  ];
  const col3 = [
    "/images/TRIOLOGY.png",
    "/images/we_dont_trust_you.jpg",
    "/images/AOT CLUB shashish submisison.png",
    "/images/ASTRO W.png",
  ];
  const col4 = [
    "/images/call me if your lost tyler -1.png",
    "/images/DONDA-1.png",
    "/images/DS4EVER.png",
    "/images/GOOD KID MAAD CITY.png",
  ];
  const col5 = [
    "/images/ldr ultraviolence.png",
    "/images/Screenshot 2024-03-11 151240.png",
    "/images/seedhe_maut.png",
    "/images/shashish independence day.png",
  ];

  const columns = [col1, col2, col3, col4, col5];

  return (
    <>
      <style>{`
        .photo-page { margin:0; padding:0; display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh; position:relative; }
        .photo-back { position:fixed; top:2rem; left:2rem; z-index:100; color:white; text-decoration:none; font-size:1.5rem; }
        .photo-carousel { display:flex; gap:15px; width:95vw; height:80vh; position:relative; }
        .photo-overlay-text { position:absolute; bottom:-8%; left:2%; font-family:serif; font-size:90px; color:white; z-index:20; pointer-events:none; letter-spacing:0.5px; font-style:italic; font-weight:700; }
        .photo-mask { display:flex; gap:15px; width:100%; height:100%; overflow:hidden; mask-image:linear-gradient(to bottom,transparent,black 10%,black 90%,transparent); -webkit-mask-image:linear-gradient(to bottom,transparent,black 10%,black 90%,transparent); }
        .photo-column { flex:1; position:relative; }
        .photo-track { display:flex; flex-direction:column; gap:20px; animation:scrollUp 19.5s linear infinite; }
        .photo-column:nth-child(even) .photo-track { animation:scrollDown 19.5s linear infinite; }
        .photo-box { width:100%; background:#000; border-radius:12px; display:flex; align-items:center; justify-content:center; overflow:hidden; border:1px solid #111; }
        .photo-box img { width:100%; height:auto; object-fit:contain; }
        @keyframes scrollUp { 0%{transform:translateY(0);} 100%{transform:translateY(calc(-50% - 10px));} }
        @keyframes scrollDown { 0%{transform:translateY(calc(-50% - 10px));} 100%{transform:translateY(0);} }
        .photo-carousel:hover .photo-track { animation-play-state:paused; }
      `}</style>
      <div className="photo-page">
        <Link href="/" className="photo-back" aria-label="Back to Home">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>
        <div className="photo-carousel">
          <div className="photo-overlay-text">Photo Editions</div>
          <div className="photo-mask">
            {columns.map((col, ci) => (
              <div className="photo-column" key={ci}>
                <div className="photo-track">
                  {[...col, ...col].map((src, i) => (
                    <div className="photo-box" key={i}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
