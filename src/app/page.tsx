import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import ParticleBackground from "@/components/ParticleBackground";

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

export default function Home() {
  const topH = "clamp(300px, 38.23vw, 734px)";
  const botH = "clamp(220px, 30.16vw, 579px)";

  return (
    <main className="min-h-screen">
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
          className="font-medium text-[rgba(0,0,0,0.9)]"
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
    </main>
  );
}
