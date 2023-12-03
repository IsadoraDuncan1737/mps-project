using SightCraft.Domain.Entities.BusinessLogicLayer;
using SightCraft.Domain.Entities.WebAPI.SightRequests;

namespace SightCraft.BusinessLogicLayer.Services.SightServices
{
    public interface ISightService
    {
        Task<List<SightDto>> GetAllAsync();
        Task<SightDto?> GetSightByIdAsync(Guid id);
        Task<SightDto?> GetSightByTitleAsync(string title);
        Task<SightDto?> GetSightByFoundingDateAsync(DateOnly foundingDate);
        Task<List<SightDto>> GetSightsByUserIdAsync(Guid userId);
        Task<List<SightDto>> GetSightsByLocationAsync(string location);
        Task<SightDto?> CreateAsync(CreateSightRequest createSightRequest);
        Task<bool> UpdateAsync(UpdateSightRequest updateSightRequest);
        Task<bool> DeleteAsync(Guid id);
    }
}
