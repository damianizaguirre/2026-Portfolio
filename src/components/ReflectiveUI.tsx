"use client";

import { useReflective } from "@/context/ReflectiveContext";

export default function ReflectiveUI() {
  const { mode, error, isActive, toggle } = useReflective();

  const statusLabel =
    mode === "requesting"
      ? "Requesting camera access…"
      : mode === "live"
      ? "Live — reading ambient light"
      : mode === "demo"
      ? "Demo mode (no camera detected)"
      : mode === "denied"
      ? "Camera access denied"
      : mode === "unsupported"
      ? "Camera unavailable"
      : "Idle";

  return (
    <div className="reflective-mobile-page min-h-screen flex flex-col items-center px-6 pt-16 pb-20">
      <div className="max-w-[420px] w-full flex flex-col items-center text-center">
        <h1 className="reflective-title-fill text-[28px] font-semibold">Reflective UI</h1>
        <p className="text-[15px] mt-2 leading-snug" style={{ color: "var(--reflective-muted)" }}>
          An interface that borrows its color from the light around it — inspired by
          Jordan Singer&rsquo;s iPhone concept. Point your camera at something colorful. Once
          enabled, the effect follows you across the whole site — try the nav bar and the
          home page.
        </p>

        <button
          onClick={toggle}
          disabled={mode === "requesting"}
          className="reflective-pill-fill mt-7 rounded-full px-6 py-3 text-[15px] font-medium transition-colors disabled:opacity-60"
          style={{ color: "var(--reflective-foreground)" }}
        >
          {isActive ? "Disable Reflective Mode" : "Enable Reflective Mode"}
        </button>

        <p className="mt-3 text-[13px]" style={{ color: "var(--reflective-muted)" }}>
          {statusLabel}
        </p>

        {error && (
          <p className="mt-2 text-[13px] text-[#b8563f] max-w-[320px] leading-snug">{error}</p>
        )}
      </div>

      {/* Demo glass panels — the actual "reflective" effect lives here */}
      <div className="w-full max-w-[420px] mt-12 flex flex-col gap-5">
        <div
          className="rounded-[24px] p-6 backdrop-blur-xl transition-[box-shadow,border-color] duration-500 ease-out"
          style={{
            background: "var(--reflective-card-fill)",
            border: "1px solid var(--reflective-card-border)",
            boxShadow: "0 0 46px 0 color-mix(in srgb, var(--ambient-color) 32%, transparent)",
          }}
        >
          <p
            className="text-[13px] font-medium uppercase tracking-wide"
            style={{ color: "color-mix(in srgb, var(--ambient-color) 60%, #191919)" }}
          >
            Weather
          </p>
          <p className="reflective-title-fill text-[34px] font-semibold mt-1">72&deg;</p>
          <p className="text-[13px] mt-1" style={{ color: "var(--reflective-muted)" }}>
            Partly cloudy in Dallas, TX
          </p>
        </div>

        <div
          className="rounded-[24px] p-6 backdrop-blur-xl transition-[box-shadow,border-color] duration-500 ease-out flex items-center gap-4"
          style={{
            background: "var(--reflective-card-fill)",
            border: "1px solid var(--reflective-card-border)",
            boxShadow: "0 0 46px 0 color-mix(in srgb, var(--ambient-color) 32%, transparent)",
          }}
        >
          <div
            className="w-12 h-12 rounded-[14px] shrink-0"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--ambient-color) 70%, white), color-mix(in srgb, var(--ambient-color) 90%, black))",
            }}
          />
          <div className="text-left">
            <p className="text-[15px] font-medium" style={{ color: "var(--reflective-foreground)" }}>
              Now Playing
            </p>
            <p
              className="text-[13px] mt-0.5"
              style={{ color: "color-mix(in srgb, var(--ambient-color) 60%, #6b6b6b)" }}
            >
              Ambient — ~fields
            </p>
          </div>
        </div>

        <div
          className="rounded-[24px] p-6 backdrop-blur-xl transition-[box-shadow,border-color] duration-500 ease-out"
          style={{
            background: "var(--reflective-card-fill)",
            border: "1px solid var(--reflective-card-border)",
            boxShadow: "0 0 46px 0 color-mix(in srgb, var(--ambient-color) 32%, transparent)",
          }}
        >
          <p className="text-[15px] font-medium" style={{ color: "var(--reflective-foreground)" }}>
            Notes
          </p>
          <p className="text-[13px] mt-1 leading-snug" style={{ color: "var(--reflective-muted)" }}>
            The interface should feel like it&rsquo;s letting real light bleed through it —
            not a filter, more like glass.
          </p>
        </div>
      </div>
    </div>
  );
}
