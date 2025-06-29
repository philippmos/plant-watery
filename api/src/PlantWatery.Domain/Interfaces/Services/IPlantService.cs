using PlantWatery.Domain.Dtos;

namespace PlantWatery.Domain.Interfaces.Services;

public interface IPlantService
{
    Task<PlantDto?> GetPlantByIdAsync(Guid id);
    Task<IEnumerable<PlantDto>> GetAllPlantsAsync();

    Task<bool> CreateWateringAsync(Guid plantId, WateringDto wateringDto);
}
