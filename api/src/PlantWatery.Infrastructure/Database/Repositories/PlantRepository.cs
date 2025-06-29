using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class PlantRepository(DatabaseContext dbContext) : Repository<Plant>(dbContext), IPlantRepository
{
    public async Task<Plant?> GetByIdAsync(Guid id)
        => await DbContext.Plants
            .Include(p => p.Location)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IEnumerable<Plant>> GetAllWithLocationsAsync()
        => await DbContext.Plants.Include(p => p.Location).ToListAsync();
}
