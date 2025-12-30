using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace PlantWatery.Api.Common.Hosting;

public static class RateLimiting
{
    public static class PolicyNames
    {
        public static readonly string Fixed = nameof(Fixed);
    }

    public static IServiceCollection SetupRateLimiting(this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            options.AddPolicy(PolicyNames.Fixed, context =>
                CreateFixedWindowRateLimitPartition(
                    context,
                    permitLimit: 100,
                    window: TimeSpan.FromMinutes(1)));

            options.OnRejected = OnRateLimitingRejected;
        });

        return services;
    }

    private static RateLimitPartition<string> CreateFixedWindowRateLimitPartition(
        HttpContext context,
        int permitLimit,
        TimeSpan window)
    {
        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "anonymous",
            factory: partition => new FixedWindowRateLimiterOptions
            {
                PermitLimit = permitLimit,
                Window = window,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0
            });
    }

    private static Func<OnRejectedContext, CancellationToken, ValueTask>? OnRateLimitingRejected => async (context, token) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.ContentType = "application/json";

        var response = new
        {
            error = "Rate limit exceeded",
            message = "Too many requests. Please try again later.",
            retryAfter = context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter)
                ? retryAfter.TotalSeconds
                : 60
        };

        await context.HttpContext.Response.WriteAsync(
            System.Text.Json.JsonSerializer.Serialize(response), token);
    };
}
