using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExercicioAPI_Maquina.Models
{
public class Maquina
{
    [Key]
    [Column("id_maquina")]
    public int Id_Maquina { get; set; }

    [StringLength(255)]
    [Column("tipo")]
    public string? Tipo { get; set; }

    [Column("velocidade")]
    public int? Velocidade { get; set; }

    [Column("harddisk")]
    public int? HardDisk { get; set; }

    [Column("placa_rede")]
    public int? Placa_Rede { get; set; }

    [Column("memoria_ram")]
    public int? Memoria_Ram { get; set; }

    [ForeignKey("Usuario")]
    [Column("fk_usuario")]
    public int? Fk_Usuario { get; set; }

    public virtual Usuario? Usuario { get; set; }

    public virtual ICollection<Software>? Softwares { get; set; }
}

}
