"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./sancorda-case-study.module.css";

const frameWidth = 1920;
const frameHeight = 8327;
const rulerActivationRatio = 0.18;

const rulerTicks = [
  { y: 5, type: "section", label: "Overview", section: 0, frameY: 1103 },
  { y: 17, type: "content", label: "Overview content", section: 0, frameY: 1186 },
  { y: 29, type: "content", label: "Overview content", section: 0, frameY: 1517 },
  { y: 41, type: "content", label: "Overview content", section: 0, frameY: 2211 },
  { y: 53, type: "section", label: "Research", section: 1, frameY: 2433 },
  { y: 65, type: "content", label: "Research content", section: 1, frameY: 2530 },
  { y: 77, type: "content", label: "Research content", section: 1, frameY: 2744 },
  { y: 89, type: "content", label: "Research content", section: 1, frameY: 3550 },
  { y: 101, type: "section", label: "Design", section: 2, frameY: 5747 },
  { y: 113, type: "content", label: "Design content", section: 2, frameY: 5802 },
  { y: 125, type: "content", label: "Design content", section: 2, frameY: 5912 },
  { y: 137, type: "content", label: "Design content", section: 2, frameY: 6699 },
  { y: 149, type: "content", label: "Design content", section: 2, frameY: 6799 },
  { y: 161, type: "section", label: "Reflection", section: 3, frameY: 7587 },
  { y: 173, type: "content", label: "Reflection content", section: 3, frameY: 7670 },
];

const sectionLabels = ["Overview", "Research", "Design", "Reflection"];
const sectionNavItems = sectionLabels.map((label, index) => ({
  label,
  tickIndex: rulerTicks.findIndex((tick) => tick.type === "section" && tick.section === index),
}));

// @soundcn/click-soft, CC0 sound by Kenney.
const clickSoftSoundDataUri =
  "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYyLjMuMTAwAAAAAAAAAAAAAAD/+1DAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAAIAAAJxAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr//////////////////////////////////////////////////////////////////wAAAABMYXZjNjIuMTEAAAAAAAAAAAAAAAAkBYYAAAAAAAACcU7MYgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tQxAAACghZUlTHgAGDlWufHzAAAVWgJg3EszX3mlF95pSk7enve+GBDEMNMg4R8BLACwAsA7BVjjOhDEMQxWKx5EcJwfB/KBiU8/wI7QH+BHaA/ynv6PB8/LgQEMgD78CHO/oGiAIBAQBAYFAA1hDi4z22DmJ7Et+PSEd1f8Y4PmLI5uDYKAWyCmBlSZJ3gAmD0RBEUDS/HKFzC5iZIr/5FTIvE0Yl3/8ipkXi8Yl0u/xEFQVER7/WCoiCoKiL/4VBURPOqgAQuacbblgZh//7UsQEg8aUBv9cMIAgAAA0gAAABIKqErhFDZUNQ7PRK4S8s8r1HiuGlHuSnenrcW9yvO/PcFflep5XqPKfrO9NTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
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

