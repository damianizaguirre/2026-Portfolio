"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Fun", href: "/#fun" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/#resume" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-black/[0.04]"
        style={{ height: "var(--nav-h)", padding: "0 var(--px-side)" }}
      >
        <div className="flex items-center" style={{ gap: "clamp(12px, 1.3vw, 24px)" }}>
          <Link
            href="/"
            className="font-medium tracking-[-0.01em] text-black"
            style={{ fontSize: "var(--text-nav)" }}
          >
            DAMIAN IZAGUIRRE
          </Link>
          <span
            className="hidden sm:inline font-medium text-muted"
            style={{ fontSize: "var(--text-nav)" }}
          >
            Product Designer
          </span>
        </div>

        <div
          className="hidden md:flex items-center"
          style={{ gap: "clamp(24px, 2.6vw, 50px)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={isHome ? link.href : `/${link.href}`}
              className="font-light text-black hover:text-muted transition-colors"
              style={{ fontSize: "var(--text-nav)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1.5px] bg-black transition-transform ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""}`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-black transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-md"
          style={{ top: "var(--nav-h)" }}
        >
          <div className="flex flex-col items-center gap-8 pt-16">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={isHome ? link.href : `/${link.href}`}
                className="text-[28px] font-light text-black"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
