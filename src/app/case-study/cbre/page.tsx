"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./integra-case-study.module.css";

const frameWidth = 1920;
// The Figma frame is 9579 tall, but that leaves a 344px gap under the closing
// team photos. Trimmed to a 150px tail to match the Sancorda study.
const frameHeight = 9385;
const rulerActivationRatio = 0.18;

const rulerTicks = [
  { y: 5, type: "section", label: "Overview", frameY: 1216 },
  { y: 17, type: "content", label: "Design process", frameY: 1603 },
  { y: 29, type: "section", label: "Company Track", frameY: 2115 },
  { y: 41, type: "content", label: "Solution", frameY: 2360 },
  { y: 53, type: "section", label: "Core Flows", frameY: 2659 },
  { y: 65, type: "content", label: "Home Page", frameY: 3379 },
  { y: 77, type: "content", label: "Virtual Room", frameY: 4265 },
  { y: 89, type: "content", label: "Analytics", frameY: 5151 },
  { y: 101, type: "section", label: "Research", frameY: 5380 },
  { y: 113, type: "content", label: "Current solutions", frameY: 6324 },
  { y: 125, type: "content", label: "User Journey", frameY: 7097 },
  { y: 137, type: "content", label: "Early Explorations", frameY: 7913 },
  { y: 149, type: "section", label: "Reflection", frameY: 8658 },
];

const sectionNavItems = rulerTicks
  .map((tick, index) => ({ label: tick.label, tickIndex: index, type: tick.type }))
  .filter((item) => item.type === "section");

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

