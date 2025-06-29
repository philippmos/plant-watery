using PlantWatery.Application;
using PlantWatery.Infrastructure;

namespace PlantWatery.Api.Common;

public static class PmoApi
{
    public static WebApplicationBuilder CreateBuilder(params string[] args)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions { Args = args });

        builder.Services.SetupCorsHandling();

        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        builder.Services.AddApplicationLayer();
        builder.Services.AddInfrastructureLayer();

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

    private static IServiceCollection SetupCorsHandling(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowClient", policy =>
            {
                policy.WithOrigins("https://192.168.178.49:4200")
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        return services;
    }
}
