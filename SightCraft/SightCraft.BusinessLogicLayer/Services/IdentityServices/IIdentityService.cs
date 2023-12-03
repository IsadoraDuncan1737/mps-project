using SightCraft.Domain.Entities.BusinessLogicLayer;
using SightCraft.Domain.Entities.WebAPI.IdentityRequests;

namespace SightCraft.BusinessLogicLayer.Services.IdentityServices
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> LoginAsync(LoginRequest request);
        Task<AuthenticationResult> RegisterAsync(RegisterRequest request);
    }
}
