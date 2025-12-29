using Serilog.Core;
using Serilog.Events;

namespace PlantWatery.Api.Common.Logging;

public class CorrelationIdEnricher(IHttpContextAccessor httpContextAccessor) : ILogEventEnricher
{
    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
    {
        var correlationId = httpContextAccessor?.HttpContext?.Items[AppConstants.Correlation.ItemKey]?.ToString();

        if (!string.IsNullOrEmpty(correlationId))
        {
            logEvent.AddOrUpdateProperty(propertyFactory.CreateProperty(AppConstants.Correlation.LoggerPropertyName, correlationId));
        }
    }
}
