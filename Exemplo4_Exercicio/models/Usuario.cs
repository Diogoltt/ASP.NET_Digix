using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;


using System.ComponentModel.DataAnnotations.Schema;


namespace Exemplo5ComBancoEntity.Models
{
    [Table("usuarios")]
    public class Usuario
    {
        [Key]
        [Column("id_usuario")]
         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("nome_usuario")]
        public string Nome { get; set; }
     
        [Column("password")]
        public string Password { get; set; }

        [Column("ramal")]
        public int Ramal { get; set; }

        [Column("especialidade")]
        public string Especialidade { get; set; }

        // public List<Maquina> Maquinas { get; set; }
    }
}