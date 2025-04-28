using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Para fazer a ligação com o banco de dados, vamos usar o Entity Framework Core
using Microsoft.EntityFrameworkCore; // Importa o namespace do Entity Framework

// Os 3 comandos para rodar entity framework core:
// dotnet add package Microsoft.EntityFrameworkCore
// dotnet add package Microsoft.EntityFrameworkCore.Design
// dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL


namespace ExemploASP_NET_CORE.database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Vamos criar um DbSet para cada tabela do banco de dados
        public DbSet<Models.Usuario> Usuarios {get; set;}
    }
}