using System.ComponentModel.DataAnnotations;

namespace bnl_dark_api.Models;

public class Room: IRoom
{
    public int Id { get; set; }
    [Required]
    public int Number { get; set; }
    [Required]
    public int Floor { get; set; }
    [Required]
    public string Name { get; set; }
}

public interface IRoom: IId
{
    public int Number { get; set; }
    public int Floor { get; set; }
    public string Name { get; set; }
}