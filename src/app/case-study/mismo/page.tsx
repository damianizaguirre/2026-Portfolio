"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import styles from "./mismo-case-study.module.css";

const frameWidth = 1920;
const frameHeight = 6830;
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

const boardScreens = [
  { kind: "welcome-map", title: "Welcome to Mismo", tone: "light" },
  { kind: "welcome-plain", title: "Welcome to Mismo", tone: "light" },
  { kind: "welcome-gradient", title: "Welcome to Mismo", tone: "dark" },
  { kind: "welcome-gradient", title: "Welcome to Mismo", tone: "dark" },
  { kind: "chips", title: "What do you want Mismo to help with?", tone: "light" },
  { kind: "permission", title: "Let Mismo listen to you", tone: "light" },
  { kind: "trial", title: "Get notified by Mismo", tone: "light" },
  { kind: "capture", title: "Capture your conversations", tone: "light" },
  { kind: "memo", title: "Try your first voice memo", tone: "light" },
  { kind: "signin", title: "Your thoughts deserve a home.", tone: "dark" },
  { kind: "folder-empty", title: "My Collection", tone: "sheet" },
  { kind: "folder-create", title: "My Collection", tone: "sheet" },
  { kind: "folder-colors", title: "My Collection", tone: "sheet" },
  { kind: "folder-icons", title: "My Collection", tone: "sheet" },
  { kind: "folder-list", title: "My Collection", tone: "sheet" },
  { kind: "folder-list", title: "My Collection", tone: "sheet" },
  { kind: "folder-list", title: "My Collection", tone: "sheet" },
  { kind: "summary", title: "App Design System", tone: "detail" },
  { kind: "transcript", title: "App Design System", tone: "detail" },
  { kind: "record-idle", title: "Recording Audio...", tone: "overlay" },
  { kind: "recording", title: "Recording Audio...", tone: "overlay" },
  { kind: "recording", title: "Recording Audio...", tone: "overlay" },
  { kind: "discard", title: "Discard draft?", tone: "overlay" },
  { kind: "processing", title: "Mismo is analyzing...", tone: "overlay" },
  { kind: "processing", title: "Mismo is noticing...", tone: "overlay" },
  { kind: "ready", title: "Analysis complete", tone: "overlay" },
  { kind: "sorted-green", title: "Mismo sorted your memo", tone: "overlay" },
  { kind: "sorted-red", title: "Mismo sorted your memo", tone: "overlay" },
] as const;

function MismoGlyph({ className = "" }: { className?: string }) {
  return <span className={[styles.mismoGlyph, className].join(" ")} aria-hidden="true" />;
}

function MiniPhone({ screen }: { screen: (typeof boardScreens)[number] }) {
  const toneClass = styles[`boardPhone${screen.tone}` as keyof typeof styles];

  return (
    <div className={[styles.boardPhone, toneClass].filter(Boolean).join(" ")}>
      <div className={styles.miniStatus}>
        <span>9:41</span>
        <span className={styles.miniIsland} />
        <span>▮▮▮</span>
      </div>
      <div className={styles.miniScreen}>{renderMiniScreen(screen.kind, screen.title)}</div>
    </div>
  );
}

