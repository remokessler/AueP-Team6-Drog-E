using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace bnl_dark_api.Models;

[JsonConverter(typeof(StringEnumConverter))]
public enum RobotState
{
    Unknown,
    Stopped,
    Idle,
    Running
}