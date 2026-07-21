"use client";

import { useEffect } from "react";
import { ThinkingOrb } from "thinking-orbs";

export default function ThinkingOrbFrame() {
  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.margin = "0";
    document.body.style.minHeight = "56px";
    document.body.style.background = "transparent";
  }, []);

  return (
    <main
      aria-hidden="true"
      style={{
        display: "grid",
        width: "56px",
        height: "56px",
        placeItems: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <ThinkingOrb
        state="composing"
        size={64}
        speed={1.05}
        style={{
          width: "64px",
          height: "64px",
          transform: "scale(0.875)",
          transformOrigin: "center",
        }}
      />
    </main>
  );
}
