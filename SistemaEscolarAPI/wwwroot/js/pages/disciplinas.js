// Arquivo: js/pages/disciplinas.js
// Variáveis globais
let disciplinas = [];
let cursos = [];
let disciplinaToDelete = null;

// Função para carregar cursos
async function loadCursos() {
    try {
        cursos = await ApiService.get('Curso');
        console.log('Cursos carregados:', cursos);
        
        // Preencher select de cursos no filtro
        const searchCursoSelect = document.getElementById('search-curso');
        searchCursoSelect.innerHTML = '<option value="">Todos os cursos</option>';
        
        // Preencher select de cursos no formulário
        const disciplinaCursoSelect = document.getElementById('disciplina-curso');
        disciplinaCursoSelect.innerHTML = '<option value="">Selecione um curso</option>';
        
        cursos.forEach(curso => {
            // Adicionar ao select de filtro
            const searchOption = document.createElement('option');
            searchOption.value = curso.descricao;
            searchOption.textContent = curso.descricao;
            searchCursoSelect.appendChild(searchOption);
            
            // Adicionar ao select do formulário
            const formOption = document.createElement('option');
            formOption.value = curso.descricao;
            formOption.textContent = curso.descricao;
            disciplinaCursoSelect.appendChild(formOption);
        });
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        AlertManager.error('Não foi possível carregar a lista de cursos.');
    }
}

// Função para carregar disciplinas
async function loadDisciplinas() {
    try {
        disciplinas = await ApiService.get('Disciplina');
        console.log('Disciplinas carregadas:', disciplinas);
        displayDisciplinas(disciplinas);
    } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
        AlertManager.error('Não foi possível carregar a lista de disciplinas.');
    }
}

// Função para exibir disciplinas na tabela
function displayDisciplinas(disciplinasToDisplay) {
    const tableBody = document.getElementById('disciplinas-table-body');
    const noResults = document.getElementById('no-results');
    
    tableBody.innerHTML = '';
    
    if (disciplinasToDisplay.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }
    
    noResults.classList.add('d-none');
    
    disciplinasToDisplay.forEach(disciplina => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${disciplina.id}</td>
            <td>${disciplina.descricao}</td>
            <td>${disciplina.curso}</td>
            <td class="actions-column">
                <button class="btn btn-sm btn-info me-1 btn-editar" data-id="${disciplina.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${disciplina.id}" data-descricao="${disciplina.descricao}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Adicionar event listeners para botões de editar e excluir
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            editDisciplina(id);
        });
    });
    
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const descricao = this.getAttribute('data-descricao');
            confirmDelete(id, descricao);
        });
    });
}

// Função para filtrar disciplinas
function filterDisciplinas() {
    const descricaoFilter = document.getElementById('search-descricao').value.toLowerCase();
    const cursoFilter = document.getElementById('search-curso').value;
    
    const filteredDisciplinas = disciplinas.filter(disciplina => {
        const matchesDescricao = disciplina.descricao.toLowerCase().includes(descricaoFilter);
        const matchesCurso = cursoFilter === '' || disciplina.curso === cursoFilter;
        return matchesDescricao && matchesCurso;
    });
    
    displayDisciplinas(filteredDisciplinas);
}

// Função para limpar formulário
function clearForm() {
    document.getElementById('disciplina-id').value = '';
    document.getElementById('disciplina-descricao').value = '';
    document.getElementById('disciplina-curso').value = '';
}

// Função para editar disciplina
function editDisciplina(id) {
    const disciplina = disciplinas.find(d => d.id == id);
    if (!disciplina) return;
    
    document.getElementById('modalTitle').textContent = 'Editar Disciplina';
    document.getElementById('disciplina-id').value = disciplina.id;
    document.getElementById('disciplina-descricao').value = disciplina.descricao;
    document.getElementById('disciplina-curso').value = disciplina.curso;
    
    disciplinaModal.show();
}

// Função para confirmar exclusão
function confirmDelete(id, descricao) {
    disciplinaToDelete = id;
    document.getElementById('delete-disciplina-descricao').textContent = descricao;
    confirmDeleteModal.show();
}

// Função para salvar disciplina (criar ou atualizar)
async function saveDisciplina() {
    const id = document.getElementById('disciplina-id').value;
    const descricao = document.getElementById('disciplina-descricao').value;
    const curso = document.getElementById('disciplina-curso').value;
    
    if (!descricao || !curso) {
        AlertManager.warning('Preencha todos os campos obrigatórios.');
        return;
    }
    
    const disciplinaData = {
        descricao: descricao,
        curso: curso
    };
    
    try {
        if (id) {
            // Atualização
            disciplinaData.id = parseInt(id);
            await ApiService.put(`Disciplina/${id}`, disciplinaData);
            AlertManager.success('Disciplina atualizada com sucesso!');
        } else {
            // Criação
            await ApiService.post('Disciplina', disciplinaData);
            AlertManager.success('Disciplina cadastrada com sucesso!');
        }
        
        disciplinaModal.hide();
        await loadDisciplinas();
    } catch (error) {
        console.error('Erro ao salvar disciplina:', error);
        AlertManager.error(`Erro ao ${id ? 'atualizar' : 'cadastrar'} disciplina: ${error.message}`);
    }
}

// Função para excluir disciplina
async function deleteDisciplina() {
    if (!disciplinaToDelete) return;
    
    try {
        await ApiService.delete(`Disciplina/${disciplinaToDelete}`);
        confirmDeleteModal.hide();
        await loadDisciplinas();
        AlertManager.success('Disciplina excluída com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir disciplina:', error);
        AlertManager.error(`Erro ao excluir disciplina: ${error.message}`);
    } finally {
        disciplinaToDelete = null;
    }
}

// Inicialização e Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    window.disciplinaModal = new bootstrap.Modal(document.getElementById('disciplinaModal'));
    window.confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    
    // Carregar dados iniciais
    loadCursos();
    loadDisciplinas();
    
    // Botão de nova disciplina
    document.getElementById('btn-nova-disciplina').addEventListener('click', () => {
        clearForm();
        document.getElementById('modalTitle').textContent = 'Nova Disciplina';
        disciplinaModal.show();
    });
    
    // Botão de buscar
    document.getElementById('btn-buscar').addEventListener('click', filterDisciplinas);
    
    // Filtrar ao pressionar Enter nos campos de busca
    document.getElementById('search-descricao').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterDisciplinas();
    });
    
    // Botão de salvar disciplina
    document.getElementById('btn-salvar').addEventListener('click', saveDisciplina);
    
    // Botão de confirmar exclusão
    document.getElementById('btn-confirmar-exclusao').addEventListener('click', deleteDisciplina);
});