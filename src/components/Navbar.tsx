import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-wide uppercase">
            Damian Izaguirre
          </span>
          <span className="text-sm text-gray-400">Product Designer</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="#work" className="text-sm text-gray-600 hover:text-black transition-colors">
            Work
          </Link>
          <Link href="#fun" className="text-sm text-gray-600 hover:text-black transition-colors">
            Fun
          </Link>
          <Link href="#about" className="text-sm text-gray-600 hover:text-black transition-colors">
            About
          </Link>
          <Link href="#resume" className="text-sm text-gray-600 hover:text-black transition-colors">
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
}
