using PlantWatery.Api.Common;

var builder = PmoApi.CreateBuilder(args);

var app = builder.BuildPmoApi();

await app.RunAsync();
