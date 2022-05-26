﻿namespace bnl_dark_api.Models;

public class Robot : IRobot
{
    public int Id { get; set; }
    public string Name { get; set; }
    public IEnumerable<RobotHealthMessage>? RobotHealthMessages { get; set; } 
}

public interface IRobot: IId
{
    public string Name { get; set; }
    public IEnumerable<RobotHealthMessage>? RobotHealthMessages { get; set; } 
}