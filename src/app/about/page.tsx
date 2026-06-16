"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

function DallasTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        hour: "numeric", minute: "2-digit", second: "2-digit", hour12: false,
      }).format(new Date());
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "5em", display: "inline-block" }}>{time}</span>;
}

const experience = [
  { role: "Mismo — App Designer & Developer", period: "March 2026 – Present" },
  { role: "Capital One — UTD Design Partnership", period: "August – December 2025" },
  { role: "Sancorda Medical — Product Design Intern", period: "May – August 2025" },
  { role: "Association of Computing Machinery at UTD — Designer", period: "August 2025 – May 2026" },
];

const moments = [
  { src: "/about/m1.jpg",  w: 189, h: 252, x: 50,  y: 0   },
  { src: "/about/m2.jpg",  w: 189, h: 252, x: 292, y: -20 },
  { src: "/about/m3.jpg",  w: 189, h: 252, x: 585, y: -40 },
  { src: "/about/m4.jpg",  w: 252, h: 189, x: 878, y: 3   },
  { src: "/about/m5.jpg",  w: 252, h: 189, x: 75,  y: 175 },
  { src: "/about/m6.jpg",  w: 189, h: 252, x: 455, y: 155 },
  { src: "/about/m7.jpg",  w: 189, h: 252, x: 774, y: 135 },
  { src: "/about/m8.jpg",  w: 189, h: 252, x: 1067,y: 115 },
  { src: "/about/m9.jpg",  w: 189, h: 252, x: 100, y: 350 },
  { src: "/about/m10.jpg", w: 189, h: 252, x: 367, y: 330 },
  { src: "/about/m11.jpg", w: 189, h: 252, x: 660, y: 310 },
  { src: "/about/m12.jpg", w: 220, h: 170, x: 484, y: 505 },
  { src: "/about/m13.jpg", w: 220, h: 123, x: 687, y: 560 },
  { src: "/about/m14.jpg", w: 189, h: 252, x: 1011,y: 505 },
];

const sections = ["Me", "Experience", "Education", "Shelf", "Moments"];

