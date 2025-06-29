using PlantWatery.Domain.Entities;

namespace PlantWatery.Domain.Dtos;

public record PlantDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName)
{
    public static PlantDto FromEntity(Plant entity) 
        => new (entity.Id, entity.Title, entity.ImageUrl, entity.Location.Title);
}