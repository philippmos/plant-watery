using PlantWatery.Domain.Dtos;

namespace PlantWatery.Api.Controllers.Plants.Response;

public record PlantOverviewResponse(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName,
    DateTime? LastWateredDateTime)
{
    public static PlantOverviewResponse FromDto(PlantOverviewDto dto) 
        => new (dto.Id, dto.Title, dto.ImageUrl, dto.LocationName, dto.LastWateredDateTime);
}
