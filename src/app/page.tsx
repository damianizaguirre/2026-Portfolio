import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    href: "/case-study/carfully",
    imageSrc: "/images/carfully-thumbnail.png",
    imageAlt: "Carfully - Auto-financing tool interface on a laptop",
    title: "Auto-Financing tool for first time car buyers",
    meta: "Capital One x UTD \u00b7 2025",
  },
  {
    href: "/case-study/cbre",
    imageSrc: "/images/cbre-thumbnail.png",
    imageAlt: "CBRE Integra - Employee centered digital solution dashboard",
    title: "An employee centered digital solution",
    meta: "CBRE \u00b7 CHALLENGE WINNER 2025",
    bgColor: "bg-surface-alt",
  },
  {
    href: "/case-study/sancorda",
    imageSrc: "/images/sancorda-thumbnail.png",
    imageAlt: "Sancorda Medical - Interactive medical planning platform",
    title: "Interactive medical planning platform",
    meta: "Sancorda Medical \u00b7 2025",
  },
  {
    href: "#",
    imageSrc: "/images/mismo-thumbnail.png",
    imageAlt: "The future of safe driving - phone displaying app",
    title: "The future of safe driving",
    meta: "UTD \u00b7 CONCEPT 2026",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section
        className="bg-surface"
        style={{
          padding: "clamp(60px, 7.8vw, 150px) var(--px-side) clamp(50px, 6.5vw, 125px)",
        }}
      >
        <h1
          className="font-medium leading-[1.2] text-black"
          style={{ fontSize: "var(--text-hero)", maxWidth: "var(--hero-max)" }}
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
            marginTop: "clamp(10px, 1vw, 20px)",
          }}
        >
          Currently studying at The University of Texas at Dallas.
        </p>
      </section>

      <section
        id="work"
        style={{ padding: "clamp(24px, 2.6vw, 50px) var(--px-side)" }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{
            columnGap: "var(--grid-gap)",
            rowGap: "clamp(28px, 3.1vw, 60px)",
          }}
        >
          <div className="flex flex-col" style={{ gap: "clamp(28px, 3.1vw, 60px)" }}>
            <ProjectCard {...projects[0]} />
            <ProjectCard {...projects[2]} />
          </div>
          <div
            className="flex flex-col"
            style={{
              gap: "clamp(28px, 3.1vw, 60px)",
              marginTop: "var(--col-offset)",
            }}
          >
            <ProjectCard {...projects[1]} />
            <ProjectCard {...projects[3]} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
