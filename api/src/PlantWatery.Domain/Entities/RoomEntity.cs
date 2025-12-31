namespace PlantWatery.Domain.Entities;

public class RoomEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;

    public Guid HomeId { get; set; }
    public virtual HomeEntity Home { get; set; } = default!;

    public virtual ICollection<PlantEntity> Plants { get; set; } = [];
}
