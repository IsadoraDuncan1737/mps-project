using Mapster;
using SightCraft.Domain.Entities.BusinessLogicLayer;
using SightCraft.Domain.Entities.DataAccessLayer;
using SightCraft.Domain.Entities.WebAPI.IdentityRequests;

namespace SightCraft.BusinessLogicLayer.Mappings
{
    internal class UserMappingConfiguration : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<User, UserDto>();

            config.NewConfig<RegisterRequest, User>()
                .Ignore(_ => _.Id)
                .Ignore(_ => _.PasswordHash);

            config.NewConfig<UpdateUserRequest, User>()
                .Ignore(_ => _.Login)
                .Ignore(_ => _.PasswordHash);
        }
    }
}
