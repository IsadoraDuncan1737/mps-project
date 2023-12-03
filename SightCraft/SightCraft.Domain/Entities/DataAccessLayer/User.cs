using System.ComponentModel.DataAnnotations.Schema;

namespace SightCraft.Domain.Entities.DataAccessLayer
{
    [Table(nameof(User))]
    public class User : BaseEntity
    {
        public User() 
        {
            AddedSights = new HashSet<Sight>();
        }

        public string Login { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public DateTime? RegistrationDate { get; set; }

        public virtual ICollection<Sight> AddedSights { get; set; }
    }
}
