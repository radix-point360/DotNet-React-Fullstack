import { Briefcase, CheckCircle2 } from "lucide-react";

function Experience({ darkMode, experience }) {
  return (
    <section
      id="experience"
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
          <Briefcase className="h-6 w-6" />
        </span>

        <div>
          <h2
            className={`text-3xl font-black tracking-tight sm:text-4xl ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Professional Experience
          </h2>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Enterprise engineering, backend APIs, and modern architecture.
          </p>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <div
            key={index}
            className={`group relative rounded-3xl border p-8 transition duration-300 hover:-translate-y-1 ${
              darkMode
                ? "border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl hover:border-sky-500/40"
                : "border-slate-200 bg-white shadow-xl hover:border-sky-300"
            }`}
          >
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3
                  className={`text-2xl font-black ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {exp.role}
                </h3>

                <p
                  className={`text-lg font-bold mt-1 ${
                    darkMode ? "text-sky-400" : "text-sky-600"
                  }`}
                >
                  {exp.company}

                  {exp.client && (
                    <span
                      className={`text-sm font-normal px-3 py-1 rounded-full border ml-2 inline-block ${
                        darkMode
                          ? "border-slate-700 bg-slate-800 text-slate-300"
                          : "border-slate-200 bg-slate-100 text-slate-700"
                      }`}
                    >
                      Client: {exp.client}
                    </span>
                  )}
                </p>
              </div>

              <span
                className={`w-fit rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide ${
                  darkMode
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                    : "border-sky-200 bg-sky-50 text-sky-700"
                }`}
              >
                {exp.period}
              </span>
            </div>

            {/* Highlights */}
            <ul
              className={`mt-6 space-y-3.5 text-base leading-relaxed ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {exp.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-sky-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;