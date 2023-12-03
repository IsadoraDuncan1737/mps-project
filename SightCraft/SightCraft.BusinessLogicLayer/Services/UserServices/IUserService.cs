using SightCraft.Domain.Entities.BusinessLogicLayer;

namespace SightCraft.BusinessLogicLayer.Services.UserServices
{
    public interface IUserService
    {
        Task<UserDto?> GetByIdAsync(Guid id);
        Task<List<UserDto>> GetAllAsync();
        Task<bool> DeleteAsync(Guid id);
    }
}
