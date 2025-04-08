using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Como usar o Entity Framework Core para acessar o banco de dados
// Vamos ter mapear o schema do banco de dados para classes C#.
using System.ComponentModel.DataAnnotations.Schema;

namespace ExemploASP_NET_CORE.Models
{
    [Table("usuario")]
    public class Usuario
    {
        [Column("id")]
        public int Id {get; set;}
        [Column("nome")]
        public string Nome {get; set;}
        [Column("email")]
        public string Email {get; set;}
    }
}