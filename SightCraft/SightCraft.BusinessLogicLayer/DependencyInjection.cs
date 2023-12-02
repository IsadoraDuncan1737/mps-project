using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using SightCraft.BusinessLogicLayer.Services.IdentityServices;
using SightCraft.BusinessLogicLayer.Services.SightServices;
using SightCraft.BusinessLogicLayer.Services.UserServices;
using System.Reflection;

namespace SightCraft.BusinessLogicLayer
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBusinessLogicLayer(this IServiceCollection services)
        {
            RegisterMapster(services);

            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISightService, SightService>();

            return services;
        }

        private static void RegisterMapster(IServiceCollection services)
        {
            var typeAdapterConfig = TypeAdapterConfig.GlobalSettings;
            var applicationAssembly = Assembly.GetExecutingAssembly();
            typeAdapterConfig.Scan(applicationAssembly);

            services.AddSingleton(typeAdapterConfig);
            services.AddScoped<IMapper, ServiceMapper>();
        }
    }
}
