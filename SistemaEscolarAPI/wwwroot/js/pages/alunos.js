// Arquivo: js/pages/alunos.js
// Variáveis globais
let alunos = [];
let cursos = [];
let alunoToDelete = null;

// URLs da API
const API_URL = {
    ALUNOS: 'http://localhost:5204/api/Aluno',
    CURSOS: 'http://localhost:5204/api/Curso'
};

// Função para mostrar mensagem de alerta
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alertContainer.innerHTML = '', 150);
    }, 5000);
}

// Função para carregar cursos
async function loadCursos() {
    try {
        const response = await fetch(API_URL.CURSOS);
        if (!response.ok) throw new Error('Erro ao carregar cursos');
        
        const data = await response.json();
        cursos = data;
        
        console.log('Cursos carregados:', cursos);
        
        // Preencher select de cursos no filtro
        const searchCursoSelect = document.getElementById('search-curso');
        searchCursoSelect.innerHTML = '<option value="">Todos os cursos</option>';
        
        // Preencher select de cursos no formulário
        const alunoCursoSelect = document.getElementById('aluno-curso');
        alunoCursoSelect.innerHTML = '<option value="">Selecione um curso</option>';
        
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
            alunoCursoSelect.appendChild(formOption);
        });
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        showAlert('Não foi possível carregar a lista de cursos.', 'danger');
    }
}

// Função para carregar alunos
async function loadAlunos() {
    try {
        const response = await fetch(API_URL.ALUNOS);
        if (!response.ok) throw new Error('Erro ao carregar alunos');
        
        const data = await response.json();
        alunos = data;
        
        console.log('Alunos carregados:', alunos);
        displayAlunos(alunos);
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        showAlert('Não foi possível carregar a lista de alunos.', 'danger');
    }
}

// Função para exibir alunos na tabela
function displayAlunos(alunosToDisplay) {
    const tableBody = document.getElementById('alunos-table-body');
    const noResults = document.getElementById('no-results');
    
    tableBody.innerHTML = '';
    
    if (alunosToDisplay.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }
    
    noResults.classList.add('d-none');
    
    alunosToDisplay.forEach(aluno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.curso}</td>
            <td class="actions-column">
                <button class="btn btn-sm btn-info me-1 btn-editar" data-id="${aluno.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${aluno.id}" data-nome="${aluno.nome}">
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
            editAluno(id);
        });
    });
    
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const nome = this.getAttribute('data-nome');
            confirmDelete(id, nome);
        });
    });
}

// Função para filtrar alunos
function filterAlunos() {
    const nomeFilter = document.getElementById('search-nome').value.toLowerCase();
    const cursoFilter = document.getElementById('search-curso').value;
    
    const filteredAlunos = alunos.filter(aluno => {
        const matchesNome = aluno.nome.toLowerCase().includes(nomeFilter);
        const matchesCurso = cursoFilter === '' || aluno.curso === cursoFilter;
        return matchesNome && matchesCurso;
    });
    
    displayAlunos(filteredAlunos);
}

// Função para limpar formulário
function clearForm() {
    document.getElementById('aluno-id').value = '';
    document.getElementById('aluno-nome').value = '';
    document.getElementById('aluno-curso').value = '';
}

// Função para editar aluno
function editAluno(id) {
    const aluno = alunos.find(a => a.id == id);
    if (!aluno) return;
    
    document.getElementById('modalTitle').textContent = 'Editar Aluno';
    document.getElementById('aluno-id').value = aluno.id;
    document.getElementById('aluno-nome').value = aluno.nome;
    document.getElementById('aluno-curso').value = aluno.curso;
    
    alunoModal.show();
}

// Função para confirmar exclusão
function confirmDelete(id, nome) {
    alunoToDelete = id;
    document.getElementById('delete-aluno-nome').textContent = nome;
    confirmDeleteModal.show();
}

// Função para salvar aluno (criar ou atualizar)
async function saveAluno() {
    const id = document.getElementById('aluno-id').value;
    const nome = document.getElementById('aluno-nome').value;
    const curso = document.getElementById('aluno-curso').value;
    
    if (!nome || !curso) {
        showAlert('Preencha todos os campos obrigatórios.', 'warning');
        return;
    }
    
    const alunoData = {
        nome: nome,
        curso: curso
    };
    
    try {
        let response;
        let method;
        let url = API_URL.ALUNOS;
        
        if (id) {
            // Atualização
            alunoData.id = parseInt(id);
            method = 'PUT';
            url = `${API_URL.ALUNOS}/${id}`;
        } else {
            // Criação
            method = 'POST';
        }
        
        response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar aluno');
        }
        
        alunoModal.hide();
        await loadAlunos();
        showAlert(`Aluno ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
    } catch (error) {
        console.error('Erro ao salvar aluno:', error);
        showAlert(`Erro ao ${id ? 'atualizar' : 'cadastrar'} aluno: ${error.message}`, 'danger');
    }
}

// Função para excluir aluno
async function deleteAluno() {
    if (!alunoToDelete) return;
    
    try {
        const response = await fetch(`${API_URL.ALUNOS}/${alunoToDelete}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao excluir aluno');
        }
        
        confirmDeleteModal.hide();
        await loadAlunos();
        showAlert('Aluno excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        showAlert(`Erro ao excluir aluno: ${error.message}`, 'danger');
    } finally {
        alunoToDelete = null;
    }
}

// Inicialização e Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    window.alunoModal = new bootstrap.Modal(document.getElementById('alunoModal'));
    window.confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    
    // Carregar dados iniciais
    loadCursos();
    loadAlunos();
    
    // Botão de novo aluno
    document.getElementById('btn-novo-aluno').addEventListener('click', () => {
        clearForm();
        document.getElementById('modalTitle').textContent = 'Novo Aluno';
        alunoModal.show();
    });
    
    // Botão de buscar
    document.getElementById('btn-buscar').addEventListener('click', filterAlunos);
    
    // Filtrar ao pressionar Enter nos campos de busca
    document.getElementById('search-nome').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterAlunos();
    });
    
    // Botão de salvar aluno
    document.getElementById('btn-salvar').addEventListener('click', saveAluno);
    
    // Botão de confirmar exclusão
    document.getElementById('btn-confirmar-exclusao').addEventListener('click', deleteAluno);
});