export default function CBRECaseStudy() {
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
      const pageScrollBottom = window.scrollY + window.innerHeight;
      const scrollableHeight = document.documentElement.scrollHeight;
      const isAtPageBottom = pageScrollBottom >= scrollableHeight - 8;
      const readingY = Math.min(frameHeight, frameScrollY + frameViewportHeight * rulerActivationRatio);
      let nextIndex = isAtPageBottom ? rulerTicks.length - 1 : 0;

      if (!isAtPageBottom) {
        rulerTicks.forEach((tick, index) => {
          if (readingY >= tick.frameY) {
            nextIndex = index;
          }
        });
      }

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
    <main className={styles.page} ref={pageRef} aria-label="Integra case study">
      <header className={styles.topNav} aria-label="Top Navigation Bar">
        <div className={styles.morphAnchor}>
          <div className={styles.tMorph}>
            <a
              className={styles.tMorphPlus}
              href="/"
              aria-label="Go to Work"
              onPointerEnter={(event) => playHoverSound(event.currentTarget)}
            >
              <span className={styles.brandLogo}>
                D[I<span className={styles.brandRest}>zaguirre</span>]
              </span>
            </a>
          </div>
        </div>
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="/" onPointerEnter={(event) => playHoverSound(event.currentTarget)}>Work</a>
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
          className={[styles.rulerCard, isRulerCardVisible ? styles.rulerCardVisible : ""].join(" ")}
          aria-hidden={!isRulerCardVisible}
          onPointerEnter={showRulerCard}
          onPointerLeave={hideRulerCard}
        >
          <ol className={styles.rulerList}>
            {sectionNavItems.map((item) => (
              <li className={activeTick.label === item.label ? styles.rulerListActive : ""} key={item.label}>
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
          <p className={styles.projectLabel}>CBRE - Challenge Winner 2025</p>
          <h1 className={styles.title}>Integra - An employee centered solution</h1>

          <section className={styles.heroCard} aria-label="Integra hero preview">
            <img loading="eager" decoding="async"
              className={styles.plainImage}
              src="/images/integra/hero.png"
              alt="Integra team dashboard"
              style={{ left: 0, top: 0, width: 1131, height: 637 }}
            />
          </section>

          <section className={styles.metaGrid} style={{ left: 425 }} aria-label="Project details">
            <p className={styles.metaLabel}>Role</p>
            <p className={styles.metaLabel}>Timeline</p>
            <p className={styles.metaLabel}>With</p>
            <p className={styles.metaLabel}>Skills</p>
            <div className={styles.metaValue}>
              <p>Product Design</p>
            </div>
            <div className={styles.metaValue}>
              <p>24 Hours</p>
            </div>
            <div className={styles.metaValue}>
              <p>Dung Nguyen</p>
              <p>Ajith Anand</p>
            </div>
            <div className={styles.metaValue}>
              <p>Product Design</p>
              <p>Product Research</p>
              <p>Prototyping</p>
            </div>
          </section>

          <p className={styles.sectionKicker} style={{ left: 395, top: 1216 }}>
            Overview
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 1247, width: 929 }}>
            Reimagining the workplace environment for CBRE
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 1302, width: 798 }}>
            As a team of 3 designers, our goal was to research and design a product within 24
            hours.
          </p>

          <h3 className={styles.sectionTitle} style={{ left: 395, top: 1413, width: 297 }}>
            Product Strategy
          </h3>
          <p className={styles.sectionCopy} style={{ left: 395, top: 1467, width: 297 }}>
            Researching and thinking broadly of current solutions and user sentiment.
          </p>
          <h3 className={styles.sectionTitle} style={{ left: 746, top: 1413, width: 297 }}>
            Prototyping
          </h3>
          <p className={styles.sectionCopy} style={{ left: 746, top: 1467, width: 297 }}>
            Narrowing down with ideation and rapidly designing.
          </p>
          <h3 className={styles.sectionTitle} style={{ left: 1079, top: 1413, width: 310 }}>
            Presenting
          </h3>
          <p className={styles.sectionCopy} style={{ left: 1079, top: 1467, width: 310 }}>
            Gathering our research, final demo, and present our solution.
          </p>

          <img loading="lazy" decoding="async"
            className={styles.plainImage}
            src="/images/integra/double-diamond.png"
            alt="Double diamond design process: Discover, Define, Develop, Deliver"
            style={{ left: 395, top: 1603, width: 1135, height: 381 }}
          />

          <p className={styles.sectionKicker} style={{ left: 395, top: 2115 }}>
            Company Track
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 2146, width: 929 }}>
            Designing a digital employee centered product
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 2201, width: 1135 }}>
            &ldquo;Design and present a digital product or experience that reimagines the workplace
            environment for employees. this may include ways to combat employee burnout,
            disengagement, wellbeing, and lack of connection in a hybrid/remote work
            environment.&rdquo;
          </p>

          <p className={styles.sectionKicker} style={{ left: 395, top: 2360 }}>
            Solution
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 2394, width: 929 }}>
            Integra: a web application where teams can connect, collaborate, and prevent burnout
            together
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 2491, width: 1021 }}>
            A computer application that helps managers monitor and support employee wellbeing
            through data-driven insights, gamified productivity, and a virtual workplace.
          </p>

          <p className={styles.sectionKicker} style={{ left: 395, top: 2659 }}>
            Core Flows
          </p>

          <img loading="lazy" decoding="async"
            className={styles.plainImage}
            src="/images/integra/dashboard.png"
            alt="Integra manager dashboard"
            style={{ left: 395, top: 2701, width: 1135, height: 638 }}
          />
          <h2 className={styles.captionTitle} style={{ left: 395, top: 3379, width: 929 }}>
            Home Page
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 3434, width: 1135 }}>
            The manager&rsquo;s POV where it displays employee&rsquo;s point ranking, overall
            team&rsquo;s weekly progress, and employee&rsquo;s in distress and options to help them.
          </p>

          <img loading="lazy" decoding="async"
            className={styles.plainImage}
            src="/images/integra/virtual-room.png"
            alt="Integra virtual room"
            style={{ left: 395, top: 3587, width: 1135, height: 638 }}
          />
          <h2 className={styles.captionTitle} style={{ left: 395, top: 4265, width: 929 }}>
            Virtual Room
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 4320, width: 1135 }}>
            Remote teams can log in their virtualized office allowing them to Quickly DM or
            Voice-Chat interaction between each other, Redeem points to customize personal office
            space, and see the team&rsquo;s chat located on the top of the page.
          </p>

          <img loading="lazy" decoding="async"
            className={styles.plainImage}
            src="/images/integra/task-board.png"
            alt="Integra task board and analytics"
            style={{ left: 395, top: 4473, width: 1135, height: 638 }}
          />
          <h2 className={styles.captionTitle} style={{ left: 395, top: 5151, width: 929 }}>
            Analytics for Team Manager
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 5206, width: 1135 }}>
            Managers can log in and be informed of the current status of their office such as the
            General Task Timeline and specific team stats, and specific employee current tasks,
            their points, and ability to assign a task to them.
          </p>

          <p className={styles.sectionKicker} style={{ left: 396, top: 5380 }}>
            Research
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 396, top: 5411, width: 929 }}>
            Using a Bifocal Analysis Method
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 5466, width: 991 }}>
            We gathered various different companies that provided corporate products and wellness
            activities from a range of High-Engagement to Low-Engagement and from Autonomous to
            Leader-Driven.
          </p>
          <img loading="lazy" decoding="async"
            className={styles.plainImage}
            src="/images/integra/bifocal.png"
            alt="Bifocal analysis mapping wellness products by engagement and autonomy"
            style={{ left: 395, top: 5558, width: 1135, height: 508 }}
          />
          <p className={styles.sectionCopy} style={{ left: 396, top: 6105, width: 1129 }}>
            Once visualized, we decided to go for a solution that has a medium to low-engagement
            and is more leader driven. With a more narrowed focus point, we aimed to create an
            application from a Managers POV.
          </p>

          <h2 className={styles.captionTitle} style={{ left: 396, top: 6324, width: 1056 }}>
            Current solutions and what they lacked
          </h2>
          <p className={styles.sectionCopy} style={{ left: 396, top: 6379, width: 1126 }}>
            We decided to create a chart that listed out a set of features with a set of current
            products that also provided solutions within the same category. We researched what they
            had and what they lacked, forming a large but concise analysis.
          </p>
          <img loading="lazy" decoding="async"
            className={styles.roundedImage}
            src="/images/integra/feature-comparison.png"
            alt="Feature comparison chart of current workplace wellness products"
            style={{ left: 396, top: 6489, width: 1134, height: 418 }}
          />

          <h2 className={styles.captionTitle} style={{ left: 396, top: 7097, width: 929 }}>
            User Journey &amp; Sentiment
          </h2>
          <p className={styles.sectionCopy} style={{ left: 396, top: 7152, width: 1129 }}>
            We decided to create a chart that listed out a set of features with a set of current
            products that also provided solutions within the same category. We researched what they
            had and what they lacked, forming a large but concise analysis.
          </p>
          <img loading="lazy" decoding="async"
            className={styles.roundedImage}
            src="/images/integra/journey-sentiment.png"
            alt="User journey and sentiment map"
            style={{ left: 406, top: 7262, width: 1124, height: 551 }}
          />

          <h2 className={styles.captionTitle} style={{ left: 406, top: 7913, width: 929 }}>
            Early Explorations
          </h2>
          <p className={styles.sectionCopy} style={{ left: 406, top: 7978, width: 991 }}>
            As a team we brainstormed the main set of features and the possible layouts the product
            could have.
          </p>
          <img loading="lazy" decoding="async"
            className={styles.roundedImage}
            src="/images/integra/wireframe-1.png"
            alt="Early wireframe exploration one"
            style={{ left: 414, top: 8092, width: 335, height: 446 }}
          />
          <img loading="lazy" decoding="async"
            className={styles.roundedImage}
            src="/images/integra/wireframe-2.png"
            alt="Early wireframe exploration two"
            style={{ left: 805, top: 8092, width: 338, height: 451 }}
          />
          <img loading="lazy" decoding="async"
            className={styles.roundedImage}
            src="/images/integra/wireframe-3.png"
            alt="Early wireframe exploration three"
            style={{ left: 1199, top: 8092, width: 338, height: 451 }}
          />

          <p className={styles.sectionKicker} style={{ left: 416, top: 8658 }}>
            Reflection
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 416, top: 8689, width: 929 }}>
            Final Thoughts &amp; Looking Forward
          </h2>
          <p className={styles.sectionCopy} style={{ left: 414, top: 8744, width: 1124 }}>
            Throughout the design-a-thon my team and I learned how to blend social interaction,
            performance tracking, and wellbeing support into a digital experience that encourages
            engagement, and mental health awareness in the workplace. It was a great experience of
            fast research, designing, and presenting. Thankful for my teammates Dung &amp; Ajith
            for being amazing and working hard! Looking forward to doing another challenge.
          </p>
          <img loading="lazy" decoding="async"
            className={styles.roundedImage}
            src="/images/integra/team-1.png"
            alt="The team presenting at the CBRE design challenge"
            style={{ left: 414, top: 8905, width: 532, height: 330 }}
          />
          <img loading="lazy" decoding="async"
            className={styles.roundedImage}
            src="/images/integra/team-2.png"
            alt="The team celebrating the CBRE design challenge win"
            style={{ left: 952, top: 8905, width: 586, height: 330 }}
          />
        </div>
      </div>
    </main>
  );
}
