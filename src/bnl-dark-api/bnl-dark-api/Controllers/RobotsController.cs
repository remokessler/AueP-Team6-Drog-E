using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bnl_dark_api.Controllers;


[ApiController]
[Route("data/[controller]")]
public class RobotsController : DefaultCrudController<Robot>
{
    public RobotsController(ILogger<RobotsController> logger, ApplicationDbContext context)
        : base(logger, context, context.Robots) { }

    public override async Task<ActionResult<IEnumerable<Robot>>> Get()
    {
        return new[]
        {
            new Robot()
            {
                Id = 1,
                Location = "ZbW",
                Name = "Drog-E",
                State = RobotState.Idle
            }
        };
    }
}