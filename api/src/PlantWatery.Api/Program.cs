using PlantWatery.Api.Common.Hosting;
using PlantWatery.Api.Endpoints;

var builder = WebApiBuilder.CreateBuilder(args);

var app = builder.BuildWebApi();

app.MapEndpoints();

await app.RunAsync();
