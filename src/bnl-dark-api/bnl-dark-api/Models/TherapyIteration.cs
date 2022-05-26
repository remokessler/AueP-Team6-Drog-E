namespace bnl_dark_api.Models;

public class TherapyIteration : ITherapyIteration
{
    public int Id { get; set; }
    public User ResponsableStaff { get; set; }
    public Robot TreatingStaff { get; set; }
    public Therapy Therapy { get; set; }
    public DateTimeOffset TimeDone { get; set; }
}

public interface ITherapyIteration : IId
{
    public User ResponsableStaff { get; set; }
    public Robot TreatingStaff { get; set; }
    public Therapy Therapy { get; set; }
    public DateTimeOffset TimeDone { get; set; }
}