export default function SancordaCaseStudy() {
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
    <main className={styles.page} ref={pageRef} aria-label="Sancorda case study">
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
        <div className={styles.ruler} aria-hidden="true" onPointerEnter={showRulerCard}>
          {rulerTicks.map((tick, index) => (
            <span
              className={[
                styles.tick,
                tick.type === "section" ? styles.tickSection : "",
                activeTickIndex === index ? styles.tickCurrent : "",
              ].join(" ")}
              key={`${tick.y}-${tick.label}`}
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
          <p className={styles.projectLabel}>Product Design Internship 2026</p>
          <h1 className={styles.title}>Interactive Medical PlanningPlatform</h1>

          <section className={styles.heroCard} aria-label="Sancorda hero preview">
            <img
              className={styles.heroImage}
              src="/images/sancorda-thumbnail.png"
              alt="Sancorda medical planning interface"
            />
          </section>

          <section className={styles.metaGrid} aria-label="Project details">
            <p className={styles.metaLabel}>Role</p>
            <p className={styles.metaLabel}>Timeline</p>
            <p className={styles.metaLabel}>With</p>
            <p className={styles.metaLabel}>Skills</p>
            <p className={styles.metaValue}>Product Design Intern</p>
            <p className={styles.metaValue}>June - Aug 2025</p>
            <p className={styles.metaValue}>Jeremy Warren John Woo</p>
            <p className={styles.metaValue}>Product Design Product Research Prototyping</p>
          </section>

          <p className={styles.sectionKicker} style={{ left: 420, top: 1103 }}>
            Overview
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 420, top: 1134, width: 929 }}>
            Designing a planning platform for a medical startup
          </h2>
          <div className={styles.sectionCopy} style={{ left: 420, top: 1186, width: 1106 }}>
            <p>
              Over the Summer 2025, I had the opportunity to intern with Sancorda Medical, a
              medical startup, and worked with the founders to visualize their SaaS platform. While
              the team at Sancorda had already identified their market need for their platform, my
              work was to translate their goals and ideas into prototypes and a final demo for
              future potential investors.
            </p>
            <p>
              With Sancorda&apos;s medical software being split between 3 sections, these being Recont
              ST, Recon AI, and iPlant, over the summer I focused on the first two. Having
              different purposes and workflows between the two sections, with findings gathered
              through research and biomedical &amp; bioengineering insights from the founders, I
              translated these into a web-based platform.
            </p>
          </div>

          <section className={styles.imageCard} style={{ left: 395, top: 1517 }} aria-label="What is Sancorda visual">
            <img
              className={styles.whatImage}
              src="/images/sancorda/what-is-sancorda.png"
              alt="Overview of the Sancorda platform"
            />
          </section>

          <h2 className={styles.sectionTitle} style={{ left: 395, top: 2211, width: 929 }}>
            So what is Sancorda?
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 2266, width: 958 }}>
            Sancorda Medical is a medical startup developing a 3D coronary artery visualization
            and operation planning platform. It&apos;s design to assist in identifying potential
            ruptures and optimizing the placements of stents. Their ultimate goal is to reduce the
            amount of hospital readmissions for heart patients.
          </p>

          <p className={styles.sectionKicker} style={{ left: 395, top: 2433 }}>
            Research
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 2464, width: 929 }}>
            Looking at the Medical Lab Software Products
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 2534, width: 1131 }}>
            In order to understand the current market, I conducted an analysis of some competitors
            that offer similar services. Due to the very limiting information that is open to the
            public, I also looked into design editing tools to capture more editing aspects. This
            helped me identify a range of potential features to incorporate into their product, as
            well as features to avoid.
          </p>

          <img
            className={styles.wideImage}
            src="/images/sancorda/competitor-analysis.png"
            alt="Competitor analysis of medical software products"
            style={{ left: 397, top: 2705, width: 1130, height: 665 }}
          />

          <h2 className={styles.sectionTitle} style={{ left: 395, top: 3550, width: 929 }}>
            Initial User Flow for Recon ST
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 3605, width: 1131 }}>
            I mapped the standard reconstruction workflow to understand how the platform could
            guide users from importing patient data into focused planning, review, and final
            decision support.
          </p>
          <img
            className={styles.wideImage}
            src="/images/sancorda/user-flow-recon-st.png"
            alt="Initial user flow for Recon ST"
            style={{ left: 397, top: 3724, width: 1130, height: 592 }}
          />

          <h2 className={styles.sectionTitle} style={{ left: 395, top: 4448, width: 929 }}>
            Initial User Flow for Recon AI
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 4503, width: 1131 }}>
            Recon AI required a different mental model, so I separated AI-assisted review from
            manual planning while keeping the two workflows visually connected.
          </p>
          <img
            className={styles.wideImage}
            src="/images/sancorda/user-flow-recon-ai.png"
            alt="Initial user flow for Recon AI"
            style={{ left: 397, top: 4622, width: 1130, height: 430 }}
          />

          <p className={styles.sectionKicker} style={{ left: 396, top: 5661 }}>
            Design
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 396, top: 5747, width: 929 }}>
            Design Style &amp; Icons
          </h2>
          <p className={styles.sectionCopy} style={{ left: 396, top: 5802, width: 1131 }}>
            With the UI of this project being very simple, dark themed, and overall abundant, the
            different variations of the components were designed to maintain visual clarity
            throughout the demo journey due to its data-heavy dashboards.
          </p>
          <img
            className={styles.wideImage}
            src="/images/sancorda/design-style.png"
            alt="Sancorda design style and icon system"
            style={{ left: 398, top: 5912, width: 1129, height: 693 }}
          />

          <h2 className={styles.sectionTitle} style={{ left: 395, top: 6699, width: 929 }}>
            Recon ST &amp; Recon AI Demo
          </h2>
          <div className={styles.demoGrid} style={{ left: 397, top: 6799 }}>
            <img
              className={styles.demoImage}
              src="/images/sancorda/recon-st-demo.png"
              alt="Recon ST demo screenshot"
            />
            <img
              className={styles.demoImage}
              src="/images/sancorda/recon-ai-demo.png"
              alt="Recon AI demo screenshot"
            />
          </div>

          <p className={styles.sectionKicker} style={{ left: 397, top: 7587 }}>
            Reflection
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 397, top: 7615, width: 896 }}>
            Thoughts &amp; Takeaways
          </h2>
          <p className={styles.sectionCopy} style={{ left: 397, top: 7670, width: 1132 }}>
            New Research - Since this project was a biomedical &amp; bioengineering based, I learned
            new interesting and complex things that previously I didn&apos;t expect to know about.
            Compact Design - Designing in a whole different layout for the demo, I learned new ways
            in maximizing space with necessary information, but still balancing it with functionality
            and user-friendly design. User Work Flow - Designing for the split between Recon ST and
            Recon AI workflows, required consistent iteration due to their respective functionalities.
            I gained insightful experience with user-flow mapping and overall creating a smooth guide
            to users.
          </p>
        </div>
      </div>
    </main>
  );
}
