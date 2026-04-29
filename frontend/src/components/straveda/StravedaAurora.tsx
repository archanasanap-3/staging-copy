'use client';

import React, { useRef, useEffect } from 'react';

/**
 * StravedaAurora — Brand-colored digital aurora shader overlay
 *
 * A WebGL-based animated aurora effect using ONLY Straveda brand colors:
 *   - #FF4800 (orange accent)  → vec3(1.0, 0.282, 0.0)
 *   - #2B2358 (dark purple)    → vec3(0.169, 0.137, 0.345)
 *
 * Designed as a subtle atmospheric layer to sit atop the StravedaWebGLHero.
 * Uses low opacity + mix-blend-mode for natural blending with the hero content.
 * Includes subtle mouse interaction for an engaging parallax feel.
 */
export default function StravedaAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const isClient = useRef(false);

  useEffect(() => {
    isClient.current = true;
  }, []);

  useEffect(() => {
    if (!isClient.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('StravedaAurora: WebGL is not supported in this browser.');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uFlowSpeed;
      uniform float uColorIntensity;
      uniform float uNoiseLayers;
      uniform float uMouseInfluence;

      #define MARCH_STEPS 24

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float fbm(vec3 p) {
        float f = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 8; i++) {
          if (float(i) >= uNoiseLayers) break;
          f += amp * hash(p.xy);
          p *= 2.0;
          amp *= 0.5;
        }
        return f;
      }

      float map(vec3 p) {
        vec3 q = p;
        q.z += iTime * uFlowSpeed;
        vec2 mouse = (iMouse.xy / iResolution.xy - 0.5) * 2.0;
        q.xy += mouse * uMouseInfluence;
        float f = fbm(q * 2.0);
        f *= sin(p.y * 2.0 + iTime) * 0.5 + 0.5;
        return clamp(f, 0.0, 1.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec3 ro = vec3(0.0, -1.0, 0.0);
        vec3 rd = normalize(vec3(uv, 1.0));
        vec3 col = vec3(0.0);
        float t = 0.0;

        // Brand-only colors — orange (#FF4800) and purple (#2B2358)
        vec3 orange = vec3(1.0, 0.282, 0.0);
        vec3 purple = vec3(0.169, 0.137, 0.345);

        for (int i = 0; i < MARCH_STEPS; i++) {
          vec3 p = ro + rd * t;
          float density = map(p);
          if (density > 0.0) {
            // Smooth oscillation between brand orange and purple
            float mix_factor = 0.5 + 0.5 * sin(iTime * 0.5 + p.y * 2.0);
            vec3 auroraColor = mix(orange, purple, mix_factor);
            col += auroraColor * density * 0.1 * uColorIntensity;
          }
          t += 0.1;
        }

        // Subtle vignette to focus the aurora towards the center-top
        float vignette = 1.0 - 0.4 * length(uv);
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(`StravedaAurora shader compile error: ${gl!.getShaderInfoLog(shader)}`);
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`StravedaAurora program linking error: ${gl.getProgramInfoLog(program)}`);
      return;
    }
    gl.useProgram(program);

    // Full-screen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');
    const iMouseLocation = gl.getUniformLocation(program, 'iMouse');
    const uFlowSpeedLocation = gl.getUniformLocation(program, 'uFlowSpeed');
    const uColorIntensityLocation = gl.getUniformLocation(program, 'uColorIntensity');
    const uNoiseLayersLocation = gl.getUniformLocation(program, 'uNoiseLayers');
    const uMouseInfluenceLocation = gl.getUniformLocation(program, 'uMouseInfluence');

    // Subtle brand-aligned intensity values
    const flowSpeed = 0.3;
    const colorIntensity = 0.6;
    const noiseLayers = 3.0;
    const mouseInfluence = 0.2;

    const startTime = performance.now();
    let animationFrameId: number;

    // Mouse tracking — uses parent container scope
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Canvas resize handler
    const resizeCanvas = () => {
      canvas!.width = canvas!.clientWidth;
      canvas!.height = canvas!.clientHeight;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(iResolutionLocation, canvas!.width, canvas!.height);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Render loop
    const renderLoop = () => {
      if (!gl || gl.isContextLost()) return;

      const currentTime = performance.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);

      gl.uniform2f(
        iMouseLocation,
        mousePos.current.x * canvas!.width,
        (1.0 - mousePos.current.y) * canvas!.height
      );
      gl.uniform1f(uFlowSpeedLocation, flowSpeed);
      gl.uniform1f(uColorIntensityLocation, colorIntensity);
      gl.uniform1f(uNoiseLayersLocation, noiseLayers);
      gl.uniform1f(uMouseInfluenceLocation, mouseInfluence);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (gl && !gl.isContextLost()) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(vertexBuffer);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        opacity: 0.45,
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}
