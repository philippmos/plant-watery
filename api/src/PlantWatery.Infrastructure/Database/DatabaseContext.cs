using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;

namespace PlantWatery.Infrastructure.Database;

public class DatabaseContext(
    DbContextOptions<DatabaseContext> contextOptions) 
    : DbContext(contextOptions)
{
    public DbSet<PlantEntity> Plants { get; set; }
    public DbSet<LocationEntity> Locations { get; set; }
    public DbSet<WateringEventEntity> WateringEvents { get; set; }
    public DbSet<UserEntity> Users { get; set; }
}
