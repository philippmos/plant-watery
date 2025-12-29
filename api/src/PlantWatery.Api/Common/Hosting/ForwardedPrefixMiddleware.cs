namespace PlantWatery.Api.Common.Hosting;

public class ForwardedPrefixMiddleware : IMiddleware
{
    public Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var prefix = context.Request.Headers["x-forwarded-prefix"]
          .ToString();
        context.Request.PathBase = new PathString(prefix);
        return next(context);
    }
}
