using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExercicioAPI_Maquina.Models
{
    public class Software
    {
        [Key]
        [Column("id_software")]
        public int Id_Software { get; set; }

        [StringLength(255)]
        [Column("produto")]
        public string? Produto { get; set; }

        [Column("harddisk")]
        public int? HardDisk { get; set; }

        [Column("memoria_ram")]
        public int? Memoria_Ram { get; set; }

        [ForeignKey("Maquina")]
        [Column("fk_maquina")]
        public int? Fk_Maquina { get; set; }

        public virtual Maquina? Maquina { get; set; }
    }
}