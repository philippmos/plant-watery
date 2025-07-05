using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlantWatery.Api.Common;

[Authorize]
[ApiController]
public class ApiControllerBase : ControllerBase
{ }
