using server.Entities;
using System.Security.Claims;

namespace server.IServices;

public interface ITokenService
{
    public string GenerateAccessToken(IEnumerable<Claim> claims);
    public RefreshToken GenerateRefreshToken(string username);
    ClaimsPrincipal? GetClaimsPrincipalFromExpiredToken(string token);
}