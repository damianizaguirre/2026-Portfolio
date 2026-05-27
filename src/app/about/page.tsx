"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Static clock icon (no animation) ─────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="9.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
    {/* hour hand ~10 o’clock */}
    <line x1="11" y1="11" x2="7.1"  y2="8.75" stroke="rgba(0,0,0,0.5)" strokeWidth="2"   strokeLinecap="round" />
    {/* minute hand ~2 o’clock */}
    <line x1="11" y1="11" x2="17.1" y2="7.5"  stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="11" cy="11" r="1.2" fill="rgba(0,0,0,0.5)" />
  </svg>
);

// ── Exact grad cap from Figma (node 558:1343) ─────────────────────────────────
const GradCapIcon = () => (
  <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5618 2.62964L2.68835 6.00398C2.57828 6.05114 2.48446 6.12957 2.41853 6.22954C2.35261 6.32951 2.31746 6.44662 2.31746 6.56637C2.31746 6.68613 2.35261 6.80324 2.41853 6.90321C2.48446 7.00318 2.57828 7.08161 2.68835 7.12877L10.5618 10.5031C11.0427 10.7091 11.5605 10.8153 12.0837 10.8152H12.6368C13.16 10.8153 13.6777 10.7091 14.1586 10.5031L22.0321 7.12877C22.1422 7.08161 22.236 7.00318 22.3019 6.90321C22.3679 6.80324 22.403 6.68613 22.403 6.56637C22.403 6.44662 22.3679 6.32951 22.3019 6.22954C22.236 6.12957 22.1422 6.05114 22.0321 6.00398L14.1586 2.62964C13.6777 2.42361 13.16 2.31744 12.6368 2.31754H12.0837C11.5605 2.31744 11.0427 2.42361 10.5618 2.62964ZM2.31754 9.48957L4.63509 10.4846V15.4719C4.63511 16.0459 4.79499 16.6085 5.09681 17.0967C5.39863 17.5849 5.83046 17.9794 6.34389 18.236L7.58918 18.8586C9.0733 19.6005 10.7082 19.991 12.3674 19.9998C14.0266 20.0087 15.6656 19.6357 17.1576 18.9096L18.562 18.2267C19.083 17.9732 19.5223 17.5783 19.8296 17.0871C20.137 16.5959 20.3 16.0282 20.3001 15.4487V10.3919L22.9452 9.25782C23.4715 9.03168 23.92 8.65619 24.2351 8.17783C24.5502 7.69946 24.7182 7.1392 24.7182 6.56637C24.7182 5.99355 24.5502 5.43329 24.2351 4.95492C23.92 4.47656 23.4715 4.10107 22.9452 3.87493L15.0718 0.499045C14.3023 0.169509 13.4739 -0.000272223 12.6368 3.27623e-07H12.0837C11.2466 -0.000272223 10.4182 0.169509 9.64871 0.499045L1.77678 3.87493C1.25024 4.10115 0.801421 4.47654 0.485689 4.95481C0.169957 5.43307 0.0011192 5.99329 0 6.56637L0 13.519C0 13.8263 0.122085 14.1211 0.339396 14.3384C0.556708 14.5557 0.851447 14.6778 1.15877 14.6778C1.4661 14.6778 1.76084 14.5557 1.97815 14.3384C2.19546 14.1211 2.31754 13.8263 2.31754 13.519V9.48957ZM6.95263 15.4719V11.478L9.64871 12.6337C10.4182 12.9632 11.2466 13.133 12.0837 13.1327H12.6368C13.4739 13.133 14.3023 12.9632 15.0718 12.6337L17.9826 11.3853V15.4487C17.9826 15.5939 17.9417 15.736 17.8647 15.859C17.7876 15.982 17.6775 16.0807 17.5469 16.144L16.1425 16.8269C14.9703 17.3969 13.6827 17.6896 12.3793 17.6823C11.0759 17.6751 9.79168 17.3681 8.6259 16.7852L7.37906 16.1626C7.2509 16.0983 7.14315 15.9997 7.06784 15.8778C6.99253 15.7558 6.95264 15.6153 6.95263 15.4719Z"
      fill="rgba(0,0,0,0.5)"
    />
  </svg>
);

