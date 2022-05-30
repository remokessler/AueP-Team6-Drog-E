using System.ComponentModel.DataAnnotations;

namespace bnl_dark_api.Models;

public class Patient : IPatient
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Firstname { get; set; }
    [Required]
    public DateTimeOffset Birthday { get; set; }
    [Required]
    public string SocialSecurityNumber { get; set; }
    public IEnumerable<AnamnesisRecord>? Anamnesis { get; set; }
}

public interface IPatient: IId
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Firstname { get; set; }
    public DateTimeOffset Birthday { get; set; }
    public string SocialSecurityNumber { get; set; }
    public IEnumerable<AnamnesisRecord>? Anamnesis { get; set; }
}
