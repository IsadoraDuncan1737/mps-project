using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SightCraft.Domain.Settings;

namespace SightCraft.WebAPI.Configurations
{
    public static class AuthenticationConfiguration
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var authenticationConfigSection = configuration.GetSection("Authentication");

            var authenticationSettings = new AuthenticationSettings();
            configuration.Bind(nameof(authenticationSettings), authenticationSettings);
            services.AddSingleton(authenticationSettings);

            services.Configure<AuthenticationSettings>(authenticationConfigSection);

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.Secret)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true
                    };
                });
            services.AddAuthorization();

            return services;
        }
    }
}
