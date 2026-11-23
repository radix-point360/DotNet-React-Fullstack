import { Code2 } from "lucide-react";

function Skills({ darkMode, skills }) {
  return (
    <section
      id="skills"
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
          <Code2 className="h-6 w-6" />
        </span>

        <div>
          <h2
            className={`text-3xl font-black tracking-tight sm:text-4xl ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Technical Stack & Skills
          </h2>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Comprehensive tools and technologies powering scalable systems.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className={`rounded-3xl border p-7 transition duration-300 hover:scale-[1.02] ${
              darkMode
                ? "border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-xl hover:border-sky-500/40"
                : "border-slate-200 bg-white shadow-lg hover:border-sky-300"
            }`}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500 animate-pulse" />

              <h3
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {category}
              </h3>
            </div>

            {/* Skill Items */}
            <div className="flex flex-wrap gap-2.5">
              {items.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-xl border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition hover:scale-105 ${
                    darkMode
                      ? "border-slate-700/80 bg-slate-800/80 text-slate-200 hover:border-sky-500/50 hover:bg-sky-500/10"
                      : "border-slate-200 bg-slate-100 text-slate-800 hover:border-sky-300 hover:bg-sky-50"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;