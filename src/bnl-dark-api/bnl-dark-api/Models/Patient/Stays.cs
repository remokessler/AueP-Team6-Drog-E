using System.ComponentModel.DataAnnotations;

namespace bnl_dark_api.Models;

public class Stay : IStay
{
    public int Id { get; set; }
    [Required]
    public DateTimeOffset Enter { get; set; }
    [Required]
    public DateTimeOffset Leave { get; set; }
    public Room? Room { get; set; }
    public Patient? Patient { get; set; }
}

public interface IStay: IId
{
    public DateTimeOffset Enter { get; set; }
    public DateTimeOffset Leave { get; set; }
    public Room? Room { get; set; }
    public Patient? Patient { get; set; }
}