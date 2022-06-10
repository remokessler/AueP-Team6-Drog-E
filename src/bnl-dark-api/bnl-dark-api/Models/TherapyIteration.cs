using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bnl_dark_api.Models;

public class TherapyIteration : ITherapyIteration
{
    public int Id { get; set; }
    [ForeignKey(nameof(Therapy))]
    public int TherapyId { get; set; }
    [Required]
    public Therapy Therapy { get; set; }
    
    [ForeignKey(nameof(Stay))]
    public int StayId { get; set; }
    [Required]
    public Stay Stay { get; set; }
    
    [ForeignKey(nameof(TimeTableEntry))]
    public int TimeTableEntryId { get; set; }
    [Required]
    public TimeTableEntry TimeTableEntry { get; set; }
    [Required]
    public DateTimeOffset TimeDone { get; set; }
}

public interface ITherapyIteration : IId
{
    public int TherapyId { get; set; }
    public Therapy Therapy { get; set; }
    public int StayId { get; set; }
    public Stay Stay { get; set; }
    public int TimeTableEntryId { get; set; }
    public TimeTableEntry TimeTableEntry { get; set; }
    public DateTimeOffset TimeDone { get; set; }
}