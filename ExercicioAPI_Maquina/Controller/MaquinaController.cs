using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExercicioAPI_Maquina.Data;
using ExercicioAPI_Maquina.Models;

namespace ExercicioAPI_Maquina.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class MaquinaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MaquinaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Maquina>> Get()
        {
            return await _context.Maquinas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Maquina>> GetById(int id)
        {
            var maquina = await _context.Maquinas.FindAsync(id);

            if (maquina == null) return NotFound();

            return maquina;
        }

        [HttpPost]
        public async Task<ActionResult<Maquina>> Post([FromBody] Maquina maquina)
        {
            if (maquina == null) return BadRequest("Máquina inváida");

            _context.Maquinas.Add(maquina);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Erro ao salvar no bd: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetById), new { id = maquina.Id_Maquina }, maquina);

        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Maquina>> Put(int id, [FromBody] Maquina maquina)
        {
            if (maquina == null || id != maquina.Id_Maquina) return BadRequest("Dados inválidos");

            var existente = await _context.Maquinas.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Tipo = maquina.Tipo;
            existente.Velocidade = maquina.Velocidade;
            existente.HardDisk = maquina.HardDisk;
            existente.Placa_Rede = maquina.Placa_Rede;
            existente.Memoria_Ram = maquina.Memoria_Ram;
            existente.Fk_Usuario = maquina.Fk_Usuario;

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existente = await _context.Maquinas.FindAsync(id);

            if (existente == null) return NotFound();

            _context.Maquinas.Remove(existente);
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