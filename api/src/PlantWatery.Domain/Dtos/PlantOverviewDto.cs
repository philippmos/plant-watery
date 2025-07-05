using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Dtos;

public record PlantOverviewDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName,
    DateTime? LastWateredDateTime = null)
{
    public static PlantOverviewDto FromEntity(PlantEntity entity) 
        => new (
            entity.Id,
            entity.Title,
            entity.ImageUrl,
            entity.Location.Title,
            entity.WateringEvents?.OrderByDescending(x => x.DateTime).FirstOrDefault()?.DateTime);
}