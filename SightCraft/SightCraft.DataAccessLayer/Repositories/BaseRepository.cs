using Microsoft.EntityFrameworkCore;
using SightCraft.DataAccessLayer.DataAccess;
using SightCraft.Domain.Entities.DataAccessLayer;
using System.Linq.Expressions;

namespace SightCraft.DataAccessLayer.Repositories
{
    internal abstract class BaseRepository<TEntity> : IBaseRepository<TEntity>
        where TEntity : BaseEntity
    {
        protected readonly SightCraftDbContext context;
        protected readonly DbSet<TEntity> DbSet;

        protected BaseRepository(SightCraftDbContext Context)
        {
            context = Context;
            DbSet = context.Set<TEntity>();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            var createdEntity = DbSet.Add(entity).Entity;

            await context.SaveChangesAsync();

            return createdEntity;
        }

        public async Task<bool> DeleteAsync(TEntity entity)
        {
            if (context.Entry(entity).State == EntityState.Modified)
            {
                DbSet.Attach(entity);
            }

            DbSet.Remove(entity);

            return await context.SaveChangesAsync() > 0;
        }

        public Task<List<TEntity>> GetAllAsync(
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null)
        {
            IQueryable<TEntity> query = DbSet;

            if (filter is not null)
            {
                query = query.Where(filter);
            }

            if (orderBy is not null)
            {
                query = orderBy(query);
            }

            return query.AsNoTracking()
                .ToListAsync();
        }

        public async Task<TEntity?> GetByIdAsync(Guid id)
        {
            return await DbSet.AsNoTracking().FirstOrDefaultAsync(_ => _.Id == id);
        }

        public async Task UpdateAsync(TEntity entity)
        {
            DbSet.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;

            await context.SaveChangesAsync();
        }
    }
}
