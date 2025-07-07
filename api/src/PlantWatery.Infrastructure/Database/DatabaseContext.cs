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
    public DbSet<WateringIntervalEntity> WateringIntervals { get; set; }
    public DbSet<UserEntity> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PlantEntity>()
            .HasOne(p => p.WateringInterval)
            .WithOne(wi => wi.Plant)
            .HasForeignKey<WateringIntervalEntity>(wi => wi.PlantId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
