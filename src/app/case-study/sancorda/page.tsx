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
    >
      <Image
        src="/images/sancorda-thumbnail.png"
        alt="Sancorda Medical planning platform with 3D visualization"
        width={887}
        height={546}
        className="w-full h-auto rounded-md mb-16"
        priority
      />

      <CaseStudySection
        id="challenge"
        label="OVERVIEW"
        title="Designing a planning platform for a medical startup"
      >
        <p>
          Over the Summer 2025, I had the opportunity to intern with Sancorda
          Medical, a medical startup, and worked with the founders to visualize
          their SaaS product for coronary artery visualization and operation
          planning.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="solution"
        title="So what is Sancorda?"
      >
        <p>
          Sancorda Medical is a medical startup developing a 3D coronary artery
          visualization and operation planning platform. It&apos;s designed to
          assist in identifying potential cardiac issues and aid in
          pre-operative planning.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="analysis"
        label="RESEARCH"
        title="Looking at the Medical Lab Software Products"
      >
        <p>
          In order to understand the current market, I conducted an analysis of
          some competitors that offer similar services. Due to the very limiting
          information available for specialized medical software, I focused on
          analyzing the UI patterns and information architecture of existing
          tools.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="process"
        label="DESIGN"
        title="Optimizing the layout for high-density information"
      >
        <p>
          After researching key elements to incorporate and avoid within the
          software, I knew that this software was going to have a data-heavy
          dashboard. I focused on creating a layout that could handle complex 3D
          visualizations alongside detailed patient data.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="concepts"
        title="Design Style & Icons"
      >
        <p>
          With the UI of this project being very simple, dark themed, and
          overall abundant, the different variations of the components were
          designed to maintain consistency across the platform while supporting
          high-density data display.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="demo"
        title="Recon ST & Recon AI Demo"
      >
        <p className="mb-8">
          The platform features two main tools: Recon ST for standard
          visualization and analysis, and Recon AI for AI-assisted diagnostics
          and planning.
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="takeaways"
        label="REFLECTION"
        title="Thoughts & Takeaways"
      >
        <p>
          Since this project was a biomedical & bioengineering based product, I
          learned new interesting and complex things that previously I
          didn&apos;t expect. The experience taught me how to design for
          specialized professional tools where accuracy and data clarity are
          paramount.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}
