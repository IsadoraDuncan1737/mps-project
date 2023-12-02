using Mapster;
using SightCraft.BusinessLogicLayer.Entities;
using SightCraft.DataAccessLayer.Entities;
using SightCraft.WebAPI.Entities.SightRequests;

namespace SightCraft.BusinessLogicLayer.Mappings
{
    internal class SightMappingConfiguration : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Sight, SightDto>();

            config.NewConfig<CreateSightRequest, Sight>()
                .Ignore(_ => _.Id);

            config.NewConfig<UpdateSightRequest, Sight>();
        }
    }
}
