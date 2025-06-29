using Microsoft.Extensions.Logging;
using PlantWatery.Domain.Dtos;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces.Repositories;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Application.Services;

public class PlantService(
    IPlantRepository plantRepo,
    IRepository<WateringEvent> wateringRepo,
    ILogger<PlantService> logger) : IPlantService
{
    public async Task<PlantDto?> GetPlantByIdAsync(Guid id)
    {
        var plant = await plantRepo.GetByIdAsync(id);
        return plant is null 
            ? null 
            : PlantDto.FromEntity(plant);
    }

    public async Task<IEnumerable<PlantDto>> GetAllPlantsAsync()
    {
        var allPlants = await plantRepo.GetAllWithLocationsAsync();

        return allPlants.Select(PlantDto.FromEntity);
    }

    public async Task<bool> CreateWateringAsync(Guid plantId, WateringDto wateringDto)
    {
        var plant = await plantRepo.GetByIdAsync(plantId);

        if (plant is null)
        {
            logger.LogWarning("Plant with Id {Id} could not be found", plantId);
            return false;
        }

        var wateringEvent = new WateringEvent
        {
            Id = Guid.NewGuid(),
            Comment = wateringDto.Comment,
            DateTime = DateTime.UtcNow,
            Plant = plant
        };

        await wateringRepo.AddAsync(wateringEvent);

        return true;
    }
}
