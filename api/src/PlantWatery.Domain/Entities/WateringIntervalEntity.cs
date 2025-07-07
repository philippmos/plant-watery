namespace PlantWatery.Domain.Entities;

public class WateringIntervalEntity : BaseEntity
{
    public int IntervalInDays { get; set; }


    public Guid PlantId { get; set; }

    public virtual PlantEntity Plant { get; set; } = default!;
}
