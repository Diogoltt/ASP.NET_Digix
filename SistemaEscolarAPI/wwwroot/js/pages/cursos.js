// Arquivo: js/pages/cursos.js
// Variáveis globais
let cursos = [];
let cursoToDelete = null;

// URLs da API
const API_URL = {
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
        displayCursos(cursos);
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        showAlert('Não foi possível carregar a lista de cursos.', 'danger');
    }
}

// Função para exibir cursos na tabela
function displayCursos(cursosToDisplay) {
    const tableBody = document.getElementById('cursos-table-body');
    const noResults = document.getElementById('no-results');
    
    tableBody.innerHTML = '';
    
    if (cursosToDisplay.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }
    
    noResults.classList.add('d-none');
    
    cursosToDisplay.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${curso.id}</td>
            <td>${curso.descricao}</td>
            <td class="actions-column">
                <button class="btn btn-sm btn-info me-1 btn-editar" data-id="${curso.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${curso.id}" data-descricao="${curso.descricao}">
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
            editCurso(id);
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

// Função para filtrar cursos
function filterCursos() {
    const descricaoFilter = document.getElementById('search-descricao').value.toLowerCase();
    
    const filteredCursos = cursos.filter(curso => {
        return curso.descricao.toLowerCase().includes(descricaoFilter);
    });
    
    displayCursos(filteredCursos);
}

// Função para limpar formulário
function clearForm() {
    document.getElementById('curso-id').value = '';
    document.getElementById('curso-descricao').value = '';
}

// Função para editar curso
function editCurso(id) {
    const curso = cursos.find(c => c.id == id);
    if (!curso) return;
    
    document.getElementById('modalTitle').textContent = 'Editar Curso';
    document.getElementById('curso-id').value = curso.id;
    document.getElementById('curso-descricao').value = curso.descricao;
    
    cursoModal.show();
}

// Função para confirmar exclusão
function confirmDelete(id, descricao) {
    cursoToDelete = id;
    document.getElementById('delete-curso-descricao').textContent = descricao;
    confirmDeleteModal.show();
}

// Função para salvar curso (criar ou atualizar)
async function saveCurso() {
    const id = document.getElementById('curso-id').value;
    const descricao = document.getElementById('curso-descricao').value;
    
    if (!descricao) {
        showAlert('Preencha o campo de descrição.', 'warning');
        return;
    }
    
    const cursoData = {
        descricao: descricao
    };
    
    try {
        let response;
        let method;
        let url = API_URL.CURSOS;
        
        if (id) {
            // Atualização
            cursoData.id = parseInt(id);
            method = 'PUT';
            url = `${API_URL.CURSOS}/${id}`;
        } else {
            // Criação
            method = 'POST';
        }
        
        response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursoData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar curso');
        }
        
        cursoModal.hide();
        await loadCursos();
        showAlert(`Curso ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
    } catch (error) {
        console.error('Erro ao salvar curso:', error);
        showAlert(`Erro ao ${id ? 'atualizar' : 'cadastrar'} curso: ${error.message}`, 'danger');
    }
}

// Função para excluir curso
async function deleteCurso() {
    if (!cursoToDelete) return;
    
    try {
        const response = await fetch(`${API_URL.CURSOS}/${cursoToDelete}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao excluir curso');
        }
        
        confirmDeleteModal.hide();
        await loadCursos();
        showAlert('Curso excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir curso:', error);
        showAlert(`Erro ao excluir curso: ${error.message}`, 'danger');
    } finally {
        cursoToDelete = null;
    }
}

// Inicialização e Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    window.cursoModal = new bootstrap.Modal(document.getElementById('cursoModal'));
    window.confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    
    // Carregar dados iniciais
    loadCursos();
    
    // Botão de novo curso
    document.getElementById('btn-novo-curso').addEventListener('click', () => {
        clearForm();
        document.getElementById('modalTitle').textContent = 'Novo Curso';
        cursoModal.show();
    });
    
    // Botão de buscar
    document.getElementById('btn-buscar').addEventListener('click', filterCursos);
    
    // Filtrar ao pressionar Enter nos campos de busca
    document.getElementById('search-descricao').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterCursos();
    });
    
    // Botão de salvar curso
    document.getElementById('btn-salvar').addEventListener('click', saveCurso);
    
    // Botão de confirmar exclusão
    document.getElementById('btn-confirmar-exclusao').addEventListener('click', deleteCurso);
});