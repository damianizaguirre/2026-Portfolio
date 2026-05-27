"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Dallas Live Clock ──────────────────────────────────────────────────────────
function DallasTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const dallas = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(time);

  const p: Record<string, string> = {};
  for (const part of dallas) p[part.type] = part.value;

  const h    = parseInt(p.hour);
  const m    = parseInt(p.minute);
  const s    = parseInt(p.second);
  const ampm = p.dayPeriod ?? p.dayperiod ?? "";
  const isPM = ampm.toUpperCase() === "PM";
  const h24  = isPM ? (h === 12 ? 12 : h + 12) : h === 12 ? 0 : h;

  const minuteDeg = m * 6 + s * 0.1;
  const hourDeg   = (h24 % 12) * 30 + m * 0.5;
  const secondDeg = s * 6;
  const timeStr   = `${p.hour}:${p.minute}:${p.second} ${ampm}`;

  const sinD = (d: number) => Math.sin((d * Math.PI) / 180);
  const cosD = (d: number) => Math.cos((d * Math.PI) / 180);

  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
        <line x1="11" y1="11" x2={11 + 4.5 * sinD(hourDeg)}   y2={11 - 4.5 * cosD(hourDeg)}   stroke="rgba(0,0,0,0.5)"  strokeWidth="2.5" strokeLinecap="round" />
        <line x1="11" y1="11" x2={11 + 7   * sinD(minuteDeg)} y2={11 - 7   * cosD(minuteDeg)} stroke="rgba(0,0,0,0.5)"  strokeWidth="1.5" strokeLinecap="round" />
        <line x1="11" y1="11" x2={11 + 7.5 * sinD(secondDeg)} y2={11 - 7.5 * cosD(secondDeg)} stroke="rgba(0,0,0,0.35)" strokeWidth="1"   strokeLinecap="round" />
        <circle cx="11" cy="11" r="1.2" fill="rgba(0,0,0,0.5)" />
      </svg>
      <span className="text-black/50 font-light" style={{ fontSize: "var(--text-nav)" }}>
        {timeStr}
      </span>
    </div>
  );
}

// ── Tools Card – floating physics + AABB collision + drag ────────────────────────
const TOOLS = [
  { id: "xcode",  name: "Xcode",  src: "/icons/xcode.png",  radius: 22 },
  { id: "cursor", name: "Cursor", src: "/icons/cursor.png", radius: 20 },
  { id: "tool3",  name: "Tool",   src: "/icons/tool3.png",  radius: 20 },
  { id: "figma",  name: "Figma",  src: "/icons/figma.png",  radius: 20 },
  { id: "tool5",  name: "Tool 5", src: "/icons/tool5.png",  radius: 20 },
];

const ICON_SIZE = 78;
const GRAVITY   = 0.08;  // very low — slow dreamy fall
const BOUNCE    = 0.55;  // higher bounce so they stay lively
const FRICTION  = 0.994; // barely any friction — long lazy glide
const COL_DAMP  = 0.80;  // keep more energy through collisions

interface IState {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  // per-icon phase offset for the drift sine wave
  phase: number;
  dragging: boolean;
}

