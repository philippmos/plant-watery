using PlantWatery.Application;
using PlantWatery.Infrastructure;

namespace PlantWatery.Api.Common;

public static class PmoApi
{
    public static WebApplicationBuilder CreateBuilder(params string[] args)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions { Args = args });

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

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}
