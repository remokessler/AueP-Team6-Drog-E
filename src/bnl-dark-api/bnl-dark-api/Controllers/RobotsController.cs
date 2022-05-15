using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace bnl_dark_api.Controllers;


[ApiController]
[Route("odata/[controller]")]
public class RobotsController : DefaultCrudController<Robot>
{
    public RobotsController(ILogger<RobotsController> logger, ApplicationDbContext context)
        : base(logger, context, context.Robots) { } 
}