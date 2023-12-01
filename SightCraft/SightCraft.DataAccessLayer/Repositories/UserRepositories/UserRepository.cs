using Microsoft.EntityFrameworkCore;
using SightCraft.DataAccessLayer.DataAccess;
using SightCraft.DataAccessLayer.Entities;

namespace SightCraft.DataAccessLayer.Repositories.UserRepositories
{
    internal class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(SightCraftDbContext sightCraftDbContext) : base(sightCraftDbContext) 
        {
        }

        public Task<User?> GetUserByLoginAsync(string login)
        {
            return DbSet.AsNoTracking().FirstOrDefaultAsync(_ => _.Login == login);
        }
    }
}
