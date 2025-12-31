namespace PlantWatery.Domain.Entities;

public class HomeEntity : BaseEntity
{
    public string Title { get; set; } = string.Empty;

    public virtual ICollection<RoomEntity> Rooms { get; set; } = [];
    public virtual ICollection<UserEntity> Users { get; set; } = [];
}
