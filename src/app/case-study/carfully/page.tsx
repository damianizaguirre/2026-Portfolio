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

export default function CarfullyCaseStudy() {
  return (
    <CaseStudyLayout
      title="Carfully - A transparent auto-financing tool"
      subtitle="Capital One x UTD Design Challenge"
      sideNav={sideNav}
      timeline="Sep - Dec 2025"
      role="Product Designer"
      team={[
        { name: "Joie Lin" },
        { name: "Ann Jayan" },
        { name: "Kennedy Cahn" },
        { name: "Maya Poduval" },
      ]}
      skills={["Product Design", "User Research", "Prototyping"]}
      heroImage={
        <Image
          src="/images/carfully-thumbnail.png"
          alt="Carfully auto-financing tool on laptop"
          width={983}
          height={604}
          className="w-full h-auto rounded-md"
          priority
        />
      }
    >
      <CaseStudySection
        id="challenge"
        label="CHALLENGE"
        title="Designing a digital tool that meets first-time car buyers at whatever financial point to demystify their car-buying journey"
      >
        <p>
          Partnering with Capital One&apos;s Financial team, my team and I
          worked through this 7-sprint challenge to research and create a
          digital-tool.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        label="SOLUTION"
        title="Carfully: a guided learning tool and resource hub for first-time car buyers"
      >
        <p>
          A web application designed to break down the car-buying journey into
          manageable steps through structured, interactive modules.
        </p>
      </CaseStudySection>

      {/* Core Flows */}
      <section id="process" style={{ marginBottom: "clamp(40px, 5.2vw, 100px)" }}>
        <p
          className="font-light text-muted uppercase tracking-wide"
          style={{
            fontSize: "var(--text-nav)",
            marginBottom: "clamp(12px, 1.56vw, 30px)",
          }}
        >
          CORE FLOWS
        </p>

        <div
          className="flex flex-col"
          style={{ gap: "clamp(40px, 5.2vw, 100px)" }}
        >
          {/* Home Page */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-end" style={{ gap: "clamp(20px, 2.6vw, 50px)" }}>
            <Image
              src="/images/carfully/home-page.png"
              alt="Carfully home page after initial quiz"
              width={511}
              height={404}
              className="w-full h-auto"
            />
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
                style={{ fontSize: "var(--text-nav)" }}
              >
                After completing an onboarding questionnaire, the user is placed
                in 1 of 3 tracks.
              </p>
            </div>
          </div>

          {/* Learning Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-end" style={{ gap: "clamp(20px, 2.6vw, 50px)" }}>
            <Image
              src="/images/carfully/learning-modules.png"
              alt="Carfully learning modules screen"
              width={511}
              height={404}
              className="w-full h-auto"
            />
            <div>
              <h3
                className="font-normal text-black"
                style={{
                  fontSize: "clamp(22px, 1.67vw, 32px)",
                  marginBottom: "clamp(6px, 0.625vw, 12px)",
                }}
              >
                Learning Modules
              </h3>
              <p
                className="font-light text-black"
                style={{ fontSize: "var(--text-nav)" }}
              >
                The user can navigate through different modules regarding
                different aspects of purchasing a vehicle.
              </p>
            </div>
          </div>

          {/* Financial Help */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-end" style={{ gap: "clamp(20px, 2.6vw, 50px)" }}>
            <Image
              src="/images/carfully/financial-help.png"
              alt="Carfully financial help screen"
              width={511}
              height={537}
              className="w-full h-auto"
            />
            <div>
              <h3
                className="font-normal text-black"
                style={{
                  fontSize: "clamp(22px, 1.67vw, 32px)",
                  marginBottom: "clamp(6px, 0.625vw, 12px)",
                }}
              >
                Financial Help
              </h3>
              <p
                className="font-light text-black"
                style={{ fontSize: "var(--text-nav)" }}
              >
                When deciding on a vehicle to purchase, Carfully also provides
                statistics to help the user find the right financial fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CaseStudySection
        id="analysis"
        label="RESEARCH"
        title="Observing characteristics of other problems"
      >
        <p>
          Conducting a competitive analysis on 4 other car-selling websites and
          found 3 key issues within them, these being: Confusion about
          affordability, Lack of transparency, and Limited Financial Literacy.
        </p>
        <Image
          src="/images/carfully/survey-results.png"
          alt="Competitive analysis survey results"
          width={983}
          height={433}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection id="sentiment" title="Surveying First-Time Car Buyers">
        <p>
          With over 100+ survey respondents, my team and I better understood the
          unique needs and challenges of first-time car buyers.
        </p>
        <Image
          src="/images/carfully/competitive-analysis.png"
          alt="Survey data analysis"
          width={983}
          height={562}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection id="current-solutions" title="Interviewing target users">
        <p>
          After conducting a broad survey, we continued our research sprint with
          an in-depth interview process with 5 people who fit within our target
          demographic.
        </p>

        <div
          className="bg-surface rounded-sm"
          style={{
            marginTop: "clamp(16px, 2.1vw, 40px)",
            padding: "clamp(24px, 2.6vw, 50px) clamp(28px, 3vw, 58px)",
          }}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: "clamp(24px, 2.8vw, 54px)" }}
          >
            <div className="flex flex-col" style={{ gap: "clamp(6px, 0.625vw, 12px)" }}>
              <h3
                className="font-medium text-black"
                style={{ fontSize: "clamp(22px, 1.67vw, 32px)" }}
              >
                3/5 participants
              </h3>
              <p
                className="font-light text-black"
                style={{ fontSize: "var(--text-nav)" }}
              >
                Would rely/prefer word of mouth, or peer-sourced information
                (i.e forums)
              </p>
            </div>
            <div className="flex flex-col" style={{ gap: "clamp(6px, 0.625vw, 12px)" }}>
              <h3
                className="font-medium text-black"
                style={{ fontSize: "clamp(22px, 1.67vw, 32px)" }}
              >
                4/5 participants
              </h3>
              <p
                className="font-light text-black"
                style={{ fontSize: "var(--text-nav)" }}
              >
                Plan to use a down payment and monthly payments to fully own
                the car
              </p>
            </div>
            <div className="flex flex-col" style={{ gap: "clamp(6px, 0.625vw, 12px)" }}>
              <h3
                className="font-medium text-black"
                style={{ fontSize: "clamp(22px, 1.67vw, 32px)" }}
              >
                4/5 participants
              </h3>
              <p
                className="font-light text-black"
                style={{ fontSize: "var(--text-nav)" }}
              >
                Hold negative or wary impressions of salespeople, viewing them
                as untruthful and difficult to trust
              </p>
            </div>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection id="concepts" title="Initial Wireframe&apos;s">
        <p>
          Mapping out the whole user journey, my team and I designed the
          different types of pages we wanted to include.
        </p>
        <Image
          src="/images/carfully/initial-wireframes.png"
          alt="Initial wireframe designs"
          width={983}
          height={553}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection id="demo" title="Brand Identity">
        <p>
          We concluded by finalizing the website&apos;s brand kit and color
          scheme, choosing professional tones that mirror Capital One&apos;s
          identity to establish a foundation of trust and transparency.
        </p>
        <Image
          src="/images/carfully/brand-identity.png"
          alt="Brand identity and logo design"
          width={992}
          height={638}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
        <Image
          src="/images/carfully/brand-colors.png"
          alt="Brand color palette"
          width={991}
          height={338}
          className="w-full h-auto"
          style={{ marginTop: "clamp(16px, 1.6vw, 30px)" }}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
