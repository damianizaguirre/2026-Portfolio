"use client";

import { memo, useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "left" | "right";

const AudioCtx: typeof AudioContext | null =
  typeof window !== "undefined"
    ? (window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext ??
        null)
    : null;

function useTickAudio(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(
    () => () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    },
    [],
  );

  useEffect(() => {
    if (!enabled || !AudioCtx) return;
    const warm = () => {
      if (!ctxRef.current) ctxRef.current = new AudioCtx!();
      if (ctxRef.current.state === "suspended")
        ctxRef.current.resume().catch(() => {});
    };
    window.addEventListener("pointerdown", warm, { once: true });
    return () => window.removeEventListener("pointerdown", warm);
  }, [enabled]);

  return useCallback(
    (direction: Direction, velocity = 1) => {
      if (!enabled || !AudioCtx) return;

      const getCtx = async () => {
        if (!ctxRef.current) ctxRef.current = new AudioCtx!();
        if (ctxRef.current.state === "suspended")
          await ctxRef.current.resume();
        return ctxRef.current;
      };

      getCtx()
        .then((ctx) => {
          const t = ctx.currentTime;
          const vn = Math.min(Math.abs(velocity) / 300, 1);
          const peakGain = 0.28 * (0.55 + vn * 0.45);
          const freq = 1600 * (0.88 + vn * 0.24);
          const bodyDur = 0.022 - vn * 0.008;
          const clickDur = bodyDur * 0.3;
          const panStart = direction === "left" ? 0.7 : -0.7;
          const panEnd = direction === "left" ? -0.7 : 0.7;

          const panner = ctx.createStereoPanner();
          panner.pan.setValueAtTime(panStart, t);
          panner.pan.linearRampToValueAtTime(panEnd, t + bodyDur);
          panner.connect(ctx.destination);

          const bodyGain = ctx.createGain();
          bodyGain.gain.setValueAtTime(peakGain, t);
          bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + bodyDur);
          bodyGain.connect(panner);

          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = freq;
          filter.Q.value = 6;
          filter.connect(bodyGain);

          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq * 1.25, t);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.65, t + bodyDur);
          osc.connect(filter);
          osc.start(t);
          osc.stop(t + bodyDur);

          const nSamples = Math.ceil(ctx.sampleRate * clickDur);
          const noiseBuf = ctx.createBuffer(1, nSamples, ctx.sampleRate);
          const d = noiseBuf.getChannelData(0);
          for (let i = 0; i < nSamples; i++)
            d[i] =
              (Math.random() * 2 - 1) * Math.exp(-i / (nSamples * 0.2));

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(peakGain * 0.35, t);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + clickDur);
          noiseGain.connect(panner);

          const noiseHp = ctx.createBiquadFilter();
          noiseHp.type = "highpass";
          noiseHp.frequency.value = 2400;
          noiseHp.connect(noiseGain);

          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuf;
          noise.connect(noiseHp);
          noise.start(t);
          noise.stop(t + clickDur);
        })
        .catch(() => {});
    },
    [enabled],
  );
}

export interface CoverFlowItem {
  id: string | number;
  image: string;
  title: string;
  subtitle?: string;
}

export interface RenderImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  draggable: boolean;
  sizes: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

export interface CoverFlowProps {
  items: CoverFlowItem[];
  itemWidth?: number;
  itemHeight?: number;
  stackSpacing?: number;
  centerGap?: number;
  rotation?: number;
  initialIndex?: number;
  enableReflection?: boolean;
  enableClickToSnap?: boolean;
  enableScroll?: boolean;
  enableAudio?: boolean;
  scrollThreshold?: number;
  reduceMotion?: boolean;
  className?: string;
  onItemClick?: (item: CoverFlowItem, index: number) => void;
  onIndexChange?: (index: number) => void;
  renderImage?: (props: RenderImageProps) => ReactNode;
}

const defaultRenderImage = (props: RenderImageProps) => (
  <img
    src={props.src}
    alt={props.alt}
    width={props.width}
    height={props.height}
    className={props.className}
    draggable={props.draggable}
    sizes={props.sizes}
    loading={props.loading}
  />
);

