import {
  Mail,
  Phone,
  MessageCircle,
  Download,
} from "lucide-react";

function Contact({ darkMode, personalInfo }) {
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
    <section id="contact" className="py-24">
      <div
        className={`relative overflow-hidden rounded-3xl border p-8 sm:p-14 text-center shadow-2xl ${
          darkMode
            ? "border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 backdrop-blur-2xl"
            : "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 shadow-xl"
        }`}
      >
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Heading */}
        <h2
          className={`text-3xl font-black tracking-tight sm:text-4xl ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Let's Build Something Reliable Together
        </h2>

        {/* Description */}
        <p
          className={`mx-auto mt-4 max-w-xl text-base sm:text-lg ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Looking for an experienced .NET Core, ASP.NET Web API,
          or Full-Stack Developer? Call, WhatsApp, or email me
          directly.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Email */}
          <a
            href={mailtoLink}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-sky-500/25 transition hover:scale-105"
          >
            <Mail className="h-4 w-4" />
            Email Me
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-600/25 transition hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          {/* Call */}
          <a
            href={callLink}
            className={`inline-flex items-center gap-2 rounded-xl border px-7 py-4 text-sm font-bold transition hover:scale-105 shadow-sm ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-white hover:border-sky-500/50"
                : "border-slate-300 bg-white text-slate-800 hover:border-sky-500"
            }`}
          >
            <Phone className="h-4 w-4 text-sky-500" />
            {personalInfo.phoneDisplay}
          </a>

          {/* Resume */}
          <a
            href={personalInfo.resumePdfPath}
            download={personalInfo.resumeFileName}
            className={`inline-flex items-center gap-2 rounded-xl border px-7 py-4 text-sm font-bold transition hover:scale-105 shadow-sm ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-white hover:border-sky-500/50"
                : "border-slate-300 bg-white text-slate-800 hover:border-sky-500"
            }`}
          >
            <Download className="h-4 w-4 text-sky-500" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;