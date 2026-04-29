'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WebGL Shader Hero — Straveda branded (pure white theme)
 * Ultra-subtle, premium effects on a truly white (#FFFFFF) background.
 * - Pure white base (#FFFFFF)
 * - Near-imperceptible geometric mesh/grid shimmer
 * - Ultra-faint warm orange (#FF4800) glow in upper-right corner
 * - Nearly invisible moving wave lines (~5% opacity)
 * - Scroll controls wave amplitude only (gentler when scrolled)
 */
export default function StravedaWebGLHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    renderer: THREE.WebGLRenderer | null;
    mesh: THREE.Mesh | null;
    uniforms: Record<string, { value: unknown }>;
    animationId: number | null;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: {} as any,
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { current: refs } = sceneRef;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Premium subtle shader: barely-perceptible effects on pure white
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float scrollProgress;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        // Scroll controls wave amplitude — gentler when scrolled down
        float scrollAmp = 1.0 - scrollProgress * 0.6;
        float t = time * 0.5;

        // === Pure white background (#FFFFFF) ===
        vec3 bgColor = vec3(1.0);

        // === Ultra-faint geometric mesh grid (premium shimmer) ===
        vec2 gridUV = p * 2.5 + vec2(t * 0.02, t * 0.015);
        float gridX = abs(fract(gridUV.x) - 0.5);
        float gridY = abs(fract(gridUV.y) - 0.5);
        float gridLine = min(gridX, gridY);
        float mesh = 1.0 - smoothstep(0.46, 0.5, gridLine);
        // Fade mesh near edges for softness
        float meshFade = smoothstep(0.0, 0.35, uv.x) * smoothstep(1.0, 0.65, uv.x)
                        * smoothstep(0.0, 0.35, uv.y) * smoothstep(1.0, 0.55, uv.y);
        bgColor -= vec3(mesh * 0.018 * meshFade);

        // === Near-imperceptible warm orange glow (upper-right) ===
        vec2 glowCenter = vec2(0.72, 0.78); // upper-right in UV space
        float glowDist = length(uv - glowCenter);
        float spotlight = exp(-glowDist * glowDist * 8.0) * 0.008;
        // Ultra-subtle pulse
        spotlight *= 0.9 + 0.1 * sin(time * 0.3);
        bgColor += vec3(1.0, 0.28, 0.0) * spotlight; // #FF4800 tint

        // === Nearly invisible moving wave lines ===
        float waveIntensity = 0.008 * scrollAmp;

        // Faint orange wave lines (brand #FF4800)
        float orangeWave = 0.0;
        for (int i = 0; i < 3; i++) {
          float fi = float(i);
          float freq = 1.0 + fi * 0.35;
          float phase = t * (0.4 + fi * 0.12) + fi * 1.7;
          float amp = (0.38 + fi * 0.08) * scrollAmp;
          float y = p.y + sin((p.x + phase) * freq) * amp;
          float line = waveIntensity / (abs(y) + 0.01);
          line *= smoothstep(0.0, 0.2, abs(y));
          orangeWave += line * 0.5;
        }
        bgColor += vec3(1.0, 0.28, 0.0) * orangeWave;

        // === Ultra-gentle edge softening ===
        float vignette = 1.0 - length(p) * 0.03;
        bgColor *= max(vignette, 0.97);

        gl_FragColor = vec4(bgColor, 1.0);
      }
    `;

    const initScene = () => {
      refs.scene = new THREE.Scene();
      refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Pure white clear color (#FFFFFF)
      refs.renderer.setClearColor(new THREE.Color(0xFFFFFF));

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        scrollProgress: { value: 0.0 },
      };

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ];

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', positions);

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      });

      refs.mesh = new THREE.Mesh(geometry, material);
      refs.scene.add(refs.mesh);

      handleResize();
    };

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.006;
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
      refs.animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      refs.renderer.setSize(width, height, false);
      refs.uniforms.resolution.value = [width, height];
    };

    // Handle scroll — update shader scrollProgress uniform (amplitude control only)
    const handleScroll = () => {
      if (!refs.uniforms) return;
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / heroHeight, 1.0);
      refs.uniforms.scrollProgress.value = progress;
    };

    initScene();
    animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh);
        refs.mesh.geometry.dispose();
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose();
        }
      }
      refs.renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ zIndex: 0 }}
    />
  );
}
