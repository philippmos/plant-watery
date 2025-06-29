using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class PlantRepository(DatabaseContext dbContext) : Repository<Plant>(dbContext), IPlantRepository
{
    public async Task<IEnumerable<Plant>> GetAllWithLocationsAsync()
    {
        return await DbContext.Plants.Include(p => p.Location).ToListAsync();
    }
}
