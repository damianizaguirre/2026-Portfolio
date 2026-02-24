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

      <div className="relative" style={{ padding: "clamp(24px, 2.6vw, 50px) 0" }}>
        {/* Sidebar — only visible on large screens */}
        <aside
          className="hidden lg:block absolute"
          style={{
            left: "var(--px-side)",
            top: "clamp(24px, 2.6vw, 50px)",
            width: "clamp(140px, 16.5vw, 317px)",
          }}
        >
          <Link
            href="/"
            className="font-normal text-black hover:text-muted transition-colors inline-block"
            style={{
              fontSize: "var(--text-nav)",
              marginBottom: "clamp(16px, 2.1vw, 40px)",
            }}
          >
            &larr; Back
          </Link>

          <nav
            className="sticky flex flex-col"
            style={{
              top: "calc(var(--nav-h) + clamp(12px, 1.3vw, 24px))",
              gap: "clamp(4px, 0.42vw, 8px)",
            }}
          >
            {sideNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-normal text-black hover:text-muted transition-colors"
                style={{ fontSize: "var(--text-nav)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Mobile: just a back link, no sidebar */}
        <div className="lg:hidden" style={{ padding: "0 var(--px-side)", marginBottom: "clamp(16px, 2.1vw, 40px)" }}>
          <Link
            href="/"
            className="font-normal text-black hover:text-muted transition-colors inline-block"
            style={{ fontSize: "var(--text-nav)" }}
          >
            &larr; Back
          </Link>
        </div>

        {/* Central Content — centered */}
        <div
          className="mx-auto"
          style={{
            width: "clamp(340px, 51.2vw, 983px)",
            maxWidth: "calc(100% - var(--px-side) * 2)",
          }}
        >

          <header style={{ marginBottom: "clamp(32px, 4.2vw, 80px)" }}>
            <p
              className="font-normal text-muted"
              style={{
                fontSize: "var(--text-nav)",
                marginBottom: "clamp(4px, 0.42vw, 8px)",
              }}
            >
              {subtitle}
            </p>
            <h1
              className="font-normal leading-[1.15] text-black"
              style={{
                fontSize: "var(--text-hero)",
                marginBottom: "clamp(20px, 2.6vw, 50px)",
              }}
            >
              {title}
            </h1>

            <div style={{ marginBottom: "clamp(20px, 2.6vw, 50px)" }}>
              {heroImage}
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 border-t border-black/10"
              style={{
                gap: "clamp(16px, 2.1vw, 40px)",
                paddingTop: "clamp(16px, 2.1vw, 40px)",
              }}
            >
              <div>
                <p
                  className="font-light text-black mb-1"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  Timeline
                </p>
                <p
                  className="font-light text-muted"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  {timeline}
                </p>
              </div>
              <div>
                <p
                  className="font-light text-black mb-1"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  Role
                </p>
                <p
                  className="font-light text-muted"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  {role}
                </p>
              </div>
              <div>
                <p
                  className="font-light text-black mb-1"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  With
                </p>
                {team.map((m) => (
                  <p
                    key={m.name}
                    className="font-light text-muted"
                    style={{ fontSize: "var(--text-nav)" }}
                  >
                    {m.name}
                  </p>
                ))}
              </div>
              <div>
                <p
                  className="font-light text-black mb-1"
                  style={{ fontSize: "var(--text-nav)" }}
                >
                  Skills
                </p>
                {skills.map((s) => (
                  <p
                    key={s}
                    className="font-light text-muted"
                    style={{ fontSize: "var(--text-nav)" }}
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

      <Footer />
    </main>
  );
}
