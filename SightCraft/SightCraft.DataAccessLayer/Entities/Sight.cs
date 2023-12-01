using System.ComponentModel.DataAnnotations.Schema;

namespace SightCraft.DataAccessLayer.Entities
{
    [Table(nameof(Sight))]
    public class Sight : BaseEntity
    {
        public string Title { get; set; } = null!;
        public string Summary { get; set; } = null!;
        public DateOnly? FoundingDate { get; set; }
        public string Type { get; set; } = null!;
        public string History { get; set; } = null!;
        public Guid UserId { get; set; }

        public virtual User? User { get; set; }
    }
}