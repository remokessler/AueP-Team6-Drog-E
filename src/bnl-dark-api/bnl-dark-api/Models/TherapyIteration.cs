using System.ComponentModel.DataAnnotations;

namespace bnl_dark_api.Models;

public class TherapyIteration : ITherapyIteration
{
    public int Id { get; set; }
    [Required]
    public User ResponsableStaff { get; set; }
    [Required]
    public Robot TreatingStaff { get; set; }
    [Required]
    public Therapy Therapy { get; set; }
    [Required]
    public DateTimeOffset TimeDone { get; set; }
}

public interface ITherapyIteration : IId
{
    public User ResponsableStaff { get; set; }
    public Robot TreatingStaff { get; set; }
    public Therapy Therapy { get; set; }
    public DateTimeOffset TimeDone { get; set; }
}