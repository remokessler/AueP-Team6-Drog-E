using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bnl_dark_api.Models;

public class Therapy : ITherapy
{
    public int Id { get; set; }
    public int? TimesDone { get; set; }
    public bool IsDone => TimesDone == TotalTimesToBeHealed;
    [Required]
    public int TotalTimesToBeHealed { get; set; }
    [Required]
    public int MedicineAmountPerIteration { get; set; }
    [ForeignKey(nameof(Medicine))]
    public int MedicineId { get; set; }
    public Medicine? Medicine { get; set; }
    
    [ForeignKey(nameof(Stay))]
    public int StayId { get; set; }
    public Stay? Stay { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterationsPlaned { get; set; }
}

public interface ITherapy: IId
{
    public int Id { get; set; }
    public int? TimesDone { get; set; }
    public int TotalTimesToBeHealed { get; set; }
    public int MedicineAmountPerIteration { get; set; }
    public int MedicineId { get; set; }
    public Medicine Medicine { get; set; }
    public int StayId { get; set; }
    public Stay Stay { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterationsPlaned { get; set; }
}
