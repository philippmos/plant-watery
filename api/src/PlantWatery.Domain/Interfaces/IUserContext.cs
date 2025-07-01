using System.Security.Claims;

namespace PlantWatery.Domain.Interfaces;

public interface IUserContext
{
    ClaimsPrincipal User { get; }
    string? GetClaim(string claimType);
    string? GetSub();
    IEnumerable<Claim> GetClaims(string claimType);
}
