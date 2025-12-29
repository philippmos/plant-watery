using System.Text.Json.Serialization;
using Asp.Versioning;
using Asp.Versioning.ApiExplorer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;
using PlantWatery.Api;

namespace PlantWatery.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddApi(this IServiceCollection services, IHostEnvironment environment)
    {
        services
            .AddEndpointsApiExplorer()
            .AddApiVersioning()
            .AddForwardedHeaders(environment)
            .ConfigureOpenApi();

        return services;
    }

    private static IServiceCollection AddForwardedHeaders(this IServiceCollection services, IHostEnvironment environment)
    {
        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;

            options.KnownProxies.Clear();

            // True-Client-IP header is set by Akamai
            if (environment.IsProduction())
            {
                options.ForwardedForHeaderName = "True-Client-IP";
            }
        });

        return services;
    }

    private static IServiceCollection AddApiVersioning(this IServiceCollection services)
    {
        services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ReportApiVersions = true;
            options.ApiVersionReader = ApiVersionReader.Combine(new UrlSegmentApiVersionReader());

        })
        .AddMvc()
        .AddApiExplorer(options =>
        {
            options.GroupNameFormat = "'v'VVV";
            options.SubstituteApiVersionInUrl = true;
        });

        return services;
    }


    private static IServiceCollection ConfigureOpenApi(this IServiceCollection services)
    {
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer((document, context, cancellationToken) =>
            {
                document.Components ??= new();
                document.Components.SecuritySchemes ??= new Dictionary<string, OpenApiSecurityScheme>();

                var apiVersionDescriptionProvider = context.ApplicationServices.GetRequiredService<IApiVersionDescriptionProvider>();
                var version = apiVersionDescriptionProvider.ApiVersionDescriptions.FirstOrDefault()?.ApiVersion.ToString() ?? "1.0";

                document.Info = new OpenApiInfo
                {
                    Title = "PlantWatery API",
                    Version = version
                };

                document.Components.SecuritySchemes.Add("Bearer", new()
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Description = "JWT Authorization header using the Bearer scheme."
                });

                document.SecurityRequirements =
                [
                    new()
                    {
                        {
                            new ()
                            {
                                Reference = new ()
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            Array.Empty<string>()
                        }
                    }
                ];

                return Task.CompletedTask;
            });
        });

        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.PropertyNamingPolicy = null;
            options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

        return services;
    }
}
