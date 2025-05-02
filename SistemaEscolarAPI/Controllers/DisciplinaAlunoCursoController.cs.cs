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
                .Include(d => d.Aluno)
                .Include(d => d.Curso)
                .Include(d => d.Disciplina)
                .Select(d => new DisciplinaAlunoCursoDTO
                {
                    Id = d.AlunoId + d.CursoId + d.DisciplinaId,
                    AlunoId = d.AlunoId,
                    AlunoNome = d.Aluno.Nome,
                    CursoId = d.CursoId,
                    CursoDescricao = d.Curso.Descricao,
                    DisciplinaId = d.DisciplinaId,
                    DisciplinaDescricao = d.Disciplina.Descricao
                })
                .ToListAsync();

            return Ok(registros);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DisciplinaAlunoCursoDTO>> Get(int id)
        {
            var relacoes = await _context.DisciplinaAlunoCursos
                .Include(d => d.Aluno)
                .Include(d => d.Curso)
                .Include(d => d.Disciplina)
                .ToListAsync();

            var relacao = relacoes.FirstOrDefault(r => r.AlunoId + r.CursoId + r.DisciplinaId == id);

            if (relacao == null) return NotFound("Relacao nao encontrada");

            var dto = new DisciplinaAlunoCursoDTO
            {
                Id = relacao.AlunoId + relacao.CursoId + relacao.DisciplinaId,
                AlunoId = relacao.AlunoId,
                AlunoNome = relacao.Aluno.Nome,
                CursoId = relacao.CursoId,
                CursoDescricao = relacao.Curso.Descricao,
                DisciplinaId = relacao.DisciplinaId,
                DisciplinaDescricao = relacao.Disciplina.Descricao
            };

            return Ok(dto);
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