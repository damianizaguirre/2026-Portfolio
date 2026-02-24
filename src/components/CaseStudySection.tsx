interface CaseStudySectionProps {
  id: string;
  label?: string;
  title: string;
  children: React.ReactNode;
}

export default function CaseStudySection({
  id,
  label,
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <section id={id} style={{ marginBottom: "clamp(40px, 5.2vw, 100px)" }}>
      {label && (
        <p
          className="font-light text-muted uppercase tracking-wide"
          style={{
            fontSize: "var(--text-nav)",
            marginBottom: "clamp(4px, 0.42vw, 8px)",
          }}
        >
          {label}
        </p>
      )}
      <h2
        className="font-normal leading-[1.2] text-black"
        style={{
          fontSize: "clamp(22px, 2.08vw, 40px)",
          marginBottom: "clamp(12px, 1.56vw, 30px)",
        }}
      >
        {title}
      </h2>
      <div
        className="font-light leading-relaxed text-black/80"
        style={{ fontSize: "var(--text-nav)" }}
      >
        {children}
      </div>
    </section>
  );
}
