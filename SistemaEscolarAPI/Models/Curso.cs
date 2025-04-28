namespace SistemaEscolarAPI.Models
{
    public class Curso
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        
        public ICollection<DisciplinaAlunoCurso> DisciplinaAlunoCursos { get; set; }
    }
}