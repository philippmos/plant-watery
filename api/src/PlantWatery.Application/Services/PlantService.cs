using Microsoft.Extensions.Logging;
using PlantWatery.Domain.Dtos;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces;
using PlantWatery.Domain.Interfaces.Repositories;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Application.Services;

public class PlantService(
    IPlantRepository plantRepo,
    IRepository<WateringEventEntity> wateringRepo,
    IUserContext userContext,
    ILogger<PlantService> logger) : IPlantService
{
    public async Task<PlantDetailDto?> GetPlantForDetailsByIdAsync(Guid id)
    {
        var userSub = userContext.GetSub();

        if (string.IsNullOrEmpty(userSub))
        {
            logger.LogWarning("User Sub is null or empty");
            return null;
        }

        var plant = await plantRepo.GetByIdForUserWithAllAsync(id, "");

        return plant is null 
            ? null 
            : PlantDetailDto.FromEntity(plant);
    }

    public async Task<IEnumerable<PlantOverviewDto>> GetAllPlantsForOverviewAsync()
    {
        var userSub = userContext.GetSub();

        if (string.IsNullOrEmpty(userSub))
        {
            logger.LogWarning("User Sub is null or empty");
            return [];
        }

        var allPlants = await plantRepo.GetAllByUserWithAllAsync(userSub);

        return allPlants.Select(PlantOverviewDto.FromEntity);
    }

    public async Task<bool> CreateWateringAsync(Guid plantId, CreateWateringDto wateringDto)
    {
        var userSub = userContext.GetSub();

        if (string.IsNullOrEmpty(userSub))
        {
            logger.LogWarning("User Sub is null or empty");
            return false;
        }

        var plant = await plantRepo.GetByIdForUserWithAllAsync(plantId, "");

        if (plant is null)
        {
            logger.LogWarning("Plant with Id {Id} could not be found", plantId);
            return false;
        }

        var wateringEvent = new WateringEventEntity
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
