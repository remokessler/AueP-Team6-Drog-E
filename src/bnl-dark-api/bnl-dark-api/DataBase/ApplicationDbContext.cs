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
    
    // Audit
    public DbSet<Audit> AuditLogs { get; set; }
    public virtual async Task<int> SaveChangesAsync(string userId = null)
    {
        OnBeforeSaveChanges(userId);
        var result = await base.SaveChangesAsync();
        return result;
    }
    private void OnBeforeSaveChanges(string userId)
    {
        ChangeTracker.DetectChanges();
        var auditEntries = new List<AuditEntry>();
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is Audit || entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)
                continue;
            var auditEntry = new AuditEntry(entry);
            auditEntry.TableName = entry.Entity.GetType().Name;
            auditEntry.UserId = userId;
            auditEntries.Add(auditEntry);
            foreach (var property in entry.Properties)
            {
                string propertyName = property.Metadata.Name;
                if (property.Metadata.IsPrimaryKey())
                {
                    auditEntry.KeyValues[propertyName] = property.CurrentValue;
                    continue;
                }
                switch (entry.State)
                {
                    case EntityState.Added:
                        auditEntry.AuditType = AuditType.Create;
                        auditEntry.NewValues[propertyName] = property.CurrentValue;
                        break;
                    case EntityState.Deleted:
                        auditEntry.AuditType = AuditType.Delete;
                        auditEntry.OldValues[propertyName] = property.OriginalValue;
                        break;
                    case EntityState.Modified:
                        if (property.IsModified)
                        {
                            auditEntry.ChangedColumns.Add(propertyName);
                            auditEntry.AuditType = AuditType.Update;
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                        }
                        break;
                }
            }
        }
        foreach (var auditEntry in auditEntries)
        {
            AuditLogs.Add(auditEntry.ToAudit());
        }
    }
}