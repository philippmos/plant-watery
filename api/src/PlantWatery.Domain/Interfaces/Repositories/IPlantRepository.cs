using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Interfaces.Repositories;

public interface IPlantRepository : IRepository<PlantEntity>
{
    Task<PlantEntity?> GetByIdWithAllIncludesAsync(Guid id);
    Task<IEnumerable<PlantEntity>> GetAllWithLocationsAndLatestWateringEventAsync();
}
