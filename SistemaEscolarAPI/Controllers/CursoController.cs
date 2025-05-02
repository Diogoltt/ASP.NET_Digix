using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaEscolarAPI.Data;
using SistemaEscolarAPI.DTO;
using SistemaEscolarAPI.Models;

namespace SistemaEscolarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CursoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CursoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CursoDTO>>> Get()
        {
            var cursos = await _context.Cursos
                .Select(c => new CursoDTO 
                { 
                    Id = c.Id,
                    Descricao = c.Descricao 
                })
                .ToListAsync();

            return Ok(cursos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CursoDTO>> Get(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);
            if (curso == null) return NotFound("Curso não encontrado");
            
            var cursoDto = new CursoDTO
            {
                Id = curso.Id,
                Descricao = curso.Descricao
            };

            return Ok(cursoDto);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CursoDTO cursoDTO)
        {
            var curso = new Curso { Descricao = cursoDTO.Descricao };
            _context.Cursos.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = curso.Id }, curso);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CursoDTO cursoDTO)
        {
            var curso = await _context.Cursos.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }

            curso.Descricao = cursoDTO.Descricao;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }

            _context.Cursos.Remove(curso);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}