namespace PlantWatery.Api.Common.Hosting;

public record PortsOptions
{
    public const string Ports = nameof(Ports);

    public int Main { get; init; } = 80;
    public int Metrics { get; init; } = 9090;
    public bool UseHttps { get; init; } = false;
}
