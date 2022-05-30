using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace bnl_dark_api.Models;

[Index(nameof(Dispenser), IsUnique = true)]
public class Medicine : IMedicine
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string LatinName { get; set; }
    [Required]
    public int AmountPerDay { get; set; }
    [Required]
    public int Dispenser { get; set; }
    [Required]
    public MedicineType MedicineType { get; set; }
}

public interface IMedicine: IId
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LatinName { get; set; }
    public int AmountPerDay { get; set; }
    public int Dispenser { get; set; }
    public MedicineType MedicineType { get; set; }
}

public enum MedicineType
{
    Unknown,
    Capsule,
    Injection,
    BandAid,
    Liquid,
    Inhaler,
    TopicalMedicine,
    Suppository,
    Drop
}