using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Entities;

namespace PlantWatery.Infrastructure.Database;

public class DatabaseContext(
    DbContextOptions<DatabaseContext> contextOptions) 
    : DbContext(contextOptions)
{
    public DbSet<HomeEntity> Homes { get; set; }
    public DbSet<PlantEntity> Plants { get; set; }
    public DbSet<RoomEntity> Rooms { get; set; }
    public DbSet<WateringEventEntity> WateringEvents { get; set; }
    public DbSet<WateringIntervalEntity> WateringIntervals { get; set; }
    public DbSet<UserEntity> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RoomEntity>()
            .HasOne(r => r.Home)
            .WithMany(h => h.Rooms)
            .HasForeignKey(r => r.HomeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserEntity>()
            .HasMany(u => u.Homes)
            .WithMany(h => h.Users);

        modelBuilder.Entity<PlantEntity>()
            .HasOne(p => p.WateringInterval)
            .WithOne(wi => wi.Plant)
            .HasForeignKey<WateringIntervalEntity>(wi => wi.PlantId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