function clampIndex(index: number, length: number) {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

const subscribeNever = () => () => {};

export function CoverFlow({
  items,
  itemWidth = 400,
  itemHeight = 400,
  stackSpacing = 100,
  centerGap = 250,
  rotation = 50,
  initialIndex = 0,
  enableReflection = false,
  enableClickToSnap = true,
  enableScroll = true,
  enableAudio = false,
  scrollThreshold = 100,
  reduceMotion,
  className,
  onItemClick,
  onIndexChange,
  renderImage,
}: CoverFlowProps) {
  const safeInitial = clampIndex(initialIndex, items.length);
  const [activeIndex, setActiveIndex] = useState(safeInitial);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replace(/:/g, "x");
  const isMounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isSafari] = useState(
    () =>
      typeof window !== "undefined" &&
      /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent),
  );
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, []);

  const scale = containerWidth > 0 && itemWidth > 0 ? Math.min(1, (containerWidth * 0.78) / itemWidth) : 1;
  const effectiveWidth = Math.round(itemWidth * scale);
  const effectiveHeight = Math.round(itemHeight * scale);
  const effectiveStackSpacing = Math.round(stackSpacing * scale);
  const effectiveCenterGap = Math.round(centerGap * scale);

  const reflectionFilterId =
    isMounted && enableReflection && !isMobile && !isSafari
      ? `${instanceId}-rf`
      : undefined;
  const showReflection = isMounted && enableReflection;

  const activeIndexRef = useRef(activeIndex);
  const enableScrollRef = useRef(enableScroll);
  const scrollThresholdRef = useRef(scrollThreshold);
  const onItemClickRef = useRef(onItemClick);
  const enableClickToSnapRef = useRef(enableClickToSnap);
  const onIndexChangeRef = useRef(onIndexChange);
  const isMountedForCallbackRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    enableScrollRef.current = enableScroll;
    scrollThresholdRef.current = scrollThreshold;
    onItemClickRef.current = onItemClick;
    enableClickToSnapRef.current = enableClickToSnap;
    onIndexChangeRef.current = onIndexChange;
  });

  const systemReducedMotion = useReducedMotion();
  const prefersReducedMotion = reduceMotion ?? systemReducedMotion;
  const scrollX = useMotionValue(safeInitial);
  const springX = useSpring(scrollX, { stiffness: 150, damping: 24, mass: 1 });
  const effectiveScrollX = prefersReducedMotion ? scrollX : springX;
  const tick = useTickAudio(enableAudio);

  const clampedInitial = clampIndex(initialIndex, items.length);
  const [prevClampedInitial, setPrevClampedInitial] = useState(clampedInitial);
  if (prevClampedInitial !== clampedInitial) {
    setPrevClampedInitial(clampedInitial);
    if (clampedInitial !== activeIndex) {
      setActiveIndex(clampedInitial);
      scrollX.set(clampedInitial);
    }
  }

  useEffect(() => {
    if (!isMountedForCallbackRef.current) {
      isMountedForCallbackRef.current = true;
      return;
    }
    onIndexChangeRef.current?.(activeIndex);
  }, [activeIndex]);

  const jumpToIndex = useCallback(
    (index: number, velocity = 0, direction?: Direction) => {
      const clamped = clampIndex(index, items.length);
      const prev = activeIndexRef.current;
      if (clamped === prev) return;
      const dir: Direction = direction ?? (clamped > prev ? "right" : "left");
      setActiveIndex(clamped);
      scrollX.set(clamped);
      tick(dir, velocity);
    },
    [items.length, scrollX, tick],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulator = 0;
    let lastTime = Date.now();
    let lastJump = 0;

    const handleWheel = (e: WheelEvent) => {
      if (!enableScrollRef.current) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastTime > 200) accumulator = 0;
      lastTime = now;
      accumulator += e.deltaX;

      const threshold = scrollThresholdRef.current;
      const shouldJump =
        (accumulator > threshold || accumulator < -threshold) &&
        now - lastJump > 150;

      if (shouldJump) {
        const dir = accumulator > 0 ? "right" : "left";
        jumpToIndex(
          Math.round(scrollX.get()) + (dir === "right" ? 1 : -1),
          Math.abs(e.deltaX),
          dir,
        );
        accumulator = 0;
        lastJump = now;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [jumpToIndex, scrollX]);

  const handleCardClick = useCallback(
    (item: CoverFlowItem, index: number) => {
      if (index === activeIndexRef.current) {
        onItemClickRef.current?.(item, index);
      } else if (enableClickToSnapRef.current) {
        jumpToIndex(index);
      }
    },
    [jumpToIndex],
  );

  const rawDragX = useRef(0);

  const onDragStart = useCallback(() => {
    rawDragX.current = scrollX.get();
    setIsDragging(true);
  }, [scrollX]);

  const onDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      rawDragX.current -= info.delta.x / (effectiveCenterGap * 0.8);
      const raw = rawDragX.current;
      const max = items.length - 1;
      const damped =
        raw < 0
          ? raw * 0.35
          : raw > max
            ? max + (raw - max) * 0.35
            : raw;
      scrollX.set(damped);
    },
    [effectiveCenterGap, items.length, scrollX],
  );

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      const projected = scrollX.get() - info.velocity.x * 0.002;
      const clamped = clampIndex(Math.round(projected), items.length);
      const prev = activeIndexRef.current;
      const dir: Direction = clamped >= prev ? "right" : "left";
      setActiveIndex(clamped);
      scrollX.set(clamped);
      if (clamped !== prev) tick(dir, Math.abs(info.velocity.x));
    },
    [items.length, scrollX, tick],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        jumpToIndex(activeIndexRef.current - 1, 120, "left");
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        jumpToIndex(activeIndexRef.current + 1, 120, "right");
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const idx = clampIndex(activeIndexRef.current, items.length);
        const item = items[idx];
        if (item) onItemClickRef.current?.(item, idx);
      }
    },
    [jumpToIndex, items],
  );

  if (items.length === 0) return null;

  return (
    <>
      {reflectionFilterId && (
        <svg
          aria-hidden="true"
          focusable="false"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
        >
          <defs>
            <filter
              id={reflectionFilterId}
              x="-3%"
              y="-3%"
              width="106%"
              height="106%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018 0.065"
                numOctaves={3}
                seed={8}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={5}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation="0.4 1.8" />
            </filter>
          </defs>
        </svg>
      )}
      <motion.div
        ref={containerRef}
        className={cn(
          "group/cf relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-transparent focus:outline-none touch-pan-y",
          isDragging ? "is-dragging cursor-grabbing" : "cursor-grab",
          className,
        )}
        role="region"
        aria-label="Cover Flow"
        tabIndex={0}
        onKeyDown={onKeyDown}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        <div
          className="relative flex min-h-0 w-full flex-1 items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          {items.map((item, index) => (
            <CoverFlowItemCard
              key={item.id}
              item={item}
              index={index}
              scrollX={effectiveScrollX}
              width={effectiveWidth}
              height={effectiveHeight}
              stackSpacing={effectiveStackSpacing}
              centerGap={effectiveCenterGap}
              rotation={rotation}
              isActive={index === activeIndex}
              showReflection={showReflection}
              reflectionFilterId={reflectionFilterId}
              enableClickToSnap={enableClickToSnap}
              reduceMotion={prefersReducedMotion ?? false}
              renderImage={renderImage}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        <div className="relative z-40 mt-3 h-14 w-full shrink-0 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.18,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="absolute inset-x-0 top-0 px-6 text-center"
            >
              <h3 className="text-2xl font-semibold tracking-tight drop-shadow-md text-zinc-900 dark:text-zinc-100">
                {items[activeIndex]?.title}
              </h3>
              {items[activeIndex]?.subtitle && (
                <p className="mt-1.5 text-xs font-normal tracking-wide text-zinc-500 dark:text-zinc-400">
                  {items[activeIndex]?.subtitle}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

CoverFlow.displayName = "CoverFlow";

interface CardProps {
  item: CoverFlowItem;
  index: number;
  scrollX: MotionValue<number>;
  width: number;
  height: number;
  stackSpacing: number;
  centerGap: number;
  rotation: number;
  isActive: boolean;
  showReflection: boolean;
  reflectionFilterId?: string;
  enableClickToSnap: boolean;
  reduceMotion: boolean;
  renderImage?: (props: RenderImageProps) => ReactNode;
  onCardClick: (item: CoverFlowItem, index: number) => void;
}

const CoverFlowItemCard = memo(function CoverFlowItemCard({
  item,
  index,
  scrollX,
  width,
  height,
  stackSpacing,
  centerGap,
  rotation,
  isActive,
  showReflection,
  reflectionFilterId,
  enableClickToSnap,
  reduceMotion,
  renderImage,
  onCardClick,
}: CardProps) {
  const rotateY = useTransform(scrollX, (value) => {
    if (reduceMotion) return 0;
    const pos = index - value;
    const absPos = Math.abs(pos);
    return absPos < 0.5
      ? -pos * (rotation * 2)
      : pos < 0
        ? rotation
        : -rotation;
  });

  const x = useTransform(scrollX, (value) => {
    const pos = index - value;
    const absPos = Math.abs(pos);
    if (absPos < 1) return pos * centerGap;
    return pos < 0
      ? -centerGap - (absPos - 1) * stackSpacing
      : centerGap + (absPos - 1) * stackSpacing;
  });

  const z = useTransform(scrollX, (value) => {
    if (reduceMotion) return 0;
    const absPos = Math.abs(index - value);
    return absPos > 0.5 ? -200 : absPos * -400;
  });

  const zIndex = useTransform(
    scrollX,
    (value) => 1000 - Math.abs(index - value) * 10,
  );

  const dimOpacity = useTransform(scrollX, (value) =>
    Math.abs(index - value) < 0.5 ? 0 : 0.5,
  );

  const imageRenderer = renderImage ?? defaultRenderImage;
  const cursorClass =
    isActive || enableClickToSnap ? "cursor-pointer" : "cursor-grab";

  return (
    <motion.div
      className={cn(
        "absolute top-1/2 left-1/2 preserve-3d will-change-transform overflow-hidden rounded-xl isolate group-[.is-dragging]/cf:!cursor-grabbing",
        cursorClass,
      )}
      style={{
        width,
        height,
        marginTop: -height / 2,
        marginLeft: -width / 2,
        x,
        z,
        rotateY,
        zIndex,
        pointerEvents: "auto",
        clipPath: "inset(0 round 0.75rem)",
      }}
      onClick={() => onCardClick(item, index)}
    >
      <div className="relative h-full w-full rounded-xl bg-black shadow-2xl">
        <div className="absolute inset-0 z-20 rounded-xl border border-white/10 pointer-events-none" />
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          {imageRenderer({
            src: item.image,
            alt: item.title,
            width,
            height,
            className:
              "object-cover select-none pointer-events-none w-full h-full",
            draggable: false,
            sizes: `${width}px`,
            priority: isActive,
            loading: isActive ? "eager" : "lazy",
          })}
          <div className="absolute inset-0 z-10 bg-linear-to-tr from-white/10 to-transparent opacity-0 dark:opacity-20 pointer-events-none" />
        </div>
        <motion.div
          className="absolute inset-0 z-10 rounded-xl bg-black pointer-events-none"
          style={{ opacity: dimOpacity }}
        />
      </div>

      {showReflection && (
        <div
          aria-hidden="true"
          className="absolute left-0 overflow-hidden pointer-events-none"
          style={{
            top: "100%",
            width,
            height: height * 0.42,
            marginTop: 1,
            transformOrigin: "top center",
            transform: "rotateX(12deg) translateZ(0)",
            willChange: "transform",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: "scaleY(-1)",
              filter: reflectionFilterId
                ? `url(#${reflectionFilterId})`
                : undefined,
              mixBlendMode: reflectionFilterId ? "screen" : undefined,
              opacity: reflectionFilterId ? 0.55 : 0.4,
            }}
          >
            <div
              className={cn(
                "relative h-full w-full rounded-xl bg-black",
                reflectionFilterId && "shadow-2xl",
              )}
            >
              <div className="absolute inset-0 z-20 rounded-xl border border-white/10 pointer-events-none" />
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                {imageRenderer({
                  src: item.image,
                  alt: "",
                  width,
                  height,
                  className: "object-cover w-full h-full",
                  draggable: false,
                  sizes: `${width}px`,
                  loading: "lazy",
                })}
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 70%, transparent) 40%, transparent 100%)",
            }}
          />
        </div>
      )}
    </motion.div>
  );
});
