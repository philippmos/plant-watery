using PlantWatery.Api.Endpoints.Plants;

namespace PlantWatery.Api.Endpoints;

public static class EndpointMapping
{
    public static void MapEndpoints(this WebApplication app)
    {
        app.NewVersionedApi("Plants").MapGroup("/v{version:apiVersion}/plants").MapPlantsEndpoints().HasApiVersion(1.0);
    }
}
