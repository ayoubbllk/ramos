"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

type InfiniteScrollTunnelProps = {
  images: string[];
  isDarkMode?: boolean;
  className?: string;
};

const TUNNEL_WIDTH = 24;
const TUNNEL_HEIGHT = 16;
const SEGMENT_DEPTH = 6;
const NUM_SEGMENTS = 14;
const FLOOR_COLS = 6;
const WALL_ROWS = 4;
const COL_WIDTH = TUNNEL_WIDTH / FLOOR_COLS;
const ROW_HEIGHT = TUNNEL_HEIGHT / WALL_ROWS;

export function InfiniteScrollTunnel({
  images,
  isDarkMode = true,
  className = "",
}: InfiniteScrollTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || images.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFailed(true);
      return;
    }

    const pool = [...images];
    const segments: THREE.Group[] = [];
    const scrollPos = { current: 0 };
    let frameId = 0;
    let isVisible = false;
    let disposed = false;

    const scene = new THREE.Scene();
    const bgHex = isDarkMode ? 0x05040a : 0xffffff;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();

    const populateImages = (group: THREE.Group, w: number, h: number, d: number) => {
      const cellMargin = 0.4;

      const addImg = (pos: THREE.Vector3, rot: THREE.Euler, wd: number, ht: number) => {
        const url = pool[Math.floor(Math.random() * pool.length)];
        const geom = new THREE.PlaneGeometry(wd - cellMargin, ht - cellMargin);
        const mat = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        });
        textureLoader.load(url, (tex) => {
          if (disposed) {
            tex.dispose();
            geom.dispose();
            mat.dispose();
            return;
          }
          tex.minFilter = THREE.LinearFilter;
          tex.colorSpace = THREE.SRGBColorSpace;
          mat.map = tex;
          mat.needsUpdate = true;
          gsap.to(mat, { opacity: 0.85, duration: 1 });
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.copy(pos);
        mesh.rotation.copy(rot);
        mesh.name = "slab_image";
        group.add(mesh);
      };

      let lastFloorIdx = -999;
      for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > lastFloorIdx + 1 && Math.random() > 0.8) {
          addImg(
            new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, -h, -d / 2),
            new THREE.Euler(-Math.PI / 2, 0, 0),
            COL_WIDTH,
            d,
          );
          lastFloorIdx = i;
        }
      }

      let lastCeilIdx = -999;
      for (let i = 0; i < FLOOR_COLS; i++) {
        if (i > lastCeilIdx + 1 && Math.random() > 0.88) {
          addImg(
            new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, h, -d / 2),
            new THREE.Euler(Math.PI / 2, 0, 0),
            COL_WIDTH,
            d,
          );
          lastCeilIdx = i;
        }
      }

      let lastLeftIdx = -999;
      for (let i = 0; i < WALL_ROWS; i++) {
        if (i > lastLeftIdx + 1 && Math.random() > 0.8) {
          addImg(
            new THREE.Vector3(-w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
            new THREE.Euler(0, Math.PI / 2, 0),
            d,
            ROW_HEIGHT,
          );
          lastLeftIdx = i;
        }
      }

      let lastRightIdx = -999;
      for (let i = 0; i < WALL_ROWS; i++) {
        if (i > lastRightIdx + 1 && Math.random() > 0.8) {
          addImg(
            new THREE.Vector3(w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
            new THREE.Euler(0, -Math.PI / 2, 0),
            d,
            ROW_HEIGHT,
          );
          lastRightIdx = i;
        }
      }
    };

    const clearSegmentImages = (segment: THREE.Group) => {
      const toRemove: THREE.Object3D[] = [];
      segment.traverse((child) => {
        if (child.name === "slab_image") toRemove.push(child);
      });
      toRemove.forEach((child) => {
        segment.remove(child);
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          const mat = child.material as THREE.MeshBasicMaterial;
          mat.map?.dispose();
          mat.dispose();
        }
      });
    };

    const createSegment = (zPos: number) => {
      const group = new THREE.Group();
      group.position.z = zPos;
      const w = TUNNEL_WIDTH / 2;
      const h = TUNNEL_HEIGHT / 2;
      const d = SEGMENT_DEPTH;

      const lineMaterial = new THREE.LineBasicMaterial({
        color: isDarkMode ? 0x554466 : 0xb0b0b0,
        transparent: true,
        opacity: isDarkMode ? 0.35 : 0.5,
      });
      const lineGeo = new THREE.BufferGeometry();
      const vertices: number[] = [];

      for (let i = 0; i <= FLOOR_COLS; i++) {
        const x = -w + i * COL_WIDTH;
        vertices.push(x, -h, 0, x, -h, -d);
        vertices.push(x, h, 0, x, h, -d);
      }
      for (let i = 1; i < WALL_ROWS; i++) {
        const y = -h + i * ROW_HEIGHT;
        vertices.push(-w, y, 0, -w, y, -d);
        vertices.push(w, y, 0, w, y, -d);
      }
      vertices.push(-w, -h, 0, w, -h, 0);
      vertices.push(-w, h, 0, w, h, 0);
      vertices.push(-w, -h, 0, -w, h, 0);
      vertices.push(w, -h, 0, w, h, 0);

      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      group.add(new THREE.LineSegments(lineGeo, lineMaterial));
      populateImages(group, w, h, d);
      return group;
    };

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const segment = createSegment(-i * SEGMENT_DEPTH);
      scene.add(segment);
      segments.push(segment);
    }

    const animate = () => {
      if (!isVisible || disposed) return;
      frameId = requestAnimationFrame(animate);

      const targetZ = -scrollPos.current * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.1;

      const tunnelLength = NUM_SEGMENTS * SEGMENT_DEPTH;
      const camZ = camera.position.z;

      segments.forEach((segment) => {
        if (segment.position.z > camZ + SEGMENT_DEPTH) {
          let minZ = 0;
          segments.forEach((s) => {
            minZ = Math.min(minZ, s.position.z);
          });
          segment.position.z = minZ - SEGMENT_DEPTH;
          clearSegmentImages(segment);
          populateImages(segment, TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, SEGMENT_DEPTH);
        }
        if (segment.position.z < camZ - tunnelLength - SEGMENT_DEPTH) {
          let maxZ = -999999;
          segments.forEach((s) => {
            maxZ = Math.max(maxZ, s.position.z);
          });
          segment.position.z = maxZ + SEGMENT_DEPTH;
          clearSegmentImages(segment);
          populateImages(segment, TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, SEGMENT_DEPTH);
        }
      });

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(frameId);
          animate();
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0 },
    );
    observer.observe(container);

    const onScroll = () => {
      scrollPos.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    setReady(true);

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      segments.forEach((segment) => {
        clearSegmentImages(segment);
        segment.traverse((child) => {
          if (child instanceof THREE.LineSegments) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
      });
      renderer.dispose();
    };
  }, [images, isDarkMode]);

  return (
    <div
      ref={containerRef}
      className={`istunnel ${ready ? "istunnel--ready" : ""} ${failed ? "istunnel--fallback" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      {!failed && <canvas ref={canvasRef} className="istunnel-canvas" />}
      {(failed || !ready) && images[0] && (
        <img className="istunnel-fallback" src={images[0]} alt="" />
      )}
    </div>
  );
}
