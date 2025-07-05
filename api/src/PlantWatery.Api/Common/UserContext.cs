using System.Security.Claims;
using PlantWatery.Domain.Interfaces;

namespace PlantWatery.Api.Common;

public class UserContext(
    IHttpContextAccessor accessor,
    ILogger<UserContext> logger) : IUserContext
{
    public ClaimsPrincipal User => accessor.HttpContext?.User ?? new ClaimsPrincipal();

    public string? GetClaim(string claimType)
    {
        var claimValue = User.FindFirst(claimType)?.Value;

        if (string.IsNullOrWhiteSpace(claimValue))
        {
            logger.LogWarning("Claim {ClaimType} not found or is empty", claimType);
            return null;
        }

        return claimValue;
    }

    public string GetSub()
        => GetClaim(ClaimTypes.NameIdentifier) ?? string.Empty;
}
