using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Dtos;

public record PlantDetailDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string RoomName,
    int? WateringIntervalInDays,
    IEnumerable<WateringEventDto> WateringEvents)
{
    public static PlantDetailDto FromEntity(PlantEntity entity)
        => new(
            entity.Id,
            entity.Title,
            entity.ImageUrl,
            entity.Room.Title,
            entity.WateringInterval?.IntervalInDays,
            entity.WateringEvents?.Select(WateringEventDto.FromEntity) ?? []);
}
