using Mapster;
using SightCraft.Domain.Entities.BusinessLogicLayer;
using SightCraft.Domain.Entities.DataAccessLayer;
using SightCraft.Domain.Entities.WebAPI.SightRequests;

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
