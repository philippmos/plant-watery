namespace PlantWatery.Api.Common.Hosting;

public static class CorsPolicy
{
    public static IServiceCollection SetupCorsHandling(this IServiceCollection services, IConfiguration configuration)
    {
        var allowedOrigins = configuration.GetSection("CorsPolicy:AllowedOrigins").Get<string[]>() ?? [];

        services.AddCors(options =>
        {
            options.AddPolicy("AllowClient", policy
                => policy.WithOrigins(allowedOrigins)
                      .AllowAnyHeader()
                      .AllowAnyMethod());
        });

        return services;
    }
}
