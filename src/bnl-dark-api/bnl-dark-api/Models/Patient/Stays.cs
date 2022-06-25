using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bnl_dark_api.Models;

public class Stay : IStay
{
    public int Id { get; set; }
    [Required]
    public DateTimeOffset Enter { get; set; }
    [Required]
    public DateTimeOffset Leave { get; set; }
    [Required]
    public string Reason { get; set; }
    [ForeignKey(nameof(Room))]
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    [ForeignKey(nameof(Patient))]
    public int PatientId { get; set; }
    public Patient? Patient { get; set; }
}

public interface IStay: IId
{
    public DateTimeOffset Enter { get; set; }
    public DateTimeOffset Leave { get; set; }
    public string Reason { get; set; }
    public int RoomId { get; set; }
    public Room Room { get; set; }
    public int PatientId { get; set; }
    public Patient Patient { get; set; }
}