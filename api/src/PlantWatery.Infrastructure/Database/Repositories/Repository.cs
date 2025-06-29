using Microsoft.EntityFrameworkCore;
using PlantWatery.Domain.Interfaces.Repositories;

namespace PlantWatery.Infrastructure.Database.Repositories;

public class Repository<T>(DatabaseContext dbContext) : IRepository<T> where T : class
{
    protected readonly DatabaseContext DbContext = dbContext;
    protected readonly DbSet<T> DbSet = dbContext.Set<T>();

    public void Add(T entity)
    {
        DbSet.Add(entity);
        DbContext.SaveChanges();
    }
    public void Update(T entity)
    {
        DbSet.Update(entity);
        DbContext.SaveChanges();
    }
    public void Delete(T entity)
    {
        DbSet.Remove(entity);
        DbContext.SaveChanges();
    }
    public IQueryable<T> GetAll()
    {
        return DbSet;
    }
}
