using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Interfaces.Repositories;

public interface IPlantRepository : IRepository<PlantEntity>
{
    Task<PlantEntity?> GetByIdForUserWithAllAsync(Guid id, string userSub);
    Task<IEnumerable<PlantEntity>> GetAllByUserWithAllAsync(string userSub);
}
