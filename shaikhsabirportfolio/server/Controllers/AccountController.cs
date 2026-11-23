using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Services;
using System.Security.Claims;
using server.DTO;
using Microsoft.EntityFrameworkCore;
using server.IServices;



namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController(PortfolioDbContext _context, ITokenService _tokenService) : ControllerBase
{
    [AllowAnonymous]
    [HttpGet("login")]
    public IActionResult Login()
    {
        return Ok(new LoginModel { Username = "admin", Password = "password123" });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Username);

        if (user == null || user.Password != model.Password || user.Email != model.Username)
            return Unauthorized("Invalid credentials.");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var accessToken = _tokenService.GenerateAccessToken(claims);
        var refreshToken = _tokenService.GenerateRefreshToken(model.Username);

        // Save refresh token to database
        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return Ok(new TokenResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        });
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestDto model)
    {
        // 1. Extract principal from the expired access token
        var principal = _tokenService.GetClaimsPrincipalFromExpiredToken(model.AccessToken);
        if (principal == null)
            return BadRequest("Invalid access token.");

        var username = principal.Identity?.Name;
        if (string.IsNullOrEmpty(username))
            return BadRequest("Invalid token claims.");

        // 2. Retrieve existing refresh token from database
        var storedRefreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == model.RefreshToken && rt.Username == username);

        if (storedRefreshToken == null || storedRefreshToken.IsExpired || storedRefreshToken.IsRevoked)
            return Unauthorized("Invalid or expired refresh token.");

        // 3. Generate a new token pair (Token Rotation)
        var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
        var newRefreshToken = _tokenService.GenerateRefreshToken(username);

        // 4. Revoke old refresh token and store the new one
        storedRefreshToken.IsRevoked = true;
        _context.RefreshTokens.Add(newRefreshToken);
        await _context.SaveChangesAsync();

        return Ok(new TokenResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken.Token
        });
    }

    [AllowAnonymous]
    [HttpPost("revoke")]
    public async Task<IActionResult> Revoke([FromBody] string refreshToken)
    {
        var token = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == refreshToken);
        if (token == null) return NotFound("Refresh token not found.");

        token.IsRevoked = true;
        await _context.SaveChangesAsync();

        return Ok("Token revoked successfully.");
    }
}

