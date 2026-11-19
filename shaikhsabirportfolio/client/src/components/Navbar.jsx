import {
  Terminal,
  Sun,
  Moon,
  Menu,
  X,
  Download,
} from "lucide-react";

function Navbar({
  darkMode,
  setDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  personalInfo,
}) {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        darkMode
          ? "border-slate-800/80 bg-[#070b14]/85"
          : "border-slate-200 bg-white/85"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className={`flex items-center gap-2.5 text-lg font-extrabold tracking-tight ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl border shadow-inner ${
              darkMode
                ? "bg-sky-500/15 text-sky-400 border-sky-500/30 shadow-sky-500/10"
                : "bg-sky-50 text-sky-600 border-sky-200 shadow-sky-100"
            }`}
          >
            <Terminal className="h-5 w-5" />
          </span>

          <span className="text-xl">
            Sabir
            <span className={darkMode ? "text-sky-400" : "text-sky-600"}>
              .dev
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:flex items-center gap-7 text-sm font-medium ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 hover:-translate-y-0.5 ${
                darkMode ? "hover:text-sky-400" : "hover:text-sky-600"
              }`}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-xl border p-2.5 transition duration-200 hover:scale-105 ${
              darkMode
                ? "border-slate-700 bg-slate-900/90 text-amber-400 hover:border-slate-600"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a
            href={personalInfo.resumePdfPath}
            download={personalInfo.resumeFileName}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-xl border p-2.5 ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-amber-400"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-xl border p-2.5 ${
              darkMode
                ? "border-slate-800 bg-slate-900 text-slate-200"
                : "border-slate-200 bg-white text-slate-800"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className={`border-t px-6 py-5 md:hidden ${
            darkMode
              ? "border-slate-800 bg-[#070b14]/95"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium ${
                  darkMode
                    ? "text-slate-300 hover:text-sky-400"
                    : "text-slate-700 hover:text-sky-600"
                }`}
              >
                {link.name}
              </a>
            ))}

            <a
              href={personalInfo.resumePdfPath}
              download={personalInfo.resumeFileName}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;