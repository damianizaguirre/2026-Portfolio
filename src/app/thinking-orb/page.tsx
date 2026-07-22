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

  return <ThinkingOrb state="composing" size={64} />;
}
