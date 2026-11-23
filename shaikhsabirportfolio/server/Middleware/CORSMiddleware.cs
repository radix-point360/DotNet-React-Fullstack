public static class CORSConfiguration
{
    public static void ConfigureCORS(this IServiceCollection services, IConfiguration configuration)
    {
        var allowedOrigins = configuration
        .GetSection("Cors:AllowedOrigins")
        .Get<string[]>() ?? Array.Empty<string>();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", builder =>
            {
                builder.WithOrigins(allowedOrigins)
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });
    }

    public static IServiceCollection AddCORS(this IServiceCollection services, IConfiguration configuration)
    {
        ConfigureCORS(services, configuration);
        return services;
    }
}