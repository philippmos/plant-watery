# PLantWatery Api

## Code First Migrations

### Add Migration

```bash
 dotnet ef migrations add InitialMigration --project PlantWatery.Infrastructure --startup-project PlantWatery.Api --output-dir Database/Migrations
```

### Update Database

```bash
dotnet ef database update --project PlantWatery.Infrastructure --startup-project PlantWatery.Api
```