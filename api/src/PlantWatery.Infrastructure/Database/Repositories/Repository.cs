using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class Repository<T>(DatabaseContext dbContext) : IRepository<T> where T : class
{
    protected readonly DatabaseContext DbContext = dbContext;
    protected readonly DbSet<T> DbSet = dbContext.Set<T>();

    public async Task AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
        await DbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        DbSet.Update(entity);
        await DbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        DbSet.Remove(entity);
        await DbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await DbSet.ToListAsync();
    }
}
