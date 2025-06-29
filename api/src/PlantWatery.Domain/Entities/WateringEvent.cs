namespace PlantWatery.Domain.Entities;

public class WateringEvent
{
    public Guid Id { get; set; }
    public DateTime DateTime { get; set; }
    public string? Comment { get; set; }

    public virtual Plant Plant { get; set; } = default!;
}
