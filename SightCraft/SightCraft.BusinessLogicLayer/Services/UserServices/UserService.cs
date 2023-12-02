using Mapster;
using SightCraft.BusinessLogicLayer.Entities;
using SightCraft.DataAccessLayer.Repositories.UserRepositories;
using SightCraft.WebAPI.Entities.UserRequests;

namespace SightCraft.BusinessLogicLayer.Services.UserServices
{
    internal class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDto?> GetByIdAsync(Guid id)
        {
            var userEntity = await _userRepository.GetByIdAsync(id);

            var mappedUser = userEntity?.Adapt<UserDto>();

            return mappedUser;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var userEntities = await _userRepository.GetAllAsync();

            var mappedUsers = userEntities.Adapt<List<UserDto>>();

            return mappedUsers;
        }

        public async Task<bool> UpdateAsync(UpdateUserRequest request)
        {
            var userEntity = await _userRepository.GetByIdAsync(request.Id);

            if (userEntity is null)
            {
                return false;
            }

            request.Adapt(userEntity);

            await _userRepository.UpdateAsync(userEntity);

            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var userEntity = await _userRepository.GetByIdAsync(id);

            if (userEntity is null)
            {
                return false;
            }

            await _userRepository.DeleteAsync(userEntity);

            return true;
        }
    }
}
