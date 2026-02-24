"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Fun", href: "/#fun" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/#resume" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md px-8 md:px-14 py-5 border-b border-black/5">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-[20px] md:text-[24px] font-medium tracking-tight text-black"
        >
          DAMIAN IZAGUIRRE
        </Link>
        <span className="hidden sm:inline text-[20px] md:text-[24px] font-medium text-muted">
          Product Designer
        </span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={isHome ? link.href : `/${link.href}`}
            className="text-[20px] md:text-[24px] font-light text-black hover:text-muted transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
