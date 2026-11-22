using Microsoft.EntityFrameworkCore;
using server.Data;

public static class DBConfigMiddleware
{
    public static void ConfigureDBContext(IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
    {

        // Add services to the container.
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "Connection string 'DefaultConnection' is missing. Set it via 'dotnet user-secrets' in Development or 'ConnectionStrings__DefaultConnection' in Production.");
        }

        services.AddDbContext<PortfolioDbContext>(options =>
    {
        options.UseNpgsql(connectionString);
        options.UseSnakeCaseNamingConvention();

        if (environment.IsDevelopment())
        {
            options.EnableSensitiveDataLogging();
            options.EnableDetailedErrors();
        }
    });

    }

    public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
    {
        ConfigureDBContext(services, configuration, environment);
        return services;
    }


}