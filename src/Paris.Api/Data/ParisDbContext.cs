using Paris.Api.Models;
using Paris.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Paris.Api.Data
{
    public class ParisDbContext: DbContext, IParisDbContext
    {
        public DbSet<ToDo> ToDos { get; private set; }
        public ParisDbContext(DbContextOptions options)
            :base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ParisDbContext).Assembly);
        }
        
    }
}
