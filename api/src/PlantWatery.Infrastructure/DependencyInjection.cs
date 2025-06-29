using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PlantWatery.Domain.Interfaces.Repositories;
using PlantWatery.Infrastructure.Database;
using PlantWatery.Infrastructure.Database.Repositories;

namespace PlantWatery.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureLayer(this IServiceCollection services)
    {
        services.SetupDatabaseConnection();

        return services;
    }


    private static IServiceCollection SetupDatabaseConnection(this IServiceCollection services)
    {
        var serviceProvider = services.BuildServiceProvider();

        var connectionString = serviceProvider
                                    .GetRequiredService<IConfiguration>()
                                    .GetConnectionString("DefaultConnection");

        services.AddDbContext<DatabaseContext>(options => 
                    options
                        .UseLazyLoadingProxies()
                        .UseNpgsql(connectionString));

        services.SetupDatabaseRepositories();

        return services;
    }

    private static IServiceCollection SetupDatabaseRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<IPlantRepository, PlantRepository>();

        return services;
    }
}
