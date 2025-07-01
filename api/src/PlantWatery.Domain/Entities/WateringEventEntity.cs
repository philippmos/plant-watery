namespace PlantWatery.Domain.Entities;

public class WateringEventEntity : BaseEntity
{
    public DateTime DateTime { get; set; }
    public string? Comment { get; set; }

    public virtual PlantEntity Plant { get; set; } = default!;
}
