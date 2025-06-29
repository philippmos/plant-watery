using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Interfaces.Repositories;

public interface IPlantRepository : IRepository<Plant>
{
    Task<IEnumerable<Plant>> GetAllWithLocationsAsync();
}
