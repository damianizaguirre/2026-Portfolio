"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./carfully-case-study.module.css";

const frameWidth = 1920;
const frameHeight = 8593;
const rulerActivationRatio = 0.18;

const rulerTicks = [
  { y: 5, type: "section", label: "Challenge", frameY: 1150 },
  { y: 17, type: "content", label: "Challenge copy", frameY: 1278 },
  { y: 29, type: "section", label: "Solution", frameY: 1402 },
  { y: 41, type: "content", label: "Solution copy", frameY: 1485 },
  { y: 53, type: "section", label: "Coreflows", frameY: 1655 },
  { y: 65, type: "content", label: "Home Page", frameY: 1701 },
  { y: 77, type: "content", label: "Learning Modules", frameY: 2305 },
  { y: 89, type: "content", label: "Financial Help", frameY: 2908 },
  { y: 101, type: "content", label: "Research", frameY: 3747 },
  { y: 113, type: "content", label: "Competitive Analysis", frameY: 3943 },
  { y: 125, type: "content", label: "Survey", frameY: 4549 },
  { y: 137, type: "content", label: "Interviews", frameY: 5498 },
  { y: 149, type: "content", label: "Interview findings", frameY: 5693 },
  { y: 161, type: "section", label: "Design", frameY: 5974 },
  { y: 173, type: "content", label: "Brand Identity", frameY: 6898 },
  { y: 185, type: "section", label: "Reflection", frameY: 7958 },
];

const sectionNavItems = rulerTicks
  .map((tick, index) => ({ label: tick.label, tickIndex: index, type: tick.type }))
  .filter((item) => item.type === "section");
const tickLabelCenterOffset = 2;

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

