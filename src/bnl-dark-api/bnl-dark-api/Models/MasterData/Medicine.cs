namespace bnl_dark_api.Models;

public class Medicine : IMedicine
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LatinName { get; set; }
    public int AmountPerDay { get; set; }
    public MedicineType MedicineType { get; set; }
}

public interface IMedicine: IId
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LatinName { get; set; }
    public int AmountPerDay { get; set; }
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