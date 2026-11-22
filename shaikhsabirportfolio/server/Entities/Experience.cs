namespace server.Entities;

public class Experience : BaseEntity
{
    public Guid ProfileId { get; set; }
    public string Company { get; set; } = string.Empty;
    public string RoleTitle { get; set; } = string.Empty;
    public string? ClientOrContext { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public int DisplayOrder { get; set; }
    public List<string> Highlights { get; set; } = new();
    public Profile Profile { get; set; } = null!;
}