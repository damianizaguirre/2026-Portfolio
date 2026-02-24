import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  meta: string;
  bgColor?: string;
}

export default function ProjectCard({
  href,
  imageSrc,
  imageAlt,
  title,
  meta,
  bgColor = "bg-surface",
}: ProjectCardProps) {
  return (
    <div className="group">
      <Link href={href} className="block">
        <div
          className={`${bgColor} overflow-hidden transition-all duration-300 group-hover:shadow-lg`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={888}
            height={609}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        </div>
      </Link>
      <div
        className="flex items-baseline justify-between"
        style={{
          marginTop: "clamp(6px, 0.52vw, 10px)",
          gap: "clamp(8px, 1vw, 20px)",
        }}
      >
        <p
          className="font-normal text-black leading-snug"
          style={{ fontSize: "var(--text-card)" }}
        >
          {title}
        </p>
        <p
          className="font-normal text-black whitespace-nowrap"
          style={{ fontSize: "var(--text-card)" }}
        >
          {meta}
        </p>
      </div>
    </div>
  );
}
