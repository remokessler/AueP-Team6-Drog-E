namespace bnl_dark_api.Models;

public class Therapy : ITherapy, IId
{
    public int Id { get; set; }
    public int Amount { get; set; }
    public int TimesTillRecovered { get; set; }
    public IMedicine Medicine { get; set; }
}

public interface ITherapy
{
    public int Id { get; set; }
    public int Amount { get; set; }
    public int TimesTillRecovered { get; set; }
    public IMedicine Medicine { get; set; }
}
