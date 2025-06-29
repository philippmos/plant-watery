using PlantWatery.Domain.Dtos;

namespace PlantWatery.Api.Controllers.Plants.Response;

public record PlantDetailResponse(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName,
    IEnumerable<WateringEventPlantOverviewResponse> WateringEvents)
{
    public static PlantDetailResponse FromDto(PlantDetailDto entity)
        => new(
            entity.Id,
            entity.Title,
            entity.ImageUrl,
            entity.LocationName,
            entity.WateringEvents.Select(WateringEventPlantOverviewResponse.FromDto) ?? []);
}


public record WateringEventPlantOverviewResponse(
    Guid Id,
    DateTime DateTime,
    string? Comment)
{
    public static WateringEventPlantOverviewResponse FromDto(WateringEventDto entity)
        => new(entity.Id, entity.DateTime, entity.Comment);
}
