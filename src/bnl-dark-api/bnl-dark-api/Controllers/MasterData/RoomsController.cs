using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bnl_dark_api.Controllers;

[ApiController]
[Route("odata/[controller]")]
public class RoomsController : DefaultCrudController<Room>
{
    public RoomsController(ILogger<RoomsController> logger, ApplicationDbContext context)
        : base(logger, context, context.Rooms) { }
}