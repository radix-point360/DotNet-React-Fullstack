using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FirstTestController : ControllerBase
    {
        [HttpGet(Name = "GetFirstTest")]
        [HttpGet("/")]
        [HttpGet("/api")]
        public IActionResult Get()
        {
            return Ok("API is running!");
        }
    }
}
