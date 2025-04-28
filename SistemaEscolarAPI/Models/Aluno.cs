namespace SistemaEscolarAPI.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int CursoId { get; set; }
        public Curso Curso { get; set; }


        // ICollection é uma coleção que pode conter múltiplos itens, e é usada para representar um relacionamento de um-para-muitos.
        // Neste caso, um aluno pode ter várias disciplinas associadas a ele através do relacionamento com a tabela DisciplinaAlunoCurso.
        public ICollection<DisciplinaAlunoCurso> DisciplinaAlunoCursos { get; set; } = new List<DisciplinaAlunoCurso>();
    }
}