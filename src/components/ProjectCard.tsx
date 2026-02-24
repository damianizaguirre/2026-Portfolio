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
      <div className="flex items-baseline justify-between mt-2.5 gap-4">
        <p className="text-[16px] md:text-[20px] lg:text-[24px] font-normal text-black leading-snug">
          {title}
        </p>
        <p className="text-[14px] md:text-[18px] lg:text-[24px] font-normal text-black whitespace-nowrap">
          {meta}
        </p>
      </div>
    </div>
  );
}
