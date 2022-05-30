using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace bnl_dark_api.Controllers;


[ApiController]
[Route("odata/[controller]")]
public class StaysController : DefaultCrudController<Stay>
{
    public StaysController(ILogger<StaysController> logger, ApplicationDbContext context)
        : base(logger, context, context.Stays) { }
}