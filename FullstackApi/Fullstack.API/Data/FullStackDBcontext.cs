using Fullstack.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Fullstack.API.Data
{
    public class FullStackDBcontext : DbContext
    {
        public FullStackDBcontext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
    }
}
