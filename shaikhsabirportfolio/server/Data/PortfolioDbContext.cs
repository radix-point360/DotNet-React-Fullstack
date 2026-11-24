using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Education> Educations => Set<Education>();
    public DbSet<Project> Projects => Set<Project>();

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Modified)
                entry.Entity.UpdatedAt = now;
        }
        return base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("public");

        modelBuilder.Entity<Profile>().HasIndex(p => p.Email).IsUnique();
        modelBuilder.Entity<Profile>().HasQueryFilter(e => !e.IsDeleted); // HasQueryFilter is used to filter out soft-deleted entities from queries.

        modelBuilder.Entity<Experience>().HasIndex(e => new { e.ProfileId, e.DisplayOrder });
        modelBuilder.Entity<Experience>().HasQueryFilter(e => !e.IsDeleted);

        modelBuilder.Entity<Skill>().HasIndex(s => new { s.ProfileId, s.Category, s.DisplayOrder });
        modelBuilder.Entity<Skill>().HasQueryFilter(e => !e.IsDeleted);

        modelBuilder.Entity<Education>().HasIndex(ed => new { ed.ProfileId, ed.DisplayOrder });
        modelBuilder.Entity<Education>().HasQueryFilter(e => !e.IsDeleted);
        
        modelBuilder.Entity<Project>().HasIndex(pr => new { pr.ProfileId, pr.DisplayOrder });
        modelBuilder.Entity<Project>().HasQueryFilter(e => !e.IsDeleted);

        modelBuilder.Entity<RefreshToken>().HasQueryFilter(e => !e.IsDeleted);

    }
}