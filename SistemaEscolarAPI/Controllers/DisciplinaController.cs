using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaEscolarAPI.Data;
using SistemaEscolarAPI.DTO;
using SistemaEscolarAPI.Models;

namespace SistemaEscolarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DisciplinaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DisciplinaDTO>>> GetDisciplinas()
        {
            var disciplinas = await _context.Disciplinas
                .Include(d => d.Curso)
                .Select(disciplinas => new DisciplinaDTO { Descricao = disciplinas.Descricao, Curso = disciplinas.Curso.Descricao })
                .ToListAsync();

            return Ok(disciplinas);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] DisciplinaDTO disciplinaDTO)
        {
            var Curso = await _context.Cursos.FirstOrDefaultAsync(c => c.Descricao == disciplinaDTO.Curso);
            if (Curso == null) return NotFound("Curso não encontrado.");

            var disciplina = new Disciplina { Descricao = disciplinaDTO.Descricao, CursoId = Curso.Id };
            _context.Disciplinas.Add(disciplina);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] DisciplinaDTO disciplinaDTO)
        {
            var disciplina = await _context.Disciplinas.FindAsync(id);
            if (disciplina == null) return NotFound("Disciplina não encontrada.");

            disciplina.Descricao = disciplinaDTO.Descricao;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var disciplina = await _context.Disciplinas.FindAsync(id);
            if (disciplina == null) return NotFound("Disciplina não encontrada.");

            _context.Disciplinas.Remove(disciplina);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}