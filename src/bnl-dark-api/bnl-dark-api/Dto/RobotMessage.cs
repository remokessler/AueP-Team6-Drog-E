namespace bnl_dark_api.Models;

public class RobotMessage : IRobotMessage
{
    public int OffsetToStartTimeMs { get; set; }
    public int TimetableId { get; set; }
    public Dictionary<int, int> MedicineToPatientRoom { get; set; }
    public Dictionary<int, int> MedicinePickUp { get; set; }
}

public interface IRobotMessage
{
    int OffsetToStartTimeMs { get; set; }
    // <spender> id, id patient room => sorted by delivery time
    Dictionary<int, int> MedicineToPatientRoom { get; set; }
    
    // <spender> id, amount
    Dictionary<int, int> MedicinePickUp { get; set; }
}