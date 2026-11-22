using server.Entities;

namespace server.Entities;

public class Education : BaseEntity
{
    public Guid ProfileId { get; set; }
    public string Institution { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public int StartYear { get; set; }
    public int? EndYear { get; set; }
    public string? ScoreText { get; set; }
    public int DisplayOrder { get; set; }
    public Profile Profile { get; set; } = null!;
}