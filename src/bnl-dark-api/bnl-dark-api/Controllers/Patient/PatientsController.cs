using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace bnl_dark_api.Controllers;


[ApiController]
[Route("data/[controller]")]
public class PatientsController : DefaultCrudController<Patient>
{
    public PatientsController(ILogger<PatientsController> logger, ApplicationDbContext context)
        : base(logger, context, context.Patients) { }
}