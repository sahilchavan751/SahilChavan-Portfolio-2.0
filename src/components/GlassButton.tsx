"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

export default function GlassButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.1,
      transmission: 0.95,
      thickness: 0.5,
      ior: 1.5,
      opacity: 0.8,
      transparent: true,
      clearcoat: 1,
    });

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleClick = () => {
    router.push("/contact");
  };

  return (
    <div id="glass-button-container" ref={containerRef} onClick={handleClick}>
      <span className="glass-button-text">Connect</span>
    </div>
  );
}
