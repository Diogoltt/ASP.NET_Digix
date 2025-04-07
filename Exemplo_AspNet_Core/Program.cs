using Exemplo_AspNet_Core.database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args); // Criar a aplicação web

// Servicos de configuração
builder.Services.AddControllersWithViews(); // Adiciona o MVC com Views
builder.Services.AddEndpointsApiExplorer(); // Adiciona o explorador de endpoints
builder.Services.AddSwaggerGen(); // Adiciona o Swagger para documentação da API
builder.Services.AddDbContext<AppDbContext>(options => // Configura o contexto do banco de dados
{
   options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")); // Usa o PostgreSQL com a string de conexão definida no appsettings.json
});

var app = builder.Build(); // Cria a aplicação a partir dos serviços configurado
// 

if (app.Environment.IsDevelopment()) // Verifica se o ambiente é de desenvolvimento
{
    app.UseSwagger(); // Habilita o Swagger
    app.UseSwaggerUI(); // Habilita a interface do Swagger
}

app.UseDefaultFiles(); // Habilita os arquivos padrão (index.html, index.htm, default.html)
app.UseStaticFiles(); // Habilita os arquivos estáticos (CSS, JS, imagens, etc.)
app.UseHttpsRedirection(); // Redireciona requisições HTTP para HTTPS
app.MapControllers(); // Mapeia os controladores para as rotas

app.Run(); // Executa a aplicação