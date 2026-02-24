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
          width={888}
          height={546}
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
        <p className="mb-6">
          A web application designed to break down the car-buying journey into
          manageable steps through structured, interactive modules.
        </p>

        <div className="space-y-12 mt-10">
          <div>
            <h3 className="text-[24px] md:text-[32px] font-normal text-black mb-3">
              Home Page
            </h3>
            <p>
              After completing an onboarding questionnaire, the user is placed
              in 1 of 3 tracks.
            </p>
          </div>

          <div>
            <h3 className="text-[24px] md:text-[32px] font-normal text-black mb-3">
              Learning Modules
            </h3>
            <p>
              The user can navigate through different modules regarding
              different aspects of purchasing a vehicle.
            </p>
          </div>

          <div>
            <h3 className="text-[24px] md:text-[32px] font-normal text-black mb-3">
              Financial Help
            </h3>
            <p>
              When deciding on a vehicle to purchase, Carfully also provides
              statistics to help the user find the right financial fit.
            </p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="analysis"
        label="RESEARCH"
        title="Observing characteristics of other problems"
      >
        <p>
          Conducting a competitive analysis on 4 other car-selling websites and
          found 3 key issues within them: Confusion about affordability, Lack of
          educational resources, and Overwhelming financial jargon.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="sentiment"
        title="Surveying First-Time Car Buyers"
      >
        <p className="mb-8">
          With over 100+ survey respondents, my team and I better understood the
          unique needs and challenges of first-time car buyers.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="concepts"
        title="Interviewing target users"
      >
        <p className="mb-8">
          After conducting a broad survey, we continued our research sprint with
          an in-depth interview process with 5 people who fit within our target
          demographic.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-surface rounded-lg p-6">
            <h3 className="text-[24px] md:text-[32px] font-medium text-black mb-2">
              3/5 participants
            </h3>
            <p className="text-[16px] md:text-[24px] font-light text-black/70">
              Would rely/prefer word of mouth, or peer-sourced information
            </p>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <h3 className="text-[24px] md:text-[32px] font-medium text-black mb-2">
              4/5 participants
            </h3>
            <p className="text-[16px] md:text-[24px] font-light text-black/70">
              Plan to use a down payment and monthly payments to fully own the
              car
            </p>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <h3 className="text-[24px] md:text-[32px] font-medium text-black mb-2">
              4/5 participants
            </h3>
            <p className="text-[16px] md:text-[24px] font-light text-black/70">
              Hold negative or wary impressions of salespeople
            </p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="demo"
        label="REFLECTION"
        title="Takeaways"
      >
        <p>
          Through this challenge, our team gained valuable insights into
          designing for financial literacy and user empowerment. The project
          reinforced the importance of user-centered design in creating
          accessible financial tools.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
