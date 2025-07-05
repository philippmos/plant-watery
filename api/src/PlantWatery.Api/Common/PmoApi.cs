using PlantWatery.Application;
using PlantWatery.Infrastructure;
using PlantWatery.Domain.Interfaces;
using Microsoft.IdentityModel.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Scalar.AspNetCore;
using Microsoft.OpenApi.Models;

namespace PlantWatery.Api.Common;

public static class PmoApi
{
    public static WebApplicationBuilder CreateBuilder(params string[] args)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions { Args = args });

        builder.Services.SetupCorsHandling();

        builder.Services.AddControllers();
        builder.Services.ConfigureOpenApi();

        builder.Services.AddAuth(builder.Configuration);

        builder.Services.AddApplicationLayer();
        builder.Services.AddInfrastructureLayer();

        builder.Services.AddHttpContextAccessor();

        return builder;
    }

    public static WebApplication BuildPmoApi(this WebApplicationBuilder builder)
    {
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi("/openapi/openapi.json");
            app.MapScalarApiReference(options =>
            {
                options.Title = "Plant Watery API";
                options.OpenApiRoutePattern = "/openapi/openapi.json";
                options.EndpointPathPrefix = "/docs/{documentName}";
                options.DefaultHttpClient = new(ScalarTarget.CSharp, ScalarClient.HttpClient);
            });
        }

        app.UseCors("AllowClient");

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        return app;
    }

    private static IServiceCollection AddAuth(this IServiceCollection services, IConfigurationManager configuration)
    {
        services.AddScoped<IUserContext, UserContext>();

        IdentityModelEventSource.ShowPII = true;
        IdentityModelEventSource.LogCompleteSecurityArtifact = true;

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.Authority = configuration["Auth:Authority"] ?? "";
                options.Audience = configuration["Auth:Audience"] ?? "";

                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,                    
                    ValidTypes = [ "JWT", "at+jwt" ],
                    RequireExpirationTime = true,
                    ClockSkew = TimeSpan.FromMinutes(5)
                };
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

        return services;
    }

    private static IServiceCollection SetupCorsHandling(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowClient", policy 
                => policy.WithOrigins("https://192.168.178.49:4200")
                      .AllowAnyHeader()
                      .AllowAnyMethod());
        });

        return services;
    }
}
