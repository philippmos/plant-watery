using System.Security.Claims;
using PlantWatery.Domain.Interfaces;

namespace PlantWatery.Api.Common;

public class UserContext(IHttpContextAccessor accessor) : IUserContext
{
    public ClaimsPrincipal User => accessor.HttpContext?.User ?? new ClaimsPrincipal();

    public string? GetClaim(string claimType)
        => User.FindFirst(claimType)?.Value;

    public string? GetSub()
        => GetClaim(ClaimTypes.NameIdentifier);

    public IEnumerable<Claim> GetClaims(string claimType)
        => User.FindAll(claimType);
}
