import { useState } from "react";
import { FolderGit2, Github, ArrowUpRight } from "lucide-react";

function Projects({ darkMode, projects }) {
  const [activeTab, setActiveTab] = useState("All");

  const projectCategories = [
    "All",
    "Full-Stack / MVC",
    "React / Web API",
    "Enterprise .NET",
    "Desktop & Utilities",
  ];

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section
      id="projects"
      className={`py-24 border-b ${
        darkMode ? "border-slate-800/80" : "border-slate-200"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex items-center gap-3">
          <span
            className={`p-3 rounded-2xl border ${
              darkMode
                ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                : "bg-sky-50 border-sky-200 text-sky-600"
            }`}
          >
            <FolderGit2 className="h-6 w-6" />
          </span>

          <div>
            <h2
              className={`text-3xl font-black tracking-tight sm:text-4xl ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Featured Projects & Architecture
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Production applications and full-stack solutions.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition shadow-sm ${
                activeTab === cat
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : darkMode
                  ? "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`group flex flex-col justify-between rounded-3xl border p-8 transition duration-300 hover:-translate-y-1.5 ${
              darkMode
                ? "border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-2xl hover:border-sky-500/50"
                : "border-slate-200 bg-white shadow-xl hover:border-sky-300"
            }`}
          >
            <div>
              {/* Title + Actions */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-block mb-3 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      darkMode
                        ? "border-sky-500/30 bg-sky-500/10 text-sky-400"
                        : "border-sky-200 bg-sky-50 text-sky-700"
                    }`}
                  >
                    {project.category}
                  </span>

                  <h3
                    className={`text-2xl font-black ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`rounded-xl border p-2.5 transition hover:scale-110 ${
                        darkMode
                          ? "border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
                          : "border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-900"
                      }`}
                      title="Source Code"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className={`rounded-xl border p-2.5 transition hover:scale-110 ${
                        darkMode
                          ? "border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
                          : "border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100"
                      }`}
                      title="Live Demo"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p
                className={`mt-4 text-base leading-relaxed ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {project.description}
              </p>

              {/* Highlights */}
              <ul
                className={`mt-5 space-y-2.5 text-sm ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div
              className={`mt-8 flex flex-wrap gap-2 pt-5 border-t ${
                darkMode
                  ? "border-slate-800/80"
                  : "border-slate-100"
              }`}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className={`rounded-xl border px-3.5 py-1 text-xs font-semibold ${
                    darkMode
                      ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
                      : "bg-sky-50 border-sky-200 text-sky-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;