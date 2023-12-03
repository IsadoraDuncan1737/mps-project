namespace SightCraft.Domain.Entities.WebAPI.IdentityRequests
{
    public class RegisterRequest
    {
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime? RegistrationDate { get; set; }
    }
}
