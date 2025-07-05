using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class PlantRepository(DatabaseContext dbContext) : Repository<PlantEntity>(dbContext), IPlantRepository
{
    private IQueryable<PlantEntity> PlantsWithLocationAndWateringEvents(string userSub) =>
        DbContext.Plants
            .Include(p => p.Location)
            .Include(p => p.WateringEvents)
            .Where(p => p.User.IdpSub == userSub);

    public async Task<PlantEntity?> GetByIdForUserWithAllAsync(Guid id, string userSub)
        => await PlantsWithLocationAndWateringEvents(userSub)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<PlantEntity>> GetAllByUserWithAllAsync(string userSub)
        => await PlantsWithLocationAndWateringEvents(userSub)
            .ToListAsync();
}
