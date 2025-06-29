using Microsoft.Extensions.DependencyInjection;
using PlantWatery.Application.Services;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
    {
        services.AddServices();

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddTransient<IPlantService, PlantService>();

        return services;
    }
}
