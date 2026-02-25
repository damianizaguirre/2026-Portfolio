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
          paddingTop: "var(--hero-pt)",
          paddingBottom: "var(--hero-pb)",
          paddingLeft: "var(--px-side)",
          paddingRight: "var(--px-side)",
        }}
      >
        <h1
          className="font-medium text-black"
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
            style={{ gap: "clamp(28px, 3.1vw, 60px)" }}
          >
            <ProjectCard {...projects[1]} />
            <ProjectCard {...projects[3]} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          paddingTop: "clamp(60px, 8.6vw, 165px)",
          paddingBottom: "clamp(80px, 16.1vw, 310px)",
          paddingLeft: "var(--px-side)",
          paddingRight: "var(--px-side)",
        }}
      >
        <h2
          className="font-normal text-black"
          style={{
            fontSize: "var(--text-hero)",
            marginBottom: "clamp(16px, 1.8vw, 35px)",
          }}
        >
          Designing &amp; Building
        </h2>
        <div
          className="font-light text-black"
          style={{
            fontSize: "var(--text-nav)",
            maxWidth: "clamp(340px, 51.1vw, 981px)",
            lineHeight: 1.6,
          }}
        >
          <p>
            I&apos;m passionate about creating user-centered experiences,
            bridging technology and human needs. Currently building products
            into full scale experiences using AI.
          </p>
          <p style={{ marginTop: "clamp(12px, 1.25vw, 24px)" }}>
            Whenever I&apos;m not designing I&apos;m:
          </p>
          <ul
            className="list-disc"
            style={{
              paddingLeft: "clamp(16px, 1.25vw, 24px)",
              marginTop: "clamp(6px, 0.5vw, 10px)",
            }}
          >
            <li>Running</li>
            <li>Bass fishing</li>
            <li>Using my AMC Stubs Membership</li>
          </ul>
          <p style={{ marginTop: "clamp(12px, 1.25vw, 24px)" }}>
            Reach out to me on LinkedIn or by email!
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
