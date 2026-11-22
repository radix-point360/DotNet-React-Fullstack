using Microsoft.EntityFrameworkCore;
using server.Data;
using server.IServices;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDatabaseServices(builder.Configuration, builder.Environment);

builder.Services.AddJWTAuth(builder.Configuration);

builder.WebHost.UseUrls("http://*:8080");

builder.Services.AddCORS();

builder.Services.AddControllers();
builder.Services.AddOpenApi();


builder.Services.AddScoped<ITokenService, TokenService>();


var app = builder.Build();

// Automatically Apply Pending Migrations & Seed Initial Data on Startup
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        await db.Database.MigrateAsync();
        await PortfolioDbSeeder.SeedAsync(db);
        logger.LogInformation("Database migration and seeding completed successfully.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
        throw;
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

// Lightweight Database Connectivity Health Check
app.MapGet("/api/health/db", async (PortfolioDbContext db, CancellationToken ct) =>
{
    var canConnect = await db.Database.CanConnectAsync(ct);
    return canConnect
        ? Results.Ok(new { status = "Healthy", environment = app.Environment.EnvironmentName })
        : Results.Problem("Cannot connect to PostgreSQL database.", statusCode: 503);
});

app.MapControllers();

app.Run();
