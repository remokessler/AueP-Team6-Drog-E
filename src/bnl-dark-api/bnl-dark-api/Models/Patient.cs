namespace bnl_dark_api.Models;

public class Patient : IPatient, IId
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Firstname { get; set; }
    public DateTimeOffset Birthday { get; set; }
    public string SocialSecurityNumber { get; set; }
    public IEnumerable<Therapy> DoneTherapy { get; set; }
}

public interface IPatient
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Firstname { get; set; }
    public DateTimeOffset Birthday { get; set; }
    public string SocialSecurityNumber { get; set; }
    public IEnumerable<Therapy> DoneTherapy { get; set; }
}
