using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Options;
using PlantWatery.Api.Common.Authentication;
using PlantWatery.Api.Common.Extensions;
using PlantWatery.Api.Common.Logging;
using PlantWatery.Api.Common.Middleware;
using PlantWatery.Application;
using PlantWatery.Infrastructure;
using Prometheus;
using Serilog;
using Serilog.Core;

namespace PlantWatery.Api.Common.Hosting;

public static class WebApiBuilder
{
    public static WebApplicationBuilder CreateBuilder(params string[] args)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions { Args = args });

        builder.Services.AddApi(builder.Environment);
        builder.Services.AddApplicationLayer();
        builder.Services.AddInfrastructureLayer();

        builder.Services.SetupCorsHandling(builder.Configuration);

        builder.Services.AddHttpContextAccessor();

        builder.Configuration.ConfigureSecretSources();

        builder.Services.AddSingleton<ILogEventEnricher, CorrelationIdEnricher>();

        builder.Services.AddProblemDetails();

        builder.Services.AddJwtAuthentication(builder.Configuration);

        Log.Logger = LogConfiguration.SetupLoggerConfiguration(builder);

        builder.Services.AddOptions<PortsOptions>()
          .BindConfiguration(PortsOptions.Ports);

        builder.Services.Configure<ForwardedHeadersOptions>(
          headersOptions =>
          {
              headersOptions.ForwardedHeaders = ForwardedHeaders.All;
              headersOptions.KnownProxies.Clear();
          }
        );

        builder.Services.AddSingleton<ForwardedPrefixMiddleware>();

        builder.Services.SetupRateLimiting();

        builder.Host.UseSerilog();

        builder.SetupHosting();

        return builder;
    }

    public static WebApplication BuildWebApi(this WebApplicationBuilder builder)
    {
        var app = builder.Build();

        var portOptions = app.Services.GetRequiredService<IOptions<PortsOptions>>().Value;

        app.UseWhen(
            httpContext => httpContext.Connection.LocalPort == portOptions.Main,
            mainApp =>
            {
                mainApp.UseForwardedHeaders();
                mainApp.UseMiddleware<ForwardedPrefixMiddleware>();

                mainApp.UseStaticFiles();

                mainApp.UseRouting();

                mainApp.UseRateLimiter();

                mainApp.UseHttpMetrics();
            }
        );

        app.MapWhen(
            httpContext => httpContext.Connection.LocalPort == portOptions.Metrics,
            metricsApp =>
            {
                metricsApp.UseRouting();
                metricsApp.UseEndpoints(endpoints =>
                {
                    endpoints.MapMetrics();
                });
            }
        );

        app.UseForwardedHeaders();
        app.UseMiddleware<CorrelationIdMiddleware>();
        app.UseHttpLogging(app.Configuration);

        if (app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler();
        }
        else
        {
            app.UseExceptionHandler();
            app.UseHsts();
        }

        app.UseCors("AllowClient");

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapOpenApi();
        app.UseSwaggerWithUi();

        return app;
    }

    private static IConfigurationManager ConfigureSecretSources(this IConfigurationManager configuration)
    {
        configuration.AddEnvironmentVariables();

        configuration.AddKeyPerFile("/run/secrets", optional: true, reloadOnChange: true);

        return configuration;
    }

    private static WebApplicationBuilder SetupHosting(this WebApplicationBuilder builder)
    {
        builder.WebHost.UseUrls();

        builder.WebHost.UseKestrel(serverOptions =>
        {
            var serviceProvider = serverOptions.ApplicationServices;
            var portOptions = serviceProvider.GetRequiredService<IOptions<PortsOptions>>().Value;

            void ConfigureListenOptions(ListenOptions listenOptions)
            {
                if (portOptions.UseHttps)
                {
                    listenOptions.UseHttps();
                }

                listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
            }

            serverOptions.ListenAnyIP(portOptions.Main, ConfigureListenOptions);
            serverOptions.ListenAnyIP(portOptions.Metrics, ConfigureListenOptions);

            serverOptions.AddServerHeader = false;
        });

        return builder;
    }
}
