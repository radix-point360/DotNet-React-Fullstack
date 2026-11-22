namespace server.Entities;

public class Skill : BaseEntity
{
    public Guid ProfileId { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? ProficiencyLevel { get; set; }
    public int DisplayOrder { get; set; }

    public Profile Profile { get; set; } = null!;
}