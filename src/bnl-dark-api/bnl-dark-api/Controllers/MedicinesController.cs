using bnl_dark_api.Data;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bnl_dark_api.Controllers;

[Authorize]
[ApiController]
[Route("data/[controller]")]
public class MedicinesController : DefaultCrudController<Robot>
{
    public MedicinesController(ILogger<RobotsController> logger, ApplicationDbContext context)
        : base(logger, context, context.Robots) { }
}