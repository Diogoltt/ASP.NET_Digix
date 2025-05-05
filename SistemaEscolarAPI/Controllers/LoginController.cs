using Microsoft.AspNetCore.Mvc;
using SistemaEscolarAPI.DTO;
using SistemaEscolarAPI.Models;
using SistemaEscolarAPI.Services;

namespace SistemaEscolarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] LoginDTO LoginDto)
        {
            if (string.IsNullOrWhiteSpace(LoginDto.Username) || string.IsNullOrWhiteSpace(LoginDto.Password))
                return BadRequest("Usuários e senha são obrigatórios");


            var users = new List<Usuario>
            {
                new Usuario {Username = "admin", Password = "123", Role = "Administrador"
                },
                new Usuario {Username = "func", Password = "123", Role = "Funcionário"}
            };

            var user = users.FirstOrDefault(u =>
                u.Username == LoginDto.Username && u.Password == LoginDto.Password);

            if (user == null)
                return Unauthorized(new { message = "Usuário ou senha inválidos" });

            var token = TokenService.GenerateToken(user);
            return Ok(new { token });


        }

    }
}