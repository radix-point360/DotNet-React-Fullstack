export const resumeData = {
  personalInfo: {
    name: "Shaikh Sabir Shaikh Taher",
    role: ".NET Full-Stack Software Developer",
    location: "Pune, Maharashtra, India",
    phoneDisplay: "+91 9511941340",
    phoneRaw: "+919511941340",
    whatsappNumber: "919511941340",
    email: "saberpatel40@gmail.com",
    linkedin: "https://www.linkedin.com/in/sabir-shaikh-693719199",
    github: "https://github.com/radix-point360",
    portfolio: "https://shaikhsabirportfolio.vercel.app",
    resumePdfPath: "/Resume_ShaikhSabir_DotNetFullStack.pdf",
    resumeFileName: "Resume_ShaikhSabir_DotNetFullStack.pdf",
  },
  summary:
    ".NET Software Developer with 3+ years of experience developing and maintaining enterprise web and desktop applications. Skilled in building RESTful APIs using C# and ASP.NET Core Web API, developing web applications using ASP.NET MVC, and maintaining legacy desktop applications using VB.NET and Windows Forms. Experienced in Entity Framework Core, LINQ, SQL Server, JWT authentication, role-based authorization, and database optimization.",
  metrics: [
    { label: "YearsS Experience", value: "3+" },
    { label: "Enterprise Dashboards", value: "5+" },
    { label: "Ticket Resolution Rate", value: "95%" },
    { label: "Clients Served", value: "SBD & ERP" }
  ],
  experience: [
    {
      company: "L&T Technology Services (LTTS)",
      role: "Engineer (LTTS-3)",
      client: "Stanley Black & Decker (SBD)",
      period: "Nov 2024 – Present",
      location: "Pune, India",
      highlights: [
        "Developed RESTful backend services using ASP.NET Core Web API and C# to support enterprise and client-facing applications.",
        "Implemented JWT-based authentication and role-based authorization to secure API endpoints and manage granular user access across modules.",
        "Built data access layers using Entity Framework Core and LINQ, optimizing complex SQL Server queries and stored procedures to reduce API response times.",
        "Developed standardized request/response DTOs, model validations, and global exception-handling middleware to ensure consistent API behavior and clear error reporting.",
      ],
    },
    {
      company: "Qualsoft Solutions Private Ltd.",
      role: "Software Developer",
      client: "Enterprise ERP Systems",
      period: "Sep 2023 – Nov 2024",
      location: "Maharashtra, India",
      highlights: [
        "Developed 5+ modular, dynamic dashboards for enterprise ERP systems (Facility Management, Hostel, Mess, MARCOM, Library) using ASP.NET MVC and C#.",
        "Created optimized RDLC reports and integrated high-performance backend data storage using SQL Server T-SQL stored procedures and triggers.",
        "Acted as the primary technical point of contact for desktop clients, troubleshooting runtime errors and maintaining legacy VB.NET desktop ERP applications with a 95% ticket resolution rate.",
        "Delivered an ASP.NET Core 8 FAQ portal to improve user self-service support and reduce support request volume.",
        "Engineered a Windows Forms data-export utility to extract structured database records and automate schema compatibility mapping with web ERP databases.",
      ],
    },
  ],
  skills: {
    "Languages": ["C#", "VB.NET", "SQL", "JavaScript", "TypeScript"],
    "Backend & Desktop": [
      ".NET Core 6+",
      "ASP.NET Core Web API",
      "ASP.NET MVC 4.8",
      "EF Core",
      "LINQ",
      "ADO.NET",
      "RESTful APIs",
      "Windows Forms",
    ],
    "Frontend": [
      "React",
      "Tailwind CSS",
      "jQuery",
      "AJAX",
      "HTML5",
      "CSS3",
      "Bootstrap",
    ],
    "Databases": [
      "Microsoft SQL Server",
      "T-SQL",
      "Stored Procedures",
      "Functions & Triggers",
    ],
    "DevOps & Tools": [
      "Docker",
      "Linux",
      "Git & GitHub",
      "TFS",
      "Visual Studio",
      "Postman",
      "VBA Excel Macros",
    ],
    "AI Productivity": [
      "GitHub Copilot",
      "Claude",
      "Cursor",
      "ChatGPT",
      "Gemini",
    ],
  },
  projects: [
    {
      title: "MobileShop E-Commerce Web Application",
      category: "Full-Stack / MVC",
      tech: ["ASP.NET Core 10 MVC", "C#", "ASP.NET Core Identity", "SQL Server"],
      description:
        "A full-featured e-commerce platform providing a complete online shopping experience with clean MVC separation of concerns across controllers, models, and views.",
      highlights: [
        "Implemented secure user authentication and role-based authorization using ASP.NET Core Identity for customers and admins.",
        "Structured for high maintainability and scalability across catalog browsing, cart workflows, and administrative privileges.",
      ],
      github: "https://github.com/radix-point360",
    },
    {
      title: "Full-Stack Personal Portfolio Website",
      category: "React / Web API",
      tech: ["React", "ASP.NET Core Web API", "Tailwind CSS", "Vercel"],
      description:
        "Responsive personal portfolio application featuring decoupled frontend/backend architecture, smooth navigation, and optimized client-side rendering.",
      highlights: [
        "Showcases enterprise software engineering experience, categorized tech stack, and architectural project breakdowns.",
        "Deployed with automated CI/CD workflows on Vercel.",
      ],
      github: "https://github.com/radix-point360",
      live: "https://shaikhsabirportfolio.vercel.app",
    },
    {
      title: "Enterprise ERP Dashboards & FAQ Portal",
      category: "Enterprise .NET",
      tech: ["ASP.NET MVC", "C#", "SQL Server", "RDLC Reports"],
      description:
        "Developed 5+ modular enterprise dashboards and an ASP.NET Core 8 self-service FAQ portal to optimize internal workflows and reduce support ticket volume.",
      highlights: [
        "Optimized T-SQL stored procedures, triggers, and RDLC report generation for high-volume enterprise data.",
        "Delivered intuitive data visualization across Facility Management, Hostel, Mess, MARCOM, and Library modules."
      ],
      github: "https://github.com/radix-point360"
    },
    {
      title: "Windows Forms Data Export & Migration Utility",
      category: "Desktop & Utilities",
      tech: ["VB.NET", "Windows Forms", "ADO.NET", "SQL Server"],
      description:
        "Engineered a robust desktop data-extraction utility to automate schema compatibility mapping and bulk record synchronization with web ERP databases.",
      highlights: [
        "Maintained legacy VB.NET desktop systems with a 95% resolution rate for enterprise clients.",
        "Automated cross-platform data validation and error handling."
      ],
      github: "https://github.com/radix-point360"
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Dr. Babasaheb Ambedkar Technological University",
      period: "2019 – 2022",
      score: "CGPA: 7.9 / 10 (75%)",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Maharashtra State Board of Technical Education",
      period: "2017 – 2019",
      score: "Percentage: 73%",
    },
  ],
};
