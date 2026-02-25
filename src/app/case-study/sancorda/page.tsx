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

export default function SancordaCaseStudy() {
  return (
    <CaseStudyLayout
      title="Interactive Medical Planning Platform"
      subtitle="SANCORDA MEDICAL \u00b7 DESIGN INTERNSHIP 2025"
      sideNav={sideNav}
      timeline="Jun - Aug 2025"
      role="Product Designer Intern"
      team={[{ name: "Jeremy Warren" }, { name: "John Woo" }]}
      skills={["Product Design", "Product Research", "Prototyping"]}
      heroImage={
        <Image
          src="/images/sancorda-thumbnail.png"
          alt="Sancorda Medical planning platform with 3D visualization"
          width={983}
          height={605}
          className="w-full h-auto rounded-md"
          priority
        />
      }
    >
      <CaseStudySection
        id="challenge"
        label="OVERVIEW"
        title="Designing a planning platform for a medical startup"
      >
        <p>
          Over the Summer 2025, I had the opportunity to intern with Sancorda
          Medical, a medical startup, and worked with the founders to visualize
          their SaaS platform. While the team at Sancorda had already identified
          their market need for their platform, my work was to translate their
          goals and ideas into prototypes and a final demo for future potential
          investors. With Sancorda&apos;s medical software being split between 3
          sections, these being Recon ST, Recon AI, and iPlant, over the summer
          I focused on the first two. Having different purposes and workflows
          between the two sections, with findings gathered through research and
          biomedical &amp; bioengineering insights from the founders, I
          translated these into a web-based platform.
        </p>
      </CaseStudySection>

      <CaseStudySection id="solution" title="So what is Sancorda?">
        <p>
          Sancorda Medical is a medical startup developing a 3D coronary artery
          visualization and operation planning platform. It&apos;s designed to
          assist in identifying potential cardiac issues and aid in
          pre-operative planning.
        </p>
        <Image
          src="/images/sancorda/what-is-sancorda.png"
          alt="Sancorda platform overview"
          width={958}
          height={530}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      {/* User Flows */}
      <section id="process" style={{ marginBottom: "clamp(40px, 5.2vw, 100px)" }}>
        <div className="flex flex-col" style={{ gap: "clamp(30px, 3.6vw, 70px)" }}>
          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(22px, 1.67vw, 32px)",
                marginBottom: "clamp(12px, 1.56vw, 30px)",
              }}
            >
              Initial User Flow for Recon ST
            </h3>
            <Image
              src="/images/sancorda/user-flow-recon-st.png"
              alt="User flow diagram for Recon ST"
              width={956}
              height={501}
              className="w-full h-auto"
            />
          </div>

          <div>
            <h3
              className="font-normal text-black"
              style={{
                fontSize: "clamp(22px, 1.67vw, 32px)",
                marginBottom: "clamp(12px, 1.56vw, 30px)",
              }}
            >
              Initial User Flow for Recon AI
            </h3>
            <Image
              src="/images/sancorda/user-flow-recon-ai.png"
              alt="User flow diagram for Recon AI"
              width={957}
              height={364}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <CaseStudySection
        id="analysis"
        label="RESEARCH"
        title="Looking at the Medical Lab Software Products"
      >
        <p>
          In order to understand the current market, I conducted an analysis of
          some competitors that offer similar services. Due to the very limiting
          information that is open to the public, I also looked into design
          editing tools to capture more editing aspects. This helped me identify
          a range of potential features to incorporate into their product, as
          well as features to avoid.
        </p>
        <Image
          src="/images/sancorda/competitor-analysis.png"
          alt="Competitor analysis of medical software products"
          width={957}
          height={563}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection
        id="current-solutions"
        label="DESIGN"
        title="Optimizing the layout for high-density information"
      >
        <p>
          After researching key elements to incorporate and avoid within the
          software, I knew that this software was going to have a data-heavy
          dashboard. I focused on creating a layout that could handle complex 3D
          visualizations alongside detailed patient data while remaining
          intuitive for medical professionals.
        </p>
      </CaseStudySection>

      <CaseStudySection id="concepts" title="Design Style & Icons">
        <p>
          With the UI of this project being very simple, dark themed, and
          overall abundant, the different variations of the components were
          designed to maintain consistency across the platform while supporting
          high-density data display.
        </p>
        <Image
          src="/images/sancorda/design-style.png"
          alt="Design style guide and icon set"
          width={956}
          height={634}
          className="w-full h-auto"
          style={{ marginTop: "clamp(20px, 2.6vw, 50px)" }}
        />
      </CaseStudySection>

      <CaseStudySection id="demo" title="Recon ST & Recon AI Demo">
        <p>
          The platform features two main tools: Recon ST for standard
          visualization and analysis, and Recon AI for AI-assisted diagnostics
          and planning.
        </p>
        <div className="flex flex-col" style={{ gap: "clamp(20px, 2.6vw, 50px)", marginTop: "clamp(20px, 2.6vw, 50px)" }}>
          <Image
            src="/images/sancorda/recon-st-demo.png"
            alt="Recon ST demo screenshot"
            width={956}
            height={587}
            className="w-full h-auto"
          />
          <Image
            src="/images/sancorda/recon-ai-demo.png"
            alt="Recon AI demo screenshot"
            width={956}
            height={587}
            className="w-full h-auto"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="takeaways"
        label="REFLECTION"
        title="Thoughts & Takeaways"
      >
        <p>
          New Research - Since this project was a biomedical &amp; bioengineering
          based product, I learned new interesting and complex things that
          previously I didn&apos;t expect. The experience taught me how to
          design for specialized professional tools where accuracy and data
          clarity are paramount.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
