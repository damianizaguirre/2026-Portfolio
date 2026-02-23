const projects = [
  {
    title: "Auto-Financing tool for first time car buyers",
    org: "Capital One x UTD · 2025",
    bg: "bg-gradient-to-br from-orange-100 via-orange-200 to-amber-100",
    placeholder: "Carfully",
  },
  {
    title: "An employee centered digital solution",
    org: "CBRE · CHALLENGE WINNER 2025",
    bg: "bg-stone-100",
    placeholder: "CBRE Integra",
  },
  {
    title: "Interactive medical planning platform",
    org: "Sancorda Medical · 2025",
    bg: "bg-gray-900",
    dark: true,
    placeholder: "Sancorda",
  },
  {
    title: "The future of safe driving",
    org: "UTD · CONCEPT 2026",
    bg: "bg-stone-100",
    placeholder: "Mismo",
  },
];

export default function Projects() {
  return (
    <section id="work" className="px-6 md:px-12 pb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <ProjectCard project={projects[0]} />
          <ProjectCard project={projects[2]} />
        </div>
        {/* Right column — offset down */}
        <div className="flex flex-col gap-6 md:mt-16">
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[3]} />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`${project.bg} rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center`}
      >
        <span
          className={`text-2xl font-semibold ${
            project.dark ? "text-white/30" : "text-black/10"
          }`}
        >
          {project.placeholder}
        </span>
      </div>
      <div className="mt-4 px-1">
        <h3 className="text-base font-medium text-gray-900 group-hover:text-black transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1">{project.org}</p>
      </div>
    </div>
  );
}
