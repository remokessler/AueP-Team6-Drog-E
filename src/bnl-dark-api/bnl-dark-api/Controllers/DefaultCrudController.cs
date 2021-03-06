using System.Linq;
using bnl_dark_api.DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace bnl_dark_api.Controllers;

public class DefaultCrudController<T>: ODataController where T : class, IId
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T>? _dbSet;
    protected readonly ILogger _logger;

    public DefaultCrudController(ILogger logger, ApplicationDbContext context, DbSet<T>? dbSet)
    {
        _logger = logger;
        _context = context;
        _dbSet = dbSet;
    }
    
    [EnableQuery]
    [HttpGet]
    public virtual async Task<ActionResult<IEnumerable<T>>> Get()
    {
        _logger.LogTrace($"{nameof(T)}.GET: all");
        return Ok(await _dbSet.ToListAsync());
    }
    
    [EnableQuery]
    [HttpGet("{key}")]
    public virtual async Task<ActionResult<T>> Get([FromODataUri] int key)
    {
        _logger.LogTrace($"{nameof(T)}.GET: with id: {key}");
        var result = _dbSet.Where(p => p.Id == key);
        return Ok(await result.FirstOrDefaultAsync());
    }
    
    [EnableQuery]
    [HttpPost]
    public virtual async Task<ActionResult<T>> Post(T newObject)
    {
        _logger.LogTrace($"{nameof(T)}.POST: with object: {JsonConvert.SerializeObject(newObject)}");
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _dbSet.Add(newObject);
        await _context.SaveChangesAsync();
        return Ok(newObject);
    }
    
    [EnableQuery]
    [HttpPatch("{key}")]
    public virtual async Task<ActionResult<T>> Patch([FromODataUri] int key, Delta<T> delta)
    {
        _logger.LogTrace($"{nameof(T)}.PATCH: with delta: {JsonConvert.SerializeObject(delta)}");
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var robot = await _dbSet.FindAsync(key);
        if (robot == null)
        {
            return NotFound();
        }
        delta.Patch(robot);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict(delta);
        }
        return Updated(robot);
    }
    
    [EnableQuery]
    [HttpPut("{key}")]
    public virtual async Task<ActionResult<T>> Put([FromODataUri] int key, T updatedObject)
    {
        _logger.LogTrace($"{nameof(T)}.PUT: with key: {key} with object: {JsonConvert.SerializeObject(updatedObject)}");
        if (!ModelState.IsValid)
        {
            _logger.LogError($"{nameof(T)}.PUT: exited with key: {key} with invalid object: {JsonConvert.SerializeObject(updatedObject)}");
            return BadRequest(ModelState);
        }
        if (key != updatedObject.Id)
        {
            _logger.LogError($"{nameof(T)}.PUT: exited with not matching key: {key} with object: {JsonConvert.SerializeObject(updatedObject)}");
            return BadRequest();
        }
        _context.Entry(updatedObject).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            _logger.LogError($"{nameof(T)}.PUT: exited because Concurrency Issues with key: {key} with object: {JsonConvert.SerializeObject(updatedObject)}");
            return Conflict(updatedObject);
        }
        return Updated(updatedObject);
    }
    
    [EnableQuery]
    [HttpDelete("{key}")]
    public virtual async Task<ActionResult> Delete([FromODataUri] int key)
    {
        _logger.LogTrace($"{nameof(T)}.DELETE: with key: {key}");
        
        try
        {
            var todelete = await _dbSet.FindAsync(key);
            _dbSet.Remove(todelete);
            await _context.SaveChangesAsync();
        }
        catch 
        {
            _logger.LogError($"{nameof(T)}.PUT: exited because Concurrency Issues with key: {key}");
            return NotFound(key);
        }
        return Ok();
    }
}
