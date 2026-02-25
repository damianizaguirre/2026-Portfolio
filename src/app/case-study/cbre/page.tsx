import Image from "next/image";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import CaseStudySection from "@/components/CaseStudySection";

const sideNav = [
  { label: "Track Challenge", href: "#challenge" },
  { label: "Our Solution", href: "#solution" },
  { label: "Design Process", href: "#process" },
  { label: "Analysis", href: "#analysis" },
  { label: "Current Solutions and Problems", href: "#current-solutions" },
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
        { name: "Dung Nguyen" },
        { name: "Ajith Anand" },
      ]}
      skills={["Product Design", "Product Research", "Prototyping"]}
      heroImage={
        <Image
          src="/images/cbre-thumbnail.png"
          alt="CBRE Integra dashboard and virtual office"
          width={983}
          height={674}
          className="w-full h-auto rounded-md"
          priority
        />
      }
    >
      <CaseStudySection
        id="challenge"
        label="OVERVIEW"
        title="Reimagining the workplace environment for CBRE"
      >
        <p>
          As a team of 3 designers, our goal was to research and design a
          product within 24 hours.
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-3"
          style={{
            gap: "clamp(24px, 2.8vw, 54px)",
            marginTop: "clamp(20px, 2.6vw, 50px)",
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

        <Image
          src="/images/cbre/process-arrows.png"
          alt="Design process flow"
          width={983}
          height={330}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection
        id="process"
        label="COMPANY TRACK"
        title="Designing a digital employee centered product"
      >
        <p>
          &ldquo;Design and present a digital product or experience that
          reimagines the workplace environment for employees. This may include
          ways to combat employee burnout, disengagement, wellbeing, and lack of
          connection in a hybrid/remote work environment.&rdquo;
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        label="SOLUTION"
        title="Integra: a web application where teams can connect, collaborate, and prevent burnout together"
      >
        <p>
          A computer application that helps managers monitor and support
          employee wellbeing through data-driven insights, gamified
          productivity, and a virtual workplace.
        </p>
      </CaseStudySection>

      {/* Core Flows with full mockup images */}
      <section id="core-flows" style={{ marginBottom: "clamp(40px, 5.2vw, 100px)" }}>
        <p
          className="font-light text-muted uppercase tracking-wide"
          style={{
            fontSize: "var(--text-nav)",
            marginBottom: "clamp(20px, 2.6vw, 50px)",
          }}
        >
          CORE FLOWS
        </p>

        <div className="flex flex-col" style={{ gap: "clamp(40px, 5.2vw, 100px)" }}>
          {/* Home Page */}
          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(22px, 1.67vw, 32px)",
                marginBottom: "clamp(6px, 0.625vw, 12px)",
              }}
            >
              Home Page
            </h3>
            <p
              className="font-light text-black"
              style={{
                fontSize: "var(--text-nav)",
                marginBottom: "clamp(16px, 2.1vw, 40px)",
              }}
            >
              The manager&apos;s POV where it displays employee&apos;s point
              ranking, overall team&apos;s weekly progress, and employees in
              distress and options to help them.
            </p>
            <Image
              src="/images/cbre/dashboard.png"
              alt="Integra dashboard - Home Page"
              width={985}
              height={554}
              className="w-full h-auto"
            />
          </div>

          {/* Virtual Room */}
          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(22px, 1.67vw, 32px)",
                marginBottom: "clamp(6px, 0.625vw, 12px)",
              }}
            >
              Virtual Room
            </h3>
            <p
              className="font-light text-black"
              style={{
                fontSize: "var(--text-nav)",
                marginBottom: "clamp(16px, 2.1vw, 40px)",
              }}
            >
              Remote teams can log in their virtualized office allowing them to
              quickly DM or Voice-Chat interaction between each other, redeem
              points to customize personal office space, and see coworker
              availability in real time.
            </p>
            <Image
              src="/images/cbre/virtual-home.png"
              alt="Integra virtual office room"
              width={985}
              height={554}
              className="w-full h-auto"
            />
          </div>

          {/* Analytics */}
          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(22px, 1.67vw, 32px)",
                marginBottom: "clamp(6px, 0.625vw, 12px)",
              }}
            >
              Analytics for Team Manager
            </h3>
            <p
              className="font-light text-black"
              style={{
                fontSize: "var(--text-nav)",
                marginBottom: "clamp(16px, 2.1vw, 40px)",
              }}
            >
              Managers can log in and be informed of the current status of their
              office such as the General Task Timeline and specific team stats,
              and specific employee current wellbeing.
            </p>
            <Image
              src="/images/cbre/task-board.png"
              alt="Integra analytics task board"
              width={977}
              height={550}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <CaseStudySection
        id="analysis"
        label="RESEARCH"
        title="Using a Bifocal Analysis Method"
      >
        <p>
          We gathered various different companies that provided corporate
          products and wellness activities from a range of High-Engagement to
          Low-Engagement and from Autonomous to Leader-Driven.
        </p>
        <p style={{ marginTop: "clamp(12px, 1.25vw, 24px)" }}>
          Once visualized, we decided to go for a solution that has a medium to
          low-engagement and is more leader driven. With a more narrowed focus
          point, we aimed to create an application from a Managers POV.
        </p>
        <Image
          src="/images/cbre/bifocal-analysis.png"
          alt="Bifocal analysis chart"
          width={977}
          height={360}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection
        id="current-solutions"
        title="Current solutions and what they lacked"
      >
        <p>
          We decided to create a chart that listed out a set of features with a
          set of current products that also provided solutions within the same
          category. We researched their strengths and weaknesses to identify
          gaps we could address.
        </p>
        <Image
          src="/images/cbre/current-solutions.png"
          alt="Competitive analysis chart"
          width={977}
          height={479}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection id="sentiment" title="User Journey & Sentiment">
        <p>
          We decided to create a chart that listed out a set of features with a
          set of current products that also provided solutions within the same
          category. We researched how employees feel throughout their workday to
          identify key intervention points.
        </p>
      </CaseStudySection>

      <CaseStudySection id="concepts" title="Early Explorations">
        <p>
          As a team we brainstormed the main set of features and the possible
          layouts the product could have.
        </p>
        <div
          className="grid grid-cols-3"
          style={{
            gap: "clamp(8px, 1vw, 20px)",
            marginTop: "clamp(20px, 2.6vw, 50px)",
          }}
        >
          <Image
            src="/images/cbre/wireframe-1.png"
            alt="Early wireframe exploration 1"
            width={291}
            height={388}
            className="w-full h-auto"
          />
          <Image
            src="/images/cbre/wireframe-2.png"
            alt="Early wireframe exploration 2"
            width={294}
            height={392}
            className="w-full h-auto"
          />
          <Image
            src="/images/cbre/wireframe-3.png"
            alt="Early wireframe exploration 3"
            width={294}
            height={392}
            className="w-full h-auto"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="demo"
        label="REFLECTION"
        title="Final Thoughts & Looking Forward"
      >
        <p>
          Throughout the design-a-thon my team and I learned how to blend social
          interaction, performance tracking, and wellbeing support into a
          digital experience that empowers both employees and managers.
        </p>
        <div
          className="grid grid-cols-2"
          style={{
            gap: "clamp(8px, 1vw, 20px)",
            marginTop: "clamp(20px, 2.6vw, 50px)",
          }}
        >
          <Image
            src="/images/cbre/final-1.png"
            alt="Final presentation photo 1"
            width={463}
            height={286}
            className="w-full h-auto"
          />
          <Image
            src="/images/cbre/final-2.png"
            alt="Final presentation photo 2"
            width={509}
            height={286}
            className="w-full h-auto"
          />
        </div>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
