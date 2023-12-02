namespace SightCraft.BusinessLogicLayer.Settings
{
    public class AuthenticationSettings
    {
        public string Secret { get; set; } = null!;
        public TimeSpan TokenLifetime { get; set; }
    }
}