// ── Dallas time display (static icon, live text) ──────────────────────────────
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
  const ampm    = p.dayPeriod ?? p.dayperiod ?? "";
  const timeStr = `${p.hour}:${p.minute}:${p.second} ${ampm}`;

  return (
    <div className="flex items-center gap-2">
      <ClockIcon />
      <span className="text-black/50 font-light" style={{ fontSize: "var(--text-nav)" }}>
        {timeStr}
      </span>
    </div>
  );
}

// ── Tools Card – floating + tilt/spin + AABB collision + drag ─────────────────────
const TOOLS = [
  { id: "xcode",  name: "Xcode",  src: "/icons/xcode.png",  radius: 22 },
  { id: "cursor", name: "Cursor", src: "/icons/cursor.png", radius: 20 },
  { id: "tool3",  name: "Tool",   src: "/icons/tool3.png",  radius: 20 },
  { id: "figma",  name: "Figma",  src: "/icons/figma.png",  radius: 20 },
  { id: "tool5",  name: "Tool 5", src: "/icons/tool5.png",  radius: 20 },
];

const ICON_SIZE = 78;
const GRAVITY   = 0.08;
const BOUNCE    = 0.55;
const FRICTION  = 0.994;
const COL_DAMP  = 0.80;

interface IState {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;   // degrees
  angularVel: number; // degrees / frame
  dragging: boolean;
}

