using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using PlantWatery.Api.Common.Hosting;
using PlantWatery.Api.Endpoints.Plants.Request;
using PlantWatery.Api.Endpoints.Plants.Response;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Api.Endpoints.Plants;

public static class Endpoints
{
    public static RouteGroupBuilder MapPlantsEndpoints(this RouteGroupBuilder groupBuilder)
    {
        // GET v1/plants/
        groupBuilder.MapGet("/", async Task<IResult> (
            CancellationToken cancellationToken,
            IPlantService plantService) =>
        {
            try
            {
                var results = await plantService.GetAllPlantsForOverviewAsync();

                return Results.Ok(results.Select(PlantOverviewResponse.FromDto));
            }
            catch (Exception)
            {
                return Results.BadRequest();
            }
        })
        .WithName("GetAll")
        .Produces<IEnumerable<PlantOverviewResponse>>(200)
        .Produces<Error>(400)
        .Produces<string>(400);


        // GET v1/plants/{plantId}
        groupBuilder.MapGet("/{plantId:Guid}", async Task<IResult> (
            [FromRoute] Guid plantId,
            CancellationToken cancellationToken,
            IPlantService plantService) =>
        {
            try
            {
                var result = await plantService.GetPlantForDetailsByIdAsync(plantId);

                if (result is null)
                {
                    return Results.NotFound();
                }

                return Results.Ok(PlantDetailResponse.FromDto(result));
            }
            catch (Exception)
            {
                return Results.BadRequest();
            }
        })
        .WithName("Get")
        .Produces<PlantDetailResponse>(200)
        .Produces<Error>(400)
        .Produces<string>(400)
        .Produces<Error>(404)
        .Produces<string>(404);


        // POST v1/plants/{plantId}/waterings
        groupBuilder.MapPost("/{plantId:Guid}/waterings", async Task<IResult> (
            [FromRoute] Guid plantId,
            [FromBody] CreateWateringRequest request,
            CancellationToken cancellationToken,
            IPlantService plantService) =>
        {
            try
            {
                var result = await plantService.CreateWateringAsync(
                    plantId,
                    new (request.DateTime, request.Comment));

                if (result is true)
                {
                    return Results.Created();
                }
            }
            catch (Exception)
            { }

            return Results.BadRequest();
        })
        .WithName("CreateWatering")
        .Produces<string>(201)
        .Produces<Error>(400)
        .Produces<string>(400);

        return groupBuilder
            .RequireRateLimiting(RateLimiting.PolicyNames.Fixed)
            .RequireAuthorization();
    }
}
