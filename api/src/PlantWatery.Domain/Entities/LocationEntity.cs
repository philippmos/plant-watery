namespace PlantWatery.Domain.Entities;

public class LocationEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;

    public virtual IEnumerable<PlantEntity>? Plants { get; set; }
}
