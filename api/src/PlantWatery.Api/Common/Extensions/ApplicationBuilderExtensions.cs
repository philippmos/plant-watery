using PlantWatery.Api.Common.Extensions;

namespace PlantWatery.Api.Common.Extensions;

public static class ApplicationBuilderExtensions
{
    public static void UseHttpLogging(this IApplicationBuilder app, IConfiguration configuration)
    {
        var httpLoggingEnabled = configuration.GetValue<bool>("HttpLogging:Enabled");

        if (httpLoggingEnabled)
        {
            app.UseHttpLogging();
        }
    }

    public static void UseSwaggerWithUi(this IApplicationBuilder app)
    {
        app.UseSwaggerUI(options =>
        {
            options.RoutePrefix = "swagger";
            options.SwaggerEndpoint("/openapi/v1.json", "PlantWatery API v1");
        });
    }
}
