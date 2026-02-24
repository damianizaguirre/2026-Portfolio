"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface SideNavItem {
  label: string;
  href: string;
}

interface TeamMember {
  name: string;
}

interface CaseStudyLayoutProps {
  children: React.ReactNode;
  heroImage: React.ReactNode;
  title: string;
  subtitle: string;
  sideNav: SideNavItem[];
  timeline: string;
  role: string;
  team: TeamMember[];
  skills: string[];
}

export default function CaseStudyLayout({
  children,
  heroImage,
  title,
  subtitle,
  sideNav,
  timeline,
  role,
  team,
  skills,
}: CaseStudyLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="px-8 md:px-14 py-10 md:py-14">
        {/* Back button */}
        <Link
          href="/"
          className="text-[24px] font-normal text-black hover:text-muted transition-colors inline-block mb-10"
        >
          &larr; Back
        </Link>

        <div className="flex flex-col lg:flex-row gap-14">
          {/* Sidebar navigation */}
          <aside className="lg:w-52 shrink-0">
            <nav className="lg:sticky lg:top-28 flex flex-row lg:flex-col gap-3 flex-wrap">
              {sideNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[18px] md:text-[24px] font-normal text-black hover:text-muted transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 max-w-4xl">
            {/* Header */}
            <header className="mb-16">
              <p className="text-[18px] md:text-[24px] font-normal text-muted mb-2">
                {subtitle}
              </p>
              <h1 className="text-[32px] md:text-[48px] font-normal leading-[1.15] text-black mb-10">
                {title}
              </h1>

              <div className="mb-10">{heroImage}</div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-black/10 pt-8">
                <div>
                  <p className="text-[20px] md:text-[24px] font-light text-black mb-1">
                    Timeline
                  </p>
                  <p className="text-[18px] md:text-[24px] font-light text-muted">
                    {timeline}
                  </p>
                </div>
                <div>
                  <p className="text-[20px] md:text-[24px] font-light text-black mb-1">
                    Role
                  </p>
                  <p className="text-[18px] md:text-[24px] font-light text-muted">
                    {role}
                  </p>
                </div>
                <div>
                  <p className="text-[20px] md:text-[24px] font-light text-black mb-1">
                    With
                  </p>
                  {team.map((m) => (
                    <p
                      key={m.name}
                      className="text-[18px] md:text-[24px] font-light text-muted"
                    >
                      {m.name}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[20px] md:text-[24px] font-light text-black mb-1">
                    Skills
                  </p>
                  {skills.map((s) => (
                    <p
                      key={s}
                      className="text-[18px] md:text-[24px] font-light text-muted"
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            </header>

            {children}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
