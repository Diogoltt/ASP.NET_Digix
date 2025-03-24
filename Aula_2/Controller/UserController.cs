using Aula2.Models;
using Microsoft.AspNetCore.Mvc;

namespace Aula2.Controller
{
    [ApiController]
    [Route("/[controller]")]
    public class UserController : ControllerBase
    {
        private static List<User> Users = new List<User>()
        {
            new User {Id = 1, Name = "Diogo", Email = "diogo@gmail.com"},
            new User {Id = 2, Name = "Lahra", Email = "lahra@gmail.com"},
            new User {Id = 3, Name = "Teste", Email = "teste@gmail.com"}
        };


        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Users;
        }

        [HttpPost]
        public User Post([FromBody] User user)
        {
            Users.Add(user);
            return user;
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User user)
        {
            var existingUser = Users.Where(x => x.Id == id).FirstOrDefault();

            if (existingUser != null)
            {
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var existingUser = Users.Where(x => x.Id == id).FirstOrDefault();

            if (existingUser != null)
            {
                Users.Remove(existingUser);
            }
        }

    }
}