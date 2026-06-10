import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    href: "/case-study/carfully",
    imageSrc: "/images/carfully-card.jpg",
    imageAlt: "Carfully - Auto-financing tool for first time car buyers",
    title: "Auto-Financing tool for first time car buyers",
    meta: "Capital One x UTD · 2025",
  },
  {
    href: "#",
    imageSrc: "/images/mismo-card.jpg",
    imageAlt: "Mismo - Giving voice memos more power",
    title: "Giving voice memos more power",
    meta: "CAPSTONE APP 2026",
  },
  {
    href: "/case-study/cbre",
    imageSrc: "/images/cbre-card.jpg",
    imageAlt: "CBRE - An employee centered digital solution",
    title: "An employee centered digital solution",
    meta: "CBRE · CHALLENGE WINNER 2025",
  },
];

function ProjectCard({
  href,
  imageSrc,
  imageAlt,
  title,
  meta,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  meta: string;
}) {
  return (
    <div>
      <Link
        href={href}
        className="block overflow-hidden rounded-[20px] border border-[#cdcdcd] bg-white w-full h-full"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1400}
          height={800}
          className="w-full h-full object-cover"
          priority
        />
      </Link>
      <div
        className="flex justify-between items-baseline mt-[24px]"
        style={{ fontSize: "var(--text-card)" }}
      >
        <p className="text-[rgba(0,0,0,0.9)] font-normal">{title}</p>
        <p className="text-[rgba(0,0,0,0.65)] font-normal whitespace-nowrap ml-4">{meta}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const cardH = "clamp(320px, 38.23vw, 734px)";
  const bottomH = "clamp(260px, 30.16vw, 579px)";

  return (
    <main className="min-h-screen">
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
        {/* Top row: large left + small right (≈2:1) */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
            gap: "var(--grid-gap)",
          }}
        >
          <div style={{ height: cardH }}>
            <ProjectCard {...projects[0]} />
          </div>
          <div style={{ height: cardH }}>
            <ProjectCard {...projects[1]} />
          </div>
        </div>

        {/* Bottom row: full-width */}
        <div
          style={{
            height: bottomH,
            marginTop: "var(--grid-gap)",
          }}
        >
          <ProjectCard {...projects[2]} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
