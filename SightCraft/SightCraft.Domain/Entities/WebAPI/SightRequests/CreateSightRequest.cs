namespace SightCraft.Domain.Entities.WebAPI.SightRequests
{
    public class CreateSightRequest
    { 
        public string Title { get; set; } = null!;
        public string Summary { get; set; } = null!;
        public DateTime? FoundingDate { get; set; }
        public string Type { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string History { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public Guid UserId { get; set; }
    }
}
