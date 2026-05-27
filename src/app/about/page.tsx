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

  const p = Object.fromEntries(dallas.map((d) => [d.type, d.value]));
  const h = parseInt(p.hour);
  const m = parseInt(p.minute);
  const s = parseInt(p.second);
  const isPM = p.dayperiod === "PM";
  const h24 = isPM ? (h === 12 ? 12 : h + 12) : h === 12 ? 0 : h;

  const minuteDeg = m * 6 + s * 0.1;
  const hourDeg   = (h24 % 12) * 30 + m * 0.5;
  const secondDeg = s * 6;

  const timeStr = `${p.hour}:${p.minute}:${p.second} ${p.dayperiod}`;

  const sin = (deg: number) => Math.sin((deg * Math.PI) / 180);
  const cos = (deg: number) => Math.cos((deg * Math.PI) / 180);

  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        {/* Clock face */}
        <circle cx="11" cy="11" r="9.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
        {/* Hour hand */}
        <line
          x1="11" y1="11"
          x2={11 + 4.5 * sin(hourDeg)}
          y2={11 - 4.5 * cos(hourDeg)}
          stroke="rgba(0,0,0,0.5)" strokeWidth="2.5" strokeLinecap="round"
        />
        {/* Minute hand */}
        <line
          x1="11" y1="11"
          x2={11 + 7 * sin(minuteDeg)}
          y2={11 - 7 * cos(minuteDeg)}
          stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round"
        />
        {/* Second hand */}
        <line
          x1="11" y1="11"
          x2={11 + 7.5 * sin(secondDeg)}
          y2={11 - 7.5 * cos(secondDeg)}
          stroke="rgba(0,0,0,0.35)" strokeWidth="1" strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="11" cy="11" r="1.2" fill="rgba(0,0,0,0.5)" />
      </svg>
      <span className="text-black/50 font-light" style={{ fontSize: "var(--text-nav)" }}>
        {timeStr}
      </span>
    </div>
  );
}

// ── Tools Card – gravity physics + drag ───────────────────────────────────────
const TOOLS = [
  { id: "xcode",  name: "Xcode",  src: "/icons/xcode.png",  radius: 22 },
  { id: "cursor", name: "Cursor", src: "/icons/cursor.png", radius: 20 },
  { id: "tool3",  name: "Tool",   src: "/icons/tool3.png",  radius: 20 },
  { id: "figma",  name: "Figma",  src: "/icons/figma.png",  radius: 20 },
  { id: "tool5",  name: "Tool 5", src: "/icons/tool5.png",  radius: 20 },
];

const ICON_SIZE = 78;
const GRAVITY   = 0.55;
const BOUNCE    = 0.42;
const FRICTION  = 0.985;

interface IState {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  dragging: boolean;
}

function ToolsCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef     = useRef<IState[]>([]);
  const rafRef       = useRef<number>(0);
  const dragRef      = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const [, bump]     = useState(0);
  const ready        = useRef(false);

  // Init + physics loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el || ready.current) return;
    ready.current = true;

    const W = el.offsetWidth;

    stateRef.current = TOOLS.map((t, i) => ({
      id: t.id,
      x: 16 + (i * (W - ICON_SIZE - 32)) / (TOOLS.length - 1),
      y: -(ICON_SIZE + i * 60 + Math.random() * 20),
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2,
      dragging: false,
    }));

    const tick = () => {
      const el2 = containerRef.current;
      if (!el2) return;
      const floorY = el2.offsetHeight - ICON_SIZE;
      const wallX  = el2.offsetWidth  - ICON_SIZE;
      let dirty = false;

      for (const ic of stateRef.current) {
        if (ic.dragging) continue;
        ic.vy += GRAVITY;
        ic.vx *= FRICTION;
        ic.x  += ic.vx;
        ic.y  += ic.vy;

        if (ic.y >= floorY) {
          ic.y   = floorY;
          ic.vy *= -BOUNCE;
          ic.vx *= 0.88;
          if (Math.abs(ic.vy) < 0.8) ic.vy = 0;
        }
        if (ic.y < -ICON_SIZE) { ic.y = -ICON_SIZE; ic.vy *= -BOUNCE; }
        if (ic.x < 0)          { ic.x = 0;          ic.vx *= -BOUNCE; }
        if (ic.x > wallX)      { ic.x = wallX;       ic.vx *= -BOUNCE; }
        dirty = true;
      }
      if (dirty) bump((n) => n + 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Global mouse drag handlers
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
      bump((n) => n + 1);
    };
    const onUp = () => {
      if (!dragRef.current) return;
      const ic = stateRef.current.find((s) => s.id === dragRef.current!.id);
      if (ic) { ic.dragging = false; ic.vy = 2; }
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
      <h2 className="font-normal text-black mb-6" style={{ fontSize: "clamp(24px,1.875vw,36px)" }}>
        Connect.
      </h2>
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
            <span
              className="text-black/70 font-light truncate"
              style={{ fontSize: "clamp(14px,1.25vw,24px)" }}
            >
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
        <p
          className="font-medium text-black"
          style={{ fontSize: "clamp(14px,1.25vw,24px)", lineHeight: 1.25, marginBottom: 24 }}
        >
          Bachelor&apos;s in Arts, Technology, and Emerging Communication
        </p>
        <p
          className="font-light text-black"
          style={{ fontSize: "clamp(13px,1.04vw,20px)", lineHeight: 1.5 }}
        >
          The University of Texas at Dallas
          <br />
          2022–2026
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "rgb(247,247,247)" }}>
      <Navbar />

      {/* ── Bio ── */}
      <section
        style={{
          paddingTop:    "clamp(80px,8.33vw,160px)",
          paddingBottom: "clamp(48px,4.17vw,80px)",
          paddingLeft:   "var(--px-side)",
          paddingRight:  "var(--px-side)",
        }}
      >
        <h1
          className="font-normal text-black"
          style={{ fontSize: "var(--text-hero)", marginBottom: "clamp(14px,1.25vw,24px)" }}
        >
          Hi, I&apos;m Damian Izaguirre!
        </h1>

        {/* Meta tags row */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10">
          {/* Location */}
          <div className="flex items-center gap-2">
            <svg width="16" height="20" viewBox="0 0 18 22" fill="rgba(0,0,0,0.5)">
              <path d="M9 0C4.48 0 1 3.48 1 8c0 5.25 8 14 8 14s8-8.75 8-14c0-4.52-3.48-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span className="text-black/50 font-light" style={{ fontSize: "var(--text-nav)" }}>
              Dallas, TX
            </span>
          </div>

          {/* Live Dallas clock */}
          <DallasTime />

          {/* UTD */}
          <div className="flex items-center gap-2">
            <svg width="22" height="18" viewBox="0 0 25 20" fill="rgba(0,0,0,0.5)">
              <path d="M12.5 0L25 7v2H0V7L12.5 0zM2 11h3v6H2v-6zm5.5 0h3v6h-3v-6zm6 0h3v6h-3v-6zm5.5 0h3v6h-3v-6zM0 18h25v2H0v-2z" />
            </svg>
            <span className="text-black/50 font-light" style={{ fontSize: "var(--text-nav)" }}>
              UTD
            </span>
          </div>
        </div>

        {/* Bio paragraph */}
        <p
          className="text-black/70 font-normal"
          style={{
            fontSize:   "var(--text-nav)",
            maxWidth:   "clamp(320px,52.3vw,1004px)",
            lineHeight: 1.6,
          }}
        >
          I design products where design, software, and story meet.
          <br /><br />
          In pursuit of greatness — creating, designing, building for others and for myself.
          <br /><br />
          Let&apos;s talk!
        </p>
      </section>

      {/* ── Cards ── */}
      <div
        className="flex flex-wrap gap-5 pb-24"
        style={{
          paddingLeft:  "var(--px-side)",
          paddingRight: "var(--px-side)",
        }}
      >
        <ConnectCard />
        <ToolsCard />
        <EducationCard />
      </div>

      <Footer />
    </main>
  );
}
