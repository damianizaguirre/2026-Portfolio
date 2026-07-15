"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type NavKey = "home" | "fun" | "about" | "resume";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 21" fill="currentColor" className={className}>
      <path d="M1.00586 10.7812C0.380859 10.7812 0 10.3516 0 9.84375C0 9.57031 0.126953 9.28711 0.380859 9.07227L10.5566 0.527344C10.9863 0.175781 11.4551 0 11.9238 0C12.3926 0 12.8613 0.175781 13.291 0.527344L18.1152 4.58984V2.85156C18.1152 2.42188 18.4082 2.13867 18.8477 2.13867H20.166C20.5957 2.13867 20.8789 2.42188 20.8789 2.85156V6.9043L23.4668 9.07227C23.7207 9.28711 23.8477 9.57031 23.8477 9.84375C23.8477 10.3516 23.4668 10.7812 22.8516 10.7812C22.5488 10.7812 22.2754 10.625 22.041 10.4199L20.8789 9.45312V18.623C20.8789 20.0684 20.0098 20.918 18.5352 20.918H5.32227C3.83789 20.918 2.96875 20.0684 2.96875 18.623V9.45312L1.80664 10.4199C1.57227 10.625 1.30859 10.7812 1.00586 10.7812ZM14.7461 13.3301V19.0039H18.0273C18.6328 19.0039 18.9648 18.6621 18.9648 18.0469V7.8418L12.3438 2.28516C12.207 2.16797 12.0605 2.11914 11.9238 2.11914C11.7871 2.11914 11.6406 2.16797 11.5137 2.28516L4.88281 7.8418V18.0469C4.88281 18.6621 5.21484 19.0039 5.82031 19.0039H9.10156V13.3301C9.10156 12.8711 9.4043 12.5781 9.86328 12.5781H13.9941C14.4531 12.5781 14.7461 12.8711 14.7461 13.3301Z" />
    </svg>
  );
}

function FunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 23" fill="currentColor" className={className}>
      <path d="M22.627 10.4785C22.3926 10.4785 22.2168 10.3125 22.1777 10.0879C21.5625 6.75781 21.25 6.14258 17.793 5.68359C17.5488 5.6543 17.3828 5.46875 17.3828 5.23438C17.3828 5.00977 17.5488 4.83398 17.793 4.79492C21.2207 4.3457 21.6699 3.69141 22.1777 0.400391C22.2168 0.166016 22.3926 0 22.627 0C22.8418 0 23.0273 0.166016 23.0664 0.400391C23.6621 3.7207 24.0039 4.33594 27.4512 4.79492C27.6953 4.83398 27.8613 5.00977 27.8613 5.23438C27.8613 5.46875 27.6953 5.6543 27.4512 5.68359C24.0332 6.17188 23.584 6.74805 23.0664 10.0781C23.0273 10.3125 22.8613 10.4785 22.627 10.4785ZM1.39648 10.6934C0.810547 10.6934 0.439453 10.3223 0.439453 9.72656V7.60742C0.439453 5.51758 1.54297 4.43359 3.64258 4.43359H16.1816C16.0449 4.6582 15.957 4.93164 15.957 5.23438C15.957 5.66406 16.123 6.06445 16.3672 6.34766H3.75977C2.85156 6.34766 2.35352 6.81641 2.35352 7.76367V9.72656C2.35352 10.3223 1.99219 10.6934 1.39648 10.6934ZM27.1289 12.4316C26.9531 12.4316 26.8164 12.3145 26.7773 12.1387C26.4746 10.4785 26.582 10.4395 24.7852 10.1465C24.6094 10.1172 24.4922 9.9707 24.4922 9.80469C24.4922 9.63867 24.6094 9.49219 24.7852 9.46289C26.582 9.17969 26.4746 9.13086 26.7773 7.49023C26.8164 7.31445 26.9434 7.17773 27.1289 7.17773C27.3047 7.17773 27.4316 7.30469 27.4707 7.49023C27.7734 9.11133 27.6758 9.16016 29.4629 9.46289C29.6387 9.50195 29.7559 9.63867 29.7559 9.80469C29.7559 9.99023 29.6387 10.1172 29.4336 10.1465C27.6758 10.4297 27.7734 10.4688 27.4707 12.1191C27.4316 12.3047 27.3145 12.4316 27.1289 12.4316ZM8.89648 18.1055C8.36914 18.1055 8.03711 17.793 8.03711 17.2949C8.03711 17.1387 8.07617 16.9531 8.16406 16.6992L10.6641 9.85352C10.8984 9.18945 11.3379 8.85742 12.002 8.85742C12.666 8.85742 13.125 9.18945 13.3594 9.85352L15.8594 16.6992C15.9473 16.9531 15.9863 17.1387 15.9863 17.2949C15.9863 17.793 15.6543 18.1055 15.127 18.1055C14.6875 18.1055 14.3945 17.8906 14.2383 17.3438L13.6426 15.5664H10.3906L9.78516 17.3438C9.62891 17.8906 9.33594 18.1055 8.89648 18.1055ZM10.791 14.2188H13.2324L12.0605 10.6934H11.9629L10.791 14.2188ZM1.39648 14.7363C0.634766 14.7363 0 14.1113 0 13.3301C0 12.5684 0.634766 11.9336 1.39648 11.9336C2.16797 11.9336 2.79297 12.5684 2.79297 13.3301C2.79297 14.1113 2.16797 14.7363 1.39648 14.7363ZM22.6172 14.7363C21.8555 14.7363 21.2207 14.1113 21.2207 13.3301C21.2207 12.832 21.5039 12.373 21.9434 12.1387C22.1094 12.207 22.3438 12.2852 22.6172 12.2852C22.8711 12.2852 23.1055 12.2168 23.291 12.1387C23.7207 12.3633 24.0137 12.8223 24.0137 13.3301C24.0137 14.1113 23.3887 14.7363 22.6172 14.7363ZM3.64258 22.666C1.54297 22.666 0.439453 21.582 0.439453 19.4922V16.9727C0.439453 16.3672 0.810547 16.0059 1.39648 16.0059C1.99219 16.0059 2.35352 16.3672 2.35352 16.9727V19.3262C2.35352 20.2734 2.85156 20.752 3.75977 20.752H20.2539C21.1523 20.752 21.6602 20.2734 21.6602 19.3262V16.9727C21.6602 16.3672 22.0215 16.0059 22.6172 16.0059C23.2129 16.0059 23.5742 16.3672 23.5742 16.9727V19.4922C23.5742 21.5723 22.4805 22.666 20.3711 22.666H3.64258Z" />
    </svg>
  );
}

function AboutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" fill="currentColor" className={className}>
      <path d="M10.0879 20.1758C4.52148 20.1758 0 15.6543 0 10.0879C0 4.52148 4.52148 0 10.0879 0C15.6543 0 20.1758 4.52148 20.1758 10.0879C20.1758 15.6543 15.6543 20.1758 10.0879 20.1758ZM10.0879 13.457C12.8711 13.457 15.0098 14.4434 16.0449 15.5859C17.373 14.1406 18.1934 12.207 18.1934 10.0879C18.1934 5.60547 14.5703 1.98242 10.0879 1.98242C5.60547 1.98242 1.98242 5.60547 1.98242 10.0879C1.98242 12.207 2.80273 14.1406 4.13086 15.5859C5.16602 14.4434 7.31445 13.457 10.0879 13.457ZM10.0879 11.8555C8.20312 11.8359 6.73828 10.2539 6.72852 8.1543C6.71875 6.18164 8.21289 4.54102 10.0879 4.54102C11.9727 4.54102 13.4473 6.18164 13.4473 8.1543C13.4473 10.2539 11.9824 11.8652 10.0879 11.8555Z" />
    </svg>
  );
}

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 23 22" fill="currentColor" className={className}>
      <path d="M0 18.0273V9.7168C0 8.34961 0.849609 7.53906 2.29492 7.53906H4.46289V3.17383C4.46289 1.08398 5.54688 0 7.65625 0H19.4531C21.5723 0 22.6562 1.08398 22.6562 3.17383V17.9688C22.6562 20.0586 21.5723 21.1426 19.4531 21.1426H3.19336C1.10352 21.1426 0 20.0391 0 18.0273ZM6.08398 19.2285H19.3359C20.2539 19.2285 20.7422 18.75 20.7422 17.8027V3.33984C20.7422 2.39258 20.2539 1.91406 19.3359 1.91406H7.77344C6.86523 1.91406 6.36719 2.39258 6.36719 3.33984V17.9395C6.36719 18.4375 6.26953 18.8574 6.08398 19.2285ZM8.84766 6.08398C8.4668 6.08398 8.18359 5.79102 8.18359 5.41992C8.18359 5.05859 8.4668 4.77539 8.84766 4.77539H18.2812C18.6523 4.77539 18.9355 5.05859 18.9355 5.41992C18.9355 5.79102 18.6523 6.08398 18.2812 6.08398H8.84766ZM8.84766 9.45312C8.4668 9.45312 8.18359 9.16992 8.18359 8.80859C8.18359 8.44727 8.4668 8.1543 8.84766 8.1543H18.2812C18.6523 8.1543 18.9355 8.44727 18.9355 8.80859C18.9355 9.16992 18.6523 9.45312 18.2812 9.45312H8.84766ZM1.91406 17.9395C1.91406 18.6719 2.4707 19.2285 3.19336 19.2285C3.90625 19.2285 4.46289 18.6914 4.46289 17.9395V9.45312H2.5293C2.14844 9.45312 1.91406 9.6875 1.91406 10.0684V17.9395ZM9.4043 16.25C8.63281 16.25 8.17383 15.791 8.17383 15.0293V12.7637C8.17383 12.002 8.63281 11.543 9.4043 11.543H11.8359C12.5977 11.543 13.0566 12.002 13.0566 12.7637V15.0293C13.0566 15.791 12.5977 16.25 11.8359 16.25H9.4043ZM14.7949 12.8418C14.4141 12.8418 14.1309 12.5586 14.1309 12.1973C14.1309 11.8262 14.4141 11.543 14.7949 11.543H18.2715C18.6426 11.543 18.9258 11.8262 18.9258 12.1973C18.9258 12.5586 18.6426 12.8418 18.2715 12.8418H14.7949ZM14.7949 16.25C14.4141 16.25 14.1309 15.9668 14.1309 15.6055C14.1309 15.2441 14.4141 14.9512 14.7949 14.9512H18.2715C18.6426 14.9512 18.9258 15.2441 18.9258 15.6055C18.9258 15.9668 18.6426 16.25 18.2715 16.25H14.7949Z" />
    </svg>
  );
}

const NAV_ITEMS: {
  key: NavKey;
  label: string;
  href: string;
  Icon: (props: { className?: string }) => React.JSX.Element;
  iconClassName: string;
  labelPx: number;
  labelMaxWidth: number;
}[] = [
  { key: "home", label: "Home", href: "/", Icon: HomeIcon, iconClassName: "w-[21px] h-[18px]", labelPx: 17, labelMaxWidth: 50 },
  { key: "fun", label: "Fun", href: "/fun", Icon: FunIcon, iconClassName: "w-[26px] h-[20px]", labelPx: 17, labelMaxWidth: 32 },
  { key: "about", label: "About", href: "/about", Icon: AboutIcon, iconClassName: "w-[18px] h-[18px]", labelPx: 17, labelMaxWidth: 50 },
  { key: "resume", label: "Resume", href: "/resume", Icon: ResumeIcon, iconClassName: "w-[20px] h-[19px]", labelPx: 17, labelMaxWidth: 68 },
];

const PILL_EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const PILL_DURATION = "420ms";
const HIGHLIGHT_DURATION_MS = 520;

