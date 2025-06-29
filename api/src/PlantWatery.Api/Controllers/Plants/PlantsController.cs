using Microsoft.AspNetCore.Mvc;
using PlantWatery.Api.Common;
using PlantWatery.Api.Controllers.Plants.Response;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Api.Controllers.Plants;

[Route("[controller]")]
public class PlantsController(
    IPlantService plantService,
    ILogger<PlantsController> logger) : ApiControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<PlantResponse>> GetAll()
    {
        var result = await plantService.GetAllPlantsAsync();

        return result.Select(PlantResponse.FromDto);
    }
}
