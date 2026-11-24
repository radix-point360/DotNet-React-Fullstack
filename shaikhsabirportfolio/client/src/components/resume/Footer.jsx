import { Link } from "react-router-dom";
import LogInOut from "../LogInOut";

function Footer({ darkMode, personalInfo }) {
  return (
    <footer
      className={`border-t py-10 text-center text-xs font-medium ${
        darkMode
          ? "border-slate-800/80 text-slate-400 bg-[#05080f]"
          : "border-slate-200 text-slate-500 bg-slate-100"
      }`}
    >
      <p>
        © {new Date().getFullYear()} {personalInfo.name}. Built with React,
        Tailwind CSS & Vite.
        <span className="mx-1">|</span>
      {/* <Link to="/login" className="text-blue-500 hover:underline"> Login </Link> */}
      <LogInOut/>
      </p>
    </footer>
  );
}

export default Footer;