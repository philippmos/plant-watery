namespace PlantWatery.Api.Controllers.Plants.Request;

public record CreateWateringRequest(DateTime DateTime, string? Comment);
