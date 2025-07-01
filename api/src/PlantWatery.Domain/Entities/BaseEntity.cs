using System.ComponentModel.DataAnnotations;

namespace PlantWatery.Domain.Entities;

public class BaseEntity
{
    [Key]
    public Guid Id { get; set; }
}
