using PlantWatery.Domain.Dtos;

namespace PlantWatery.Api.Endpoints.Plants.Response;

public record PlantDetailResponse(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName,
    int? WateringIntervalInDays,
    IEnumerable<WateringEventPlantOverviewResponse> WateringEvents)
{
    public static PlantDetailResponse FromDto(PlantDetailDto dto)
        => new(
            dto.Id,
            dto.Title,
            dto.ImageUrl,
            dto.LocationName,
            dto.WateringIntervalInDays,
            dto.WateringEvents.Select(WateringEventPlantOverviewResponse.FromDto) ?? []);
}


public record WateringEventPlantOverviewResponse(
    Guid Id,
    DateTime DateTime,
    string? Comment)
{
    public static WateringEventPlantOverviewResponse FromDto(WateringEventDto entity)
        => new(entity.Id, entity.DateTime, entity.Comment);
}
