using PlantWatery.Domain.Dtos;

namespace PlantWatery.Domain.Interfaces.Services;

public interface IPlantService
{
    Task<IEnumerable<PlantDto>> GetAllPlantsAsync();
}
