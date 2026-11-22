namespace server.Entities;

public class Profile : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Location { get; set; }
    public string? LinkedinUrl { get; set; }
    public string? GithubUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public string? ResumeUrl { get; set; }
    

    public ICollection<Experience> Experiences { get; set; } = new List<Experience>();
    public ICollection<Skill> Skills { get; set; } = new List<Skill>();
    public ICollection<Education> Educations { get; set; } = new List<Education>();
    public ICollection<Project> Projects { get; set; } = new List<Project>();
}