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

    [HttpPost("/arduino/robot/{robotId}")]
    public ActionResult<RobotMessage> Get([FromRoute] int robotId)
    {
        RobotMessage message = new RobotMessage();
        // get next time table entries from datetime now() for the current robot
        
        // get therapy iterations from time table entries
        
        // get therapy from iteratioions

        // get stay from iterations
        // set medicine to patient as dictionary
        // set medicine pickup as dictionary
        
        return message;
    }
    
    [HttpPost("/arduino/robot/{therapyId}/{status}")]
    public void PostStatus([FromRoute]int therapyId, [FromRoute]int status)
    {
        RobotHealthMessage message = new RobotHealthMessage();
        message.TherapyIterationId = therapyId;
        message.Received = DateTimeOffset.Now;
        message.RobotHealthMessageStatus = (RobotHealthMessageStatus)status;

        switch (message.RobotHealthMessageStatus)
        {
            case RobotHealthMessageStatus.Health:
                // write to db
                break;
            case RobotHealthMessageStatus.Error:
                // write to db
                // roboter bleibt stehen
                break;
            case RobotHealthMessageStatus.WaitForStart:
                // write to db
                // roboter ist bereit
                break;
            case RobotHealthMessageStatus.PickupSuccess:
                // write to db
                break;
            case RobotHealthMessageStatus.DeliveryEnterRoomStatus:
                // write to db
                break;
            case RobotHealthMessageStatus.DeliveryMedicineSuccess:
                // write to db
                // increase count of therpayIterationSuccesses + 1
                break;
            case RobotHealthMessageStatus.DeliveryError:
                // write to db
                // tbd was roboter macht
                break;
        }
    }
}