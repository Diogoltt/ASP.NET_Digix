using Microsoft.EntityFrameworkCore;

namespace Aula_3.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Models.Usuario> Usuarios { get; set; }
    }
}