function resolveCollisions(icons: IState[], W: number, H: number) {
  const floor = H - ICON_SIZE;
  const wall  = W - ICON_SIZE;
  for (let i = 0; i < icons.length; i++) {
    for (let j = i + 1; j < icons.length; j++) {
      const a = icons[i], b = icons[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const ox = ICON_SIZE - Math.abs(dx);
      const oy = ICON_SIZE - Math.abs(dy);
      if (ox <= 0 || oy <= 0) continue;
      if (ox < oy) {
        const half = ox / 2, sign = dx > 0 ? 1 : -1;
        if (!a.dragging) { a.x -= sign * half; a.x = Math.max(0, Math.min(a.x, wall)); }
        if (!b.dragging) { b.x += sign * half; b.x = Math.max(0, Math.min(b.x, wall)); }
        const avx = a.vx, bvx = b.vx;
        if (!a.dragging) { a.vx = bvx * COL_DAMP; a.angularVel += a.vx * 0.3; }
        if (!b.dragging) { b.vx = avx * COL_DAMP; b.angularVel += b.vx * 0.3; }
      } else {
        const half = oy / 2, sign = dy > 0 ? 1 : -1;
        if (!a.dragging) { a.y -= sign * half; a.y = Math.max(-ICON_SIZE, Math.min(a.y, floor)); }
        if (!b.dragging) { b.y += sign * half; b.y = Math.max(-ICON_SIZE, Math.min(b.y, floor)); }
        const avy = a.vy, bvy = b.vy;
        if (!a.dragging) { a.vy = bvy * COL_DAMP; a.angularVel += a.vx * 0.2; }
        if (!b.dragging) { b.vy = avy * COL_DAMP; b.angularVel += b.vx * 0.2; }
      }
    }
  }
}

function ToolsCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef     = useRef<IState[]>([]);
  const rafRef       = useRef<number>(0);
  const dragRef      = useRef<{ id: string; ox: number; oy: number; lastX: number; lastY: number } | null>(null);
  const [, bump]     = useState(0);
  const ready        = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || ready.current) return;
    ready.current = true;
    const W = el.offsetWidth;

    stateRef.current = TOOLS.map((t, i) => ({
      id:         t.id,
      x:          Math.random() * Math.max(0, W - ICON_SIZE),
      y:          -(ICON_SIZE * (i + 1) + Math.random() * 60 + 30),
      vx:         (Math.random() - 0.5) * 1.5,
      vy:         Math.random() * 0.5,
      rotation:   (Math.random() - 0.5) * 40,   // random initial tilt
      angularVel: (Math.random() - 0.5) * 3,    // random initial spin
      dragging:   false,
    }));

    const loop = () => {
      const el2 = containerRef.current;
      if (!el2) return;
      const W2    = el2.offsetWidth;
      const H2    = el2.offsetHeight;
      const floor = H2 - ICON_SIZE;
      const wall  = W2 - ICON_SIZE;

      for (const ic of stateRef.current) {
        if (ic.dragging) continue;

        // Linear physics
        ic.vy += GRAVITY;
        ic.vx *= FRICTION;
        ic.x  += ic.vx;
        ic.y  += ic.vy;

        // Rotation driven by horizontal velocity — tilt in direction of travel
        ic.angularVel += ic.vx * 0.18;   // gain spin from lateral movement
        ic.angularVel *= 0.96;            // damping
        ic.rotation   += ic.angularVel;

        // Wall / floor bounces
        if (ic.y >= floor) {
          ic.y   = floor;
          ic.vy *= -BOUNCE;
          ic.vx *= 0.92;
          ic.angularVel *= 0.7;           // scrub some spin on landing
          if (Math.abs(ic.vy) < 0.3) ic.vy = 0;
        }
        if (ic.y < -ICON_SIZE) { ic.y = -ICON_SIZE; ic.vy = Math.abs(ic.vy) * 0.3; }
        if (ic.x < 0)    { ic.x = 0;    ic.vx =  Math.abs(ic.vx) * BOUNCE; ic.angularVel *= -0.6; }
        if (ic.x > wall) { ic.x = wall; ic.vx = -Math.abs(ic.vx) * BOUNCE; ic.angularVel *= -0.6; }
      }

      // Dragged icon pushes others
      const dragged = stateRef.current.find((s) => s.dragging);
      if (dragged) {
        for (const other of stateRef.current) {
          if (other.dragging) continue;
          const dx = other.x - dragged.x, dy = other.y - dragged.y;
          const ox = ICON_SIZE - Math.abs(dx), oy = ICON_SIZE - Math.abs(dy);
          if (ox > 0 && oy > 0) {
            if (ox < oy) {
              other.x  += dx > 0 ? ox : -ox;
              other.vx += dx > 0 ? 2.5 : -2.5;
              other.angularVel += other.vx * 0.4;
            } else {
              other.y  += dy > 0 ? oy : -oy;
              other.vy += dy > 0 ? 2.5 : -2.5;
              other.angularVel += other.vx * 0.3;
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
      const newX = Math.max(0, Math.min(e.clientX - rect.left - dragRef.current.ox, containerRef.current.offsetWidth  - ICON_SIZE));
      const newY = Math.max(0, Math.min(e.clientY - rect.top  - dragRef.current.oy, containerRef.current.offsetHeight - ICON_SIZE));
      // Track velocity from drag movement
      const driftVx = newX - ic.x;
      dragRef.current.lastX = driftVx;
      ic.x = newX;
      ic.y = newY;
      // Tilt while dragging based on movement direction
      ic.angularVel += driftVx * 0.25;
      ic.rotation   += ic.angularVel * 0.5;
      ic.angularVel *= 0.85;
    };
    const onUp = () => {
      if (!dragRef.current) return;
      const ic = stateRef.current.find((s) => s.id === dragRef.current!.id);
      if (ic) {
        ic.dragging   = false;
        ic.vy         = 0.5;
        ic.vx         = dragRef.current.lastX * 0.4; // carry throw momentum
        ic.angularVel = ic.vx * 0.5;                 // spin on throw
      }
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
    ic.dragging   = true;
    ic.vx = 0; ic.vy = 0;
    dragRef.current = { id, ox: ICON_SIZE / 2, oy: ICON_SIZE / 2, lastX: 0, lastY: 0 };
  };

  return (
    <div
      className="bg-white rounded-[40px] flex flex-col overflow-hidden"
      style={{ flex: "1 1 340px", minHeight: 443, boxShadow: "0 0 8px rgba(0,0,0,0.18)" }}
    >
      <div className="px-8 pt-8 pb-2 shrink-0">
        <h2 className="font-normal text-black" style={{ fontSize: "clamp(24px,1.875vw,36px)" }}>Tools.</h2>
      </div>
      <div ref={containerRef} className="flex-1 relative" style={{ userSelect: "none", minHeight: 300 }}>
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
                position:        "absolute",
                left:            Math.round(s.x),
                top:             Math.round(s.y),
                width:           ICON_SIZE,
                height:          ICON_SIZE,
                borderRadius:    tool.radius,
                cursor:          s.dragging ? "grabbing" : "grab",
                objectFit:       "cover",
                transform:       `rotate(${s.rotation.toFixed(1)}deg)`,
                transformOrigin: "center center",
                pointerEvents:   "auto",
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
            <GradCapIcon />
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
