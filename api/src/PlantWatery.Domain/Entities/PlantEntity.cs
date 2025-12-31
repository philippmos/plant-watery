namespace PlantWatery.Domain.Entities;

public class PlantEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string ImageUrl {  get; set; } = string.Empty;

    public virtual RoomEntity Room { get; set; } = default!;
    public virtual IEnumerable<WateringEventEntity>? WateringEvents { get; set; }
    public virtual WateringIntervalEntity? WateringInterval { get; set; } = default!;
}
