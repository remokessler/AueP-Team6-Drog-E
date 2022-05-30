using System.ComponentModel.DataAnnotations;

namespace bnl_dark_api.Models;

public class Therapy : ITherapy
{
    public int Id { get; set; }
    public int TimesDone => TherapyIterations.Count();
    [Required]
    public int TotalTimesToBeHealed { get; set; }
    [Required]
    public int MedicineAmountPerIteration { get; set; }
    public Medicine? Medicine { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterations { get; set; }
}

public interface ITherapy: IId
{
    public int Id { get; set; }
    public int TimesDone { get; }
    public int TotalTimesToBeHealed { get; set; }
    public int MedicineAmountPerIteration { get; set; }
    public Medicine? Medicine { get; set; }
    public IEnumerable<TherapyIteration>? TherapyIterations { get; set; }
}
