"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";

export default function ContactPage() {
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = glassRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(2, 5, 5);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(-2, -2, 5);
    scene.add(pointLight);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, roughness: 0, metalness: 0, transmission: 1,
      thickness: 5, ior: 1.15, clearcoat: 1, clearcoatRoughness: 0,
    });

    const geometry = new THREE.TorusKnotGeometry(2.1, 0.7, 100, 16);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="contact-wrapper">
      <style>{`
        :root { --bg: #000000; --text: #E6E3D8; --border: #E6E3D8; }
        .contact-wrapper { width:100%; min-height:100vh; display:flex; justify-content:center; align-items:center; padding:0; }
        .contact-inner { width:100%; max-width:1400px; padding:2rem; }
        .grid-container { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--border); background:var(--border); gap:1px; }
        .grid-item { background:var(--bg); padding:1.5rem; min-height:200px; display:flex; flex-direction:column; justify-content:space-between; position:relative; }
        .header-bar { grid-column:span 4; min-height:60px; padding:0.75rem 1.5rem; display:flex; justify-content:space-between; align-items:center; background:var(--bg); }
        .hero-title { grid-column:span 4; background:var(--bg); padding:0; display:flex; align-items:center; justify-content:center; overflow:hidden; min-height:180px; }
        .hero-title h1 { margin:0; font-family:'Archivo Black',sans-serif; font-size:clamp(2.5rem,10vw,10rem); line-height:1.1; text-transform:uppercase; text-align:center; letter-spacing:-0.04em; padding:0 1rem; color:var(--text); }
        .detail-card { grid-column:span 1; }
        .label-row { display:flex; justify-content:space-between; width:100%; font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:2rem; color:var(--text); }
        .content-main { display:flex; flex-direction:column; gap:1rem; }
        .detail-text { font-size:1.1rem; font-weight:500; margin:0; color:var(--text); }
        .sub-text { font-size:0.65rem; color:#555; max-width:150px; line-height:1.4; margin-top:auto; }
        .bottom-left { grid-column:span 2; padding:2rem; }
        .bottom-right { grid-column:span 2; padding:2rem; display:flex; flex-direction:column; justify-content:space-between; align-items:flex-start; position:relative; }
        .section-title { font-size:0.85rem; font-weight:600; text-transform:uppercase; margin-bottom:2rem; display:block; color:var(--text); }
        .social-list { display:flex; flex-direction:column; gap:0.5rem; }
        .social-link { font-family:'Inter',sans-serif; font-size:1rem; font-weight:500; text-decoration:none; color:var(--text); display:block; }
        .social-link span { color:#666; font-weight:400; }
        .serif-display { font-family:'Playfair Display',serif; font-size:2.5rem; line-height:1; font-style:italic; font-weight:600; color:var(--text); }
        .address-block { text-align:right; width:100%; }
        .fluid-glass-container { position:absolute; top:0; left:0; width:100%; height:100%; overflow:hidden; border-radius:inherit; z-index:0; pointer-events:none; }
        @media(max-width:900px) { .grid-container{grid-template-columns:repeat(2,1fr);} .header-bar,.hero-title,.bottom-left,.bottom-right{grid-column:span 2;} }
        @media(max-width:600px) { .grid-container{grid-template-columns:1fr;} .header-bar,.hero-title,.detail-card,.bottom-left,.bottom-right{grid-column:span 1;} .hero-title h1{font-size:15vw;} .bottom-right{flex-direction:column;align-items:flex-start;gap:2rem;} .address-block{text-align:left;} }
      `}</style>
      <div className="contact-inner">
        <div className="grid-container">
          <div className="header-bar">
            <Link href="/" aria-label="Back to Home" style={{ color: "var(--text)", display: "flex", alignItems: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
          </div>

          <div className="hero-title"><h1>Let&apos;s Connect</h1></div>

          {/* Name Card */}
          <div className="grid-item detail-card">
            <div className="label-row"><span>Name</span><span>→</span></div>
            <div className="content-main">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text)" }}>
                <path d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6L12 2Z" />
              </svg>
              <p className="detail-text" style={{ fontSize: "1.43rem" }}>Sahil</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="grid-item detail-card">
            <div className="label-row"><span>Email</span><span>→</span></div>
            <div className="content-main">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text)" }}>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <a href="mailto:sahilsbc751@gmail.com" className="detail-text" style={{ fontSize: "0.9rem", wordBreak: "break-all", textDecoration: "none", color: "inherit" }}>
                sahilsbc751@gmail.com
              </a>
              <p className="sub-text">For professional correspondence, kindly reach out via email.</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="grid-item detail-card">
            <div className="label-row"><span>Phone</span><span>→</span></div>
            <div className="content-main">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text)" }}>
                <rect x="3" y="3" width="5" height="5" /><rect x="9.5" y="3" width="5" height="5" /><rect x="16" y="3" width="5" height="5" />
                <rect x="3" y="9.5" width="5" height="5" /><rect x="9.5" y="9.5" width="5" height="5" /><rect x="16" y="9.5" width="5" height="5" />
                <rect x="3" y="16" width="5" height="5" /><rect x="9.5" y="16" width="5" height="5" /><rect x="16" y="16" width="5" height="5" />
              </svg>
              <p className="detail-text">+91 XXXXX XXXXX</p>
              <p className="sub-text">Call availability is minimal; email remains the primary channel.</p>
            </div>
          </div>

          {/* Location Card */}
          <div className="grid-item detail-card">
            <div className="label-row"><span>Location</span><span>→</span></div>
            <div className="content-main">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text)" }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className="sub-text" style={{ marginTop: "2rem" }}>India</p>
            </div>
          </div>

          {/* Bottom Left Socials */}
          <div className="grid-item bottom-left">
            <span className="section-title">SOCIALS</span>
            <div className="social-list">
              <span style={{ fontSize: "0.6rem", color: "#888", marginBottom: "0.5rem" }}>2026</span>
              <a href="#" className="social-link">LINKEDIN: <span>/sahil</span></a>
              <a href="https://www.instagram.com/sahnoir_/" className="social-link">INSTAGRAM: <span>@sahnoir_</span></a>
              <a href="#" className="social-link">BEHANCE: <span>/sahil</span></a>
              <a href="https://github.com/sahilchavan751" className="social-link">GITHUB: <span>/sahilchavan751</span></a>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="grid-item bottom-right">
            <div style={{ maxWidth: "200px" }}>
              <p className="section-title" style={{ marginBottom: "0.5rem" }}>Recently added</p>
              <p style={{ fontSize: "0.75rem", marginBottom: "1rem", color: "var(--text)" }}>PORTFOLIO: sahil.dev</p>
            </div>
            <div className="address-block">
              <p style={{ fontSize: "0.6rem", textAlign: "right", marginBottom: "0.5rem", color: "#888" }}>2026</p>
              <div className="serif-display">
                leveraging the <br />
                Attention Economy
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "2rem", marginTop: "1rem", fontSize: "0.6rem", textTransform: "uppercase", color: "var(--text)" }}>
                <span>Designed by<br />Sahil</span>
                <span>Precision Prompting</span>
              </div>
            </div>
            <div ref={glassRef} className="fluid-glass-container" />
          </div>
        </div>
      </div>
    </div>
  );
}
