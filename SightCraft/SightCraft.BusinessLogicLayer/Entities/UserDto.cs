namespace SightCraft.BusinessLogicLayer.Entities
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Login { get; set; } = null!;
        public string AboutSelf { get; set; } = null!;
        public DateTime? RegistrationDate { get; set; }
    }
}
