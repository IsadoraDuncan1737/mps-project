using System.ComponentModel.DataAnnotations.Schema;

namespace SightCraft.DataAccessLayer.Entities
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
        public string AboutSelf { get; set; } = null!;
        public DateTime? RegistrationDate { get; set; }

        public HashSet<Sight> AddedSights { get; set; }
    }
}
