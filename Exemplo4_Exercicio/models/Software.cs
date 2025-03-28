using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exemplo5ComBancoEntity.Models
{

    [Table("software")]
    public class Software
    {
        [Key] // Define a chave primária
        [Column("id_software")]
        public int Id { get; set; }

        [Column("produto")]
        public string Produto { get; set; }

        [Column("harddisk")]
        public int HardDisk { get; set; }

        [Column("memoria_ram")]
        public int MemoriaRam { get; set; }

        [ForeignKey("Maquina")] // Define a chave estrangeira
        [Column("fk_maquina")]
        public int FkMaquina { get; set; }
    }
}