using Microsoft.AspNetCore.Mvc;
using PlantWatery.Api.Common;
using PlantWatery.Api.Controllers.Plants.Request;
using PlantWatery.Api.Controllers.Plants.Response;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Api.Controllers.Plants;

[Route("[controller]")]
public class PlantsController(
    IPlantService plantService) : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlantOverviewResponse>>> GetAll()
    {
        var results = await plantService.GetAllPlantsForOverviewAsync();

        return Ok(results.Select(PlantOverviewResponse.FromDto));
    }

    [HttpGet("{plantId}")]
    public async Task<ActionResult<PlantDetailResponse>> Get(Guid plantId)
    {
        var result = await plantService.GetPlantForDetailsByIdAsync(plantId);

        if (result is null)
        {
            return NotFound();
        }

        return Ok(PlantDetailResponse.FromDto(result));
    }


    [HttpPost("{plantId}/waterings")]
    public async Task<IActionResult> CreateWateringForPlant(Guid plantId, [FromBody] CreateWateringRequest request)
    {
        var result = await plantService.CreateWateringAsync(plantId, new (request.DateTime, request.Comment));

        if (result is false)
        {
            return BadRequest();
        }

        return CreatedAtAction(nameof(Get), new { plantId }, null);
    }
}
