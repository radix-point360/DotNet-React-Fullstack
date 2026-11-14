using CRUD_Web_API.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_Web_API.Data;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options)
{
    public DbSet<Person> People => Set<Person>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(entity =>
        {
            entity.Property(person => person.Name)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(person => person.Email)
                .HasMaxLength(256)
                .IsRequired();

            entity.Property(person => person.PhoneNumber)
                .HasMaxLength(32);
        });
    }
}
