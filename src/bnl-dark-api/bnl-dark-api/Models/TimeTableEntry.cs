namespace bnl_dark_api.Models;

public class TimeTableEntry : ITimeTableEntry
{
    public int Id { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterations { get; set; }
}

public interface ITimeTableEntry : IId
{
    public DateTimeOffset StartTime { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterations { get; set; }
}