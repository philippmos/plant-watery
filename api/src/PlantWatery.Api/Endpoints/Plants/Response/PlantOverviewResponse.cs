using PlantWatery.Domain.Dtos;

namespace PlantWatery.Api.Endpoints.Plants.Response;

public record PlantOverviewResponse(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName,
    DateTime? LastWateredDateTime,
    int? WateringIntervalInDays)
{
    public static PlantOverviewResponse FromDto(PlantOverviewDto dto) 
        => new (
            dto.Id,
            dto.Title,
            dto.ImageUrl,
            dto.LocationName,
            dto.LastWateredDateTime,
            dto.WateringIntervalInDays);
}
