using FluentMigrator.Runner;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SightCraft.DataAccessLayer.DataAccess;
using SightCraft.DataAccessLayer.Repositories.SightRepositories;
using SightCraft.DataAccessLayer.Repositories.UserRepositories;
using SightCraft.Migrations;

namespace SightCraft.DataAccessLayer
{
    public static class DependencyInjection
    {
        public static void AddDataAccessLayer(this IServiceCollection serviceCollection, string connectionString)
        {
            serviceCollection.AddDbContext<SightCraftDbContext>(options => options.UseSqlServer(connectionString));

            serviceCollection.AddFluentMigratorCore()
                .ConfigureRunner(runner => runner
                .AddSqlServer()
                .WithGlobalConnectionString(connectionString)
                .ScanIn(typeof(InitializeTables).Assembly).For.Migrations());

            serviceCollection.AddScoped<ISightRepository, SightRepository>();
            serviceCollection.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
