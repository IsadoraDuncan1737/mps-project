using SightCraft.DataAccessLayer.Entities;

namespace SightCraft.DataAccessLayer.Repositories.UserRepositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetUserByLoginAsync(string login);
    }
}
