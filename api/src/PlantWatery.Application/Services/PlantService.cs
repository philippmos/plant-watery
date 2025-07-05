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
        var plant = await plantRepo.GetByIdForUserWithAllAsync(id, userContext.GetSub());

        return plant is null 
            ? null 
            : PlantDetailDto.FromEntity(plant);
    }

    public async Task<IEnumerable<PlantOverviewDto>> GetAllPlantsForOverviewAsync()
    {
        var allPlants = await plantRepo.GetAllByUserWithAllAsync(userContext.GetSub());

        return allPlants.Select(PlantOverviewDto.FromEntity);
    }

    public async Task<bool> CreateWateringAsync(Guid plantId, CreateWateringDto wateringDto)
    {
        var plant = await plantRepo.GetByIdForUserWithAllAsync(plantId, userContext.GetSub());

        if (plant is null)
        {
            logger.LogWarning("Plant with Id {Id} could not be found", plantId);
            return false;
        }

        var wateringEvent = new WateringEventEntity
        {
            Id = Guid.NewGuid(),
            Comment = wateringDto.Comment,
            DateTime = wateringDto.DateTime,
            Plant = plant
        };

        await wateringRepo.AddAsync(wateringEvent);

        return true;
    }
}
