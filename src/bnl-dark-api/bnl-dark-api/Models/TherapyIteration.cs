using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace bnl_dark_api.Models;

public class TherapyIteration : ITherapyIteration
{
    public int Id { get; set; }
    [ForeignKey(nameof(Therapy))]
    public int TherapyId { get; set; }
    [JsonIgnore]
    public Therapy? Therapy { get; set; }
    [ForeignKey(nameof(TimeTableEntry))]
    public int TimeTableEntryId { get; set; }
    public TimeTableEntry? TimeTableEntry { get; set; }
    public DateTimeOffset? TimeDone { get; set; }
}

public interface ITherapyIteration : IId
{
    public int TherapyId { get; set; }
    public Therapy Therapy { get; set; }
    public int TimeTableEntryId { get; set; }
    public TimeTableEntry TimeTableEntry { get; set; }
    public DateTimeOffset? TimeDone { get; set; }
}