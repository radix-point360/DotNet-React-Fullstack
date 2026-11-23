import { useState } from "react";

import Navbar from "../components/resume/Navbar";
import Hero from "../components/resume/Hero";
import Experience from "../components/resume/Experience";
import Skills from "../components/resume/Skills";
import Projects from "../components/resume/Projects";
import Education from "../components/resume/Education";
import Contact from "../components/resume/Contact";
import Footer from "../components/resume/Footer";

import { resumeData } from "../data/resumeData";

function LandingResume() {
    
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const {
    personalInfo,
    summary,
    metrics,
    experience,
    skills,
    projects,
    education,
  } = resumeData;

  const copyEmail = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(personalInfo.email);

    setCopiedEmail(true);

    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#070b14] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200"
          : "bg-slate-50 text-slate-900 selection:bg-sky-500/20 selection:text-sky-900"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        personalInfo={personalInfo}
      />

      <main className="mx-auto max-w-7xl px-6">
        <Hero
          darkMode={darkMode}
          personalInfo={personalInfo}
          summary={summary}
          metrics={metrics}
          copiedEmail={copiedEmail}
          copyEmail={copyEmail}
        />

        <Experience
          darkMode={darkMode}
          experience={experience}
        />

        <Skills
          darkMode={darkMode}
          skills={skills}
        />

        <Projects
          darkMode={darkMode}
          projects={projects}
        />

        <Education
          darkMode={darkMode}
          education={education}
        />

        <Contact
          darkMode={darkMode}
          personalInfo={personalInfo}
        />
      </main>

      <Footer
        darkMode={darkMode}
        personalInfo={personalInfo}
      />
    </div>
  );
}

export default LandingResume;