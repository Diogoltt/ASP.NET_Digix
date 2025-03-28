using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Exemplo5ComBancoEntity.database;

namespace Exemplo5ComBancoEntity
{
    public class Executar
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Carrega string de conexão do appsettings.json
            // var connectionString = builder.Configuration.GetConnectionString("PostgresConnection");

            // Registra o DbContext com o PostgreSQL
            builder.Services.AddDbContext<AppDbContext>(options =>
             options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));


            // Adiciona suporte a controllers e Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Habilita Swagger (ambiente dev)
            // if (app.Environment.IsDevelopment())
            // {
            app.UseSwagger();
            app.UseSwaggerUI();
            // }

            // Habilita HTTPS
            app.UseHttpsRedirection();

            // Habilita arquivos estáticos da pasta wwwroot (html, css, js)
            app.UseDefaultFiles(); // Procura por index.html
            app.UseStaticFiles();  // Permite servir arquivos de wwwroot

            // Habilita autenticação/autorização (mesmo que ainda não usada)
            app.UseAuthorization();

            // Mapeia os endpoints da API
            app.MapControllers();

            // Roda a aplicação
            app.Run();

            // link para o swagger: http://localhost:5000/swagger/index.html
        }
    }
}
