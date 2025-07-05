namespace PlantWatery.Domain.Dtos;

public record CreateWateringDto(DateTime DateTime, string? Comment = null);
