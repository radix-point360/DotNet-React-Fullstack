import {
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Download,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import ApiStatusBadge from "../ApiStatusBadge";

function Hero({
  darkMode,
  personalInfo,
  summary,
  metrics,
  copiedEmail,
  copyEmail,
}) {
  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    "Opportunity for .NET Full-Stack Developer Role"
  )}`;

  const whatsappLink = `https://wa.me/${
    personalInfo.whatsappNumber
  }?text=${encodeURIComponent(
    "Hi Sabir, I came across your portfolio and would like to connect."
  )}`;

  const callLink = `tel:${personalInfo.phoneRaw}`;

  return (
    <section
      id="about"
      className={`relative flex flex-col justify-center py-20 md:py-28 border-b overflow-hidden ${
        darkMode ? "border-slate-800/80" : "border-slate-200"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6 ${
            darkMode
              ? "border-sky-500/30 bg-sky-500/10 text-sky-400"
              : "border-sky-200 bg-sky-50 text-sky-700"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Available for .NET Full-Stack & Backend Roles
        </div>

        {/* Name */}
        <h1
          className={`text-4xl font-black tracking-tight sm:text-6xl md:text-7xl ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          {personalInfo.name}
        </h1>

        {/* Role */}
        <h2
          className={`mt-4 text-2xl font-bold sm:text-3xl bg-gradient-to-r ${
            darkMode
              ? "from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent"
              : "from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
          }`}
        >
          {personalInfo.role}
        </h2>

        {/* Summary */}
        <p
          className={`mt-6 text-base sm:text-xl leading-relaxed max-w-3xl ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {summary}
        </p>
                <div
          className={`mt-8 flex flex-wrap items-center gap-3.5 text-sm grid grid-cols-2 lg:grid-cols-3 gap-4 ${
            darkMode ? "text-slate-300" : "text-slate-700"
          }`}
        >
          <span className="flex items-center gap-1.5 mr-2 font-medium col-span-2 lg:col-span-1">
            <MapPin className="h-4 w-4 text-sky-500" />
            {personalInfo.location}
          </span>

          {/* <a
            href={callLink}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition hover:scale-105 shadow-sm ${
  darkMode
    ? "border-slate-700 bg-slate-900/90 text-slate-200 hover:border-sky-500/50 hover:text-sky-400"
    : "border-slate-300 bg-white text-slate-800 hover:border-sky-500 hover:text-sky-600"
}`}
          >
            <Phone className="h-3.5 w-3.5 text-sky-500" />
            Call: {personalInfo.phoneDisplay}
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition hover:scale-105 shadow-sm ${
  darkMode
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
    : "border-emerald-300 bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
}`} 
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp: {personalInfo.phoneDisplay}
          </a>
        </div>
                <div className="mt-10 flex flex-wrap items-center gap-4">

          <a
            href={personalInfo.resumePdfPath}
            download={personalInfo.resumeFileName}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-sky-500/25 transition duration-200 hover:scale-105 hover:from-sky-400 hover:to-blue-500"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>

          <div className="inline-flex items-center rounded-xl overflow-hidden">
            <a
              href={mailtoLink}
              className={`inline-flex items-center gap-2.5 border px-5 py-3.5 text-sm font-semibold rounded-l-xl transition ${
                darkMode
                  ? "border-slate-700 bg-slate-900/90 text-slate-200 hover:border-sky-500/50 hover:text-sky-400"
                  : "border-slate-300 bg-white text-slate-800 hover:border-sky-500 hover:text-sky-600"
              }`} 
            >
              <Mail className="h-4 w-4 text-sky-500" />
              {personalInfo.email}
            </a>

            <button
              onClick={copyEmail}
              className={`inline-flex items-center gap-1.5 border-y border-r px-4 py-3.5 text-sm font-medium rounded-r-xl transition ${
                darkMode
                  ? "border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-200"
              }`}
            >
              {copiedEmail ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div> */}

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition hover:scale-105 shadow-sm ${
  darkMode
    ? "bg-slate-800 text-slate-300 hover:bg-slate-600"
    : "bg-white text-slate-950 hover:bg-slate-200"
}`}       
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition hover:scale-105 shadow-sm ${
  darkMode
    ? "border-slate-700 bg-slate-900/80 text-white hover:border-sky-500/50"
    : "border-slate-300 bg-white text-slate-950 hover:border-sky-500 hover:text-sky-600"
}`} 
          >
            <Linkedin className="h-4 w-4 text-sky-500" />
            LinkedIn
          </a>

        </div>
                <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-5 ${
                darkMode
                  ? "border-slate-800/80 bg-slate-900/40"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`text-3xl font-black ${
                  darkMode ? "text-sky-400" : "text-sky-600"
                }`}
              >
                {metric.value}
              </div>

              <div
                className={`mt-1 text-xs font-semibold uppercase tracking-wider ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Hero;