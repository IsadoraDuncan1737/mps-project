using Mapster;
using SightCraft.DataAccessLayer.Repositories.SightRepositories;
using SightCraft.Domain.Entities.BusinessLogicLayer;
using SightCraft.Domain.Entities.DataAccessLayer;
using SightCraft.Domain.Entities.WebAPI.SightRequests;
using SightCraft.Domain.Exceptions;
using SightCraft.Domain.Resources;

namespace SightCraft.BusinessLogicLayer.Services.SightServices
{
    internal class SightService : ISightService
    {
        private readonly ISightRepository _sightRepository;

        public SightService(ISightRepository sightRepository)
        {
            _sightRepository = sightRepository;
        }

        public async Task<List<SightDto>> GetAllAsync()
        {
            var sightEntities = await _sightRepository.GetAllAsync();

            var mappedSights = sightEntities.Adapt<List<SightDto>>();

            return mappedSights;
        }

        public async Task<SightDto?> GetSightByIdAsync(Guid id)
        {
            var sightEntity = await _sightRepository.GetByIdAsync(id);

            var mappedSight = sightEntity?.Adapt<SightDto>();

            return mappedSight;
        }
        public async Task<SightDto?> GetSightByTitleAsync(string title)
        {
            var sightEntity = await _sightRepository.GetSightByTitleAsync(title);

            var mappedSight = sightEntity?.Adapt<SightDto>();

            return mappedSight;
        }

        public async Task<SightDto?> GetSightByFoundingDateAsync(DateOnly foundingDate)
        {
            var sightEntity = await _sightRepository.GetSightByFoundingDateAsync(foundingDate);

            var mappedSight = sightEntity?.Adapt<SightDto>();

            return mappedSight;
        }

        public async Task<List<SightDto>> GetSightsByUserIdAsync(Guid userId)
        {
            var sightEntities = await _sightRepository.GetSightsByUserIdAsync(userId);

            var mappedSights = sightEntities.Adapt<List<SightDto>>();

            return mappedSights;
        }

        public async Task<List<SightDto>> GetSightsByLocationAsync(string location)
        {
            var sightEntities = await _sightRepository.GetSightsByLocationAsync(location);

            var mappedSights = sightEntities.Adapt<List<SightDto>>();

            return mappedSights;
        }

        public async Task<SightDto?> CreateAsync(CreateSightRequest createSightRequest)
        {
            var existingSight = await _sightRepository.GetSightByTitleAsync(createSightRequest.Title);

            if (existingSight is not null)
            {
                throw new ValidationExceptionResult(CreateSightRequestExceptionMessages.SightWithThisTitleAlreadyExists);
            }

            var sightEntity = createSightRequest.Adapt<Sight>();

            var createdSightEntity = await _sightRepository.AddAsync(sightEntity);

            return createdSightEntity.Adapt<SightDto>();
        }

        public async Task<bool> UpdateAsync(UpdateSightRequest updateSightRequest)
        {
            var sightEntity = await _sightRepository.GetByIdAsync(updateSightRequest.Id);

            if (sightEntity is null)
            {
                return false;
            }

            updateSightRequest.Adapt(sightEntity);

            await _sightRepository.UpdateAsync(sightEntity);

            return true;
        }
        public async Task<bool> DeleteAsync(Guid id)
        {
            var sightEntity = await _sightRepository.GetByIdAsync(id);

            if (sightEntity is null)
            {
                return false;
            }

            await _sightRepository.DeleteAsync(sightEntity);

            return true;
        }
    }
}
