using System.ComponentModel.DataAnnotations;

namespace PlantWatery.Domain.Entities;

public class UserEntity : BaseEntity
{
    [Required]
    public string IdpSub { get; set; } = string.Empty;

    public virtual ICollection<HomeEntity> Homes { get; set; } = [];
}
