using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class PlantRepository(DatabaseContext dbContext) : Repository<PlantEntity>(dbContext), IPlantRepository
{
    private IQueryable<PlantEntity> PlantsWithRoomAndWateringEvents(string userSub) =>
        DbContext.Plants
            .Include(p => p.Room)
            .Include(p => p.WateringEvents)
            .Include(p => p.WateringInterval)
            .Where(p => p.Room.Home.Users.Any(u => u.IdpSub == userSub));

    public async Task<PlantEntity?> GetByIdForUserWithAllAsync(Guid id, string userSub)
        => await PlantsWithRoomAndWateringEvents(userSub)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<PlantEntity>> GetAllByUserWithAllAsync(string userSub)
        => await PlantsWithRoomAndWateringEvents(userSub)
            .ToListAsync();
}
