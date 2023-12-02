using Mapster;
using SightCraft.BusinessLogicLayer.Entities;
using SightCraft.DataAccessLayer.Entities;
using SightCraft.WebAPI.Entities.IdentityRequests;
using SightCraft.WebAPI.Entities.UserRequests;

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
