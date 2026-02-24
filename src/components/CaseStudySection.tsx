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
    <section id={id} className="mb-20">
      {label && (
        <p className="text-[18px] md:text-[24px] font-light text-muted mb-2 uppercase tracking-wide">
          {label}
        </p>
      )}
      <h2 className="text-[28px] md:text-[40px] font-normal leading-[1.2] text-black mb-6">
        {title}
      </h2>
      <div className="text-[18px] md:text-[24px] font-light leading-relaxed text-black/80">
        {children}
      </div>
    </section>
  );
}
