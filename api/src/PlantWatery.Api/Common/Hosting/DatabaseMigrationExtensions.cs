using Microsoft.EntityFrameworkCore;
using PlantWatery.Infrastructure.Database;

namespace PlantWatery.Api.Common.Hosting;

public static class DatabaseMigrationExtensions
{
    public static async Task ApplyDatabaseMigrationsAsync(this WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        await dbContext.Database.MigrateAsync();
    }
}