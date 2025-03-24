using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;

namespace Aula2
{
    public class Execute
    {
        static void Main(string[] args)
        {
            // Cria o builder para configurar o aplicativo e gerenciar serviços.
            var builder = WebApplication.CreateBuilder(args);

            // Adiciona suporte a controladores (MVC ou APIs).
            builder.Services.AddControllers();

            // Adiciona suporte para expor os endpoints de API (permite gerar documentação como Swagger/OpenAPI).
            builder.Services.AddEndpointsApiExplorer();

            // Configura o Swagger para geração automática de documentação da API.
            builder.Services.AddSwaggerGen();

            // Constrói o aplicativo com base nas configurações realizadas no builder.
            var app = builder.Build();

            app.UseSwagger(); // Habilita a geração do arquivo Swagger JSON para documentar a API.

            app.UseSwaggerUI(); // Configura a interface do Swagger UI para permitir a exploração interativa dos endpoints da API.

            app.UseHttpsRedirection(); // Redireciona automaticamente solicitações HTTP para HTTPS para garantir uma conexão segura.

            app.MapControllers(); // Mapeia as rotas para os controladores definidos, conectando os endpoints da API.

            app.Run();
        }
    }
}