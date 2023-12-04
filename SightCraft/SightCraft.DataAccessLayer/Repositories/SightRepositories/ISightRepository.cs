using SightCraft.Domain.Entities.DataAccessLayer;

namespace SightCraft.DataAccessLayer.Repositories.SightRepositories
{
    public interface ISightRepository : IBaseRepository<Sight>
    {
        Task<List<Sight>> GetSightsByTitleAsync(string title);
        Task<List<Sight>> GetSightsByFoundingDateAsync(DateTime foundingDate);
        Task<List<Sight>> GetSightsByUserIdAsync(Guid userId);
        Task<List<Sight>> GetSightsByLocationAsync(string location);
    }
}
