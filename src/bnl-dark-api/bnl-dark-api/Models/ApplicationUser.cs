using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace bnl_dark_api.Models;

public class ApplicationUser : IdentityUser
{
    
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    [StringLength(50)]
    public override string Id { get; set; }
}