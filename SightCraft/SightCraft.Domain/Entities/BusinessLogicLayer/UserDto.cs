namespace SightCraft.Domain.Entities.BusinessLogicLayer
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Login { get; set; } = null!;
        public DateTime? RegistrationDate { get; set; }
    }
}
