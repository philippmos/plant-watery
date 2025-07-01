using PlantWatery.Application;
using PlantWatery.Infrastructure;
using PlantWatery.Domain.Interfaces;
using Microsoft.IdentityModel.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace PlantWatery.Api.Common;

public static class PmoApi
{
    public static WebApplicationBuilder CreateBuilder(params string[] args)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions { Args = args });

        builder.Services.SetupCorsHandling();

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

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
                    ValidIssuer = configuration["Auth:ValidIssuer"] ?? "",
                    ValidateAudience = true,
                    ValidateLifetime = true
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                        return Task.CompletedTask;
                    }
                };
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
