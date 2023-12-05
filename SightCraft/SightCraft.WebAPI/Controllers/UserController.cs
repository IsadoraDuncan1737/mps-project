using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SightCraft.BusinessLogicLayer.Services.UserServices;
using SightCraft.Domain.Entities.DataAccessLayer;
using System.Security.Claims;

namespace SightCraft.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsersAsync()
        {
            var users = await _userService.GetAllAsync();

            return Ok(users);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserByIdAsync([FromRoute] Guid id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user is null)
            {
                return NoContent();
            }

            return Ok(user);
        }

        [Authorize]
        [HttpGet("current-user")]
        public ActionResult GetCurrentUserId()
        {
            var currentUserId = HttpContext.User.FindFirstValue("Id");

            if (currentUserId is null)
            {
                return NoContent();
            }

            return Ok(currentUserId);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserAsync([FromRoute] Guid id)
        {
            var isDelete = await _userService.DeleteAsync(id);

            if (isDelete is false)
            {
                return BadRequest();
            }

            return Ok(isDelete);
        }
    }
}
