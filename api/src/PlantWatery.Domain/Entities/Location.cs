namespace PlantWatery.Domain.Entities;

public class Location
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;

    public virtual IEnumerable<Plant>? Plants { get; set; }
}
