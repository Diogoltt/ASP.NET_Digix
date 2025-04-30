using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaEscolarAPI.Models;
using SistemaEscolarAPI.DTO;
using SistemaEscolarAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace SistemaEscolarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinaAlunoCursoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DisciplinaAlunoCursoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DisciplinaAlunoCursoDTO>>> Get()
        {
            var registros = await _context.DisciplinaAlunoCursos
              .Select(d => new DisciplinaAlunoCursoDTO
              {
                  AlunoId = d.AlunoId,
                  CursoId = d.CursoId,
                  DisciplinaId = d.DisciplinaId
              })
              .ToListAsync();

            return Ok(registros);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] DisciplinaAlunoCursoDTO disciplinaAlunoCursoDTO)
        {
            var entidade = new DisciplinaAlunoCurso
            {
                AlunoId = disciplinaAlunoCursoDTO.AlunoId,
                CursoId = disciplinaAlunoCursoDTO.CursoId,
                DisciplinaId = disciplinaAlunoCursoDTO.DisciplinaId
            };
            _context.DisciplinaAlunoCursos.Add(entidade);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{alunoId}/{disciplinaId}/{cursoId}")]
        public async Task<ActionResult> Put(int alunoId, int disciplinaId, int cursoId, [FromBody] DisciplinaAlunoCursoDTO dto)
        {
            var entidade = await _context.DisciplinaAlunoCursos.FindAsync(alunoId, disciplinaId, cursoId);
            if (entidade == null)
            {
                return NotFound("Relação não encontrada.");
            }

            _context.DisciplinaAlunoCursos.Remove(entidade);
            
            var novaEntidade = new DisciplinaAlunoCurso
            {
                AlunoId = dto.AlunoId,
                DisciplinaId = dto.DisciplinaId,
                CursoId = dto.CursoId
            };
            
            _context.DisciplinaAlunoCursos.Add(novaEntidade);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{alunoId}/{disciplinaId}/{cursoId}")]
        public async Task<ActionResult> Delete(int alunoId, int disciplinaId, int cursoId)
        {
            var entidade = await _context.DisciplinaAlunoCursos.FindAsync(alunoId, disciplinaId, cursoId);
            if (entidade == null)
            {
                return NotFound("Relação não encontrada.");
            }

            _context.DisciplinaAlunoCursos.Remove(entidade);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}