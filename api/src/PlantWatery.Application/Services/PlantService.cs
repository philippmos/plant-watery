using PlantWatery.Domain.Dtos;
using PlantWatery.Domain.Interfaces.Repositories;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Application.Services;

public class PlantService(IPlantRepository plantRepo) : IPlantService
{
    public async Task<IEnumerable<PlantDto>> GetAllPlantsAsync()
    {
        var allPlants = await plantRepo.GetAllWithLocationsAsync();

        return allPlants.Select(PlantDto.FromEntity);
    }
}