export default function MobileNav({ active: initialActive }: { active: NavKey }) {
  const router = useRouter();
  const [active, setActive] = useState<NavKey>(initialActive);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Partial<Record<NavKey, HTMLAnchorElement | null>>>({});
  const indicatorReadyRef = useRef(false);
  const [indicatorReady, setIndicatorReady] = useState(false);

  useEffect(() => {
    setActive(initialActive);
  }, [initialActive]);

  useEffect(() => {
    NAV_ITEMS.forEach(({ href }) => router.prefetch(href));
  }, [router]);

  useLayoutEffect(() => {
    let frameId = 0;
    let stopId = 0;

    const measure = () => {
      const track = trackRef.current;
      const pill = pillRefs.current[active];
      const indicator = indicatorRef.current;

      if (!track || !pill || !indicator) return;

      const trackRect = track.getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();
      const x = pillRect.left - trackRect.left;

      indicator.style.width = `${pillRect.width}px`;
      indicator.style.transform = `translateX(${x}px)`;

      if (!indicatorReadyRef.current) {
        indicatorReadyRef.current = true;
        setIndicatorReady(true);
      }
    };

    const followActivePill = () => {
      measure();
      frameId = window.requestAnimationFrame(followActivePill);
    };

    followActivePill();
    stopId = window.setTimeout(() => {
      window.cancelAnimationFrame(frameId);
      measure();
    }, HIGHLIGHT_DURATION_MS + 80);

    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(stopId);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center pt-5">
        <div ref={trackRef} className="relative flex items-center gap-[5px]">
          <div
            aria-hidden="true"
            className="reflective-pill-fill absolute left-0 top-0 z-0 rounded-full motion-reduce:transition-none"
            ref={indicatorRef}
            style={{
              width: 123,
              height: 45,
              opacity: indicatorReady ? 1 : 0,
              transform: "translateX(0)",
              transition: "opacity 120ms ease-out",
            }}
          />
          <div
            className="relative z-10 flex items-center justify-center rounded-full bg-[#7cde85] text-white font-medium shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] shrink-0"
            style={{ width: 45, height: 45, fontSize: 20 }}
          >
            D
          </div>
          {NAV_ITEMS.map(({ key, label, href, Icon, iconClassName, labelPx, labelMaxWidth }) => {
            const isActive = active === key;
            const showOwnFill = !isActive || !indicatorReady;
            return (
              <Link
                key={key}
                ref={(node) => {
                  pillRefs.current[key] = node;
                }}
                href={href}
                prefetch
                onPointerDown={() => {
                  setActive(key);
                  router.prefetch(href);
                }}
                onClick={() => setActive(key)}
                aria-current={isActive ? "page" : undefined}
                className={`relative z-10 flex items-center justify-center rounded-full shrink-0 overflow-hidden active:scale-[0.96] ${
                  showOwnFill ? "reflective-pill-fill" : ""
                }`}
                style={{
                  width: isActive ? 123 : 55,
                  height: 45,
                  gap: isActive ? 9 : 0,
                  color: isActive
                    ? "var(--reflective-nav-active, #191919)"
                    : "var(--reflective-nav-muted, #707070)",
                  transition: `width ${PILL_DURATION} ${PILL_EASE}, gap ${PILL_DURATION} ${PILL_EASE}, color ${PILL_DURATION} ${PILL_EASE}, transform 150ms ${PILL_EASE}`,
                }}
              >
                <Icon className={`${iconClassName} shrink-0 block`} />
                <span
                  className="font-medium whitespace-nowrap overflow-hidden"
                  style={
                    {
                      fontSize: labelPx,
                      maxWidth: isActive ? labelMaxWidth : 0,
                      opacity: isActive ? 1 : 0,
                      transition: `max-width ${PILL_DURATION} ${PILL_EASE}, opacity ${PILL_DURATION} ${PILL_EASE}`,
                    } satisfies CSSProperties
                  }
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div aria-hidden="true" className="h-[65px]" />
    </>
  );
}
