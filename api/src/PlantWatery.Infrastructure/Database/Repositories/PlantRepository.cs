using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class PlantRepository(DatabaseContext dbContext) : Repository<Plant>(dbContext), IPlantRepository
{
    private IQueryable<Plant> PlantsWithLocationAndWateringEvents =>
        DbContext.Plants
            .Include(p => p.Location)
            .Include(p => p.WateringEvents);

    public async Task<Plant?> GetByIdWithAllIncludesAsync(Guid id)
        => await PlantsWithLocationAndWateringEvents
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<Plant>> GetAllWithLocationsAndLatestWateringEventAsync()
        => await PlantsWithLocationAndWateringEvents
            .ToListAsync();
}
