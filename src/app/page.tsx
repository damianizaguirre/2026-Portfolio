import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ParticleBackground from "@/components/ParticleBackground";
import MobileNav from "@/components/MobileNav";

function ProjectCard({
  href,
  imageSrc,
  imageAlt,
  title,
  meta,
  cardHeight,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  meta: string;
  cardHeight: string;
}) {
  return (
    <div className="flex flex-col" style={{ gap: "clamp(12px, 1.25vw, 24px)" }}>
      <Link
        href={href}
        className="block overflow-hidden rounded-[20px] border border-[#cdcdcd] bg-white flex-shrink-0"
        style={{ height: cardHeight }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1600}
          height={900}
          className="w-full h-full object-cover"
          priority
        />
      </Link>
      <div
        className="flex justify-between items-baseline"
        style={{ fontSize: "var(--text-card)" }}
      >
        <p className="text-[rgba(0,0,0,0.9)] font-normal">{title}</p>
        <p className="text-[rgba(0,0,0,0.65)] font-normal whitespace-nowrap ml-6">{meta}</p>
      </div>
    </div>
  );
}

function MobileProjectCard({
  href,
  imageSrc,
  videoSrc,
  imageAlt,
  title,
  year,
}: {
  href: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt: string;
  title: string;
  year: string;
}) {
  return (
      <div className="flex flex-col gap-3">
        <Link
          href={href}
        className="block overflow-hidden rounded-[15px] border-[0.5px] h-[227px] transition-colors duration-300"
        style={{
          backgroundColor: "var(--reflective-card-fill)",
          borderColor: "var(--reflective-card-border)",
        }}
      >
        {videoSrc ? (
          <div className="relative w-full h-full">
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="absolute left-1/2 bottom-0 -translate-x-1/2 object-cover"
              style={{ width: "58.4%", height: "177.5%" }}
            />
          </div>
        ) : (
          <Image
            src={imageSrc!}
            alt={imageAlt}
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
        )}
      </Link>
      <div className="flex justify-between items-baseline text-[15px]">
        <p style={{ color: "var(--reflective-foreground)" }}>{title}</p>
        <p className="whitespace-nowrap ml-4" style={{ color: "var(--reflective-foreground)" }}>
          {year}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const topH = "clamp(300px, 38.23vw, 734px)";
  const botH = "clamp(220px, 30.16vw, 579px)";

  return (
    <main className="min-h-screen">
      {/* ---------- Mobile (Figma: Portfolio Mobile Version - Home) ---------- */}
      <div className="reflective-mobile-page md:hidden min-h-screen">
        <MobileNav active="home" />
        <div className="pl-[23px] pr-[23px] pt-9">
          <h1
            className="reflective-title-fill text-[32px] font-semibold leading-[1.15]"
          >
            Damian Izaguirre
          </h1>
          <p
            className="text-[17px] mt-2 leading-snug max-w-[262px]"
            style={{ color: "var(--reflective-foreground)" }}
          >
            a product designer giving data life through meaningful design.
          </p>
        </div>

        <div className="pl-[23px] pr-[23px] pt-9 flex flex-col gap-9">
          <MobileProjectCard
            href="#"
            videoSrc="/videos/mismo-preview.mov"
            imageAlt="Mismo — giving voice memos more power"
            title="Giving voice memos more power"
            year="2026"
          />
          <MobileProjectCard
            href="/case-study/carfully"
            imageSrc="/images/carfully-card.jpg"
            imageAlt="Carfully — auto-financing tool for first time car buyers"
            title="Auto-Financing tool for first time car buyers"
            year="2025"
          />
          <MobileProjectCard
            href="/case-study/cbre"
            imageSrc="/images/cbre-card.jpg"
            imageAlt="CBRE — an employee centered digital solution"
            title="An employee centered digital solution"
            year="2025"
          />
        </div>

        <div
          className="mt-16 pl-[23px] pr-[23px] pt-7 pb-12 transition-colors duration-300"
          style={{ backgroundColor: "rgba(238,238,238, calc(0.5 * (1 - var(--reflective-activation))))" }}
        >
          <p className="text-[16px] mb-6" style={{ color: "var(--reflective-foreground)" }}>
            designed + vibe coded by damian
          </p>
          <div className="flex flex-col gap-5 text-[16px]" style={{ color: "var(--reflective-foreground)" }}>
            <a href="https://x.com/damianizaguirre" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://instagram.com/damianpizaguirre" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://linkedin.com/in/damianizaguirre" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a href="mailto:izaguirredamian20@gmail.com">EMAIL</a>
          </div>
        </div>
      </div>

      {/* ---------- Desktop ---------- */}
      <div className="hidden md:block">
        <ParticleBackground />
        <Navbar />

        {/* Hero */}
        <section
          style={{
            paddingTop: "var(--hero-pt)",
            paddingBottom: "var(--hero-pb)",
            paddingLeft: "var(--px-side)",
            paddingRight: "var(--px-side)",
          }}
        >
          <h1
            className="reflective-title-fill font-medium"
            style={{
              fontSize: "var(--text-hero)",
              lineHeight: 1.19,
              maxWidth: "var(--hero-max)",
            }}
          >
            I&apos;m Damian, a product designer giving data{" "}
            <em className="italic">life</em> through{" "}
            <em className="italic">meaningful</em> design.
          </h1>
          <p
            className="font-normal text-black"
            style={{
              fontSize: "var(--text-hero-sub)",
              maxWidth: "var(--hero-max)",
              marginTop: "var(--hero-gap)",
            }}
          >
            Currently studying at The University of Texas at Dallas.
          </p>
        </section>

        {/* Work grid */}
        <section
          id="work"
          style={{
            paddingLeft: "var(--px-side)",
            paddingRight: "var(--px-side)",
            paddingBottom: "clamp(60px, 6vw, 115px)",
          }}
        >
          {/* Top row */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
              gap: "var(--grid-gap)",
            }}
          >
            <ProjectCard
              href="/case-study/carfully"
              imageSrc="/images/carfully-card.jpg"
              imageAlt="Carfully — auto-financing tool for first time car buyers"
              title="Auto-Financing tool for first time car buyers"
              meta="Capital One x UTD · 2025"
              cardHeight={topH}
            />
            <ProjectCard
              href="#"
              imageSrc="/images/mismo-card.jpg"
              imageAlt="Mismo — giving voice memos more power"
              title="Giving voice memos more power"
              meta="CAPSTONE APP 2026"
              cardHeight={topH}
            />
          </div>

          {/* Bottom row */}
          <div style={{ marginTop: "var(--grid-gap)" }}>
            <ProjectCard
              href="/case-study/cbre"
              imageSrc="/images/cbre-card.jpg"
              imageAlt="CBRE — an employee centered digital solution"
              title="An employee centered digital solution"
              meta="CBRE · CHALLENGE WINNER 2025"
              cardHeight={botH}
            />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
