using SightCraft.BusinessLogicLayer.Entities;
using SightCraft.WebAPI.Entities.IdentityRequests;

namespace SightCraft.BusinessLogicLayer.Services.IdentityServices
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> LoginAsync(LoginRequest request);
        Task<AuthenticationResult> RegisterAsync(RegisterRequest request);
    }
}
