using PlantWatery.Domain.Dtos;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Application.Services;

public class PlantService : IPlantService
{
    public async Task<IEnumerable<PlantDto>> GetAllPlantsAsync()
    {
        var plantDtos = new List<PlantDto>
        {
            new (Guid.NewGuid(), "Yukka-Palme", "https://placehold.co/558x358"),
            new (Guid.NewGuid(), "Bogenhanf", "https://placehold.co/558x358"),
            new (Guid.NewGuid(), "Aloe Vera", "https://placehold.co/558x358")
        };

        return await Task.FromResult(plantDtos);
    }
}
