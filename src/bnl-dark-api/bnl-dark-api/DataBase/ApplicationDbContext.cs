using bnl_dark_api.Models;
using Microsoft.EntityFrameworkCore;

namespace bnl_dark_api.DataBase;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {
    }
    
    // Robot
    public DbSet<Robot>? Robots { get; set; }
    public DbSet<RobotHealthMessage>? RobotHealthMessage { get; set; }
    //Master Data
    public DbSet<Medicine>? Medicines { get; set; }
    public DbSet<Room>? Rooms { get; set; }
    // Patients
    public DbSet<Patient>? Patients { get; set; }
    public DbSet<Stay>? Stays { get; set; }
    public DbSet<Therapy>? Therapies { get; set; }
    public DbSet<TherapyIteration>? TherapyIterations { get; set; }
    public DbSet<AnamnesisRecord>? AnamnesisRecords { get; set; }
    // Users
    public DbSet<User>? Users { get; set; }
    // Timetable
    public DbSet<TimeTableEntry>? TimeTableEntries { get; set; }
    
}