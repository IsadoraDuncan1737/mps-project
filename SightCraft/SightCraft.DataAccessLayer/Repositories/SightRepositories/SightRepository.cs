using Microsoft.EntityFrameworkCore;
using SightCraft.DataAccessLayer.DataAccess;
using SightCraft.Domain.Entities.DataAccessLayer;

namespace SightCraft.DataAccessLayer.Repositories.SightRepositories
{
    internal class SightRepository : BaseRepository<Sight>, ISightRepository
    {
        public SightRepository(SightCraftDbContext sightCraftDbContext) : base(sightCraftDbContext) 
        {
        }

        public Task<List<Sight>> GetSightsByTitleAsync(string title)
        {
            return DbSet.AsNoTracking().Where(_ => _.Title.ToLower().Contains(title.ToLower())).ToListAsync();
        }

        public Task<List<Sight>> GetSightsByFoundingDateAsync(DateTime foundingDate)
        {
            return DbSet.AsNoTracking().Where(_ => _.FoundingDate == foundingDate).ToListAsync();
        }

        public Task<List<Sight>> GetSightsByUserIdAsync(Guid userId)
        {
            return DbSet.AsNoTracking().Where(_ => _.UserId == userId).ToListAsync();
        }

        public Task<List<Sight>> GetSightsByLocationAsync(string location)
        {
            return DbSet.AsNoTracking().Where(_ => _.Location.ToLower().Contains(location.ToLower())).ToListAsync();
        }
    }
}
