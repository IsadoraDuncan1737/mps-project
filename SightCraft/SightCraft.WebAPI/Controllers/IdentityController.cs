using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SightCraft.BusinessLogicLayer.Services.IdentityServices;
using SightCraft.Domain.Entities.BusinessLogicLayer;
using SightCraft.Domain.Entities.WebAPI.IdentityRequests;

namespace SightCraft.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [AllowAnonymous]
        [HttpPost("registration")]
        public async Task<ActionResult<AuthenticationResult>> RegisterAsync([FromBody] RegisterRequest request)
        {
            var response = await _identityService.RegisterAsync(request);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResult>> LoginAsync([FromBody] LoginRequest request)
        {
            var response = await _identityService.LoginAsync(request);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
