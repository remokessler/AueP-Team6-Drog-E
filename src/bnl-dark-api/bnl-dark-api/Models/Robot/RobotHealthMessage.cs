namespace bnl_dark_api.Models;

public class RobotHealthMessage: IRobotHealthMessage
{
    public int Id { get; set; }
    public Room Room { get; set; }
    public TherapyIteration TherapyIteration { get; set; }
    public bool Skipped { get; set; }
    public RobotState RobotState { get; set; }
    public DateTimeOffset Received { get; set; }
}

public interface IRobotHealthMessage : IId
{
    public Room Room { get; set; }
    public TherapyIteration TherapyIteration { get; set; }
    public bool Skipped { get; set; }
    public RobotState RobotState { get; set; }
    // TBD: What can we get from the robot?
    // public int BatteryLevel { get; set; }
    public DateTimeOffset Received { get; set; }
}