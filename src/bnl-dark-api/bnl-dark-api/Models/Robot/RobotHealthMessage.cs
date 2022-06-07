using System.ComponentModel.DataAnnotations.Schema;

namespace bnl_dark_api.Models;

public class RobotHealthMessage: IRobotHealthMessage
{
    public int Id { get; set; }
    [ForeignKey(nameof(TherapyIteration))]
    public int TherapyIterationId { get; set; }
    public TherapyIteration TherapyIteration { get; set; }
    public RobotHealthMessageStatus RobotHealthMessageStatus { get; set; }
    public DateTimeOffset Received { get; set; }
}

public interface IRobotHealthMessage : IId
{
    public int TherapyIterationId { get; set; }
    public TherapyIteration TherapyIteration { get; set; }
    public RobotHealthMessageStatus RobotHealthMessageStatus { get; set; }
    public DateTimeOffset Received { get; set; }
}

public enum RobotHealthMessageStatus
{
    Health = 0,
    Error = 1,
    WaitForStart = 2,
    PickupSuccess = 3,
    DeliveryEnterRoomStatus = 4,
    DeliveryMedicineSuccess = 5,
    DeliveryError = 6
}