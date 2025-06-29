using PlantWatery.Domain.Dtos;
using PlantWatery.Domain.Interfaces.Services;

namespace PlantWatery.Application.Services;

public class PlantService() : IPlantService
{
    public async Task<IEnumerable<PlantDto>> GetAllPlantsAsync()
    {
        var plantDtos = new List<PlantDto>
        {
            new (Guid.NewGuid(), "Yukka-Palme", "https://placehold.co/558x358", "Arbeitszimmer"),
            new (Guid.NewGuid(), "Bogenhanf", "https://placehold.co/558x358", "Arbeitszimmer"),
            new (Guid.NewGuid(), "Aloe Vera", "https://placehold.co/558x358", "Wohnzimmer")
        };

        return await Task.FromResult(plantDtos);
    }
}
