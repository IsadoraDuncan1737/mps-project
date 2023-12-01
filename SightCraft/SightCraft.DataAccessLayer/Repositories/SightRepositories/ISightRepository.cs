using SightCraft.DataAccessLayer.Entities;

namespace SightCraft.DataAccessLayer.Repositories.SightRepositories
{
    public interface ISightRepository : IBaseRepository<Sight>
    {
        Task<Sight?> GetSightByTitle(string title);
        Task<Sight?> GetSightByFoundingDate(DateOnly foundingDate);
        Task<List<Sight>> GetSightsByUserId(Guid userId);
    }
}
