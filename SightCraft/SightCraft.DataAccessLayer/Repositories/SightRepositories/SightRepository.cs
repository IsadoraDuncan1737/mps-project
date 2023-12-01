﻿using Microsoft.EntityFrameworkCore;
using SightCraft.DataAccessLayer.DataAccess;
using SightCraft.DataAccessLayer.Entities;

namespace SightCraft.DataAccessLayer.Repositories.SightRepositories
{
    internal class SightRepository : BaseRepository<Sight>, ISightRepository
    {
        public SightRepository(SightCraftDbContext sightCraftDbContext) : base(sightCraftDbContext) 
        {
        }

        public Task<Sight?> GetSightByTitleAsync(string title)
        {
            return DbSet.AsNoTracking().FirstOrDefaultAsync(_ => _.Title == title);
        }

        public Task<Sight?> GetSightByFoundingDateAsync(DateOnly foundingDate)
        {
            return DbSet.AsNoTracking().FirstOrDefaultAsync(_ => _.FoundingDate == foundingDate);
        }

        public Task<List<Sight>> GetSightsByUserIdAsync(Guid userId)
        {
            return DbSet.AsNoTracking().Where(_ => _.UserId == userId).ToListAsync();
        }
    }
}
