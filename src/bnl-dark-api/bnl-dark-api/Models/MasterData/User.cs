using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace bnl_dark_api.Models;

public class User : IUser
{
    public int Id { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    public string? PasswordResetToken { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public JobDescription JobDescription { get; set; } 
}

public interface IUser : IId
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string? PasswordResetToken { get; set; }
    public string Name { get; set; }
    public string FirstName { get; set; }
    public JobDescription JobDescription { get; set; } 
}
[JsonConverter(typeof(StringEnumConverter))]
public enum JobDescription
{
    Doctor,
    Nurse,
    Administrative
}