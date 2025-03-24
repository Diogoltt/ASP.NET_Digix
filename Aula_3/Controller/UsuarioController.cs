using System.Threading.Tasks;
using Aula_3.Data;
using Aula_3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aula_3.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuarioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Usuario>> Get()
        {
            return await _context.Usuarios.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> Post([FromBody] Usuario usuario)
        {
            if (usuario == null) return BadRequest("Usuário inválido.");

            _context.Usuarios.Add(usuario);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erro ao salvar no banco de dados: {ex.Message}");
            }

            return CreatedAtAction(nameof(Get), new { id = usuario.Id }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Usuario>> Put(int id, [FromBody] Usuario usuario)
        {
            if (usuario == null || id != usuario.Id) return BadRequest("Dados inválidos.");

            var existente = await _context.Usuarios.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Nome = usuario.Nome;
            existente.Email = usuario.Email;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erro ao atualizar no banco de dados: {ex.Message}");
            }

            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existente = await _context.Usuarios.FindAsync(id);

            if (existente == null) return NotFound();

            _context.Usuarios.Remove(existente);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erro ao deletar no banco de dados: {ex.Message}");
            }

            return NoContent();
        }
    }
}