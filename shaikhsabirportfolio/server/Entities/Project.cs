namespace server.Entities;

public class Project: BaseEntity
{
    public Guid ProfileId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public List<string> Details { get; set; } = new();
    public List<string> TechStack { get; set; } = new();
    public string? LiveUrl { get; set; }
    public string? RepoUrl { get; set; }
    public bool IsFeatured { get; set; } = true;
    public int DisplayOrder { get; set; }

    public Profile Profile { get; set; } = null!;
}