function resolveCollisions(icons: IState[], W: number, H: number) {
  const floor = H - ICON_SIZE;
  const wall  = W - ICON_SIZE;
  for (let i = 0; i < icons.length; i++) {
    for (let j = i + 1; j < icons.length; j++) {
      const a = icons[i];
      const b = icons[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const ox = ICON_SIZE - Math.abs(dx);
      const oy = ICON_SIZE - Math.abs(dy);
      if (ox <= 0 || oy <= 0) continue;
      if (ox < oy) {
        const half = ox / 2;
        const sign = dx > 0 ? 1 : -1;
        if (!a.dragging) a.x -= sign * half;
        if (!b.dragging) b.x += sign * half;
        a.x = Math.max(0, Math.min(a.x, wall));
        b.x = Math.max(0, Math.min(b.x, wall));
        const avx = a.vx; const bvx = b.vx;
        if (!a.dragging) a.vx = bvx * COL_DAMP;
        if (!b.dragging) b.vx = avx * COL_DAMP;
      } else {
        const half = oy / 2;
        const sign = dy > 0 ? 1 : -1;
        if (!a.dragging) a.y -= sign * half;
        if (!b.dragging) b.y += sign * half;
        a.y = Math.max(-ICON_SIZE, Math.min(a.y, floor));
        b.y = Math.max(-ICON_SIZE, Math.min(b.y, floor));
        const avy = a.vy; const bvy = b.vy;
        if (!a.dragging) a.vy = bvy * COL_DAMP;
        if (!b.dragging) b.vy = avy * COL_DAMP;
      }
    }
  }
}

function ToolsCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef     = useRef<IState[]>([]);
  const rafRef       = useRef<number>(0);
  const dragRef      = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const [, bump]     = useState(0);
  const ready        = useRef(false);
  const frameRef     = useRef(0); // increments every RAF for drift sine

  useEffect(() => {
    const el = containerRef.current;
    if (!el || ready.current) return;
    ready.current = true;
    const W = el.offsetWidth;

    stateRef.current = TOOLS.map((_, i) => ({
      id: TOOLS[i].id,
      x:  Math.random() * Math.max(0, W - ICON_SIZE),
      y:  -(ICON_SIZE * (i + 1) + Math.random() * 60 + 30),
      vx: (Math.random() - 0.5) * 1.5,  // gentler horizontal entry
      vy: Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2, // unique drift phase per icon
      dragging: false,
    }));

    const loop = () => {
      const el2 = containerRef.current;
      if (!el2) return;
      frameRef.current++;
      const t     = frameRef.current;
      const W2    = el2.offsetWidth;
      const H2    = el2.offsetHeight;
      const floor = H2 - ICON_SIZE;
      const wall  = W2 - ICON_SIZE;

      for (const ic of stateRef.current) {
        if (ic.dragging) continue;

        // Tiny sinusoidal lateral drift — gives the floating feel
        ic.vx += Math.sin(t * 0.018 + ic.phase) * 0.012;

        ic.vy += GRAVITY;
        ic.vx *= FRICTION;
        ic.x  += ic.vx;
        ic.y  += ic.vy;

        if (ic.y >= floor) {
          ic.y   = floor;
          ic.vy *= -BOUNCE;
          ic.vx *= 0.92;
          if (Math.abs(ic.vy) < 0.3) ic.vy = 0;
        }
        if (ic.y < -ICON_SIZE) { ic.y = -ICON_SIZE; ic.vy = Math.abs(ic.vy) * 0.3; }
        if (ic.x < 0)    { ic.x = 0;    ic.vx =  Math.abs(ic.vx) * BOUNCE; }
        if (ic.x > wall) { ic.x = wall; ic.vx = -Math.abs(ic.vx) * BOUNCE; }
      }

      // Dragged icon pushes others
      const dragged = stateRef.current.find((s) => s.dragging);
      if (dragged) {
        for (const other of stateRef.current) {
          if (other.dragging) continue;
          const dx = other.x - dragged.x;
          const dy = other.y - dragged.y;
          const ox = ICON_SIZE - Math.abs(dx);
          const oy = ICON_SIZE - Math.abs(dy);
          if (ox > 0 && oy > 0) {
            if (ox < oy) {
              other.x += dx > 0 ? ox : -ox;
              other.vx += dx > 0 ? 2.5 : -2.5;
            } else {
              other.y += dy > 0 ? oy : -oy;
              other.vy += dy > 0 ? 2.5 : -2.5;
            }
            other.x = Math.max(0, Math.min(other.x, wall));
            other.y = Math.max(-ICON_SIZE, Math.min(other.y, floor));
          }
        }
      }

      resolveCollisions(stateRef.current, W2, H2);
      bump((n) => n + 1);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const ic   = stateRef.current.find((s) => s.id === dragRef.current!.id);
      if (!ic) return;
      const maxX = containerRef.current.offsetWidth  - ICON_SIZE;
      const maxY = containerRef.current.offsetHeight - ICON_SIZE;
      ic.x = Math.max(0, Math.min(e.clientX - rect.left - dragRef.current.ox, maxX));
      ic.y = Math.max(0, Math.min(e.clientY - rect.top  - dragRef.current.oy, maxY));
    };
    const onUp = () => {
      if (!dragRef.current) return;
      const ic = stateRef.current.find((s) => s.id === dragRef.current!.id);
      if (ic) { ic.dragging = false; ic.vy = 0.5; } // gentle release
      dragRef.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const ic = stateRef.current.find((s) => s.id === id);
    if (!ic) return;
    ic.dragging = true;
    ic.vx = 0;
    ic.vy = 0;
    dragRef.current = { id, ox: ICON_SIZE / 2, oy: ICON_SIZE / 2 };
  };

  return (
    <div
      className="bg-white rounded-[40px] flex flex-col overflow-hidden"
      style={{ flex: "1 1 340px", minHeight: 443, boxShadow: "0 0 8px rgba(0,0,0,0.18)" }}
    >
      <div className="px-8 pt-8 pb-2 shrink-0">
        <h2 className="font-normal text-black" style={{ fontSize: "clamp(24px,1.875vw,36px)" }}>
          Tools.
        </h2>
      </div>
      <div
        ref={containerRef}
        className="flex-1 relative"
        style={{ userSelect: "none", minHeight: 300 }}
      >
        {TOOLS.map((tool, i) => {
          const s = stateRef.current[i];
          if (!s) return null;
          return (
            <img
              key={tool.id}
              src={tool.src}
              alt={tool.name}
              onMouseDown={(e) => onMouseDown(e, tool.id)}
              draggable={false}
              style={{
                position:      "absolute",
                left:          Math.round(s.x),
                top:           Math.round(s.y),
                width:         ICON_SIZE,
                height:        ICON_SIZE,
                borderRadius:  tool.radius,
                cursor:        s.dragging ? "grabbing" : "grab",
                objectFit:     "cover",
                pointerEvents: "auto",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Connect Card ──────────────────────────────────────────────────────────────
function ConnectCard() {
  const links = [
    {
      label: "Damian Izaguirre",
      href:  "https://linkedin.com/in/damianizaguirre",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10V9h4v1.77A6 6 0 0 1 16 8z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "damianpizaguirre",
      href:  "https://instagram.com/damianpizaguirre",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "damianizaguirre",
      href:  "https://x.com/damianizaguirre",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "damianpizaguirre@gmail.com",
      href:  "mailto:damianpizaguirre@gmail.com",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="bg-white rounded-[40px] flex flex-col p-8"
      style={{ flex: "0 0 auto", width: "clamp(300px,29.7vw,570px)", minHeight: 443, boxShadow: "0 0 8px rgba(0,0,0,0.18)" }}
    >
      <h2 className="font-normal text-black mb-6" style={{ fontSize: "clamp(24px,1.875vw,36px)" }}>Connect.</h2>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-5 py-3 bg-white border rounded-full hover:bg-gray-50 transition-colors"
            style={{ borderColor: "rgba(213,211,211,1)", borderRadius: 32 }}
          >
            <span className="text-black shrink-0">{link.icon}</span>
            <span className="text-black/70 font-light truncate" style={{ fontSize: "clamp(14px,1.25vw,24px)" }}>
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Education Card ────────────────────────────────────────────────────────────
function EducationCard() {
  return (
    <div
      className="bg-white rounded-[40px] flex flex-col p-8"
      style={{ flex: "0 0 auto", width: "clamp(280px,27.3vw,525px)", minHeight: 443, boxShadow: "0 0 8px rgba(0,0,0,0.18)" }}
    >
      <h2
        className="font-normal text-black"
        style={{ fontSize: "clamp(24px,1.875vw,36px)", marginBottom: "clamp(48px,6.5vw,126px)" }}
      >
        Education.
      </h2>
      <div>
        <p className="font-medium text-black" style={{ fontSize: "clamp(14px,1.25vw,24px)", lineHeight: 1.25, marginBottom: 24 }}>
          Bachelor&apos;s in Arts, Technology, and Emerging Communication
        </p>
        <p className="font-light text-black" style={{ fontSize: "clamp(13px,1.04vw,20px)", lineHeight: 1.5 }}>
          The University of Texas at Dallas<br />2022–2026
        </p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "rgb(247,247,247)" }}>
      <Navbar />

      {/* Bio */}
      <section
        style={{
          paddingTop:    "clamp(80px,8.33vw,160px)",
          paddingBottom: "clamp(48px,4.17vw,80px)",
          paddingLeft:   "var(--px-side)",
          paddingRight:  "var(--px-side)",
        }}
      >
        <h1 className="font-normal text-black" style={{ fontSize: "var(--text-hero)", marginBottom: "clamp(14px,1.25vw,24px)" }}>
          Hi, I&apos;m Damian Izaguirre!
        </h1>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10">
          <div className="flex items-center gap-2">
            <svg width="16" height="20" viewBox="0 0 18 22" fill="rgba(0,0,0,0.5)">
              <path d="M9 0C4.48 0 1 3.48 1 8c0 5.25 8 14 8 14s8-8.75 8-14c0-4.52-3.48-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span className="text-black/50 font-light" style={{ fontSize: "var(--text-nav)" }}>Dallas, TX</span>
          </div>

          <DallasTime />

          <div className="flex items-center gap-2">
            <svg width="22" height="18" viewBox="0 0 24 20" fill="rgba(0,0,0,0.5)">
              <polygon points="12,0 24,7 12,14 0,7" />
              <path d="M4 9.5v6.5c0 0 2.5 4 8 4s8-4 8-4V9.5L12 14 4 9.5z" />
              <line x1="24" y1="7" x2="24" y2="14" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="15" r="1.5" />
            </svg>
            <span className="text-black/50 font-light" style={{ fontSize: "var(--text-nav)" }}>UTD</span>
          </div>
        </div>

        <p
          className="text-black/70 font-normal"
          style={{ fontSize: "var(--text-nav)", maxWidth: "clamp(320px,52.3vw,1004px)", lineHeight: 1.6 }}
        >
          I design products where design, software, and story meet.
          <br /><br />
          In pursuit of greatness — creating, designing, building for others and for myself.
          <br /><br />
          Let&apos;s talk!
        </p>
      </section>

      {/* Cards */}
      <div
        className="flex flex-wrap gap-5 pb-24"
        style={{ paddingLeft: "var(--px-side)", paddingRight: "var(--px-side)" }}
      >
        <ConnectCard />
        <ToolsCard />
        <EducationCard />
      </div>

      <Footer />
    </main>
  );
}
