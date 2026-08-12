"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./about.module.css";

const experience = [
  { role: "Mismo - App Designer & Developer", period: "March 2026 - Present" },
  { role: "Capital One - UTD Design Partnership", period: "August - December 2025" },
  { role: "Sancorda Medical - Product Design Intern", period: "May - August 2025" },
  { role: "Association of Computing Machinery at UTD - Designer", period: "August 2025 - May 2026" },
];

const albums = [
  "/about/album1.jpg",
  "/about/album2.jpg",
  "/about/album3.jpg",
  "/about/album4.jpg",
];

const movies = [
  "/about/movie1.jpg",
  "/about/movie2.jpg",
  "/about/movie3.jpg",
  "/about/movie4.jpg",
];

export default function About() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-title">
          <p className={styles.eyebrow}>Currently</p>
          <h1 id="about-title" className={styles.name}>
            Damian Izaguirre
          </h1>
          <p className={styles.role}>Product Designer</p>
          <p className={styles.statement}>
            Designing and building meaningful products, giving data life through meaningful design.
            In pursuit of greatness - continuously designing and building.
          </p>
        </section>

        <section className={styles.infoBlock} aria-labelledby="experience-title">
          <SectionHeader id="experience-title" title="Experience" />
          <div className={styles.experienceList}>
            {experience.map((item) => (
              <div key={item.role} className={styles.experienceItem}>
                <p className={styles.itemTitle}>{item.role}</p>
                <p className={styles.itemMeta}>{item.period}</p>
              </div>
            ))}
          </div>

          <div className={styles.educationGroup}>
            <SectionHeader id="education-title" title="Education" />
            <p className={styles.itemTitle}>
              The University of Texas at Dallas - B.A. Arts, Technology, and Emerging Communication
            </p>
            <p className={styles.itemMeta}>August 2022 - May 2026</p>
          </div>

          <div className={styles.educationGroup}>
            <SectionHeader id="certifications-title" title="Certifications" />
            <p className={styles.itemTitle}>
              The University of Texas at Dallas - Applied Experience Design & Research
            </p>
            <p className={styles.itemMeta}>August 2022 - May 2026</p>
          </div>
        </section>

        <section className={styles.shelf} aria-labelledby="shelf-title">
          <SectionHeader id="shelf-title" title="Shelf" />

          <div className={styles.shelfIntro}>
            <p className={styles.itemTitle}>My recent listens.</p>
            <p className={styles.itemMeta}>Spotify</p>
          </div>

          <AlbumCoverflow />

          <div className={styles.movieIntro}>
            <p className={styles.itemTitle}>Some of my favorite movies.</p>
            <p className={styles.itemMeta}>Letterboxd</p>
          </div>

          <div className={styles.movieCard}>
            <div className={styles.movieGrid}>
              {movies.map((src, index) => (
                <div className={styles.moviePoster} key={src}>
                  <Image src={src} alt={`Favorite movie ${index + 1}`} fill sizes="(max-width: 768px) 38vw, 157px" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 id={id}>{title}</h2>
      <span aria-hidden="true" />
    </div>
  );
}

function AlbumCoverflow() {
  const [active, setActive] = useState(1);
  const [drag, setDrag] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const positions = useMemo(
    () =>
      albums.map((src, index) => {
        const distance = index - active;
        const side = Math.sign(distance);
        const abs = Math.abs(distance);
        const near = abs === 1;
        const far = abs >= 2;
        return {
          src,
          index,
          abs,
          x: side * (near ? 182 : far ? 326 : 0) + drag * 0.28,
          y: abs === 0 ? 0 : near ? 8 : 14,
          z: abs === 0 ? 145 : near ? -96 : -250,
          rotateY: side * -(near ? 44 : far ? 60 : 0),
          rotateZ: side * (near ? 0.6 : far ? 1.5 : 0),
          scale: abs === 0 ? 1 : near ? 0.82 : 0.66,
          opacity: abs === 0 ? 1 : near ? 0.82 : 0.42,
          brightness: abs === 0 ? 1.03 : near ? 0.68 : 0.34,
          blur: abs === 0 ? 0 : near ? 0.35 : 1.25,
        };
      }),
    [active, drag]
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current >= albums.length - 1 ? 0 : current + 1));
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const finishDrag = () => {
    if (!isDragging) return;
    if (drag < -64) setActive((current) => Math.min(albums.length - 1, current + 1));
    if (drag > 64) setActive((current) => Math.max(0, current - 1));
    setIsDragging(false);
    setDrag(0);
  };

  return (
    <div
      className={styles.albumWall}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        setStartX(event.clientX);
        setDrag(0);
      }}
      onPointerMove={(event) => {
        if (!isDragging) return;
        setDrag(event.clientX - startX);
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <div className={styles.albumTrack}>
        {positions.map((cover) => (
          <button
            className={styles.albumCover}
            type="button"
            key={cover.src}
            aria-label={`Show album ${cover.index + 1}`}
            onClick={() => setActive(cover.index)}
            style={{
              zIndex: 20 - cover.abs,
              opacity: cover.opacity,
              filter: `brightness(${cover.brightness}) blur(${cover.blur}px)`,
              transform: `translate3d(${cover.x}px, ${cover.y}px, ${cover.z}px) rotateY(${cover.rotateY}deg) rotateZ(${cover.rotateZ}deg) scale(${cover.scale})`,
            }}
          >
            <Image src={cover.src} alt="" fill sizes="300px" />
          </button>
        ))}
      </div>
      <div className={styles.scrubber} aria-hidden="true">
        <span style={{ left: `${(active / (albums.length - 1)) * 100}%` }} />
      </div>
    </div>
  );
}
