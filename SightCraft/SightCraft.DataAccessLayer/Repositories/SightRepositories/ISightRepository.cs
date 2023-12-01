using SightCraft.DataAccessLayer.Entities;

namespace SightCraft.DataAccessLayer.Repositories.SightRepositories
{
    public interface ISightRepository : IBaseRepository<Sight>
    {
        Task<Sight?> GetSightByTitleAsync(string title);
        Task<Sight?> GetSightByFoundingDateAsync(DateOnly foundingDate);
        Task<List<Sight>> GetSightsByUserIdAsync(Guid userId);
    }
}
