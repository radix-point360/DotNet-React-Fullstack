using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Data;

public static class PortfolioDbSeeder
{
    public static async Task SeedAsync(PortfolioDbContext context)
    {
        if (await context.Profiles.IgnoreQueryFilters().AnyAsync())
            return;

        var profileId = Guid.NewGuid();

        var profile = new Profile
        {
            Id = profileId,
            FullName = "Shaikh Sabir Shaikh Taher",
            Headline = "Software Developer | .NET & Full-Stack",
            Summary = ".NET Software Developer with 3+ years of experience developing and maintaining enterprise web and desktop applications. Skilled in building RESTful APIs using C# and ASP.NET Core Web API, developing web applications using ASP.NET MVC, and maintaining desktop applications using VB.NET and Windows Forms. Experienced in Entity Framework Core, LINQ, SQL Server, JWT authentication, role-based authorization, and database optimization. Familiar with React, Docker and Git with a strong understanding of enterprise application development and troubleshooting.",
            Email = "saberpatel40@gmail.com",
            Phone = "+919511941340",
            Location = "Pune, Maharashtra, India",
            LinkedinUrl = "https://www.linkedin.com/in/sabir-shaikh-693719199",
            GithubUrl = "https://github.com/radix-point360",
            PortfolioUrl = "https://shaikhsabirportfolio.vercel.app",
            ResumeUrl = null
        };

        var experiences = new List<Experience>
        {
            new()
            {
                ProfileId = profileId,
                Company = "L&T Technology Services (LTTS)",
                RoleTitle = "Engineer (LTTS-3)",
                ClientOrContext = "Client: Stanley Black & Decker (SBD)",
                StartDate = new DateOnly(2024, 11, 1),
                EndDate = null,
                IsCurrent = true,
                DisplayOrder = 1,
                Highlights =
                [
                    "Developed RESTful backend services using ASP.NET Core Web API and C# to support enterprise and client-facing applications.",
                    "Implemented JWT-based authentication and role-based authorization to secure API endpoints and manage granular user access across modules.",
                    "Built data access layers using Entity Framework Core and LINQ, optimizing complex SQL Server queries and stored procedures to reduce API response times.",
                    "Developed standardized request/response DTOs, model validations, and global exception-handling middleware to ensure consistent API behavior and clear error reporting."
                ]
            },
            new()
            {
                ProfileId = profileId,
                Company = "Qualsoft Solutions Private Ltd.",
                RoleTitle = "Software Developer",
                ClientOrContext = "Enterprise ERP & Support Systems",
                StartDate = new DateOnly(2023, 9, 1),
                EndDate = new DateOnly(2024, 11, 1),
                IsCurrent = false,
                DisplayOrder = 2,
                Highlights =
                [
                    "Developed 5+ modular, dynamic dashboards for enterprise ERP systems (Facility Management, Hostel, Mess, MARCOM, Library) using ASP.NET MVC and C#.",
                    "Created optimized RDLC reports and integrated high-performance backend data storage using SQL Server T-SQL stored procedures and triggers.",
                    "Acted as the primary technical point of contact for desktop clients, troubleshooting runtime errors and maintaining legacy VB.NET desktop ERP applications with a 95% ticket resolution rate.",
                    "Delivered an ASP.NET Core 8 FAQ portal to improve user self-service support and reduce support request volume.",
                    "Engineered a Windows Forms data-export utility to extract structured database records and automate schema compatibility mapping with web ERP databases."
                ]
            }
        };

        var skills = new List<Skill>
        {
            // Programming Languages
            new() { ProfileId = profileId, Category = "Programming Languages", Name = "C#", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "Programming Languages", Name = "VB.NET", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "Programming Languages", Name = "SQL", DisplayOrder = 3 },
            new() { ProfileId = profileId, Category = "Programming Languages", Name = "JavaScript", DisplayOrder = 4 },
            new() { ProfileId = profileId, Category = "Programming Languages", Name = "TypeScript", DisplayOrder = 5 },
            // Backend
            new() { ProfileId = profileId, Category = "Backend", Name = ".NET Core Framework 6+", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "Backend", Name = "ASP.NET Core Web API", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "Backend", Name = "ASP.NET MVC Framework 4.8", DisplayOrder = 3 },
            new() { ProfileId = profileId, Category = "Backend", Name = "Entity Framework (EF) Core", DisplayOrder = 4 },
            new() { ProfileId = profileId, Category = "Backend", Name = "LINQ", DisplayOrder = 5 },
            new() { ProfileId = profileId, Category = "Backend", Name = "ADO.NET", DisplayOrder = 6 },
            new() { ProfileId = profileId, Category = "Backend", Name = "RESTful APIs", DisplayOrder = 7 },
            new() { ProfileId = profileId, Category = "Backend", Name = "Windows Forms (WinForms)", DisplayOrder = 8 },
            // Frontend
            new() { ProfileId = profileId, Category = "Frontend", Name = "React", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "Frontend", Name = "Tailwind", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "Frontend", Name = "jQuery", DisplayOrder = 3 },
            new() { ProfileId = profileId, Category = "Frontend", Name = "AJAX", DisplayOrder = 4 },
            new() { ProfileId = profileId, Category = "Frontend", Name = "HTML5", DisplayOrder = 5 },
            new() { ProfileId = profileId, Category = "Frontend", Name = "CSS3", DisplayOrder = 6 },
            new() { ProfileId = profileId, Category = "Frontend", Name = "Bootstrap", DisplayOrder = 7 },
            // Tools
            new() { ProfileId = profileId, Category = "Tools", Name = "VBA Excel Macros", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "Tools", Name = "Visual Studio", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "Tools", Name = "VS Code", DisplayOrder = 3 },
            new() { ProfileId = profileId, Category = "Tools", Name = "Git", DisplayOrder = 4 },
            new() { ProfileId = profileId, Category = "Tools", Name = "TFS", DisplayOrder = 5 },
            new() { ProfileId = profileId, Category = "Tools", Name = "Postman", DisplayOrder = 6 },
            // Databases
            new() { ProfileId = profileId, Category = "Databases", Name = "Microsoft SQL Server", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "Databases", Name = "T-SQL", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "Databases", Name = "Stored Procedures", DisplayOrder = 3 },
            new() { ProfileId = profileId, Category = "Databases", Name = "Functions", DisplayOrder = 4 },
            new() { ProfileId = profileId, Category = "Databases", Name = "PostgreSQL (Supabase)", DisplayOrder = 5 },
            // DevOps
            new() { ProfileId = profileId, Category = "DevOps", Name = "Linux", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "DevOps", Name = "Docker", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "DevOps", Name = "Git", DisplayOrder = 3 },
            new() { ProfileId = profileId, Category = "DevOps", Name = "GitHub", DisplayOrder = 4 },
            // Data Formats & Configuration
            new() { ProfileId = profileId, Category = "Data Formats & Configuration", Name = "JSON", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "Data Formats & Configuration", Name = "XML", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "Data Formats & Configuration", Name = "YAML", DisplayOrder = 3 },
            // AI Tools
            new() { ProfileId = profileId, Category = "AI Tools", Name = "GitHub Copilot", DisplayOrder = 1 },
            new() { ProfileId = profileId, Category = "AI Tools", Name = "Claude", DisplayOrder = 2 },
            new() { ProfileId = profileId, Category = "AI Tools", Name = "Cursor", DisplayOrder = 3 },
            new() { ProfileId = profileId, Category = "AI Tools", Name = "ChatGPT", DisplayOrder = 4 },
            new() { ProfileId = profileId, Category = "AI Tools", Name = "Gemini", DisplayOrder = 5 }
        };

        var educations = new List<Education>
        {
            new()
            {
                ProfileId = profileId,
                Institution = "Dr. Babasaheb Ambedkar Technological University",
                Degree = "Bachelor of Technology in Computer Science and Engineering",
                StartYear = 2019,
                EndYear = 2022,
                ScoreText = "CGPA: 7.9/10 (75%)",
                DisplayOrder = 1
            },
            new()
            {
                ProfileId = profileId,
                Institution = "Maharashtra State Board of Technical Education",
                Degree = "Diploma in Computer Engineering",
                StartYear = 2017,
                EndYear = 2019,
                ScoreText = "Percentage: 73%",
                DisplayOrder = 2
            }
        };

        var projects = new List<Project>
        {
            new()
            {
                ProfileId = profileId,
                Title = "Full-Stack Personal Portfolio Website",
                ShortDescription = "Responsive personal portfolio web application with a decoupled React frontend and ASP.NET Core Web API backend.",
                Details =
                [
                    "Designed and deployed a responsive personal portfolio web application to showcase professional experience, technical skills, and software projects.",
                    "Developed a decoupled architecture supporting smooth navigation, project showcases, and optimized client-side rendering."
                ],
                TechStack = ["React", "ASP.NET Core Web API", "Tailwind CSS", "Vercel", "PostgreSQL"],
                LiveUrl = "https://shaikhsabirportfolio.vercel.app",
                RepoUrl = "https://github.com/radix-point360",
                IsFeatured = true,
                DisplayOrder = 1
            },
            new()
            {
                ProfileId = profileId,
                Title = "MobileShop E-Commerce Web Application",
                ShortDescription = "Full-featured e-commerce web application with customer account and admin privilege management.",
                Details =
                [
                    "Developed a full-featured e-commerce web application providing a complete online shopping experience.",
                    "Implemented secure user authentication and role-based authorization using ASP.NET Core Identity to manage customer accounts and administrative privileges.",
                    "Applied MVC architectural principles to maintain a clean separation of concerns, ensuring high maintainability and scalability across controllers, models, and views."
                ],
                TechStack = ["ASP.NET Core 10 MVC", "C#", "ASP.NET Core Identity", "SQL Server"],
                LiveUrl = null,
                RepoUrl = "https://github.com/radix-point360",
                IsFeatured = true,
                DisplayOrder = 2
            }
        };

        await context.Profiles.AddAsync(profile);
        await context.Experiences.AddRangeAsync(experiences);
        await context.Skills.AddRangeAsync(skills);
        await context.Educations.AddRangeAsync(educations);
        await context.Projects.AddRangeAsync(projects);

        await context.SaveChangesAsync();
    }
}