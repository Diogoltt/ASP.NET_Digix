using ExercicioAPI_Maquina.Models;
using Microsoft.EntityFrameworkCore;

namespace ExercicioAPI_Maquina.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Maquina> Maquinas { get; set; }
        public DbSet<Software> Softwares { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configuração da tabela Usuarios
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuarios");
                entity.HasKey(e => e.ID_Usuario);

                entity.Property(e => e.Nome_Usuario).HasMaxLength(255);
                entity.Property(e => e.Password).HasMaxLength(255);
                entity.Property(e => e.Especialidade).HasMaxLength(255);
            });

            // Configuração da tabela Maquina
            modelBuilder.Entity<Maquina>(entity =>
            {
                entity.ToTable("maquina");
                entity.HasKey(e => e.Id_Maquina);

                entity.Property(e => e.Tipo).HasMaxLength(255);

                // Configuração da relação com Usuario
                entity.HasOne(d => d.Usuario)
                      .WithMany(p => p.Maquinas)
                      .HasForeignKey(d => d.Fk_Usuario)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configuração da tabela Software
            modelBuilder.Entity<Software>(entity =>
            {
                entity.ToTable("software");
                entity.HasKey(e => e.Id_Software);

                entity.Property(e => e.Produto).HasMaxLength(255);

                // Configuração da relação com Maquina
                entity.HasOne(d => d.Maquina)
                      .WithMany(p => p.Softwares)
                      .HasForeignKey(d => d.Fk_Maquina)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}