using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;

namespace PlantWatery.Infrastructure.Database;

public class DatabaseContext(
    DbContextOptions<DatabaseContext> contextOptions) 
    : DbContext(contextOptions)
{
    public DbSet<Plant> Plants { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<WateringEvent> WateringEvents { get; set; }
}
