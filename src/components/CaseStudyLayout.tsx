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

      <div style={{ padding: "clamp(24px, 2.6vw, 50px) var(--px-side)" }}>
        <Link
          href="/"
          className="font-normal text-black hover:text-muted transition-colors inline-block"
          style={{
            fontSize: "var(--text-nav)",
            marginBottom: "clamp(24px, 2.6vw, 50px)",
          }}
        >
          &larr; Back
        </Link>

        <div
          className="flex flex-col lg:flex-row"
          style={{ gap: "clamp(24px, 3.6vw, 70px)" }}
        >
          <aside
            className="shrink-0"
            style={{ width: "clamp(140px, 10.8vw, 208px)" }}
          >
            <nav
              className="lg:sticky flex flex-row lg:flex-col flex-wrap"
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

          <div className="flex-1 max-w-4xl">
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
      </div>

      <Footer />
    </main>
  );
}
