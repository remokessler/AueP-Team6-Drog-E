namespace bnl_dark_api.Models;

public class AnamnesisRecord : IAnamnesisRecord
{
    public int Id { get; set; }
    public Stay Stay { get; set; }
    public IEnumerable<Therapy>? Therapies { get; set; }
}

public interface IAnamnesisRecord: IId
{
    public Stay Stay { get; set; }
    public IEnumerable<Therapy>? Therapies { get; set; }
}