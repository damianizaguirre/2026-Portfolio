"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type ReflectiveMode = "idle" | "requesting" | "live" | "denied" | "unsupported" | "demo";

type ReflectiveContextValue = {
  mode: ReflectiveMode;
  error: string | null;
  isActive: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
};

const ReflectiveContext = createContext<ReflectiveContextValue | null>(null);

const IDLE_COLOR = { r: 242, g: 242, b: 242 };
const SURFACE_IDLE_BASE = { r: 242, g: 242, b: 242 }; // matches #f2f2f2 (nav pill idle fill)
const TEXT_IDLE_BASE = { r: 25, g: 25, b: 25 }; // matches #191919 (hero text idle color)
const SAMPLE_INTERVAL_MS = 200;
const CANVAS_SIZE = 24;
const EASE_FACTOR = 0.08;
const ACTIVE_ALPHA = 0.05; // near-0% opacity when reflective mode is fully on
const ACTIVATION_ACTIVE = 1;
const ACTIVATION_IDLE = 0;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number
) {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

function rgb({ r, g, b }: { r: number; g: number; b: number }) {
  return `rgb(${r}, ${g}, ${b})`;
}

function rgba({ r, g, b }: { r: number; g: number; b: number }, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}

function capBrightness(
  color: { r: number; g: number; b: number },
  maxBrightness: number
) {
  const current = Math.max(color.r, color.g, color.b);
  if (current <= maxBrightness) return color;
  const scale = maxBrightness / current;
  return {
    r: Math.round(color.r * scale),
    g: Math.round(color.g * scale),
    b: Math.round(color.b * scale),
  };
}

function channelToLinear(channel: number) {
  const srgb = channel / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

function readableTextColor(background: { r: number; g: number; b: number }) {
  const luminance = relativeLuminance(background);
  const whiteContrast = 1.05 / (luminance + 0.05);
  const blackContrast = (luminance + 0.05) / 0.05;
  return whiteContrast >= blackContrast
    ? { r: 255, g: 255, b: 255 }
    : { r: 18, g: 18, b: 18 };
}

export function ReflectiveProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ReflectiveMode>("idle");
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const targetColorRef = useRef({ ...IDLE_COLOR });
  const displayColorRef = useRef({ ...IDLE_COLOR });
  const targetActivationRef = useRef(ACTIVATION_IDLE);
  const displayActivationRef = useRef(ACTIVATION_IDLE);
  const rafIdRef = useRef<number | null>(null);
  const sampleIntervalRef = useRef<number | null>(null);
  const demoIdxRef = useRef(0);

  // Writes ready-to-use rgba() strings per consumer — plain strings avoid any
  // reliance on browser support for calc()/color-mix() with custom properties,
  // which is where the earlier nested-formula approach silently broke.
  const applyToRoot = useCallback((r: number, g: number, b: number, activation: number) => {
    const root = document.documentElement;
    const rr = Math.round(r);
    const gg = Math.round(g);
    const bb = Math.round(b);
    const alpha = lerp(1, ACTIVE_ALPHA, activation);
    const sampled = { r: rr, g: gg, b: bb };
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 18, g: 18, b: 18 };

    root.style.setProperty("--ambient-r", String(rr));
    root.style.setProperty("--ambient-g", String(gg));
    root.style.setProperty("--ambient-b", String(bb));
    root.style.setProperty("--ambient-color", `rgb(${rr}, ${gg}, ${bb})`);
    root.style.setProperty("--reflective-activation", activation.toFixed(3));

    if (activation < 0.01) {
      root.style.setProperty("--ambient-r", String(IDLE_COLOR.r));
      root.style.setProperty("--ambient-g", String(IDLE_COLOR.g));
      root.style.setProperty("--ambient-b", String(IDLE_COLOR.b));
      root.style.setProperty("--ambient-color", rgb(IDLE_COLOR));
      root.style.setProperty("--ambient-surface", "rgba(242, 242, 242, 1)");
      root.style.setProperty("--ambient-text", "rgba(25, 25, 25, 1)");
      root.style.setProperty("--reflective-page-bg", "#f9f9f9");
      root.style.setProperty("--reflective-foreground", "#191919");
      root.style.setProperty("--reflective-muted", "#707070");
      root.style.setProperty("--reflective-nav-active", "#191919");
      root.style.setProperty("--reflective-nav-muted", "#707070");
      root.style.setProperty("--reflective-card-fill", "#ffffff");
      root.style.setProperty("--reflective-card-border", "#cdcdcd");
      root.style.setProperty("--ambient-pill-fill", "#f2f2f2");
      root.style.setProperty("--ambient-pill-border", "transparent");
      root.style.setProperty("--ambient-pill-shadow", "0 0 4px rgba(0, 0, 0, 0.25)");
      root.style.setProperty("--ambient-text-fill", "linear-gradient(112deg, #191919 0%, #191919 100%)");
      return;
    }

    const surfaceR = Math.round(lerp(SURFACE_IDLE_BASE.r, rr, activation));
    const surfaceG = Math.round(lerp(SURFACE_IDLE_BASE.g, gg, activation));
    const surfaceB = Math.round(lerp(SURFACE_IDLE_BASE.b, bb, activation));
    root.style.setProperty(
      "--ambient-surface",
      `rgba(${surfaceR}, ${surfaceG}, ${surfaceB}, ${alpha.toFixed(3)})`
    );

    const textR = Math.round(lerp(TEXT_IDLE_BASE.r, rr, activation));
    const textG = Math.round(lerp(TEXT_IDLE_BASE.g, gg, activation));
    const textB = Math.round(lerp(TEXT_IDLE_BASE.b, bb, activation));
    root.style.setProperty(
      "--ambient-text",
      `rgba(${textR}, ${textG}, ${textB}, ${alpha.toFixed(3)})`
    );

    const darkPage = mixColor({ r: 5, g: 4, b: 4 }, sampled, activation * 0.08);
    const pageBg = mixColor({ r: 249, g: 249, b: 249 }, darkPage, activation);
    const foreground = mixColor(TEXT_IDLE_BASE, sampled, activation * 0.88);
    const muted = mixColor({ r: 107, g: 107, b: 107 }, sampled, activation * 0.6);
    root.style.setProperty("--reflective-page-bg", rgb(pageBg));
    root.style.setProperty("--reflective-foreground", rgb(foreground));
    root.style.setProperty("--reflective-muted", rgba(muted, lerp(1, 0.82, activation)));
    root.style.setProperty(
      "--reflective-card-fill",
      rgba(mixColor(white, darkPage, activation * 0.96), lerp(1, 0.18, activation))
    );
    root.style.setProperty(
      "--reflective-card-border",
      rgba(mixColor({ r: 205, g: 205, b: 205 }, sampled, activation * 0.4), lerp(1, 0.34, activation))
    );

    const sampledGlass = mixColor({ r: 20, g: 19, b: 18 }, sampled, 0.42);
    const surfaceFrost = mixColor(SURFACE_IDLE_BASE, sampledGlass, activation);
    const surfaceTint = mixColor(surfaceFrost, white, 0.18);
    const surfaceShade = mixColor(surfaceFrost, black, 0.16);
    const navSurface = mixColor(surfaceFrost, sampled, 0.18 + activation * 0.12);
    const navForeground = readableTextColor(navSurface);
    const navMutedAlpha = navForeground.r === 255 ? 0.78 : 0.7;
    const frostAlpha = lerp(1, 0.72, activation);
    const tintAlpha = lerp(0.2, 0.24, activation);
    const shadeAlpha = lerp(1, 0.46, activation);

    root.style.setProperty("--reflective-nav-active", rgb(navForeground));
    root.style.setProperty("--reflective-nav-muted", rgba(navForeground, navMutedAlpha));

    root.style.setProperty(
      "--ambient-pill-fill",
      `linear-gradient(134deg, ${rgba(white, tintAlpha)} 0%, ${rgba(surfaceTint, frostAlpha)} 34%, ${rgba(surfaceFrost, frostAlpha)} 66%, ${rgba(surfaceShade, shadeAlpha)} 100%)`
    );
    root.style.setProperty(
      "--ambient-pill-border",
      rgba(mixColor(white, sampled, 0.18 + activation * 0.24), lerp(0, 0.42, activation))
    );
    root.style.setProperty(
      "--ambient-pill-shadow",
      `0 0 4px rgba(0, 0, 0, ${lerp(0.25, 0.42, activation).toFixed(3)}), 0 12px ${Math.round(lerp(0, 30, activation))}px rgba(0, 0, 0, ${lerp(0, 0.18, activation).toFixed(3)}), inset 0 1px 0 ${rgba(white, lerp(0.3, 0.32, activation))}, inset 0 -12px 22px ${rgba(sampled, lerp(0, 0.16, activation))}`
    );

    const textBase = capBrightness(mixColor(TEXT_IDLE_BASE, sampled, activation * 0.78), 205);
    const textLight = capBrightness(mixColor(textBase, sampled, activation * 0.48), 205);
    const textMid = capBrightness(mixColor(TEXT_IDLE_BASE, sampled, activation * 0.9), 205);
    root.style.setProperty(
      "--ambient-text-fill",
      `linear-gradient(112deg, ${rgb(textBase)} 0%, ${rgb(textLight)} 32%, ${rgb(textMid)} 55%, ${rgb(textBase)} 100%)`
    );
  }, []);

  const startEaseLoop = useCallback(() => {
    const tick = () => {
      const cur = displayColorRef.current;
      const tgt = targetColorRef.current;
      cur.r += (tgt.r - cur.r) * EASE_FACTOR;
      cur.g += (tgt.g - cur.g) * EASE_FACTOR;
      cur.b += (tgt.b - cur.b) * EASE_FACTOR;
      displayActivationRef.current += (targetActivationRef.current - displayActivationRef.current) * EASE_FACTOR;
      applyToRoot(cur.r, cur.g, cur.b, displayActivationRef.current);
      rafIdRef.current = requestAnimationFrame(tick);
    };
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, [applyToRoot]);

  const stopEaseLoop = useCallback(() => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  // Weighted-toward-saturation color sample from the live video frame.
  const sampleFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const { data } = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    let rSum = 0;
    let gSum = 0;
    let bSum = 0;
    let wSum = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max === 0 ? 0 : (max - min) / max;
      const weight = 0.15 + saturation * 1.6;
      rSum += r * weight;
      gSum += g * weight;
      bSum += b * weight;
      wSum += weight;
    }

    if (wSum === 0) return;
    targetColorRef.current = {
      r: clamp(rSum / wSum, 0, 255),
      g: clamp(gSum / wSum, 0, 255),
      b: clamp(bSum / wSum, 0, 255),
    };
  }, []);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (sampleIntervalRef.current != null) {
      window.clearInterval(sampleIntervalRef.current);
      sampleIntervalRef.current = null;
    }
  }, []);

  const goIdle = useCallback(() => {
    stopStream();
    targetColorRef.current = { ...IDLE_COLOR };
    targetActivationRef.current = ACTIVATION_IDLE;
    setMode("idle");
    window.setTimeout(() => stopEaseLoop(), 900);
  }, [stopStream, stopEaseLoop]);

  const startDemoMode = useCallback(() => {
    setMode("demo");
    targetActivationRef.current = ACTIVATION_ACTIVE;
    startEaseLoop();
    const palette = [
      { r: 255, g: 138, b: 101 }, // warm coral
      { r: 129, g: 199, b: 255 }, // sky blue
      { r: 168, g: 230, b: 163 }, // soft green
      { r: 255, g: 205, b: 118 }, // amber
      { r: 199, g: 146, b: 255 }, // lavender
    ];
    sampleIntervalRef.current = window.setInterval(() => {
      demoIdxRef.current = (demoIdxRef.current + 1) % palette.length;
      targetColorRef.current = { ...palette[demoIdxRef.current] };
    }, 2200);
  }, [startEaseLoop]);

  const attachStream = useCallback(
    (stream: MediaStream) => {
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      video.play().catch(() => {
        /* iOS occasionally rejects the implicit play() race; ignored, autoPlay attr covers it */
      });
      setMode("live");
      targetActivationRef.current = ACTIVATION_ACTIVE;
      startEaseLoop();
      sampleIntervalRef.current = window.setInterval(sampleFrame, SAMPLE_INTERVAL_MS);
    },
    [sampleFrame, startEaseLoop]
  );

  const enable = useCallback(async () => {
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setMode("unsupported");
      setError("This browser doesn't support camera access. Showing a demo instead.");
      startDemoMode();
      return;
    }

    setMode("requesting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      attachStream(stream);
      return;
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setMode("denied");
        setError(
          "Camera access was denied. Enable camera permissions for this site in Safari settings to try Reflective Mode."
        );
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        attachStream(stream);
        return;
      } catch {
        setMode("unsupported");
        setError("No camera detected. Showing a demo instead.");
        startDemoMode();
      }
    }
  }, [attachStream, startDemoMode]);

  const disable = useCallback(() => {
    goIdle();
  }, [goIdle]);

  const toggle = useCallback(() => {
    if (mode === "live" || mode === "demo") {
      disable();
    } else {
      enable();
    }
  }, [mode, enable, disable]);

  useEffect(() => {
    applyToRoot(IDLE_COLOR.r, IDLE_COLOR.g, IDLE_COLOR.b, ACTIVATION_IDLE);
    return () => {
      stopStream();
      stopEaseLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = mode === "live" || mode === "demo";

  return (
    <ReflectiveContext.Provider value={{ mode, error, isActive, enable, disable, toggle }}>
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="hidden" />
      {children}
    </ReflectiveContext.Provider>
  );
}

export function useReflective() {
  const ctx = useContext(ReflectiveContext);
  if (!ctx) throw new Error("useReflective must be used within a ReflectiveProvider");
  return ctx;
}
