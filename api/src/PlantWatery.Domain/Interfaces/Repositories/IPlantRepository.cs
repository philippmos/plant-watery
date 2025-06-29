using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Interfaces.Repositories;

public interface IPlantRepository : IRepository<Plant>
{
    Task<Plant?> GetByIdWithAllIncludesAsync(Guid id);
    Task<IEnumerable<Plant>> GetAllWithLocationsAndLatestWateringEventAsync();
}
