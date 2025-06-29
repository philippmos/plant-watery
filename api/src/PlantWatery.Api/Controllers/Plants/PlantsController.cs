using Microsoft.AspNetCore.Mvc;
using PlantWatery.Api.Common;
using PlantWatery.Api.Controllers.Plants.Request;
using PlantWatery.Api.Controllers.Plants.Response;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Api.Controllers.Plants;

[Route("[controller]")]
public class PlantsController(
    IPlantService plantService,
    ILogger<PlantsController> logger) : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlantResponse>>> GetAll()
    {
        var results = await plantService.GetAllPlantsAsync();

        return Ok(results.Select(PlantResponse.FromDto));
    }

    [HttpGet("{plantId}")]
    public async Task<ActionResult<PlantResponse>> Get(Guid plantId)
    {
        var result = await plantService.GetPlantByIdAsync(plantId);

        if (result is null)
        {
            return NotFound();
        }

        return Ok(PlantResponse.FromDto(result));
    }


    [HttpPost("{plantId}/waterings)")]
    public async Task<IActionResult> CreateWatering(Guid plantId, [FromBody] CreateWateringRequest request)
    {
        var result = await plantService.CreateWateringAsync(plantId, new (request.Comment));

        if (result is false)
        {
            return BadRequest();
        }

        return CreatedAtAction("Get", new { plantId });
    }
}
