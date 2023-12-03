using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SightCraft.BusinessLogicLayer.Services.SightServices;
using SightCraft.Domain.Entities.BusinessLogicLayer;
using SightCraft.Domain.Entities.DataAccessLayer;
using SightCraft.Domain.Entities.WebAPI.SightRequests;

namespace SightCraft.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SightController : ControllerBase
    {
        private readonly ISightService _sightService;

        public SightController(ISightService sightService)
        {
            _sightService = sightService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<SightDto>>> GetAllAsync()
        {
            var sights = await _sightService.GetAllAsync();

            if (sights is null)
            {
                return NoContent();
            }

            return Ok(sights);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<SightDto>> GetSightByIdAsync([FromRoute] Guid id)
        {
            var sight = await _sightService.GetSightByIdAsync(id);

            if (sight is null)
            {
                return NoContent();
            }

            return Ok(sight);
        }

        [AllowAnonymous]
        [HttpGet("by-title/{title}")]
        public async Task<ActionResult<SightDto?>> GetSightByTitleAsync([FromRoute] string title)
        {
            var sight = await _sightService.GetSightByTitleAsync(title);

            if (sight is null)
            {
                return NoContent();
            }

            return Ok(sight);
        }

        [AllowAnonymous]
        [HttpGet("by-founding-date/{foundingDate}")]
        public async Task<ActionResult<SightDto?>> GetSightByFoundingDateAsync([FromRoute] DateOnly foundingDate)
        {
            var sight = await _sightService.GetSightByFoundingDateAsync(foundingDate);

            if (sight is null)
            {
                return NoContent();
            }

            return Ok(sight);
        }

        [AllowAnonymous]
        [HttpGet("by-user-id/{userId}")]
        public async Task<ActionResult<List<SightDto>>> GetSightsByUserIdAsync([FromRoute]Guid userId)
        {
            var sights = await _sightService.GetSightsByUserIdAsync(userId);

            if (sights is null)
            {
                return NoContent();
            }

            return Ok(sights);
        }

        [AllowAnonymous]
        [HttpGet("by-location/{location}")]
        public async Task<ActionResult<List<SightDto>>> GetSightsByLocationAsync([FromRoute]string location)
        {
            var sights = await _sightService.GetSightsByLocationAsync(location);

            if (sights is null)
            {
                return NoContent();
            }

            return Ok(sights);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddSightAsync([FromBody] CreateSightRequest request)
        {
            var createdSight = await _sightService.CreateAsync(request);

            return Ok(createdSight);
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateSightAsync([FromBody] UpdateSightRequest request)
        {
            var isUpdate = await _sightService.UpdateAsync(request);

            if (isUpdate is false)
            {
                return BadRequest();
            }

            return Ok(isUpdate);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSightAsync([FromRoute] Guid id)
        {
            var isDelete = await _sightService.DeleteAsync(id);

            if (isDelete is false)
            {
                return BadRequest();
            }

            return Ok(isDelete);
        }
    }
}
