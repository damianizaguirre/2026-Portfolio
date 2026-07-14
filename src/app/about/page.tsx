"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "4.5em", display: "inline-block" }}>
      {time}
    </span>
  );
}

const experience = [
  { role: "Mismo — App Designer & Developer",                               period: "March 2026 – Present" },
  { role: "Capital One — UTD Design Partnership",                           period: "August – December 2025" },
  { role: "Sancorda Medical — Product Design Intern",                       period: "May – August 2025" },
  { role: "Association of Computing Machinery at UTD — Designer",           period: "August 2025 – May 2026" },
];

const moments = [
  { src: "/about/m1.jpg",       w: 189, h: 252, x: 50,   y: 40  },
  { src: "/about/m2.jpg",       w: 189, h: 252, x: 342,  y: 20  },
  { src: "/about/m3.jpg",       w: 189, h: 252, x: 635,  y: 0   },
  { src: "/about/m4.jpg",       w: 252, h: 189, x: 928,  y: 43  },
  { src: "/about/m5.jpg",       w: 252, h: 189, x: 75,   y: 215 },
  { src: "/about/m6.jpg",       w: 189, h: 252, x: 455,  y: 195 },
  { src: "/about/m7.jpg",       w: 189, h: 252, x: 774,  y: 175 },
  { src: "/about/m8.jpg",       w: 189, h: 252, x: 1067, y: 155 },
  { src: "/about/m9.jpg",       w: 189, h: 252, x: 100,  y: 390 },
  { src: "/about/m10.jpg",      w: 189, h: 252, x: 367,  y: 370 },
  { src: "/about/m11.jpg",      w: 189, h: 252, x: 660,  y: 350 },
  { src: "/about/profile.jpg",  w: 256, h: 171, x: 125,  y: 527 },
  { src: "/about/m12.jpg",      w: 124, h: 220, x: 484,  y: 508 },
  { src: "/about/m13.jpg",      w: 220, h: 124, x: 687,  y: 566 },
  { src: "/about/m14.jpg",      w: 189, h: 252, x: 1011, y: 547 },
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

        {/* Sticky left sidebar */}
        <aside
          className="hidden lg:flex flex-col sticky h-fit"
          style={{
            gap: "clamp(8px, 0.47vw, 9px)",
            top: "clamp(80px, 5.2vw, 100px)",
            paddingLeft: "clamp(20px, 2.97vw, 57px)",
            paddingTop: "clamp(20px, 1.72vw, 33px)",
            minWidth: "clamp(120px, 16vw, 307px)",
            fontSize: "clamp(13px, 1.04vw, 20px)",
            letterSpacing: "-0.02em",
          }}
        >
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className="transition-colors"
              style={{
                color: active === s ? "rgba(0,72,255,0.67)" : "rgba(0,0,0,0.5)",
                textDecoration: "none",
              }}
            >
              {s}
            </a>
          ))}
        </aside>

        {/* Main content column */}
        <main className="flex-1 min-w-0" style={{ paddingRight: "clamp(20px, 2.97vw, 57px)" }}>

          <section
            id="me"
            className="relative"
            style={{ paddingTop: "clamp(16px, 1.72vw, 33px)" }}
          >
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(160px, 19.9vw, 382px)", borderRadius: "15px" }}
            >
              <Image
                src="/about/banner.jpg"
                alt="Damian's banner photo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div
              className="absolute overflow-hidden"
              style={{
                width: "clamp(60px, 10.2vw, 196px)",
                height: "clamp(60px, 10.2vw, 196px)",
                borderRadius: "50%",
                border: "5px solid white",
                top: "clamp(100px, 16vw, 307px)",
                right: "clamp(16px, 2.45vw, 47px)",
                zIndex: 10,
              }}
            >
              <Image
                src="/about/profile.jpg"
                alt="Damian Izaguirre"
                fill
                className="object-cover"
              />
            </div>
          </section>

          <section
            style={{
              paddingTop: "clamp(12px, 1.09vw, 21px)",
              paddingBottom: "clamp(24px, 2.66vw, 51px)",
            }}
          >
            <h1
              className="font-semibold text-black"
              style={{
                fontSize: "clamp(22px, 1.875vw, 36px)",
                letterSpacing: "-0.02em",
                marginBottom: "clamp(4px, 0.36vw, 7px)",
              }}
            >
              Damian Izaguirre
            </h1>

            {/* Tags row: location / clock / UTD — explicit w+h to fix SVG intrinsic-size issue */}
            <div
              className="flex flex-wrap items-center"
              style={{
                gap: "clamp(10px, 1.6vw, 30px)",
                fontSize: "clamp(12px, 1vw, 19.1px)",
                color: "rgba(0,0,0,0.5)",
                marginBottom: "clamp(10px, 1.04vw, 20px)",
              }}
            >
              <span className="flex items-center" style={{ gap: "6px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/icon-location.svg" alt="" style={{ height: "1em", width: "0.833em", flexShrink: 0 }} />
                Dallas, TX
              </span>
              <span className="flex items-center" style={{ gap: "6px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/icon-clock.svg" alt="" style={{ height: "1em", width: "1em", flexShrink: 0 }} />
                <DallasTime />
              </span>
              <span className="flex items-center" style={{ gap: "6px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/icon-utd.svg" alt="" style={{ height: "1em", width: "1.111em", flexShrink: 0 }} />
                UTD
              </span>
            </div>

            <p
              className="text-black"
              style={{
                fontSize: "clamp(13px, 1.04vw, 20px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.5,
                marginBottom: "clamp(12px, 1.35vw, 26px)",
              }}
            >
              I design products where design, software, and story meet.<br />
              In pursuit of greatness — creating, designing, and building.
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap" style={{ gap: "clamp(6px, 0.7vw, 12px)" }}>
              {[
                { icon: "/about/icon-linkedin.svg",  label: "Damian Izaguirre",           href: "https://linkedin.com/in/damianizaguirre" },
                { icon: "/about/icon-instagram.svg", label: "damianpizaguirre",            href: "https://instagram.com/damianpizaguirre" },
                { icon: "/about/icon-x.svg",         label: "damianizaguirre",             href: "https://x.com/damianizaguirre" },
                { icon: "/about/icon-email.svg",     label: "izaguirredamian20@gmail.com", href: "mailto:izaguirredamian20@gmail.com" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-[#efefef] rounded-full"
                  style={{
                    gap: "clamp(6px, 0.63vw, 12px)",
                    padding: "clamp(6px, 0.36vw, 7px) clamp(10px, 0.94vw, 18px)",
                    fontSize: "clamp(11px, 0.98vw, 18.8px)",
                    letterSpacing: "-0.02em",
                    color: "#575757",
                    textDecoration: "none",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt="" style={{ height: "clamp(14px, 1.2vw, 23px)", width: "clamp(14px, 1.2vw, 23px)", flexShrink: 0 }} />
                  {label}
                </a>
              ))}
            </div>
          </section>

          <section id="experience" style={{ paddingBottom: "clamp(24px, 2.9vw, 56px)" }}>
            <SectionHeader title="Experience" />
            <div className="flex flex-col" style={{ gap: "clamp(16px, 1.35vw, 26px)" }}>
              {experience.map(({ role, period }) => (
                <div key={role}>
                  <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>
                    {role}
                  </p>
                  <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(3px, 0.42vw, 8px)" }}>
                    {period}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="education" style={{ paddingBottom: "clamp(24px, 2.9vw, 56px)" }}>
            <SectionHeader title="Education" />
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>
              The University of Texas at Dallas — B.A. Arts, Technology, and Emerging Communication
            </p>
            <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(3px, 0.42vw, 8px)" }}>
              August 2022 – May 2026
            </p>
            <div style={{ marginTop: "clamp(20px, 1.98vw, 38px)" }}>
              <SectionHeader title="Certifications" />
              <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>
                The University of Texas at Dallas — Applied Experience Design &amp; Research
              </p>
              <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(3px, 0.42vw, 8px)" }}>
                August 2022 – May 2026
              </p>
            </div>
          </section>

          <section id="shelf" style={{ paddingBottom: "clamp(28px, 2.9vw, 56px)" }}>
            <SectionHeader title="Shelf" />
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>My recent listens.</p>
            <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(2px, 0.2vw, 4px)", marginBottom: "clamp(8px, 0.94vw, 18px)" }}>
              Spotify
            </p>
            <div
              className="bg-white rounded-[13px] overflow-hidden"
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
                padding: "clamp(16px, 2.55vw, 49px) clamp(16px, 2.19vw, 42px)",
                marginBottom: "clamp(16px, 1.72vw, 33px)",
              }}
            >
              <div className="grid grid-cols-4" style={{ gap: "clamp(8px, 1.25vw, 24px)" }}>
                {["/about/album1.jpg", "/about/album2.jpg", "/about/album3.jpg", "/about/album4.jpg"].map((src, i) => (
                  <div key={i} className="aspect-square overflow-hidden relative" style={{ borderRadius: "5px" }}>
                    <Image src={src} alt={`Album ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>Some of my favorite movies.</p>
            <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(2px, 0.2vw, 4px)", marginBottom: "clamp(8px, 0.94vw, 18px)" }}>
              Letterboxd
            </p>
            <div
              className="bg-white rounded-[13px] overflow-hidden"
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
                padding: "clamp(10px, 1.09vw, 21px) clamp(16px, 3.07vw, 59px)",
              }}
            >
              <div className="grid grid-cols-4" style={{ gap: "clamp(10px, 1.93vw, 37px)" }}>
                {["/about/movie1.jpg", "/about/movie2.jpg", "/about/movie3.jpg", "/about/movie4.jpg"].map((src, i) => (
                  <div key={i} className="overflow-hidden relative" style={{ aspectRatio: "157/232", borderRadius: "5px" }}>
                    <Image src={src} alt={`Movie ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="moments" style={{ paddingBottom: "clamp(40px, 4vw, 80px)" }}>
            <SectionHeader title="Moments" />
            <p className="text-black" style={{ fontSize: "clamp(13px, 1.04vw, 20px)", letterSpacing: "-0.02em" }}>Taken on my iPhone</p>
            <p style={{ fontSize: "clamp(11px, 0.83vw, 16px)", color: "#a3a3a3", letterSpacing: "-0.02em", marginTop: "clamp(2px, 0.2vw, 4px)", marginBottom: "clamp(16px, 1.2vw, 23px)" }}>
              @legoskateboard
            </p>
            <div
              className="relative"
              style={{ height: "820px", overflowX: "auto", overflowY: "visible" }}
            >
              {moments.map(({ src, w, h, x, y }, i) => (
                <div
                  key={i}
                  className="absolute overflow-hidden"
                  style={{ left: x, top: y, width: w, height: h, borderRadius: "6px" }}
                >
                  <Image src={src} alt={`Moment ${i + 1}`} fill className="object-cover" />
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

function SectionHeader({ title }: { title: string }) {
  return (
    <div
      className="flex items-center"
      style={{ gap: "clamp(10px, 0.83vw, 16px)", marginBottom: "clamp(14px, 1.2vw, 23px)" }}
    >
      <h2
        className="font-medium text-black"
        style={{ fontSize: "clamp(16px, 1.3vw, 25px)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/about/icon-divider.svg"
        alt=""
        style={{ width: "clamp(28px, 2.47vw, 47.5px)", height: "1px", flexShrink: 0 }}
      />
    </div>
  );
}