function renderMiniScreen(kind: (typeof boardScreens)[number]["kind"], title: string) {
  switch (kind) {
    case "welcome-map":
      return (
        <>
          <div className={styles.miniDotMap} />
          <div className={styles.miniWelcomeContent}>
            <MismoGlyph />
            <strong>{title}</strong>
            <span>AI-powered voice memos, completely private.</span>
            <b>Get Started</b>
          </div>
        </>
      );
    case "welcome-plain":
      return (
        <div className={styles.miniWelcomeContent}>
          <MismoGlyph />
          <strong>{title}</strong>
          <span>AI-powered voice memos, completely private.</span>
          <b>Get Started</b>
        </div>
      );
    case "welcome-gradient":
      return (
        <>
          <div className={styles.miniGradientHero} />
          <div className={styles.miniWelcomeContent}>
            <MismoGlyph />
            <strong>{title}</strong>
            <span>AI-powered voice memos, completely private.</span>
            <b>Get Started</b>
          </div>
        </>
      );
    case "chips":
      return (
        <div className={styles.miniCard}>
          <div className={styles.miniDots}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <h4>{title}</h4>
          <div className={styles.miniChipCloud}>
            {["Work", "Reminders", "Lists", "Summaries", "Ideas", "To-Dos"].map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <button>Continue</button>
        </div>
      );
    case "permission":
    case "trial":
    case "capture":
      return (
        <div className={styles.miniCard}>
          <div className={styles.miniDots}>
            <i />
            <i className={styles.miniDotActive} />
            <i />
            <i />
            <i />
          </div>
          <h4>{title}</h4>
          <p>Turn your voice into reminders, notes, and summaries.</p>
          <div className={styles.miniPulse} />
          <button>{kind === "permission" ? "Enable microphone" : "Continue"}</button>
        </div>
      );
    case "memo":
      return (
        <div className={styles.miniCard}>
          <h4>{title}</h4>
          <p>Say what you need to remember.</p>
          <div className={styles.miniWave}>
            {Array.from({ length: 18 }).map((_, index) => (
              <i key={index} style={{ height: `${4 + Math.abs(9 - index) * 0.9}px` }} />
            ))}
          </div>
          <div className={styles.miniRecordButton}>Ⅱ</div>
        </div>
      );
    case "signin":
      return (
        <div className={styles.miniSignin}>
          <div className={styles.miniDotMap} />
          <strong>{title}</strong>
          <span>Continue with Google</span>
          <span>Continue with Apple</span>
        </div>
      );
    case "folder-empty":
    case "folder-create":
    case "folder-colors":
    case "folder-icons":
    case "folder-list":
      return (
        <div className={styles.miniHomeSheet}>
          <div className={styles.miniHomeHeader}>Damian&apos;s Mismo</div>
          <div className={styles.miniSheet}>
            <strong>{title}</strong>
            {kind === "folder-empty" && <p>No recordings yet.</p>}
            {kind === "folder-create" && <div className={styles.miniPlus}>+</div>}
            {kind === "folder-colors" && (
              <div className={styles.miniColorRow}>
                {["#ffcc4d", "#fd2d3a", "#2f7cff", "#01c566", "#9b51e0"].map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </div>
            )}
            {kind === "folder-icons" && <div className={styles.miniIconRow}>⌂ ☆ ✎ ⚑</div>}
            {kind === "folder-list" && (
              <div className={styles.miniFolderList}>
                <span>Recent Thoughts</span>
                <span>Shopping & Errands</span>
                <span>App Setup & Testing</span>
              </div>
            )}
          </div>
        </div>
      );
    case "summary":
    case "transcript":
      return (
        <div className={styles.miniDetail}>
          <strong>{title}</strong>
          <span>April 4th 2026</span>
          <div className={styles.miniTabs}>
            <b>AI Summary</b>
            <b>Transcript</b>
          </div>
          <div className={styles.miniParagraphs}>
            <p>Users need a fast way to capture thoughts and come back to them.</p>
            <p>Folders, reminders, and summaries become the follow-through layer.</p>
            <p>Every memo becomes searchable personal context.</p>
          </div>
        </div>
      );
    case "record-idle":
    case "recording":
    case "discard":
    case "processing":
    case "ready":
    case "sorted-green":
    case "sorted-red":
      return (
        <div className={styles.miniOverlay}>
          <div className={styles.miniHomeHeader}>Damian&apos;s Mismo</div>
          <div className={styles.miniRecorderSheet}>
            <strong>{title}</strong>
            {kind === "discard" ? (
              <div className={styles.miniDialog}>
                <b>Discard draft?</b>
                <span>Keep</span>
                <span>Discard</span>
              </div>
            ) : kind === "processing" ? (
              <div className={styles.miniProgress}>
                <i />
              </div>
            ) : kind === "ready" || kind === "sorted-green" || kind === "sorted-red" ? (
              <div className={kind === "sorted-red" ? styles.miniCheckRed : styles.miniCheck}>
                ✓
              </div>
            ) : (
              <div className={styles.miniRecordButton}>Ⅱ</div>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
}

function MismoProcessBoard() {
  return (
    <section className={styles.mismoProcessBoard} aria-label="Mismo interface exploration board">
      <div className={styles.boardGrid}>
        {boardScreens.map((screen, index) => (
          <MiniPhone key={`${screen.kind}-${index}`} screen={screen} />
        ))}
      </div>
    </section>
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
          <a href="/Damian-Izaguirre-Resume.pdf" onPointerEnter={(event) => playHoverSound(event.currentTarget)}>Resume</a>
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
              preload="metadata"
              poster="/assets/figma-home/mismo-poster.png"
            >
              <source src="/assets/figma-home/mismo-preview-lite.mp4" type="video/mp4" />
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
            People record hundreds of them and never listen to a single one twice. The problem was
            never capture, it&apos;s that nobody wants to do the filing.
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
          <a
            className={styles.researchIconLink}
            href="https://apps.apple.com/us/app/voice-memos/id1069512134"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Apple Voice Memos on the App Store"
            style={{ left: 645 }}
            onPointerEnter={(event) => playHoverSound(event.currentTarget)}
          >
            <img loading="lazy" decoding="async"
              className={styles.researchIcon}
              src="/images/mismo/research-app-apple-voice-memos.png"
              alt=""
            />
          </a>
          <a
            className={styles.researchIconLink}
            href="https://apps.apple.com/us/app/otter-transcribe-voice-notes/id1276437113"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Otter on the App Store"
            style={{ left: 821 }}
            onPointerEnter={(event) => playHoverSound(event.currentTarget)}
          >
            <img loading="lazy" decoding="async"
              className={styles.researchIcon}
              src="/images/mismo/research-app-otter-ai.png"
              alt=""
            />
          </a>
          <a
            className={styles.researchIconLink}
            href="https://apps.apple.com/us/app/audiopen-ai-voice-to-text/id6502638001"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open AudioPen on the App Store"
            style={{ left: 997 }}
            onPointerEnter={(event) => playHoverSound(event.currentTarget)}
          >
            <img loading="lazy" decoding="async"
              className={styles.researchIcon}
              src="/images/mismo/research-app-audiopen.png"
              alt=""
            />
          </a>
          <a
            className={styles.researchIconLink}
            href="https://apps.apple.com/us/app/voicenotes-ai-notes-meetings/id6483293628"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Voicenotes on the App Store"
            style={{ left: 1173 }}
            onPointerEnter={(event) => playHoverSound(event.currentTarget)}
          >
            <img loading="lazy" decoding="async"
              className={styles.researchIcon}
              src="/images/mismo/research-app-voicenotes.png"
              alt=""
            />
          </a>

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
          <MismoProcessBoard />

          <p className={styles.sectionKicker} style={{ left: 401, top: 6071 }}>
            Reflection
          </p>
          <h2 className={styles.sectionTitle} style={{ left: 401, top: 6102 }}>
            Insights from designing and building my first 0-1 app
          </h2>
          <p className={styles.sectionCopy} style={{ left: 401, top: 6166, width: 1111 }}>
            What surprised me most was how far design instinct carries in engineering. I
            couldn&apos;t always name the right pattern, but I could always tell when a flow
            wasn&apos;t going to work for the user.
          </p>
          <p className={styles.sectionCopy} style={{ left: 401, top: 6240, width: 1111 }}>
            AI was the easy part. Claude and Deepgram worked; the craft was in everything around
            them. Timezone math, retry logic, rate limits, making a 6-second pipeline feel
            intentional instead of slow.
          </p>
          <p className={styles.sectionCopy} style={{ left: 401, top: 6314, width: 1111 }}>
            Though I presented this at capstone project ceremony and received a Capital One award
            for version 1 of the app, the progression and overall journey of the app has been
            amazing to look at.
          </p>
          <p className={styles.sectionCopy} style={{ left: 401, top: 6388, width: 1111 }}>
            Still pending approval from Apple&apos;s App Store, Mismo is scheduled to launch
            September 2026.
          </p>
          <Footer className={styles.siteFooter} />
        </div>
      </div>
    </main>
  );
}
