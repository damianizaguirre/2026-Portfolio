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
          className={`${bgColor} rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={888}
            height={546}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </Link>
      <div className="flex items-center justify-between mt-3 px-0.5">
        <p className="text-[16px] md:text-[20px] lg:text-[24px] font-normal text-black">
          {title}
        </p>
        <p className="text-[14px] md:text-[18px] lg:text-[24px] font-normal text-black text-right whitespace-nowrap ml-4">
          {meta}
        </p>
      </div>
    </div>
  );
}
