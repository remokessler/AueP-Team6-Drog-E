using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace bnl_dark_api.Controllers;

[ApiController]
[Route("odata/robots/health")]
public class RobotsHealthController : DefaultCrudController<RobotHealthMessage>
{
    public RobotsHealthController(ILogger<RobotsHealthController> logger, ApplicationDbContext context)
        : base(logger, context, context.RobotHealthMessage) { }
}