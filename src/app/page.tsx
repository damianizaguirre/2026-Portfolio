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

      <section className="bg-surface px-8 md:px-14 lg:px-[58px] pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-24 lg:pb-32">
        <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-medium leading-[1.2] text-black max-w-[860px]">
          I&apos;m Damian, a product designer giving data{" "}
          <em className="italic">life</em> through{" "}
          <em className="italic">meaningful</em> design.
        </h1>
        <p className="text-[22px] md:text-[28px] lg:text-[32px] font-normal text-black mt-5 max-w-[860px]">
          Currently studying at The University of Texas at Dallas.
        </p>
      </section>

      <section id="work" className="bg-white px-8 md:px-14 lg:px-[58px] py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-10 lg:gap-y-12 items-start">
          <div className="flex flex-col gap-10 lg:gap-12">
            <ProjectCard {...projects[0]} />
            <ProjectCard {...projects[2]} />
          </div>
          <div className="flex flex-col gap-10 lg:gap-12 lg:mt-20">
            <ProjectCard {...projects[1]} />
            <ProjectCard {...projects[3]} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
