"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./mismo-case-study.module.css";

const frameWidth = 1920;
const frameHeight = 6320;
const rulerActivationRatio = 0.18;

const rulerTicks = [
  { y: 5, type: "section", label: "Overview", section: 0, frameY: 1112 },
  { y: 17, type: "content", label: "Overview content", section: 0, frameY: 1198 },
  { y: 29, type: "content", label: "Overview content", section: 0, frameY: 1258 },
  { y: 41, type: "section", label: "Problem", section: 1, frameY: 1322 },
  { y: 53, type: "content", label: "Problem content", section: 1, frameY: 1433 },
  { y: 65, type: "content", label: "Problem content", section: 1, frameY: 1477 },
  { y: 77, type: "section", label: "Solution", section: 2, frameY: 1679 },
  { y: 89, type: "content", label: "Solution content", section: 2, frameY: 1958 },
  { y: 101, type: "content", label: "Solution content", section: 2, frameY: 2554 },
  { y: 113, type: "content", label: "Solution content", section: 2, frameY: 3151 },
  { y: 125, type: "content", label: "Solution content", section: 2, frameY: 3714 },
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

export default function MismoCaseStudy() {
  const pageRef = useFrameScale();
  const [activeTickIndex, setActiveTickIndex] = useState(0);
  const [isRulerCardVisible, setIsRulerCardVisible] = useState(false);
  const activeTick = rulerTicks[activeTickIndex] || rulerTicks[0];

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
        <a className={styles.navDot} href="/" aria-label="Home" />
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/resume">Resume</a>
        </nav>
      </header>

      <a className={styles.backLink} href="/" aria-label="Back to home">
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

          <div className={styles.emptySlot} style={{ left: 398, top: 1958 }} />
          <h3 className={styles.featureTitle} style={{ left: 1011, top: 2398 }}>
            Node Graph
          </h3>
          <p className={styles.featureCopy} style={{ left: 1011, top: 2453 }}>
            A spatial map of your thinking.
          </p>

          <div className={styles.emptySlot} style={{ left: 398, top: 2554 }} />
          <h3 className={styles.featureTitle} style={{ left: 1011, top: 2968 }}>
            Self-organizing pipeline
          </h3>
          <p className={styles.featureCopy} style={{ left: 1011, top: 3023, width: 515 }}>
            Transcribes, summary, picks folder, and extracts reminders.
          </p>

          <div className={styles.emptySlot} style={{ left: 398, top: 3151 }} />
          <h3 className={styles.featureTitle} style={{ left: 1011, top: 3565 }}>
            A memory that compounds
          </h3>
          <p className={styles.featureCopy} style={{ left: 1011, top: 3620, width: 515 }}>
            Personal glossary is kept, learns from every manual re-file, and grows with the user.
          </p>

          <div className={styles.emptySlot} style={{ left: 398, top: 3714 }} />
          <h3 className={styles.featureTitle} style={{ left: 1011, top: 4128 }}>
            An onboarding that proves it
          </h3>
          <p className={styles.featureCopy} style={{ left: 1011, top: 4183, width: 515 }}>
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
