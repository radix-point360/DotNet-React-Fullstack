namespace server.Entities;
public class RefreshToken : BaseEntity
    {
        
        public string? Username { get; set; }
        public string? Token { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public bool IsRevoked { get; set; }

        public Guid TokenFamilyId { get; set; }
        public DateTime? RevokedAt { get; set; }
        public string? ReplacedByToken { get; set; }

        public bool IsExpired => ExpiresAt.HasValue && DateTime.UtcNow >= ExpiresAt.Value;
    }