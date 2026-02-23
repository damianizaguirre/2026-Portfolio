export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white px-6 md:px-12 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-gray-400">
          designed + vibe coded by damian
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide uppercase text-gray-300 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@damian.com"
            className="text-sm font-medium tracking-wide uppercase text-gray-300 hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide uppercase text-gray-300 hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
