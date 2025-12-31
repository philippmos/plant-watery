using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Dtos;

public record PlantOverviewDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string RoomName,
    DateTime? LastWateredDateTime = null,
    int? WateringIntervalInDays = null)
{
    public static PlantOverviewDto FromEntity(PlantEntity entity) 
        => new (
            entity.Id,
            entity.Title,
            entity.ImageUrl,
            entity.Room.Title,
            entity.WateringEvents?.OrderByDescending(x => x.DateTime).FirstOrDefault()?.DateTime,
            entity.WateringInterval?.IntervalInDays);
}
