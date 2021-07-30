using Paris.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace Paris.Api.Interfaces
{
    public interface IParisDbContext
    {
        DbSet<ToDo> ToDos { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        
    }
}
