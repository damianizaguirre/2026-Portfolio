export default function Footer() {
  return (
    <footer
      className="bg-surface flex items-center justify-between"
      style={{ height: "var(--footer-h)", padding: "0 var(--px-side)" }}
    >
      <p
        className="font-normal text-black"
        style={{ fontSize: "var(--text-card)" }}
      >
        designed + vibe coded by damian
      </p>
      <div
        className="flex items-center"
        style={{ gap: "clamp(16px, 1.67vw, 32px)" }}
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-normal text-black hover:text-muted transition-colors"
          style={{ fontSize: "var(--text-card)" }}
        >
          LINKEDIN
        </a>
        <a
          href="mailto:hello@damian.design"
          className="font-normal text-black hover:text-muted transition-colors"
          style={{ fontSize: "var(--text-card)" }}
        >
          EMAIL
        </a>
      </div>
    </footer>
  );
}
