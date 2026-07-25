"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./mismo-case-study.module.css";

const frameWidth = 1920;
const frameHeight = 6412;
const rulerActivationRatio = 0.18;

const rulerTicks = [
  { y: 5, type: "section", label: "Overview", section: 0, frameY: 1112 },
  { y: 17, type: "content", label: "Overview content", section: 0, frameY: 1198 },
  { y: 29, type: "content", label: "Overview content", section: 0, frameY: 1258 },
  { y: 41, type: "section", label: "Problem", section: 1, frameY: 1322 },
  { y: 53, type: "content", label: "Problem content", section: 1, frameY: 1433 },
  { y: 65, type: "content", label: "Problem content", section: 1, frameY: 1477 },
  { y: 77, type: "section", label: "Solution", section: 2, frameY: 1679 },
  { y: 89, type: "content", label: "Solution content", section: 2, frameY: 1948 },
  { y: 101, type: "content", label: "Solution content", section: 2, frameY: 2528 },
  { y: 113, type: "content", label: "Solution content", section: 2, frameY: 3108 },
  { y: 125, type: "content", label: "Solution content", section: 2, frameY: 3688 },
  { y: 137, type: "section", label: "Research", section: 3, frameY: 4871 },
  { y: 149, type: "content", label: "Research content", section: 3, frameY: 4966 },
  { y: 161, type: "content", label: "Research content", section: 3, frameY: 5060 },
  { y: 173, type: "section", label: "Process", section: 4, frameY: 5226 },
  { y: 185, type: "content", label: "Process content", section: 4, frameY: 5332 },
  { y: 197, type: "section", label: "Reflection", section: 5, frameY: 6071 },
];

const sectionLabels = ["Overview", "Problem", "Solution", "Research", "Process", "Reflection"];
const sectionNavItems = sectionLabels.map((label, index) => ({
  label,
  tickIndex: rulerTicks.findIndex((tick) => tick.type === "section" && tick.section === index),
}));

// @soundcn/click-soft, CC0 sound by Kenney.
const clickSoftSoundDataUri =
  "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYyLjMuMTAwAAAAAAAAAAAAAAD/+1DAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAAIAAAJxAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr//////////////////////////////////////////////////////////////////wAAAABMYXZjNjIuMTEAAAAAAAAAAAAAAAAkBYYAAAAAAAACcU7MYgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tQxAAACghZUlTHgAGDlWufHzAAAVWgJg3EszX3mlF95pSk7enve+GBDEMNMg4R8BLACwAsA7BVjjOhDEMQxWKx5EcJwfB/KBiU8/wI7QH+BHaA/ynv6PB8/LgQEMgD78CHO/oGiAIBAQBAYFAA1hDi4z22DmJ7Et+PSEd1f8Y4PmLI5uDYKAWyCmBlSZJ3gAmD0RBEUDS/HKFzC5iZIr/5FTIvE0Yl3/8ipkXi8Yl0u/xEFQVER7/WCoiCoKiL/4VBURPOqgAQuacbblgZh//7UsQEg8aUBv9cMIAgAAA0gAAABIKqErhFDZUNQ7PRK4S8s8r1HiuGlHuSnenrcW9yvO/PcFflep5XqPKfrO9NTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
const clickSoftVolume = 0.576;

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

