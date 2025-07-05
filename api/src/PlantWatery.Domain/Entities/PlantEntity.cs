namespace PlantWatery.Domain.Entities;

public class PlantEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string ImageUrl {  get; set; } = string.Empty;

    public virtual LocationEntity Location { get; set; } = default!;
    public virtual IEnumerable<WateringEventEntity>? WateringEvents { get; set; }
    public virtual UserEntity User { get; set; } = default!;
}
