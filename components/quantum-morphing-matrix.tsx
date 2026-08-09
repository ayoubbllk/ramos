"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";

type QuantumMorphingMatrixProps = {
  enablePreview?: boolean;
  bgColor?: string;
  colorCloud?: string;
  colorSphere?: string;
  colorHelix?: string;
  particleCount?: number;
  particleSize?: number;
  particleOpacity?: number;
  glowIntensity?: number;
  spinSpeed?: number;
  morphInterval?: number;
  morphSpeed?: number;
  parallaxStrength?: number;
  fogDensity?: number;
  style?: CSSProperties;
  className?: string;
};

const DEFAULTS = {
  enablePreview: true,
  bgColor: "#05040A",
  colorCloud: "#F8A040",
  colorSphere: "#E8D5FF",
  colorHelix: "#FF6B2C",
  particleCount: 10000,
  particleSize: 0.04,
  particleOpacity: 0.8,
  glowIntensity: 24,
  spinSpeed: 0.1,
  morphInterval: 4,
  morphSpeed: 0.4,
  parallaxStrength: 2,
  fogDensity: 0.03,
} as const;

export function QuantumMorphingMatrix(props: QuantumMorphingMatrixProps) {
  const {
    enablePreview = DEFAULTS.enablePreview,
    bgColor = DEFAULTS.bgColor,
    colorCloud = DEFAULTS.colorCloud,
    colorSphere = DEFAULTS.colorSphere,
    colorHelix = DEFAULTS.colorHelix,
    particleCount = DEFAULTS.particleCount,
    particleSize = DEFAULTS.particleSize,
    particleOpacity = DEFAULTS.particleOpacity,
    glowIntensity = DEFAULTS.glowIntensity,
    spinSpeed = DEFAULTS.spinSpeed,
    morphInterval = DEFAULTS.morphInterval,
    morphSpeed = DEFAULTS.morphSpeed,
    parallaxStrength = DEFAULTS.parallaxStrength,
    fogDensity = DEFAULTS.fogDensity,
    style,
    className,
  } = props;

  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current || !enablePreview) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(bgColor, fogDensity);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.filter = `drop-shadow(0px 0px ${glowIntensity}px ${colorSphere})`;
    mount.appendChild(renderer.domElement);

    const posCloud = new Float32Array(particleCount * 3);
    const posSphere = new Float32Array(particleCount * 3);
    const posHelix = new Float32Array(particleCount * 3);
    const colCloud = new Float32Array(particleCount * 3);
    const colSphere = new Float32Array(particleCount * 3);
    const colHelix = new Float32Array(particleCount * 3);
    const cCloud = new THREE.Color(colorCloud);
    const cSphere = new THREE.Color(colorSphere);
    const cHelix = new THREE.Color(colorHelix);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      posCloud[i3] = (Math.random() - 0.5) * 20;
      posCloud[i3 + 1] = (Math.random() - 0.5) * 20;
      posCloud[i3 + 2] = (Math.random() - 0.5) * 20;
      colCloud[i3] = cCloud.r;
      colCloud[i3 + 1] = cCloud.g;
      colCloud[i3 + 2] = cCloud.b;

      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rSphere = 4.5;
      posSphere[i3] = rSphere * Math.cos(theta) * Math.sin(phi);
      posSphere[i3 + 1] = rSphere * Math.sin(theta) * Math.sin(phi);
      posSphere[i3 + 2] = rSphere * Math.cos(phi);
      colSphere[i3] = cSphere.r;
      colSphere[i3 + 1] = cSphere.g;
      colSphere[i3 + 2] = cSphere.b;

      const t = i / particleCount;
      const helixRadius = 2.5;
      const helixHeight = 16;
      const helixTwists = 4;
      const angle = t * Math.PI * 2 * helixTwists;
      const strandOffset = i % 2 === 0 ? 0 : Math.PI;
      posHelix[i3] = Math.cos(angle + strandOffset) * helixRadius;
      posHelix[i3 + 1] = (t - 0.5) * helixHeight;
      posHelix[i3 + 2] = Math.sin(angle + strandOffset) * helixRadius;
      colHelix[i3] = cHelix.r;
      colHelix[i3 + 1] = cHelix.g;
      colHelix[i3 + 2] = cHelix.b;
    }

    const geometry = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(posCloud);
    const currentColors = new Float32Array(colCloud);
    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(currentColors, 3));

    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: particleOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    let currentState = 0;
    let targetState = 0;
    let morphProgress = 1;
    const stateTimer = window.setInterval(() => {
      currentState = targetState;
      targetState = (targetState + 1) % 3;
      morphProgress = 0;
    }, morphInterval * 1000);

    function getTargetArrays(state: number) {
      if (state === 0) return { p: posCloud, c: colCloud };
      if (state === 1) return { p: posSphere, c: colSphere };
      return { p: posHelix, c: colHelix };
    }

    function easeInOutCubic(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    let mouseX = 0;
    let mouseY = 0;
    let isVisible = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (morphProgress < 1) {
        morphProgress += delta * morphSpeed;
        if (morphProgress > 1) morphProgress = 1;
      }

      const easeProgress = easeInOutCubic(morphProgress);
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;
      const curP = posAttr.array as Float32Array;
      const curC = colAttr.array as Float32Array;
      const startArrays = getTargetArrays(currentState);
      const endArrays = getTargetArrays(targetState);

      for (let i = 0; i < particleCount * 3; i++) {
        curP[i] = startArrays.p[i] + (endArrays.p[i] - startArrays.p[i]) * easeProgress;
        curC[i] = startArrays.c[i] + (endArrays.c[i] - startArrays.c[i]) * easeProgress;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      particleSystem.rotation.y = time * spinSpeed;
      if (targetState === 2) {
        particleSystem.rotation.x += (time * (spinSpeed * 0.5) - particleSystem.rotation.x) * 0.05;
      } else {
        particleSystem.rotation.x += (0 - particleSystem.rotation.x) * 0.05;
      }

      camera.position.x += (mouseX * parallaxStrength - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * parallaxStrength - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) animate();
        else cancelAnimationFrame(animationFrameId);
      });
    });
    observer.observe(mount);

    const onResize = () => {
      if (!isVisible) return;
      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      clearInterval(stateTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    bgColor,
    colorCloud,
    colorSphere,
    colorHelix,
    particleCount,
    particleSize,
    particleOpacity,
    glowIntensity,
    spinSpeed,
    morphInterval,
    morphSpeed,
    parallaxStrength,
    fogDensity,
    enablePreview,
  ]);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        background: bgColor,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    />
  );
}
