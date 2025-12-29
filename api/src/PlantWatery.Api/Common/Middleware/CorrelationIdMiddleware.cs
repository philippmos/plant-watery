using PlantWatery.Api.Common;

namespace PlantWatery.Api.Common.Middleware;

public class CorrelationIdMiddleware(RequestDelegate next)
{
    private const string CorrelationIdHeader = AppConstants.Correlation.HeaderName;

    public async Task InvokeAsync(HttpContext context)
    {
        var correlationId = context.Request.Headers[CorrelationIdHeader].ToString() ?? string.Empty;

        if (string.IsNullOrWhiteSpace(correlationId) || !Guid.TryParse(correlationId, out _))
        {
            correlationId = Guid.NewGuid().ToString();
        }

        context.Items[AppConstants.Correlation.ItemKey] = correlationId;
        context.Response.OnStarting(() =>
        {
            context.Response.Headers[CorrelationIdHeader] = correlationId;
            return Task.CompletedTask;
        });

        await next(context);
    }
}
