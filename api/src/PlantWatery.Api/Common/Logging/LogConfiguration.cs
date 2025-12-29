using Serilog;
using Serilog.Enrichers.Span;
using Serilog.Events;
using Serilog.Formatting.Compact;

namespace PlantWatery.Api.Common.Logging;

public static class LogConfiguration
{
    public static Serilog.ILogger SetupLoggerConfiguration(WebApplicationBuilder builder)
    {
        return new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
            .MinimumLevel.Override("System.Net.Http.HttpClient", LogEventLevel.Warning)
            .ReadFrom.Configuration(builder.Configuration)
            .Enrich.WithSpan()
            .Enrich.FromLogContext()
            .Enrich.With(new CorrelationIdEnricher(builder.Services.BuildServiceProvider().GetRequiredService<IHttpContextAccessor>()))
            .WriteTo.Console(new RenderedCompactJsonFormatter())
            .CreateLogger();
    }
}
