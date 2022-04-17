using Microsoft.OData.Edm;

namespace bnl_dark_api.Models;

public class Robot : IRobot, IId
{
    public string Name { get; set; }
    public int Id { get; set; }
    public string Location { get; set; }
    public RobotState State { get; set; }
}

public interface IRobot
{
    public string Name { get; set; }
    public int Id { get; set; }
    public string Location { get; set; }
    public RobotState State {get;set;}
}

public enum RobotState
{
    Stopped,
    Idle,
    Running
}