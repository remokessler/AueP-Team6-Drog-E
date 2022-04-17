namespace bnl_dark_api.Models;

public class Medicine : IMedicine, IId
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LatinName { get; set; }
    public BeforeAfterMeal BeforeAfterMeal { get; set; }
    public MedicineType MedicineType { get; set; }
}

public interface IMedicine
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LatinName { get; set; }
    public BeforeAfterMeal BeforeAfterMeal { get; set; }
    public MedicineType MedicineType { get; set; }
}


public enum BeforeAfterMeal
{
    Before,
    After
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