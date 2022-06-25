using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bnl_dark_api.Controllers;


[ApiController]
[Route("odata/[controller]")]
public class TherapyIterationController : DefaultCrudController<TherapyIteration>
{
    public TherapyIterationController(ILogger<TherapyIterationController> logger, ApplicationDbContext context)
        : base(logger, context, context.TherapyIterations)
    {
    }
}