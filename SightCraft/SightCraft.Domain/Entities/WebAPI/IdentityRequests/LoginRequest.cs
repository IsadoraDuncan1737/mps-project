﻿namespace SightCraft.Domain.Entities.WebAPI.IdentityRequests
{
    public class LoginRequest
    {
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
