using Microsoft.AspNetCore.Mvc;
using Exemplo5ComBancoEntity.Models;
using Exemplo5ComBancoEntity.database;
using Microsoft.EntityFrameworkCore;

namespace Exemplo5ComBancoEntity.Controllers
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
            _context.Softwares.Add(software);
            await _context.SaveChangesAsync();
            return software;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Software>> Put(int id, [FromBody] Software software)
        {
            var existente = await _context.Softwares.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Produto = software.Produto;
            existente.HardDisk = software.HardDisk;
            existente.MemoriaRam = software.MemoriaRam;
            existente.FkMaquina = software.FkMaquina;

            await _context.SaveChangesAsync();
            return existente;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existente = await _context.Softwares.FindAsync(id);
            if (existente == null) return NotFound();

            _context.Softwares.Remove(existente);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
