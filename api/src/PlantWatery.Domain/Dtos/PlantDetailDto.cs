using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Dtos;

public record PlantDetailDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName,
    int? WateringIntervalInDays,
    IEnumerable<WateringEventDto> WateringEvents)
{
    public static PlantDetailDto FromEntity(PlantEntity entity)
        => new(
            entity.Id,
            entity.Title,
            entity.ImageUrl,
            entity.Location.Title,
            entity.WateringInterval?.IntervalInDays,
            entity.WateringEvents?.Select(WateringEventDto.FromEntity) ?? []);
}
