using ExercicioAPI_Maquina.Data;
using ExercicioAPI_Maquina.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExercicioAPI_Maquina.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class SoftwareController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SoftwareController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Software>> Get()
        {
            return await _context.Softwares.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Software>> GetById(int id)
        {
            var software = await _context.Softwares.FindAsync(id);

            if (software == null) return NotFound();

            return software;
        }

        [HttpPost]
        public async Task<ActionResult<Software>> Post([FromBody] Software software)
        {
            if (software == null) return BadRequest("Software inválido");

            _context.Softwares.Add(software);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erro ao salvar no bd: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetById), new { id = software.Id_Software }, software);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Software>> Put(int id, [FromBody] Software software)
        {
            if (software == null || id != software.Id_Software) return BadRequest("Dados inválidos");

            var existente = await _context.Softwares.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Produto = software.Produto;
            existente.HardDisk = software.HardDisk;
            existente.Memoria_Ram = software.Memoria_Ram;
            existente.Fk_Maquina = software.Fk_Maquina;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erro ao fazer update no bd: {ex.Message}");
            }

            return Ok(existente);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var existente = await _context.Softwares.FindAsync(id);

            if (existente == null) return NotFound();

            _context.Softwares.Remove(existente);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erro ao deletar no bd: {ex.Message}");
            }

            return NoContent();
        }

    }
}