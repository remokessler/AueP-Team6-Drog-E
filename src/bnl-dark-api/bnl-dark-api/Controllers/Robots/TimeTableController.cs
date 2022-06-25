using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;

namespace bnl_dark_api.Controllers;


[ApiController]
[Route("odata/[controller]")]
public class TimeTableController : DefaultCrudController<TimeTableEntry>
{
    public TimeTableController(ILogger<TimeTableController> logger, ApplicationDbContext context)
        : base(logger, context, context.TimeTableEntries) { }
    
    [EnableQuery]
    [HttpGet]
    public override async Task<ActionResult<IEnumerable<TimeTableEntry>>> Get()
    {
        _logger.LogTrace($"{nameof(TherapyIteration)}.GET: all");
        return Ok(
            await _context.TimeTableEntries
                .Include(t => t.TherapyIterations)
                .ToListAsync());
    }
     
    [EnableQuery]
    [HttpGet("expanded/{key}")]
    public virtual async Task<ActionResult<TimeTableEntry[]>> Get([FromODataUri] int key, [FromQuery]DateTimeOffset day)
    {
        _logger.LogTrace($"{nameof(TimeTableEntry)}.GET: with id: {key}");
        var result = _dbSet
            .Include(t => t.TherapyIterations)
            .ThenInclude(ti => ti.Therapy)
            .ThenInclude(t => t.Medicine)
            .Include(t => t.TherapyIterations)
            .ThenInclude(ti => ti.Therapy)
            .ThenInclude(t => t.Stay)
            .ThenInclude(s => s.Patient)
            .Include(t => t.TherapyIterations)
            .ThenInclude(ti => ti.Therapy)
            .ThenInclude(t => t.Stay)
            .ThenInclude(s => s.Room)
            .Where(p => p.RobotId == key)
            .Where(p => p.StartTime > day.Date && p.StartTime < day.Date.AddDays(1));
        return Ok(await result.ToListAsync());
    }
}