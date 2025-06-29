using PlantWatery.Domain.Dtos;

namespace PlantWatery.Api.Controllers.Plants.Response;

public record PlantResponse(
    Guid Id,
    string Title,
    string ImageUrl)
{
    public static PlantResponse FromDto(PlantDto dto) 
        => new (dto.Id, dto.Title, dto.ImageUrl);
}
