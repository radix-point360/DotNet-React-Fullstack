using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.DTO;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactController(PortfolioDbContext _context) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactRequestDto dto)
    {
        var entry = new Entities.ContactMessage
        {
            Name = dto.Name.Trim(),
            Email = dto.Email.Trim(),
            Subject = dto.Subject.Trim(),
            Message = dto.Message.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.ContactMessages.Add(entry);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Thank you! Your message has been sent." });
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetMessages()
    {
        var messages = await _context.ContactMessages
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return Ok(messages);
    }

}

