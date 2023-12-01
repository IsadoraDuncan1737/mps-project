using SightCraft.DataAccessLayer.Entities;
using System.Linq.Expressions;

namespace SightCraft.DataAccessLayer.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        Task<List<TEntity>> GetAllAsync(
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null);

        Task<TEntity?> GetByIdAsync(Guid id);

        Task<TEntity> AddAsync(TEntity entity);

        Task UpdateAsync(TEntity entity);

        Task<bool> DeleteAsync(TEntity entity);
    }
}
