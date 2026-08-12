"use client";

import { useEffect, useRef } from "react";
import { CoverFlow } from "@/components/ui/CoverFlow";
import styles from "./about.module.css";

const frameWidth = 1920;

const experience = [
  { role: "Mismo - App Designer & Developer", period: "March  2026 - Present" },
  { role: "Capital One - UTD Design Partnership", period: "August - December 2025" },
  { role: "Sancorda Medical - Product Design Intern", period: "May - August 2025" },
  { role: "Association of Computing Machinery at UTD - Designer", period: "August 2025 - May 2026" },
];

const movies = [
  { src: "/images/about/movie-1.png", alt: "Favorite movie poster one", left: 59, width: 157 },
  { src: "/images/about/movie-2.png", alt: "Favorite movie poster two", left: 253, width: 157 },
  { src: "/images/about/movie-3.png", alt: "Favorite movie poster three", left: 447, width: 155 },
  { src: "/images/about/movie-4.png", alt: "Favorite movie poster four", left: 639, width: 159 },
];

const recentListens = [
  {
    id: 1,
    image: "/about/recent-listens/the-odyssey.jpg",
    title: "The Odyssey (Original Motion Picture Soundtrack)",
    subtitle: "Ludwig Göransson",
  },
  {
    id: 2,
    image: "/about/recent-listens/oppenheimer.jpg",
    title: "Oppenheimer (Original Motion Picture Soundtrack)",
    subtitle: "Ludwig Göransson",
  },
  {
    id: 3,
    image: "/about/recent-listens/oh-yeah.jpg",
    title: "Oh yeah?",
    subtitle: "Steve Lacy",
  },
  {
    id: 4,
    image: "/about/recent-listens/looking-for-love.jpg",
    title: "Looking for Love",
    subtitle: "Karen Ramirez",
  },
  {
    id: 5,
    image: "/about/recent-listens/ipod-touch.jpg",
    title: "iPod Touch",
    subtitle: "Ninajirachi",
  },
  {
    id: 6,
    image: "/about/recent-listens/kinda-like-it-that-way.jpg",
    title: "Kinda Like It That Way",
    subtitle: "Snow Strippers",
  },
  {
    id: 7,
    image: "/about/recent-listens/gentle-hum-anxiety.jpg",
    title: "The Gentle Hum of Anxiety",
    subtitle: "Trent Reznor & Atticus Ross",
  },
  {
    id: 8,
    image: "/about/recent-listens/easter-pink.jpg",
    title: "Easter Pink",
    subtitle: "fakemink",
  },
  {
    id: 9,
    image: "/about/recent-listens/on-the-line.jpg",
    title: "On the Line (feat. Kindness)",
    subtitle: "Blood Orange",
  },
  {
    id: 10,
    image: "/about/recent-listens/aprils-daydream.jpg",
    title: "April’s Daydream",
    subtitle: "Devonté Hynes",
  },
  {
    id: 11,
    image: "/about/recent-listens/you-made-it-feel-like-home.jpg",
    title: "(You Made It Feel Like) Home",
    subtitle: "Trent Reznor & Atticus Ross",
  },
];

function useFrameScale() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncScale = () => {
      pageRef.current?.style.setProperty("--scale", String(Math.min(window.innerWidth / frameWidth, 1)));
    };

    syncScale();
    window.addEventListener("resize", syncScale);
    return () => window.removeEventListener("resize", syncScale);
  }, []);

  return pageRef;
}

export default function About() {
  const pageRef = useFrameScale();

  return (
    <main className={styles.page} ref={pageRef} aria-label="About Damian Izaguirre">
      <header className={styles.topNav} aria-label="Top Navigation Bar">
        <a className={styles.navDot} href="/" aria-label="Home" />
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/resume">Resume</a>
        </nav>
      </header>

      <div className={styles.stage}>
        <div className={styles.frame}>
          <h1 className={styles.name}>Damian Izaguirre</h1>
          <p className={styles.role}>Product Designer</p>
          <p className={styles.currentlyLabel}>Currently</p>
          <div className={styles.currentlyCopy}>
            <p>Designing and building meaningful products, giving data life through meaningful design.</p>
            <p>In pursuit of greatness - continuously designing and building.</p>
          </div>

          <div className={styles.heroSlot} aria-hidden="true" />

          <h2 className={styles.sectionHeading} style={{ top: 1097 }}>
            Experience
          </h2>
          <div className={styles.entryList} style={{ top: 1150 }}>
            {experience.map((item) => (
              <div key={item.role}>
                <p className={styles.entryRole}>{item.role}</p>
                <p className={styles.entryPeriod}>{item.period}</p>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionHeading} style={{ top: 1497 }}>
            Education
          </h2>
          <div className={styles.entry} style={{ top: 1550 }}>
            <p className={styles.entryRole}>
              The University of Texas at Dallas - B.A. Arts, Technology, and Emerging Communication
            </p>
            <p className={styles.entryPeriod}>August 2022 - May 2026</p>
          </div>

          <h2 className={styles.sectionHeading} style={{ top: 1616 }}>
            Certifications
          </h2>
          <div className={styles.entry} style={{ top: 1669 }}>
            <p className={styles.entryRole}>
              The University of Texas at Dallas - Applied Experience Design &amp; Research
            </p>
            <p className={styles.entryPeriod}>August 2022 - May 2026</p>
          </div>

          <h2 className={[styles.sectionHeading, styles.headingMedium].join(" ")} style={{ top: 1846 }}>
            Shelf
          </h2>

          <p className={styles.shelfLabel} style={{ top: 1919 }}>
            My recent listens.
          </p>
          <p className={styles.shelfSource} style={{ top: 1943 }}>
            Spotify
          </p>
          {/* Empty in the frame for now. /api/recent-tracks is still live and
              returns the real listening history whenever this gets filled in. */}
          <section
            className={[styles.shelfCard, styles.spotifyCard].join(" ")}
            aria-label="Recent Spotify listens"
          >
            <CoverFlow
              items={recentListens}
              itemWidth={320}
              itemHeight={320}
              enableAudio
              className={styles.coverFlow}
            />
          </section>

          <p className={styles.shelfLabel} style={{ top: 2884 }}>
            Some of my favorite movies.
          </p>
          <p className={styles.shelfSource} style={{ top: 2908 }}>
            Letterboxd
          </p>
          <section className={[styles.shelfCard, styles.movieCard].join(" ")} aria-label="Favorite movies">
            {movies.map((movie) => (
              <img
                className={styles.moviePoster}
                key={movie.src}
                src={movie.src}
                alt={movie.alt}
                loading="lazy"
                style={{ left: movie.left, width: movie.width }}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
