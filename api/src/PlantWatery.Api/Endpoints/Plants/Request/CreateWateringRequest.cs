namespace PlantWatery.Api.Endpoints.Plants.Request;

public record CreateWateringRequest(DateTime DateTime, string? Comment);
