using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Identity;

namespace bnl_dark_api.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }
    
    public DbSet<Robot> Robots { get; set; }
}