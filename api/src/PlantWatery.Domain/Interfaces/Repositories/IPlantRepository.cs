using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Interfaces.Repositories;

public interface IPlantRepository : IRepository<Plant>
{
    Task<Plant?> GetByIdAsync(Guid id);
    Task<IEnumerable<Plant>> GetAllWithLocationsAsync();
}
