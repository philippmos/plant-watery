namespace PlantWatery.Domain.Dtos;

public record PlantDto(
    Guid Id,
    string Title,
    string ImageUrl,
    string LocationName);