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
        return Ok("Accessed");
    }

    private const string RefreshCookieName = "refresh_token";

    private void SetRefreshTokenCookie(string? token, DateTime? expiresAtUtc)
    {
        Response.Cookies.Append(RefreshCookieName, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true, // Required when SameSite=None (works on HTTPS & localhost)
            SameSite = SameSiteMode.None, // Required for Vercel -> Azure cross-origin
            Expires = expiresAtUtc,
            Path = "/api/account" // Only sent to /api/account/* endpoints
        });
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
        var refreshToken = _tokenService.GenerateRefreshToken(user.Email);

        // Save refresh token to database
        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        SetRefreshTokenCookie(refreshToken.Token, refreshToken.ExpiresAt);

        return Ok(new { accessToken });
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        if (!Request.Cookies.TryGetValue(RefreshCookieName, out var cookieToken) ||
            string.IsNullOrWhiteSpace(cookieToken))
        {
            return Unauthorized("Missing refresh token cookie.");
        }

        // Look up the refresh token directly in DB (no expired access token needed on page reload)
        var storedRefreshToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.Token == cookieToken);

        if (storedRefreshToken == null || storedRefreshToken.IsExpired || storedRefreshToken.IsRevoked)
            return Unauthorized("Invalid or expired refresh token.");

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == storedRefreshToken.Username);

        if (user == null)
            return Unauthorized("User not found.");

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var newAccessToken = _tokenService.GenerateAccessToken(claims);
        var newRefreshToken = _tokenService.GenerateRefreshToken(user.Email);

        storedRefreshToken.IsRevoked = true;
        _context.RefreshTokens.Add(newRefreshToken);
        await _context.SaveChangesAsync();

        SetRefreshTokenCookie(newRefreshToken.Token, newRefreshToken.ExpiresAt);

        return Ok(new { accessToken = newAccessToken });
    }

    [AllowAnonymous]
    [HttpPost("revoke")]
    public async Task<IActionResult> Revoke()
    {
        if (Request.Cookies.TryGetValue(RefreshCookieName, out var cookieToken))
        {
            var token = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == cookieToken);

            if (token != null)
            {
                token.IsRevoked = true;
                await _context.SaveChangesAsync();
            }
        }

        Response.Cookies.Delete(RefreshCookieName, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Path = "/api/account"
        });

        return Ok("Logged out and token revoked.");
    }
}

