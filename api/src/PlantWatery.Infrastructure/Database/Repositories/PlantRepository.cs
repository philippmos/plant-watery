using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class PlantRepository(DatabaseContext dbContext) : Repository<PlantEntity>(dbContext), IPlantRepository
{
    private IQueryable<PlantEntity> PlantsWithLocationAndWateringEvents =>
        DbContext.Plants
            .Include(p => p.Location)
            .Include(p => p.WateringEvents);

    public async Task<PlantEntity?> GetByIdWithAllIncludesAsync(Guid id)
        => await PlantsWithLocationAndWateringEvents
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<PlantEntity>> GetAllWithLocationsAndLatestWateringEventAsync()
        => await PlantsWithLocationAndWateringEvents
            .ToListAsync();
}
