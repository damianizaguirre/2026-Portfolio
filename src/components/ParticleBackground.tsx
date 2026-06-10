"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      gridColor: "#121212",
      patternColor: "#1f1f1f",
      density: 1.05,
      gridOpacity: 0.04,
      patternOpacity: 0.48,
      patternSoftness: 0.08,
      speed: 0.008,
      asciiChance: 0.985,
    };

    const chars = [".", ":", "+", "x", "#"];
    let dpr = 1;
    let width = 0;
    let height = 0;
    let time = 0;
    let rafId: number;

    function hash(x: number, y: number) {
      return Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
    }

    function hexToRgb(hex: string) {
      const v = hex.replace("#", "");
      return {
        r: parseInt(v.slice(0, 2), 16),
        g: parseInt(v.slice(2, 4), 16),
        b: parseInt(v.slice(4, 6), 16),
      };
    }

    function mixRgb(
      base: { r: number; g: number; b: number },
      target: { r: number; g: number; b: number },
      amount: number
    ) {
      return {
        r: Math.round(base.r + (target.r - base.r) * amount),
        g: Math.round(base.g + (target.g - base.g) * amount),
        b: Math.round(base.b + (target.b - base.b) * amount),
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function movingPattern(x: number, y: number) {
      const nx = x / width;
      const ny = (y % 1600) / 1600;
      const loopLength = 18;
      const phase = (time % loopLength) / loopLength;
      const loopAngle = phase * Math.PI * 2;
      const px = (nx - phase + 1) % 1;

      const blobs: [number, number, number, number, number][] = [
        [0.18, 0.42, 0.11, 0.08, 0.95],
        [0.31, 0.35, 0.08, 0.07, 0.70],
        [0.42, 0.49, 0.14, 0.10, 0.90],
        [0.55, 0.39, 0.10, 0.08, 0.72],
        [0.66, 0.55, 0.12, 0.10, 0.80],
        [0.80, 0.45, 0.08, 0.07, 0.58],
      ];

      let value = 0;
      for (const blob of blobs) {
        const rawDx = Math.abs(px - blob[0]);
        const dx = Math.min(rawDx, 1 - rawDx) / blob[2];
        const dy = (ny - blob[1]) / blob[3];
        value += Math.exp(-(dx * dx + dy * dy)) * blob[4];
      }

      const brokenEdge = hash(Math.floor(x / 18), Math.floor(y / 18));
      const scan = Math.sin((px * Math.PI * 8) + (ny * Math.PI * 5) + loopAngle) * 0.12;

      return Math.max(0, value + scan - brokenEdge * 0.28);
    }

    function drawDot(
      x: number,
      y: number,
      size: number,
      colorHex: string,
      alpha: number,
      softness = 0
    ) {
      const base = hexToRgb(colorHex);
      ctx.fillStyle = `rgba(${base.r}, ${base.g}, ${base.b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      if (softness > 0) {
        ctx.fillStyle = `rgba(${base.r}, ${base.g}, ${base.b}, ${alpha * softness * 0.23})`;
        ctx.beginPath();
        ctx.arc(x, y, size * (1.8 + softness * 2.6), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawAscii(
      char: string,
      x: number,
      y: number,
      size: number,
      colorHex: string,
      alpha: number
    ) {
      const base = hexToRgb(colorHex);
      ctx.fillStyle = `rgba(${base.r}, ${base.g}, ${base.b}, ${alpha})`;
      ctx.font = `${Math.max(8, size * 4.4)}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(char, x, y);
    }

    function render() {
      time += config.speed;
      ctx.clearRect(0, 0, width, height);

      const scrollY = window.scrollY || 0;
      const step = Math.max(6.2, 18 - config.density * 4.7);

      for (let screenY = -step; screenY < height + step; screenY += step) {
        const worldY = scrollY + screenY;

        for (let x = -step; x < width + step; x += step) {
          const seed = hash(Math.floor(x), Math.floor(worldY));
          const size = (1.8 + seed * 2.7) * 0.58;

          drawDot(x, screenY, size, config.gridColor, config.gridOpacity);

          const pattern = movingPattern(x, worldY);
          const patternAlpha = Math.min(0.7, pattern * 0.56) * config.patternOpacity;
          if (patternAlpha > 0.012) {
            const patternSize =
              (1.8 + seed * 2.7) * (0.42 + Math.min(1, pattern) * 0.62);
            const char = chars[Math.floor(hash(x, worldY) * chars.length)];

            if (seed > config.asciiChance && pattern > 0.52) {
              drawAscii(char, x, screenY, patternSize, config.patternColor, patternAlpha);
            } else {
              const base = hexToRgb(config.patternColor);
              const varied = mixRgb(
                base,
                { r: 0, g: 0, b: 0 },
                0.18 + (1 - seed) * 0.28
              );
              const color = `#${[varied.r, varied.g, varied.b]
                .map((v) => v.toString(16).padStart(2, "0"))
                .join("")}`;
              drawDot(x, screenY, patternSize, color, patternAlpha, config.patternSoftness);
            }
          }
        }
      }

      rafId = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
