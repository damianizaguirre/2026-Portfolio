"use client";

import { useEffect, useRef, useState } from "react";

type HomeBottomCueProps = {
  frameId: string;
};

export default function HomeBottomCue({ frameId }: HomeBottomCueProps) {
  const [hidden, setHidden] = useState(false);
  const frameWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    const frame = document.getElementById(frameId) as HTMLIFrameElement | null;

    if (!frame) {
      return;
    }

    let frameWindow: Window | null = null;
    let cleanupFrameScroll: (() => void) | null = null;

    const syncVisibility = () => {
      const doc = frame.contentDocument;
      const iconAnchor = doc?.getElementById("social-icons");

      if (!doc || !iconAnchor || !frame.contentWindow) {
        setHidden(false);
        return;
      }

      const iconTop = iconAnchor.getBoundingClientRect().top;
      setHidden(iconTop < frame.contentWindow.innerHeight * 0.88);
    };

    const bindFrame = () => {
      frameWindow = frame.contentWindow;
      frameWindowRef.current = frameWindow;
      syncVisibility();

      if (frameWindow) {
        frameWindow.addEventListener("scroll", syncVisibility, { passive: true });
        frameWindow.addEventListener("resize", syncVisibility);
        cleanupFrameScroll = () => {
          frameWindow?.removeEventListener("scroll", syncVisibility);
          frameWindow?.removeEventListener("resize", syncVisibility);
        };
      }
    };

    frame.addEventListener("load", bindFrame);
    bindFrame();

    return () => {
      frame.removeEventListener("load", bindFrame);
      cleanupFrameScroll?.();
    };
  }, [frameId]);

  const scrollToIcons = () => {
    const frameWindow = frameWindowRef.current;
    const doc = frameWindow?.document;
    const iconAnchor = doc?.getElementById("social-icons");

    if (!frameWindow || !iconAnchor) {
      return;
    }

    const targetY = Math.max(0, iconAnchor.getBoundingClientRect().top + frameWindow.scrollY - frameWindow.innerHeight * 0.48);
    frameWindow.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <button
      className={`home-bottom-cue${hidden ? " is-hidden" : ""}`}
      type="button"
      aria-label="Scroll to app icons"
      onClick={scrollToIcons}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.75 6.5 8 9.75l3.25-3.25" />
      </svg>
    </button>
  );
}
