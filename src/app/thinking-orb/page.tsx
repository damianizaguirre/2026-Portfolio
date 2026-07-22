"use client";

import { useEffect } from "react";
import { ThinkingOrb } from "thinking-orbs";

export default function ThinkingOrbFrame() {
  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.margin = "0";
    document.body.style.minHeight = "64px";
    document.body.style.background = "transparent";
  }, []);

  return (
    <main
      aria-hidden="true"
      style={{
        display: "grid",
        width: "64px",
        height: "64px",
        placeItems: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <ThinkingOrb state="composing" size={64} />
    </main>
  );
}
