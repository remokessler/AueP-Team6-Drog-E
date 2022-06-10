using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bnl_dark_api.Models;

public class TimeTableEntry : ITimeTableEntry
{
    public int Id { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    [Required]
    public User User { get; set; }
    
    [ForeignKey(nameof(Robot))]
    public int RobotId { get; set; }
    [Required]
    public Robot Robot { get; set; }
    
    [Required]
    public DateTimeOffset StartTime { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterations { get; set; }
}

public interface ITimeTableEntry : IId
{
    public int UserId { get; set; }
    public User User { get; set; }
    public int RobotId { get; set; }
    public Robot Robot { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterations { get; set; }
}