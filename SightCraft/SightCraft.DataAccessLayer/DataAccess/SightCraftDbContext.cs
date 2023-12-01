﻿using Microsoft.EntityFrameworkCore;
using SightCraft.DataAccessLayer.Entities;

namespace SightCraft.DataAccessLayer.DataAccess
{
    internal class SightCraftDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Sight> Sights { get; set; } = null!;

        public SightCraftDbContext(DbContextOptions<SightCraftDbContext> options)
            : base(options)
        {
        }
    }
}
