namespace PlantWatery.Domain.Entities;

public class Plant
{
    public Guid Id {  get; set; }
    public string Title { get; set; } = string.Empty;
    public string ImageUrl {  get; set; } = string.Empty;

    public virtual Location Location { get; set; } = default!;
    public virtual IEnumerable<WateringEvent> WateringEvents { get; set; } = [];

}
