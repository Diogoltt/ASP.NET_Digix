using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExercicioAPI_Maquina.Data;
using ExercicioAPI_Maquina.Models;

namespace ExercicioAPI_Maquina.Controller
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            
            if (usuario == null) return NotFound();
            
            return usuario;
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

            return CreatedAtAction(nameof(GetById), new { id = usuario.ID_Usuario }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Usuario>> Put(int id, [FromBody] Usuario usuario)
        {
            if (usuario == null || id != usuario.ID_Usuario) return BadRequest("Dados inválidos.");

            var existente = await _context.Usuarios.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Nome_Usuario = usuario.Nome_Usuario;
            existente.Password = usuario.Password;
            existente.Ramal = usuario.Ramal;
            existente.Especialidade = usuario.Especialidade;

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
