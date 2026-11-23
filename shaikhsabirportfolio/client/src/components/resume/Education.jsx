import { GraduationCap } from "lucide-react";

function Education({ darkMode, education }) {
  return (
    <section
      id="education"
      className={`py-24 border-b ${
        darkMode ? "border-slate-800/80" : "border-slate-200"
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <span
          className={`p-3 rounded-2xl border ${
            darkMode
              ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
              : "bg-sky-50 border-sky-200 text-sky-600"
          }`}
        >
          <GraduationCap className="h-6 w-6" />
        </span>

        <div>
          <h2
            className={`text-3xl font-black tracking-tight sm:text-4xl ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Education & Credentials
          </h2>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Academic background in Computer Science and Engineering.
          </p>
        </div>
      </div>

      {/* Education Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, index) => (
          <div
            key={index}
            className={`rounded-3xl border p-8 transition duration-300 hover:scale-[1.01] ${
              darkMode
                ? "border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-xl"
                : "border-slate-200 bg-white shadow-lg"
            }`}
          >
            {/* Period */}
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border inline-block mb-4 ${
                darkMode
                  ? "border-sky-500/30 bg-sky-500/10 text-sky-400"
                  : "border-sky-200 bg-sky-50 text-sky-700"
              }`}
            >
              {edu.period}
            </span>

            {/* Degree */}
            <h3
              className={`text-xl font-black ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {edu.degree}
            </h3>

            {/* Institution */}
            <p
              className={`mt-2 text-base font-semibold ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {edu.institution}
            </p>

            {/* Score */}
            <p
              className={`mt-4 inline-block rounded-xl border px-4 py-1.5 text-xs font-bold ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-200"
                  : "border-slate-200 bg-slate-100 text-slate-800"
              }`}
            >
              {edu.score}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;