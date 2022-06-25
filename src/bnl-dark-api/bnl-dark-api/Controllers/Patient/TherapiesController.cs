using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace bnl_dark_api.Controllers;


[ApiController]
[Route("odata/[controller]")]
public class TherapiesController : DefaultCrudController<Therapy>
{
    public TherapiesController(ILogger<TherapiesController> logger, ApplicationDbContext context)
        : base(logger, context, context.Therapies) { }

    [EnableQuery]
    [HttpGet("dropdownEntries")]
    public virtual async Task<ActionResult<Therapy[]>> Get()
    {
        _logger.LogTrace($"{nameof(Therapy)}.GET: for Dropdown");
        var result = _dbSet
            .Include(t => t.TherapyIterationsPlaned)
            .Include(t => t.Stay)
            .ThenInclude(s => s.Patient)
            .Include(t => t.Stay)
            .ThenInclude(s => s.Room)
            .Include(t => t.Medicine)
            .Where(t => (t.TimesDone ?? 0) < t.TotalTimesToBeHealed);
        return Ok(await result.ToListAsync());
    }
}