using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRUD_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        public PersonController()
        {
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "Hello from PersonController!" });
        }




    }
}
