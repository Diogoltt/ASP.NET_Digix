using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Exemplo_AspNet_Core.Models; // Importa o namespace do Model
using Exemplo_AspNet_Core.database; // Importa o namespace do DbContext

using Microsoft.EntityFrameworkCore; // Importa o namespace do Entity Framework

// Agente vai utilizar a biblioteca MVC do ASP.NET
using Microsoft.AspNetCore.Mvc; // O comando para instalar é: dotnet add package Microsoft.AspNetCore.Mvc

namespace Exemplo_AspNet_Core.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context; //readonly é uma variável que só pode ser inicializada no construtor, o AppDbContext é a classe que representa o banco de dados

        public UsuarioController(AppDbContext context) // Construtor que recebe o AppDbContext que é a classe que representa o banco de dados
        {
            _context = context;
        }

        [HttpGet] // Define que esse método é um GET
        public async Task<IEnumerable<Usuario>> Get() // Retorna uma lista de usuários
        {
            // await é uma palavra chave que só pode ser usada em métodos que são marcados com async
            return await _context.Usuarios.ToListAsync(); // Retorna todos os usuários do banco de dados
        }

        [HttpPost] // Define que esse método é um POST
        public async Task<ActionResult<Usuario>> Post([FromBody] Usuario usuario) // Task é um método assíncrono, ActionResult é o tipo de retorno do método, [FromBody] indica que o usuário vai ser passado no corpo da requisição
        {
            _context.Usuarios.Add(usuario); // Adiciona o usuário no banco de dados
            await _context.SaveChangesAsync(); // Salva as alterações no banco de dados
            return usuario; // Retorna o usuário que foi adicionado
        }

        [HttpPut("{id}")] // Define que esse método é um PUT, {id} é um parâmetro que vai ser passado na URL
        public async Task<ActionResult<Usuario>> Put(int id, [FromBody] Usuario usuario) // Task é um método assíncrono, ActionResult é o tipo de retorno do método, [FromBody] indica que o usuário vai ser passado no corpo da requisição
        {
            var existente = await _context.Usuarios.FindAsync(id); // Procura o usuário no banco de dados
            if (existente == null) return NotFound(); // Se não encontrar o usuário, retorna um erro 404
            existente.Nome = usuario.Nome; // Atualiza o nome do usuário
            existente.Email = usuario.Email; // Atualiza o email do usuário

            await _context.SaveChangesAsync(); // Salva as alterações no banco de dados
            return existente; // Retorna o usuário que foi atualizado

        }

        [HttpDelete("{id}")] // Define que esse método é um DELETE, {id} é um parâmetro que vai ser passado na URL
        public async Task<ActionResult> Delete(int id) // Task é um método assíncrono, ActionResult é o tipo de retorno do método
        {
            var existente = await _context.Usuarios.FindAsync(id); // Procura o usuário no banco de dados
            if (existente == null) return NotFound(); // Se não encontrar o usuário, retorna um erro 404
            _context.Usuarios.Remove(existente); // Remove o usuário do banco de dados
            await _context.SaveChangesAsync(); // Salva as alterações no banco de dados
            return NoContent(); // Retorna um status 204
        }
    }
}