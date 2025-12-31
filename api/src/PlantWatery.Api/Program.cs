using PlantWatery.Api.Common.Hosting;
using PlantWatery.Api.Endpoints;

var builder = WebApiBuilder.CreateBuilder(args);

var app = builder.BuildWebApi();

await app.ApplyDatabaseMigrationsAsync();

app.MapEndpoints();

await app.RunAsync();
