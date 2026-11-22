public static class CORSConfiguration
{
    public static void ConfigureCORS(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });
    }

    public static void UseCORS(this WebApplication app)
    {
        app.UseCors("AllowFrontend");
    }

    public static IServiceCollection AddCORS(this IServiceCollection services)
    {
        ConfigureCORS(services);
        return services;
    }
}