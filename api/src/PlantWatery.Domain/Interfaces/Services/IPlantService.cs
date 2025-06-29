using PlantWatery.Domain.Dtos;

namespace PlantWatery.Domain.Interfaces.Services;

public interface IPlantService
{
    Task<PlantDetailDto?> GetPlantForDetailsByIdAsync(Guid id);
    Task<IEnumerable<PlantOverviewDto>> GetAllPlantsForOverviewAsync();
    Task<bool> CreateWateringAsync(Guid plantId, CreateWateringDto wateringDto);
}
