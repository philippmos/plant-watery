using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Dtos;

public record WateringEventDto(
    Guid Id,
    DateTime DateTime,
    string? Comment)
{
    public static WateringEventDto FromEntity(WateringEventEntity entity) 
        => new(entity.Id, entity.DateTime, entity.Comment);
}
