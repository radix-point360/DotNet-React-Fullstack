using server.Entities;
using server.IServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace server.Services
{
    public class TokenService(IConfiguration configuration) : ITokenService
    {
        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var jwtSettings = configuration.GetSection("Jwt");
            var secretKey = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]);
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiresTime = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["AccessTokenExpirationMinutes"]!));

            // var filteredClaims = claims.Where(c =>
            //     c.Type != JwtRegisteredClaimNames.Exp &&
            //     c.Type != JwtRegisteredClaimNames.Iat &&
            //     c.Type != JwtRegisteredClaimNames.Nbf);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiresTime,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public RefreshToken GenerateRefreshToken(string username)
        {
            //var randomNumber = new byte[32];

            //var rng = RandomNumberGenerator.Create();
            //rng.GetBytes(randomNumber);

            var randomNumber = RandomNumberGenerator.GetBytes(32);
            var refreshDays = int.TryParse(configuration["Jwt:RefreshTokenExpirationDays"], out var days)? days : 7;

            RefreshToken refreshToken = new RefreshToken
            {
                Username = username,
                Token = Convert.ToBase64String(randomNumber),
                ExpiresAt = DateTime.UtcNow.AddDays(refreshDays), // Set expiration time for refresh token (e.g., 14 days)       
                IsRevoked = false,
                CreatedAt = DateTime.UtcNow
            };

            return refreshToken;
        }
        
        public ClaimsPrincipal? GetClaimsPrincipalFromExpiredToken(string token)
        {
            var jwtSettings = configuration.GetSection("Jwt");
            var secretKey = Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]);
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false, // Allow expired tokens
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = new SymmetricSecurityKey(secretKey)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
                if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}