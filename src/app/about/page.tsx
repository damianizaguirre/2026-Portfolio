"use client";

import { useEffect, useRef, useState } from "react";
import { CoverFlow } from "@/components/ui/CoverFlow";
import styles from "./about.module.css";

const frameWidth = 1920;

const experience = [
  { role: "Mismo - App Designer & Developer", period: "March  2026 - Present" },
  { role: "Capital One - UTD Design Partnership", period: "August - December 2025" },
  { role: "Sancorda Medical - Product Design Intern", period: "May - August 2025" },
  { role: "Association of Computing Machinery at UTD - Designer", period: "August 2025 - May 2026" },
];

const heroPhotos = [
  {
    src: "/about/figma-hero/img-3275-2.jpg",
    alt: "Architecture detail",
    left: 352,
    top: 727,
    width: 189.114,
    height: 252.152,
  },
  {
    src: "/about/figma-hero/img-3113-2.jpg",
    alt: "Colorful outfit detail",
    left: 1465,
    top: 727,
    width: 189.114,
    height: 252.152,
  },
  {
    src: "/about/figma-hero/img-2954-2.jpg",
    alt: "Architecture window detail",
    left: 1308,
    top: 488,
    width: 252.152,
    height: 189.114,
  },
  {
    src: "/about/figma-hero/img-2861-2.jpg",
    alt: "Building facade",
    left: 264,
    top: 488,
    width: 252.152,
    height: 189.114,
  },
  {
    src: "/about/figma-hero/img-1947-2.jpg",
    alt: "Concert crowd",
    left: 776,
    top: 727,
    width: 189.114,
    height: 252.152,
  },
  {
    src: "/about/figma-hero/dsc03056-4.jpg",
    alt: "Damian holding a certificate",
    left: 884,
    top: 488,
    width: 256.155,
    height: 170.728,
  },
  {
    src: "/about/figma-hero/img-3290-2.jpg",
    alt: "Person outdoors",
    left: 638,
    top: 488,
    width: 123.825,
    height: 220.133,
  },
  {
    src: "/about/figma-hero/img-2866-2.jpg",
    alt: "Sunset landscape",
    left: 1053,
    top: 727,
    width: 220.133,
    height: 123.825,
  },
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

type RecentMovie = {
  id: string | number;
  image: string;
  title: string;
  subtitle: string;
  url: string;
};

const recentMovies: RecentMovie[] = [
  {
    id: 1,
    image: "/about/recent-movies/kikis-delivery-service.jpg",
    title: "Kiki’s Delivery Service",
    subtitle: "1989",
    url: "https://letterboxd.com/film/kikis-delivery-service/",
  },
  {
    id: 2,
    image: "/about/recent-movies/parasite-2019.jpg",
    title: "Parasite",
    subtitle: "2019",
    url: "https://letterboxd.com/film/parasite-2019/",
  },
  {
    id: 3,
    image: "/about/recent-movies/the-matrix.jpg",
    title: "The Matrix",
    subtitle: "1999",
    url: "https://letterboxd.com/film/the-matrix/",
  },
  {
    id: 4,
    image: "/about/recent-movies/mulholland-drive.jpg",
    title: "Mulholland Drive",
    subtitle: "2001",
    url: "https://letterboxd.com/film/mulholland-drive/",
  },
  {
    id: 5,
    image: "/about/recent-movies/past-lives.jpg",
    title: "Past Lives",
    subtitle: "2023",
    url: "https://letterboxd.com/film/past-lives/",
  },
  {
    id: 6,
    image: "/about/recent-movies/whiplash-2014.jpg",
    title: "Whiplash",
    subtitle: "2014",
    url: "https://letterboxd.com/film/whiplash-2014/",
  },
  {
    id: 7,
    image: "/about/recent-movies/la-haine.jpg",
    title: "La Haine",
    subtitle: "1995",
    url: "https://letterboxd.com/film/la-haine/",
  },
  {
    id: 8,
    image: "/about/recent-movies/perfect-blue.jpg",
    title: "Perfect Blue",
    subtitle: "1997",
    url: "https://letterboxd.com/film/perfect-blue/",
  },
  {
    id: 9,
    image: "/about/recent-movies/spirited-away.jpg",
    title: "Spirited Away",
    subtitle: "2001",
    url: "https://letterboxd.com/film/spirited-away/",
  },
  {
    id: 10,
    image: "/about/recent-movies/infernal-affairs.jpg",
    title: "Infernal Affairs",
    subtitle: "2002",
    url: "https://letterboxd.com/film/infernal-affairs/",
  },
  {
    id: 11,
    image: "/about/recent-movies/goodfellas.jpg",
    title: "GoodFellas",
    subtitle: "1990",
    url: "https://letterboxd.com/film/goodfellas/",
  },
  {
    id: 12,
    image: "/about/recent-movies/there-will-be-blood.jpg",
    title: "There Will Be Blood",
    subtitle: "2007",
    url: "https://letterboxd.com/film/there-will-be-blood/",
  },
  {
    id: 13,
    image: "/about/recent-movies/the-social-network.jpg",
    title: "The Social Network",
    subtitle: "2010",
    url: "https://letterboxd.com/film/the-social-network/",
  },
  {
    id: 14,
    image: "/about/recent-movies/aftersun.jpg",
    title: "Aftersun",
    subtitle: "2022",
    url: "https://letterboxd.com/film/aftersun/",
  },
  {
    id: 15,
    image: "/about/recent-movies/oppenheimer-2023.jpg",
    title: "Oppenheimer",
    subtitle: "2023",
    url: "https://letterboxd.com/film/oppenheimer-2023/",
  },
  {
    id: 16,
    image: "/about/recent-movies/moonlight-2016.jpg",
    title: "Moonlight",
    subtitle: "2016",
    url: "https://letterboxd.com/film/moonlight-2016/",
  },
  {
    id: 17,
    image: "/about/recent-movies/in-the-mood-for-love.jpg",
    title: "In the Mood for Love",
    subtitle: "2000",
    url: "https://letterboxd.com/film/in-the-mood-for-love/",
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
  const [movieItems, setMovieItems] = useState<RecentMovie[]>(recentMovies);

  useEffect(() => {
    let cancelled = false;

    async function syncLetterboxd() {
      try {
        const response = await fetch("/api/letterboxd");
        if (!response.ok) return;

        const data = await response.json();
        const movies = Array.isArray(data?.movies) ? data.movies : [];

        if (!cancelled && movies.length > 0) {
          setMovieItems(movies);
        }
      } catch {
        // Keep the curated fallback if the RSS feed is unavailable.
      }
    }

    syncLetterboxd();

    return () => {
      cancelled = true;
    };
  }, []);

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
          <div className={styles.introCopy}>
            <p>I love design, technology, and business and the way they all meet to create meaningful products for people.</p>
            <p>In pursuit of greatness - continuously creating.</p>
            <p>
              Open to work on new opportunities. <span>Let’s chat!</span>
            </p>
          </div>

          <div className={styles.heroCollage} aria-label="Personal photo collage">
            {heroPhotos.map((photo) => (
              <img
                key={photo.src}
                className={styles.heroPhoto}
                src={photo.src}
                alt={photo.alt}
                loading="eager"
                style={{
                  left: photo.left,
                  top: photo.top,
                  width: photo.width,
                  height: photo.height,
                }}
              />
            ))}
          </div>

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
              itemWidth={292}
              itemHeight={292}
              enableAudio
              captionGap={10}
              className={styles.coverFlow}
            />
          </section>

          <p className={styles.shelfLabel} style={{ top: 2481 }}>
            Recently watched.
          </p>
          <p className={styles.shelfSource} style={{ top: 2505 }}>
            Letterboxd
          </p>
          <section className={[styles.shelfCard, styles.movieCard].join(" ")} aria-label="Recently watched movies">
            <CoverFlow
              items={movieItems}
              itemWidth={190}
              itemHeight={285}
              stackSpacing={70}
              centerGap={180}
              rotation={42}
              enableAudio
              className={styles.movieCoverFlow}
              onItemClick={(item) => {
                const movie = item as RecentMovie;
                window.open(movie.url, "_blank", "noopener,noreferrer");
              }}
            />
          </section>

          <footer className={styles.footerPages} aria-label="Footer page links">
            <p className={styles.footerHeading}>Pages</p>
            <div className={styles.footerLinkList}>
              <a className={styles.footerLink} href="/">
                Work
              </a>
              <a className={styles.footerLink} href="/about">
                About
              </a>
              <a className={styles.footerLink} href="/resume">
                Resume
              </a>
            </div>
          </footer>

          <footer className={styles.footerTalk} aria-label="Social links">
            <p className={styles.footerHeading}>Let’s talk!</p>
            <div className={styles.footerIconRow}>
              <a
                className={styles.footerSocialLink}
                href="https://instagram.com/damianpizaguirre"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src="/assets/social-icons/instagram.jpg" alt="" />
              </a>
              <a
                className={styles.footerSocialLink}
                href="https://x.com/damianizaguirre"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <img src="/assets/social-icons/x.jpg" alt="" />
              </a>
              <a
                className={styles.footerSocialLink}
                href="https://linkedin.com/in/damianizaguirre"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/assets/social-icons/linkedin.jpg" alt="" />
              </a>
              <a
                className={styles.footerSocialLink}
                href="mailto:izaguirredamian20@gmail.com"
                aria-label="Email"
              >
                <img src="/assets/social-icons/mail.jpg" alt="" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
