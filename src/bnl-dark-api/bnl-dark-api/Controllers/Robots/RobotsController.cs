using bnl_dark_api.DataBase;
using bnl_dark_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bnl_dark_api.Controllers;

[ApiController]
[Route("odata/[controller]")]
public class RobotsController : DefaultCrudController<Robot>
{
    private ApplicationDbContext _ctx;
    public RobotsController(ILogger<RobotsController> logger, ApplicationDbContext context)
        : base(logger, context, context.Robots)
    {
        _ctx = context;
    }

    [HttpPost("/arduino/robot/{robotId}")]
    public async Task<ActionResult<RobotMessage>> Get([FromRoute] int robotId)
    {
        try
        {
            RobotMessage message = new RobotMessage
            {
                MedicinePickUp = new Dictionary<int, int>(),
                MedicineToPatientRoom = new Dictionary<int, int>()
            };
            
            // get next time table entries from datetime.now() for the current robot
            var timeTableEntry = await _ctx.TimeTableEntries!
                .Where(tte => tte.StartTime > DateTimeOffset.Now && tte.RobotId == robotId)
                .OrderBy(tte => tte.StartTime)
                .FirstOrDefaultAsync();
            
            if (timeTableEntry == null)
                throw new NullReferenceException();
            
            message.OffsetToStartTimeMs = (timeTableEntry.StartTime - DateTimeOffset.Now).Milliseconds;
            // get therapy iterations from time table entries
            var expandedIterations = await GetExpandedIterations(timeTableEntry);

            // set medicine pickup as dictionary
            var sortedIterations = expandedIterations.OrderBy(i => i.Therapy.Medicine.Dispenser);
            var dispensers = sortedIterations.Select(i => i.Therapy.Medicine.Dispenser).ToList();
            foreach (var dispenser in dispensers)
            {
                if (message.MedicinePickUp.ContainsKey(dispenser))
                    message.MedicinePickUp[dispenser] += 1;
                else
                    message.MedicinePickUp.Add(dispenser, 1);
            }
            
            // set medicine to patient as dictionary
            foreach (var si in sortedIterations)
            {
                message.MedicineToPatientRoom.Add(si.Therapy.Medicine.Dispenser, si.Stay.Room.Number);
            }
            
            return message;
        }
        catch (Exception e)
        {
            return NotFound($"Oopsie happened: {e.Message}");
        }
    }

    [HttpPost("/arduino/robot/{timetableId}/{roomId}/{status}")]
    public async Task<ActionResult> PostStatus([FromRoute]int timetableId, [FromRoute]int roomId, [FromRoute]int status)
    {
        try
        {
            var message = new RobotHealthMessage
            {
                TimeTableId = timetableId,
                Received = DateTimeOffset.Now,
                RobotHealthMessageStatus = (RobotHealthMessageStatus)status 
            };

            _ctx.RobotHealthMessage!.Add(message);

            if (message.RobotHealthMessageStatus == RobotHealthMessageStatus.DeliveryMedicineSuccess)
            {
                var timeTableEntry =  _ctx.TimeTableEntries?.FirstOrDefaultAsync(tte => tte.Id == timetableId);
                if (timeTableEntry == null)
                    return NotFound();
            
                var iterations = await _ctx.TherapyIterations?
                    .Where(iteration => iteration.TimeTableEntryId == timeTableEntry.Id)
                    .ToListAsync()!;

                foreach (var iteration in iterations)
                {
                    iteration.TimeDone = DateTimeOffset.Now;
                    // get therapy from iteration
                    var therapy = await _ctx.Therapies!
                        .Where(therapy => therapy.Id == iteration.TherapyId)
                        .FirstOrDefaultAsync();
                    therapy!.TimesDone += 1;
                }
            }
            await _ctx.SaveChangesAsync();
        }
        catch (Exception e)
        {
            return NotFound($"Oopsie happened: {e.Message}");
        }

        return Ok();

        // switch (message.RobotHealthMessageStatus)
        // {
        //     case RobotHealthMessageStatus.Health:
        //         // write to db
        //         break;
        //     case RobotHealthMessageStatus.Error:
        //         // write to db
        //         // roboter bleibt stehen
        //         break;
        //     case RobotHealthMessageStatus.WaitForStart:
        //         // write to db
        //         // roboter ist bereit
        //         break;
        //     case RobotHealthMessageStatus.PickupSuccess:
        //         // write to db
        //         break;
        //     case RobotHealthMessageStatus.DeliveryEnterRoomStatus:
        //         // write to db
        //         break;
        //     case RobotHealthMessageStatus.DeliveryMedicineSuccess:
        //         // write to db
        //         // increase count of therpayIterationSuccesses + 1
        //         break;
        //     case RobotHealthMessageStatus.DeliveryError:
        //         // write to db
        //         // tbd was roboter macht
        //         break;
        // }
    }
    
    private async Task<List<ITherapyIteration>> GetExpandedIterations(TimeTableEntry timeTableEntry)
    {
        var iterations = await _ctx.TherapyIterations!
            .Where(iteration => iteration.TimeTableEntryId == timeTableEntry.Id)
            .ToListAsync();
        // get therapy from iteratioions,
        var expandedIterations = new List<ITherapyIteration>();
        foreach (var iteration in iterations)
        {
            // get therapy from iteration
            var therapy = await _ctx.Therapies!
                .Where(therapy => therapy.Id == iteration.TherapyId)
                .FirstOrDefaultAsync();
            if (therapy == null)
                throw new NullReferenceException();
            // get medicine from therapy
            var medicine = await _ctx.Medicines!
                .Where(medicine => medicine.Id == therapy.MedicineId)
                .FirstOrDefaultAsync();
            if (medicine == null)
                throw new NullReferenceException();
            // get stay from iterations
            var stay = await _ctx.Stays!
                .Where(stay => stay.Id == iteration.StayId)
                .FirstOrDefaultAsync();
            if (stay == null)
                throw new NullReferenceException();

            therapy.Medicine = medicine;
            iteration.Therapy = therapy;
            iteration.Stay = stay;
            expandedIterations.Add(iteration);
        }

        return expandedIterations;
    } 
}