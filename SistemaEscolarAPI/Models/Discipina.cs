namespace SistemaEscolarAPI.Models
{
    public class Disciplina
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public int CursoId { get; set; }
        public Curso Curso { get; set; }
    }
}