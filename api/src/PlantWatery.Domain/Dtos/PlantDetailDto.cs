using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Dtos;

public record PlantDetailDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName,
    IEnumerable<WateringEventDto> WateringEvents)
{
    public static PlantDetailDto FromEntity(PlantEntity entity)
        => new(
            entity.Id,
            entity.Title,
            entity.ImageUrl,
            entity.Location.Title,
            entity.WateringEvents?.Select(WateringEventDto.FromEntity) ?? []);
}
