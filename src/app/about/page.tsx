import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section
        className="flex-1"
        style={{
          paddingTop: "clamp(60px, 8.6vw, 165px)",
          paddingBottom: "clamp(80px, 16.1vw, 310px)",
          paddingLeft: "var(--px-side)",
          paddingRight: "var(--px-side)",
        }}
      >
        <h1
          className="font-normal text-black"
          style={{
            fontSize: "var(--text-hero)",
            marginBottom: "clamp(16px, 1.8vw, 35px)",
          }}
        >
          Designing &amp; Building
        </h1>
        <div
          className="font-light text-black"
          style={{
            fontSize: "var(--text-nav)",
            maxWidth: "clamp(340px, 51.1vw, 981px)",
            lineHeight: 1.6,
          }}
        >
          <p>
            I&apos;m passionate about creating user-centered experiences,
            bridging technology and human needs. Currently building products
            into full scale experiences using AI.
          </p>
          <p style={{ marginTop: "clamp(12px, 1.25vw, 24px)" }}>
            Whenever I&apos;m not designing I&apos;m:
          </p>
          <ul
            className="list-disc"
            style={{
              paddingLeft: "clamp(16px, 1.25vw, 24px)",
              marginTop: "clamp(6px, 0.5vw, 10px)",
            }}
          >
            <li>Running</li>
            <li>Bass fishing</li>
            <li>Using my AMC Stubs Membership</li>
          </ul>
          <p style={{ marginTop: "clamp(12px, 1.25vw, 24px)" }}>
            Reach out to me on LinkedIn or by email!
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
