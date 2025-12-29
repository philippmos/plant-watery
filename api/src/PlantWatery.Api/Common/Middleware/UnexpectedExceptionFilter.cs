using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace PlantWatery.Api.Common.Middleware;

public class UnexpectedExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var details = CreateProblemDetails(context);
        context.Result = new ObjectResult(details) { StatusCode = StatusCodes.Status500InternalServerError };
        context.ExceptionHandled = true;
    }

    private static ProblemDetails CreateProblemDetails(ExceptionContext context) =>
      new()
      {
          Instance = context.HttpContext.Request.Path,
          Status = StatusCodes.Status500InternalServerError,
          Title = "An error occurred while processing your request.",
          Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
      };
}
