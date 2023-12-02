using SightCraft.BusinessLogicLayer.Entities;
using SightCraft.WebAPI.Entities.UserRequests;

namespace SightCraft.BusinessLogicLayer.Services.UserServices
{
    public interface IUserService
    {
        Task<UserDto?> GetByIdAsync(Guid id);
        Task<List<UserDto>> GetAllAsync();
        Task<bool> UpdateAsync(UpdateUserRequest request);
        Task<bool> DeleteAsync(Guid id);
    }
}
