"use client";

import { usePathname } from "next/navigation";
import MobileNav, { type NavKey } from "@/components/MobileNav";

function getActiveNav(pathname: string): NavKey | null {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/fun")) return "fun";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/resume")) return "resume";
  return null;
}

export default function MobileNavShell() {
  const pathname = usePathname();
  const active = getActiveNav(pathname);

  if (!active) return null;

  return (
    <div className="md:hidden">
      <MobileNav active={active} />
    </div>
  );
}
