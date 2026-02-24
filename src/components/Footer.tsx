export default function Footer() {
  return (
    <footer className="bg-surface px-8 md:px-14 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-[18px] md:text-[24px] font-normal text-black">
        designed + vibe coded by damian
      </p>
      <div className="flex items-center gap-8">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[18px] md:text-[24px] font-normal text-black hover:text-muted transition-colors"
        >
          LINKEDIN
        </a>
        <a
          href="mailto:hello@damian.design"
          className="text-[18px] md:text-[24px] font-normal text-black hover:text-muted transition-colors"
        >
          EMAIL
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[18px] md:text-[24px] font-normal text-black hover:text-muted transition-colors"
        >
          INSTAGRAM
        </a>
      </div>
    </footer>
  );
}