function DemoVideo({ label, src }: { label: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.demoVideo}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function MismoCaseStudy() {
  const pageRef = useFrameScale();
  const clickSoftPlayersRef = useRef<HTMLAudioElement[]>([]);
  const clickSoftPlayerIndexRef = useRef(0);
  const hoverSoundLastPlayedRef = useRef(new WeakMap<HTMLElement, number>());
  const [activeTickIndex, setActiveTickIndex] = useState(0);
  const [isRulerCardVisible, setIsRulerCardVisible] = useState(false);
  const activeTick = rulerTicks[activeTickIndex] || rulerTicks[0];

  const getClickSoftPlayer = useCallback(() => {
    if (!clickSoftPlayersRef.current.length) {
      for (let index = 0; index < 6; index += 1) {
        const player = new Audio(clickSoftSoundDataUri);
        player.preload = "auto";
        player.volume = clickSoftVolume;
        clickSoftPlayersRef.current.push(player);
      }
    }

    const player = clickSoftPlayersRef.current[clickSoftPlayerIndexRef.current];
    clickSoftPlayerIndexRef.current = (clickSoftPlayerIndexRef.current + 1) % clickSoftPlayersRef.current.length;
    return player;
  }, []);

  const primeClickSoftSound = useCallback(() => {
    const player = getClickSoftPlayer();
    const previousVolume = player.volume;

    player.volume = 0;
    const playPromise = player.play();

    if (!playPromise) {
      player.pause();
      player.currentTime = 0;
      player.volume = previousVolume;
      return;
    }

    playPromise
      .then(() => {
        player.pause();
        player.currentTime = 0;
        player.volume = previousVolume;
      })
      .catch(() => {
        player.volume = previousVolume;
      });
  }, [getClickSoftPlayer]);

  const playHoverSound = useCallback((target: HTMLElement) => {
    const now = performance.now();
    const lastPlayed = hoverSoundLastPlayedRef.current.get(target) || 0;

    if (now - lastPlayed < 120) {
      return;
    }

    hoverSoundLastPlayedRef.current.set(target, now);
    const player = getClickSoftPlayer();
    player.volume = clickSoftVolume;
    player.currentTime = 0;
    player.play().catch(() => {});
  }, [getClickSoftPlayer]);

  useEffect(() => {
    const unlockSound = () => {
      primeClickSoftSound();
    };

    document.addEventListener("pointerdown", unlockSound, { passive: true });
    document.addEventListener("mousedown", unlockSound, { passive: true });
    document.addEventListener("touchstart", unlockSound, { passive: true });
    document.addEventListener("keydown", unlockSound);

    return () => {
      document.removeEventListener("pointerdown", unlockSound);
      document.removeEventListener("mousedown", unlockSound);
      document.removeEventListener("touchstart", unlockSound);
      document.removeEventListener("keydown", unlockSound);
    };
  }, [primeClickSoftSound]);

  useEffect(() => {
    let animationFrame = 0;

    const syncRuler = () => {
      animationFrame = 0;

      const scale = Math.min(window.innerWidth / frameWidth, 1);
      const frameScrollY = window.scrollY / scale;
      const frameViewportHeight = window.innerHeight / scale;
      const readingY = Math.min(frameHeight, frameScrollY + frameViewportHeight * rulerActivationRatio);
      let nextIndex = 0;

      rulerTicks.forEach((tick, index) => {
        if (readingY >= tick.frameY) {
          nextIndex = index;
        }
      });

      setActiveTickIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
    };

    const requestRulerSync = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(syncRuler);
    };

    syncRuler();
    window.addEventListener("scroll", requestRulerSync, { passive: true });
    window.addEventListener("resize", requestRulerSync);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", requestRulerSync);
      window.removeEventListener("resize", requestRulerSync);
    };
  }, []);

  const showRulerCard = () => {
    setIsRulerCardVisible(true);
  };

  const hideRulerCard = () => {
    setIsRulerCardVisible(false);
  };

  const scrollToRulerSection = (tickIndex: number) => {
    const tick = rulerTicks[tickIndex];

    if (!tick) {
      return;
    }

    const scale = Math.min(window.innerWidth / frameWidth, 1);
    const frameViewportHeight = window.innerHeight / scale;
    const nextScrollY = Math.max(0, (tick.frameY - frameViewportHeight * rulerActivationRatio) * scale);

    setActiveTickIndex(tickIndex);
    showRulerCard();
    window.scrollTo({
      top: nextScrollY,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <main className={styles.page} ref={pageRef} aria-label="Mismo case study">
      <header className={styles.topNav} aria-label="Top Navigation Bar">
        <a
          className={styles.navDot}
          href="/"
          aria-label="Home"
          onPointerEnter={(event) => playHoverSound(event.currentTarget)}
        />
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="/" onPointerEnter={(event) => playHoverSound(event.currentTarget)}>Home</a>
          <a href="/about" onPointerEnter={(event) => playHoverSound(event.currentTarget)}>About</a>
          <a href="/resume" onPointerEnter={(event) => playHoverSound(event.currentTarget)}>Resume</a>
        </nav>
      </header>

      <a
        className={styles.backLink}
        href="/"
        aria-label="Back to home"
        onPointerEnter={(event) => playHoverSound(event.currentTarget)}
      >
        <img className={styles.backIcon} src="/images/mismo/icon-arrow-back-outline.svg" alt="" />
        <span>Back</span>
      </a>

      <aside className={styles.rulerNav} aria-label="Case study section ruler">
        <div
          className={styles.ruler}
          aria-hidden="true"
          onPointerEnter={showRulerCard}
        >
          {rulerTicks
            .map((tick, index) => (
              <span
                className={[
                  styles.tick,
                  tick.type === "section" ? styles.tickSection : "",
                  activeTickIndex === index ? styles.tickCurrent : "",
                ].join(" ")}
                key={tick.y}
                style={{ top: tick.y }}
                title={tick.label}
              />
            ))}
          <span className={styles.activeTick} style={{ top: activeTick.y }} />
        </div>
        <div
          className={[
            styles.rulerCard,
            isRulerCardVisible ? styles.rulerCardVisible : "",
          ].join(" ")}
          aria-hidden={!isRulerCardVisible}
          onPointerEnter={showRulerCard}
          onPointerLeave={hideRulerCard}
        >
          <ol className={styles.rulerList}>
            {sectionNavItems.map((item, index) => (
              <li className={activeTick.section === index ? styles.rulerListActive : ""} key={item.label}>
                <button
                  className={styles.rulerListButton}
                  type="button"
                  onPointerEnter={(event) => playHoverSound(event.currentTarget)}
                  onClick={() => scrollToRulerSection(item.tickIndex)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className={styles.stage}>
        <div className={styles.frame}>
          <p className={styles.capstoneLabel}>Capstone 2026</p>
          <h1 className={styles.title}>Mismo</h1>

          <section className={styles.heroCard} aria-label="Mismo hero preview">
            <video
              className={styles.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/figma-home/mismo-poster.png"
            >
              <source src="/assets/figma-home/mismo-preview.mov" type="video/quicktime" />
              <source src="/assets/figma-home/mismo-preview-clean-white-60fps.mp4" type="video/mp4" />
            </video>
          </section>

          <section className={styles.metaGrid} aria-label="Project details">
            <p className={styles.metaLabel}>Role</p>
            <p className={styles.metaLabel}>Timeline</p>
            <p className={styles.metaLabel}>Team</p>
            <p className={styles.metaLabel}>Status</p>
            <p className={styles.metaValue}>Product Designer/Developer</p>
            <p className={styles.metaValue}>Jan - May 2026</p>
            <p className={styles.metaValue}>Solo</p>
            <p className={styles.metaValue}>Shipped</p>
          </section>

          <p className={styles.sectionKicker} style={{ left: 395, top: 1112 }}>
            Overview
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 1143 }}>
            How can we make note taking more powerful with voice?
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 1198, width: 1216 }}>
            Over the course of the semester, my goal was to pick, design, and build a working
            prototype of a digital product.
          </p>

          <p className={styles.sectionKicker} style={{ left: 395, top: 1322 }}>
            Problem
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 1361 }}>
            Voice memos are where thoughts go to die.
          </h2>

          <section className={styles.problemGrid} aria-label="Problem details">
            <h3 className={styles.problemTitle} style={{ left: 0, width: 206 }}>
              Retrieval is dead
            </h3>
            <p className={styles.problemCopy} style={{ left: 0, width: 262 }}>
              People capture voice memos constantly and never open them again.
            </p>

            <h3 className={styles.problemTitle} style={{ left: 406, width: 260 }}>
              User&apos;s job is organizing
            </h3>
            <p className={styles.problemCopy} style={{ left: 406, width: 260 }}>
              The filing, naming, and follow-through still lands on the user.
            </p>

            <h3 className={styles.problemTitle} style={{ left: 810, width: 321 }}>
              Spoken reminders evaporate.
            </h3>
            <p className={styles.problemCopy} style={{ left: 810, width: 321 }}>
              The intent is in the audio; no app was acting on it.
            </p>
          </section>

          <p className={styles.sectionKicker} style={{ left: 395, top: 1679 }}>
            Solution
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 1718, width: 1067 }}>
            Mismo: your voice converted it into a structured, searchable, and personal thinking
            space.
          </h2>

          <div className={styles.demoCard} style={{ left: 407, top: 1948 }}>
            <DemoVideo label="Mismo node graph demo" src="/videos/mismo/node-graph-demo.m4v" />
          </div>
          <h3 className={styles.featureTitle} style={{ left: 1010, top: 2408 }}>
            Node Graph
          </h3>
          <p className={styles.featureCopy} style={{ left: 1010, top: 2463 }}>
            A spatial map of your thinking.
          </p>

          <div className={styles.demoCard} style={{ left: 407, top: 2528 }}>
            <DemoVideo
              label="Mismo self-organizing pipeline demo"
              src="/videos/mismo/self-sorting-demo.m4v"
            />
          </div>
          <h3 className={styles.featureTitle} style={{ left: 1011, top: 2962 }}>
            Self-organizing pipeline
          </h3>
          <p className={styles.featureCopy} style={{ left: 1011, top: 3017, width: 515 }}>
            Transcribes, summary, picks folder, and extracts reminders.
          </p>

          <div className={styles.demoCard} style={{ left: 407, top: 3108 }}>
            <DemoVideo label="Mismo search and memory demo" src="/videos/mismo/search-demo.m4v" />
          </div>
          <h3 className={styles.featureTitle} style={{ left: 1011, top: 3542 }}>
            A memory that compounds
          </h3>
          <p className={styles.featureCopy} style={{ left: 1011, top: 3597, width: 515 }}>
            Personal glossary is kept, learns from every manual re-file, and grows with the user.
          </p>

          <div className={styles.demoCard} style={{ left: 407, top: 3688 }}>
            <DemoVideo label="Mismo onboarding demo" src="/videos/mismo/onboarding-demo.m4v" />
          </div>
          <h3 className={styles.featureTitle} style={{ left: 1011, top: 4122 }}>
            An onboarding that proves it
          </h3>
          <p className={styles.featureCopy} style={{ left: 1011, top: 4177, width: 515 }}>
            Pick what you want help with, record a real memo, and see Mismo in action.
          </p>

          <div className={styles.wideSlot} />
          <img
            className={styles.researchIcon}
            src="/images/mismo/research-app-voice-memos.png"
            alt=""
            style={{ left: 592 }}
          />
          <img
            className={styles.researchIcon}
            src="/images/mismo/research-app-notes.png"
            alt=""
            style={{ left: 744 }}
          />

          <p className={styles.sectionKicker} style={{ left: 395, top: 4871 }}>
            Research
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 4902 }}>
            Nobody loses at capture, everybody misses at what happens after
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 4966, width: 1111 }}>
            From pre-installed apps, to large market share ones, Mismo moved the product&apos;s
            center of gravity from the record button to the pipeline behind it.
          </p>

          <p className={styles.sectionKicker} style={{ left: 401, top: 5226 }}>
            Process
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 401, top: 5257 }}>
            Exploring and simplifying the users experience
          </h2>
          <div className={styles.processBlock} />

          <p className={styles.sectionKicker} style={{ left: 401, top: 6071 }}>
            Reflection
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 401, top: 6102 }}>
            Insights from designing and building my first 0-1 app
          </h2>
        </div>
      </div>
    </main>
  );
}
