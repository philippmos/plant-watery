using Microsoft.EntityFrameworkCore;

namespace PlantWatery.Infrastructure.Database;

public class DatabaseContext(
    DbContextOptions<DatabaseContext> contextOptions) 
    : DbContext(contextOptions)
{

}