export default function About() {
  const [active, setActive] = useState("Me");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sticky sidebar */}
        <aside
          className="hidden lg:flex flex-col gap-[9px] sticky top-[67px] h-fit"
          style={{ paddingLeft: "clamp(20px, 2.97vw, 57px)", paddingTop: "clamp(24px, 1.72vw, 33px)", minWidth: "clamp(120px, 10vw, 190px)", fontSize: "clamp(14px, 1.04vw, 20px)" }}
        >
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className="transition-colors"
              style={{ color: active === s ? "rgba(0,72,255,0.67)" : "rgba(0,0,0,0.5)", textDecoration: "none" }}
            >
              {s}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0" style={{ paddingRight: "clamp(20px, 2.97vw, 57px)" }}>

          {/* Hero banner */}
          <section id="me" style={{ paddingTop: "clamp(16px, 1.72vw, 33px)" }}>
            <div className="relative overflow-hidden" style={{ height: "clamp(160px, 19.9vw, 382px)", borderRadius: "15px" }}>
              <Image src="/about/banner.jpg" alt="Damian's photo banner" fill className="object-cover" priority />
              {/* Profile circle */}
              <div
                className="absolute border-[4px] border-white overflow-hidden"
                style={{
                  width: "clamp(70px, 10.2vw, 196px)",
                  height: "clamp(70px, 10.2vw, 196px)",
                  borderRadius: "50%",
                  bottom: "-25%",
                  right: "clamp(16px, 2vw, 40px)",
                }}
              >
                <Image src="/about/profile.jpg" alt="Damian Izaguirre" fill className="object-cover" />
              </div>
            </div>
          </section>

          {/* Identity */}
          <section style={{ paddingTop: "clamp(36px, 4.17vw, 80px)", paddingBottom: "clamp(20px, 2vw, 38px)" }}>
            <h1 className="font-semibold text-black" style={{ fontSize: "clamp(22px, 1.875vw, 36px)", letterSpacing: "-0.02em", marginBottom: "clamp(8px, 0.6vw, 12px)" }}>
              Damian Izaguirre
            </h1>

            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-x-[clamp(12px,1.6vw,30px)] gap-y-2" style={{ fontSize: "clamp(12px, 1vw, 19px)", color: "rgba(0,0,0,0.5)", marginBottom: "clamp(10px, 1.1vw, 22px)" }}>
              <span className="flex items-center gap-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/icon-location.svg" alt="" className="h-[1.1em] w-auto" />
                Dallas, TX
              </span>
              <span className="flex items-center gap-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/icon-clock.svg" alt="" className="h-[1.1em] w-auto" />
                <DallasTime />
              </span>
              <span className="flex items-center gap-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/icon-utd.svg" alt="" className="h-[1.1em] w-auto" />
                UTD
              </span>
            </div>

            {/* Bio */}
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em", lineHeight: 1.5, marginBottom: "clamp(12px, 1.25vw, 24px)" }}>
              I design products where design, software, and story meet.<br />
              In pursuit of greatness — creating, designing, and building.
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap gap-[clamp(6px,0.7vw,12px)]">
              {[
                { icon: "/about/icon-linkedin.svg", label: "Damian Izaguirre",          href: "https://linkedin.com/in/damianizaguirre" },
                { icon: "/about/icon-instagram.svg",label: "damianpizaguirre",           href: "https://instagram.com/damianpizaguirre" },
                { icon: "/about/icon-x.svg",        label: "damianizaguirre",            href: "https://x.com/damianizaguirre" },
                { icon: "/about/icon-email.svg",    label: "izaguirredamian20@gmail.com", href: "mailto:izaguirredamian20@gmail.com" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-[#efefef] rounded-full"
                  style={{ gap: "clamp(6px,0.7vw,14px)", padding: "clamp(6px,0.5vw,8px) clamp(10px,0.9vw,18px)", fontSize: "clamp(11px,0.98vw,18.8px)", color: "#575757", textDecoration: "none" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt="" style={{ height: "clamp(14px,1.2vw,23px)", width: "auto" }} />
                  {label}
                </a>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience" style={{ paddingBottom: "clamp(28px, 2.9vw, 56px)" }}>
            <div className="flex items-center gap-3" style={{ marginBottom: "clamp(16px, 1.67vw, 32px)" }}>
              <h2 className="font-medium text-black" style={{ fontSize: "clamp(16px, 1.3vw, 25px)", letterSpacing: "-0.02em" }}>Experience</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/icon-divider.svg" alt="" style={{ height: "1px", width: "clamp(28px,2.5vw,48px)" }} />
            </div>
            <div className="flex flex-col" style={{ gap: "clamp(16px, 1.35vw, 26px)" }}>
              {experience.map(({ role, period }) => (
                <div key={role}>
                  <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>{role}</p>
                  <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(4px, 0.5vw, 8px)" }}>{period}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section id="education" style={{ paddingBottom: "clamp(28px, 2.9vw, 56px)" }}>
            <div className="flex items-center gap-3" style={{ marginBottom: "clamp(16px, 1.67vw, 32px)" }}>
              <h2 className="font-medium text-black" style={{ fontSize: "clamp(16px, 1.3vw, 25px)", letterSpacing: "-0.02em" }}>Education</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/icon-divider.svg" alt="" style={{ height: "1px", width: "clamp(28px,2.5vw,48px)" }} />
            </div>
            <div>
              <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>The University of Texas at Dallas — B.A. Arts, Technology, and Emerging Communication</p>
              <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(4px, 0.5vw, 8px)" }}>August 2022 – May 2026</p>
            </div>
            <div style={{ marginTop: "clamp(16px, 1.67vw, 32px)" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "clamp(12px, 1.25vw, 24px)" }}>
                <h3 className="font-medium text-black" style={{ fontSize: "clamp(16px, 1.3vw, 25px)", letterSpacing: "-0.02em" }}>Certifications</h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/icon-divider.svg" alt="" style={{ height: "1px", width: "clamp(28px,2.5vw,48px)" }} />
              </div>
              <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>The University of Texas at Dallas — Applied Experience Design & Research</p>
              <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(4px, 0.5vw, 8px)" }}>August 2022 – May 2026</p>
            </div>
          </section>

          {/* Shelf */}
          <section id="shelf" style={{ paddingBottom: "clamp(28px, 2.9vw, 56px)" }}>
            <div className="flex items-center gap-3" style={{ marginBottom: "clamp(20px, 2.08vw, 40px)" }}>
              <h2 className="font-medium text-black" style={{ fontSize: "clamp(16px, 1.3vw, 25px)", letterSpacing: "-0.02em" }}>Shelf</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/icon-divider.svg" alt="" style={{ height: "1px", width: "clamp(28px,2.5vw,48px)" }} />
            </div>

            {/* Music */}
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>My recent listens.</p>
            <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "4px", marginBottom: "clamp(12px, 1.25vw, 24px)" }}>Spotify</p>
            <div className="bg-white rounded-[13px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden" style={{ padding: "clamp(12px,2.55vw,49px)", marginBottom: "clamp(20px,2.08vw,40px)" }}>
              <div className="grid grid-cols-4 gap-[clamp(8px,1vw,20px)]">
                {["/about/album1.jpg","/about/album2.jpg","/about/album3.jpg","/about/album4.jpg"].map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-[5px] relative">
                    <Image src={src} alt={`Album ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Movies */}
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>Some of my favorite movies.</p>
            <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "4px", marginBottom: "clamp(12px, 1.25vw, 24px)" }}>Letterboxd</p>
            <div className="bg-white rounded-[13px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden" style={{ padding: "clamp(10px,1.1vw,21px) clamp(12px,3.07vw,59px)" }}>
              <div className="grid grid-cols-4 gap-[clamp(8px,1vw,20px)]">
                {["/about/movie1.jpg","/about/movie2.jpg","/about/movie3.jpg","/about/movie4.jpg"].map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-[5px] relative" style={{ aspectRatio: "2/3" }}>
                    <Image src={src} alt={`Movie ${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Moments */}
          <section id="moments" style={{ paddingBottom: "clamp(40px, 4vw, 80px)" }}>
            <div className="flex items-center gap-3" style={{ marginBottom: "clamp(8px, 0.83vw, 16px)" }}>
              <h2 className="font-medium text-black" style={{ fontSize: "clamp(16px, 1.3vw, 25px)", letterSpacing: "-0.02em" }}>Moments</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/icon-divider.svg" alt="" style={{ height: "1px", width: "clamp(28px,2.5vw,48px)" }} />
            </div>
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>Taken on my iPhone</p>
            <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "4px", marginBottom: "clamp(20px, 2.08vw, 40px)" }}>@legoskateboard</p>

            {/* Scattered photo grid */}
            <div className="relative" style={{ height: "820px" }}>
              {moments.map(({ src, w, h, x, y }, i) => (
                <div
                  key={i}
                  className="absolute overflow-hidden rounded-[6px]"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${w}px`,
                    height: `${h}px`,
                  }}
                >
                  <Image src={src} alt={`Moment ${i+1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
      <Footer />
    </>
  );
}
