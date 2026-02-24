import Image from "next/image";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import CaseStudySection from "@/components/CaseStudySection";

const sideNav = [
  { label: "Track Challenge", href: "#challenge" },
  { label: "Our Solution", href: "#solution" },
  { label: "Design Process", href: "#process" },
  { label: "Analysis", href: "#analysis" },
  { label: "Current Solutions", href: "#current-solutions" },
  { label: "User Sentiment", href: "#sentiment" },
  { label: "Early Concepts", href: "#concepts" },
  { label: "Final Demo", href: "#demo" },
];

export default function CBRECaseStudy() {
  return (
    <CaseStudyLayout
      title="Integra - An employee centered solution"
      subtitle="CBRE \u00b7 CHALLENGE WINNER 2025"
      sideNav={sideNav}
      timeline="24 Hours"
      role="Product Designer"
      team={[
        { name: "Sam Park" },
        { name: "Jordan Lee" },
        { name: "Jack Morgan" },
      ]}
      skills={["Product Design", "User Research", "Prototyping"]}
      heroImage={
        <Image
          src="/images/cbre-thumbnail.png"
          alt="CBRE Integra dashboard and virtual office"
          width={888}
          height={609}
          className="w-full h-auto rounded-md"
          priority
        />
      }
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{
          gap: "clamp(24px, 2.8vw, 54px)",
          marginBottom: "clamp(40px, 5.2vw, 100px)",
        }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(6px, 0.625vw, 12px)" }}>
          <h3
            className="font-normal text-black"
            style={{ fontSize: "clamp(22px, 1.67vw, 32px)" }}
          >
            Product Strategy
          </h3>
          <p
            className="font-light text-black"
            style={{ fontSize: "var(--text-nav)" }}
          >
            Researching and thinking broadly of current solutions and user
            sentiment.
          </p>
        </div>
        <div className="flex flex-col" style={{ gap: "clamp(6px, 0.625vw, 12px)" }}>
          <h3
            className="font-normal text-black"
            style={{ fontSize: "clamp(22px, 1.67vw, 32px)" }}
          >
            Prototyping
          </h3>
          <p
            className="font-light text-black"
            style={{ fontSize: "var(--text-nav)" }}
          >
            Narrowing down with ideation and rapidly designing.
          </p>
        </div>
        <div className="flex flex-col" style={{ gap: "clamp(6px, 0.625vw, 12px)" }}>
          <h3
            className="font-normal text-black"
            style={{ fontSize: "clamp(22px, 1.67vw, 32px)" }}
          >
            Presenting
          </h3>
          <p
            className="font-light text-black"
            style={{ fontSize: "var(--text-nav)" }}
          >
            Gathering our research, final demo, and present our solution.
          </p>
        </div>
      </div>

      <CaseStudySection
        id="challenge"
        label="OVERVIEW"
        title="Reimagining the workplace environment for CBRE"
      >
        <p className="mb-4">
          &ldquo;Design and present a digital product or experience that
          reimagines the workplace environment for employees.&rdquo;
        </p>
        <p>
          As a team of 3 designers, our goal was to research and design a
          product within 24 hours.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        label="SOLUTION"
        title="Integra: a web application where teams can connect, collaborate, and prevent burnout together"
      >
        <p className="mb-6">
          A computer application that helps managers monitor and support
          employee wellbeing through data-driven insights, gamified team
          interactions, and real-time collaboration tools.
        </p>

        <div
          className="flex flex-col"
          style={{
            gap: "clamp(24px, 3.1vw, 60px)",
            marginTop: "clamp(20px, 2.6vw, 50px)",
          }}
        >
          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(20px, 1.67vw, 32px)",
                marginBottom: "clamp(6px, 0.78vw, 15px)",
              }}
            >
              Home Page
            </h3>
            <p>
              The manager&apos;s POV where it displays employee&apos;s point
              ranking, overall team&apos;s weekly progress, and employees in
              distress.
            </p>
          </div>

          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(20px, 1.67vw, 32px)",
                marginBottom: "clamp(6px, 0.78vw, 15px)",
              }}
            >
              Virtual Room
            </h3>
            <p>
              Remote teams can log in their virtualized office allowing them to
              quickly DM or Voice-Chat interaction between each other.
            </p>
          </div>

          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(20px, 1.67vw, 32px)",
                marginBottom: "clamp(6px, 0.78vw, 15px)",
              }}
            >
              Analytics for Team Manager
            </h3>
            <p>
              Managers can log in and be informed of the current status of their
              office such as the General Task Timeline and specific employee
              analytics.
            </p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="analysis"
        label="RESEARCH"
        title="Using a Bifocal Analysis Method"
      >
        <p>
          We gathered various different companies that provided corporate
          products and wellness activities from a range of High-End to Low-End
          solutions to understand the competitive landscape.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="current-solutions"
        title="Current solutions and what they lacked"
      >
        <p>
          We decided to create a chart that listed out a set of features with a
          set of current products that also provided solutions in the employee
          wellness space.
        </p>
      </CaseStudySection>

      <CaseStudySection id="sentiment" title="User Journey & Sentiment">
        <p>
          We mapped out the typical employee journey to identify key pain points
          and opportunities for improving workplace wellbeing through digital
          solutions.
        </p>
      </CaseStudySection>

      <CaseStudySection id="concepts" title="Early Explorations">
        <p>
          As a team we brainstormed the main set of features and the possible
          layouts the product could have.
        </p>
      </CaseStudySection>

      <CaseStudySection id="demo" title="Final Thoughts & Looking Forward">
        <p>
          Throughout the design-a-thon my team and I learned how to blend social
          interaction, performance tracking, and wellbeing into a cohesive
          digital workspace experience. Once visualized, we decided to go for a
          solution that has a medium to low-engagement and is more leader driven.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
