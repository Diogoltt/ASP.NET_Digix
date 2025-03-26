using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExercicioAPI_Maquina.Models
{
    public class Usuario
    {
        [Key]
        [Column("id_usuario")]
        public int ID_Usuario { get; set; }

        [StringLength(255)]
        [Column("password")]

        public string? Password { get; set; }

        [StringLength(255)]
        [Column("nome_usuario")]
        public string? Nome_Usuario { get; set; }

        [Column("ramal")]
        public int? Ramal { get; set; }

        [StringLength(255)]
        [Column("especialidade")]
        public string? Especialidade { get; set; }

        public virtual ICollection<Maquina>? Maquinas { get; set; }
    }
}