export default function CarfullyCaseStudy() {
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
    <main className={styles.page} ref={pageRef} aria-label="Carfully case study">
      <header className={styles.topNav} aria-label="Top Navigation Bar">
        <a
          className={styles.navDot}
          href="/"
          aria-label="Home"
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
            {sectionNavItems.map((item) => (
              <li
                className={activeTick.label === item.label ? styles.rulerListActive : ""}
                key={item.label}
                style={{ top: (rulerTicks[item.tickIndex]?.y ?? 0) + tickLabelCenterOffset }}
              >
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
          <p className={styles.projectLabel}>Capital One - UTD Design Challenge</p>
          <h1 className={styles.title}>Carfully - A transparent auto-financing tool</h1>

          <section className={styles.heroCard} aria-label="Carfully hero preview">
            <div className={styles.heroScreen}>
              <img src="/images/carfully/landing-page.png" alt="" />
            </div>
            <img
              className={styles.heroMacbook}
              src="/images/carfully/macbook-pro.png"
              alt="Carfully landing page shown on a MacBook Pro"
            />
          </section>

          <section className={styles.metaGrid} aria-label="Project details">
            <p className={styles.metaLabel}>Role</p>
            <p className={styles.metaLabel}>Timeline</p>
            <p className={styles.metaLabel}>With</p>
            <p className={styles.metaLabel}>Skills</p>
            <div className={styles.metaValue}>
              <p>Product Design</p>
            </div>
            <div className={styles.metaValue}>
              <p>Sep - Dec 2025</p>
            </div>
            <div className={styles.metaValue}>
              <p>Joie Lin</p>
              <p>AnnJayan</p>
              <p>Kennedy Cahn</p>
              <p>Maya Poduval</p>
            </div>
            <div className={styles.metaValue}>
              <p>Product Design</p>
              <p>User Research</p>
              <p>Prototyping</p>
            </div>
          </section>

          <p className={styles.sectionKicker} style={{ left: 395, top: 1150 }}>
            Challenge
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 1181, width: 1131 }}>
            Designing a digital tool that meets first-time car buyers at whatever financial point
            to demystify their car-buying journey
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 1278, width: 983 }}>
            Partnering with Capital One&apos;s Financial team, my team and I worked through this
            7-sprint challenge to research and create a digital-tool.
          </p>

          <p className={styles.sectionKicker} style={{ left: 395, top: 1402 }}>
            SOLUTION
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 1430, width: 1147 }}>
            Carfully: a guided learning tool and resource hub for first-time car buyers
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 1485, width: 1131 }}>
            A web application designed to break down the car-buying journey into manageable steps
            through structured, interactive modules.
          </p>

          <p className={styles.sectionKicker} style={{ left: 395, top: 1655 }}>
            Coreflows
          </p>

          <img
            className={styles.coreflowShot}
            src="/images/carfully/home-page-quiz.png"
            alt="Carfully home page after the initial quiz"
            style={{ left: 395, top: 1701, width: 665, height: 526 }}
          />
          <h2 className={styles.sectionTitle} style={{ left: 1112, top: 2121, width: 414 }}>
            Home Page
          </h2>
          <p className={styles.sectionCopy} style={{ left: 1112, top: 2175, width: 414 }}>
            After completing an onboarding questioner, the user is placed in 1 of 3 tracks.
          </p>

          <img
            className={styles.coreflowShot}
            src="/images/carfully/car-readiness-15.png"
            alt="Carfully learning modules"
            style={{ left: 395, top: 2305, width: 665, height: 526 }}
          />
          <h2 className={styles.sectionTitle} style={{ left: 1112, top: 2699, width: 414 }}>
            Learning Modules
          </h2>
          <p className={styles.sectionCopy} style={{ left: 1112, top: 2753, width: 414 }}>
            The user can navigate through different modules regarding different aspects of
            purchasing a vehicle.
          </p>

          <img
            className={styles.coreflowShot}
            src="/images/carfully/car-readiness-17.png"
            alt="Carfully financial help statistics"
            style={{ left: 395, top: 2909, width: 665, height: 699 }}
          />
          <h2 className={styles.sectionTitle} style={{ left: 1112, top: 3475, width: 414 }}>
            Financial Help
          </h2>
          <p className={styles.sectionCopy} style={{ left: 1112, top: 3529, width: 414 }}>
            When deciding on a vehicle to purchase, Carfully also provides statistics to help the
            user find the right financial fit.
          </p>

          <p className={styles.sectionKicker} style={{ left: 395, top: 3747 }}>
            Research
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 395, top: 3778, width: 929 }}>
            Observing characteristics of other problems
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 3833, width: 991 }}>
            Conducting a competitive analysis on 4 other car-selling websites and found 3 key
            issues within them, these being: Confusion about affordability, Lack of transparency,
            and Limited Financial Literacy.
          </p>
          <img
            className={styles.outlinedImage}
            src="/images/carfully/competitor-analysis.png"
            alt="Competitive analysis of car-selling websites"
            style={{ left: 395, top: 3943, width: 1131, height: 498 }}
          />

          <h2 className={styles.sectionTitle} style={{ left: 395, top: 4549, width: 929 }}>
            Surveying First-Time Car Buyers
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 4604, width: 991 }}>
            With over 100+ survey respondents, my team and I better understood the unique needs
            and challenges of first-time car buyers.
          </p>
          <img
            className={styles.roundedImage}
            src="/images/carfully/survey-results.png"
            alt="Survey results from first-time car buyers"
            style={{ left: 395, top: 4714, width: 1131, height: 646 }}
          />

          <h2 className={styles.sectionTitle} style={{ left: 395, top: 5498, width: 929 }}>
            Interviewing target users
          </h2>
          <p className={styles.sectionCopy} style={{ left: 395, top: 5553, width: 991 }}>
            After conducting a broad survey, we continued our research sprint with an in-depth
            interview process with 5 people who fit within our target demographic.
          </p>

          <h3 className={styles.sectionTitle} style={{ left: 395, top: 5693, width: 297 }}>
            3/5 participants
          </h3>
          <p className={styles.sectionCopy} style={{ left: 395, top: 5747, width: 297 }}>
            Would rely/prefer word of mouth, or peer-sourced information (i.e forums)
          </p>
          <h3 className={styles.sectionTitle} style={{ left: 746, top: 5693, width: 297 }}>
            4/5 participants
          </h3>
          <p className={styles.sectionCopy} style={{ left: 746, top: 5747, width: 297 }}>
            Plan to use a down payment and monthly payments to fully own the car
          </p>
          <h3 className={styles.sectionTitle} style={{ left: 1097, top: 5693, width: 297 }}>
            4/5 participants
          </h3>
          <p className={styles.sectionCopy} style={{ left: 1097, top: 5747, width: 297 }}>
            Hold negative or wary impressions of salespeople, viewing them as untruthful and
            difficult to trust
          </p>

          <p className={styles.sectionKicker} style={{ left: 401, top: 5974 }}>
            Design
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 401, top: 6005, width: 929 }}>
            Initial Wireframe&apos;s
          </h2>
          <p className={styles.sectionCopy} style={{ left: 401, top: 6060, width: 991 }}>
            Mapping out the whole user journey, my team and I designed the different types of
            pages we wanted to include.
          </p>
          <img
            className={styles.roundedImage}
            src="/images/carfully/wireframes.png"
            alt="Initial wireframes mapping the Carfully user journey"
            style={{ left: 395, top: 6170, width: 1131, height: 636 }}
          />

          <h2 className={styles.sectionTitle} style={{ left: 403, top: 6929, width: 929 }}>
            Brand Identity
          </h2>
          <p className={styles.sectionCopy} style={{ left: 402, top: 6984, width: 991 }}>
            We concluded by finalizing the website&apos;s brand kit and color scheme, choosing
            professional tones that mirror Capital One&apos;s identity to establish a foundation of
            trust and transparency.
          </p>
          <img
            className={styles.wideImage}
            src="/images/carfully/brand-identity.png"
            alt="Carfully brand identity and color scheme"
            style={{ left: 395, top: 7094, width: 1131, height: 727 }}
          />

          <p className={styles.sectionKicker} style={{ left: 397, top: 7958 }}>
            Reflection
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 397, top: 7989, width: 929 }}>
            Takeaways
          </h2>
          <div className={styles.sectionCopy} style={{ left: 395, top: 8044, width: 991 }}>
            <p>
              Throughout working on this semester long project, I realized how much I had learned
              regarding design and other aspects I didn&apos;t expect to learn such as the car buying
              process. This project allowed me to dive deep into Product Design and helped me grow
              my current skillset while also refining them.
            </p>
            <p>
              I&apos;m grateful for the opportunity to participate in a design challenge brought by
              Capital One and to be able to present our final work to the auto team as well.
            </p>
            <p>
              Overall it was a great experience working on this project and excited for my next
              projects.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
