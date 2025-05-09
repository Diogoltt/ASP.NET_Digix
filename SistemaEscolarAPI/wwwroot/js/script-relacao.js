document.addEventListener("DOMContentLoaded", function () {
    const dacForm = document.getElementById('doc-form');
    const alunoIdInput = document.getElementById('aluno-id');
    const cursoIdInput = document.getElementById('curso-id');
    const diciplinaIdImput = document.getElementById('disciplina-id');
    const cancelarBtn = document.getElementById("cancelar-btn");
    const relacoesTable = document.getElementById('relacoes-table');
    const formTitle = document.getElementById('form-title');
    let editingId = null;

    carregarRelações();

    dacForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const relacao = {
            alunoId: parent(alunoIdInput.value),
            cursoId: parent(cursoIdInput.value),
            disciplinaId: parent(diciplinaIdImput.value),
        };

        if (editingId) {
            atualizarRelacao(editingId, relacao);
        }
        else {
            adionarRelacao(relacao);
        }

    });

    // Botão cancelar edição
    cancelarBtn.addEventListener('click', function () {
        resertForm();
    })

    // Listando
    function carregarRelações() {
        fetch('api/DisciplinaAlunoCurso')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carrega relações");
                }
                return response.json();
            })
            .then(data => {
                relacoesTable.innerHTML = '';
                data.forEach(relacao => {
                    adicionarRelacaoNaTabela(relacao);
                });
            })
            .catch(error => {
                console.error('Erro ao carrega relações.', error);
                alert('Erro ao carregar relações. Verifiqeu o console para mais detalher')
            });

    }

    function adicionarRelacaoNaTabela(relacao) {
        const row = document.createElement('tr');

        row.innerHTML = `<td>${relacao.alunoNome} (Id: ${relacao.alunoId}) </td>
        <td>${relacao.cursoDescricao} (Id: ${relacao.cursoId}) </td>
        <td>${relacao.disciplinaDescricao} (Id: ${relacao.disciplinaId}) </td>
        <td>
        <button class="btn btn-warning btn-sm" onclick="editarRelacao(${relacao.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="excluirRelacao(${relacao.id})">Excluir</button>
         </td>
        `;

        relacoesTable.appendChild(row);

        row.querySelector('.editar-btn').addEventListener('click', function () {
            editarRelacao(relacao.id);
        });

        row.querySelector('.deletar-btn').addEventListener('click', function () {
            if (confirm('Tem certeza que deseja excluir esta relação')) {
                deletarRelacao(relacao.id);
            }
        });


    }

    // Função para adicionar relação
    function adicionarRelacao(relacao) {
        fetch('/api/DisciplinaAlunoCurso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(relacao)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar relação');
                }
                return response.json();
            })
            .then(data => {
                carregarRelacoes();
                resetForm();
            })
            .catch(error => {
                console.error('Erro ao adicionar relação:', error);
                alert('Erro ao adicionar relação. Verifique o console para mais detalhes.');
            });
    }

    // Função para editar relação
    function editarRelacao(id) {
        fetch(`/api/DisciplinaAlunoCurso/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar relação para edição');
                }
                return response.json();
            })
            .then(data => {
                alunoIdInput.value = data.alunoId;
                cursoIdInput.value = data.cursoId;
                disciplinaIdInput.value = data.disciplinaId;
                relacaoIdInput.value = data.id;
                editingId = data.id;
                formTitle.textContent = 'Editar Relação';
                cancelarBtn.style.display = 'inline-block';
            })
            .catch(error => {
                console.error('Erro ao carregar relação para edição:', error);
                alert('Erro ao carregar relação para edição. Verifique o console para mais detalhes.');
            });
    }

    // Função para atualizar relação
    function atualizarRelacao(id, relacao) {
        fetch(`/api/DisciplinaAlunoCurso/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(relacao)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao atualizar relação');
                }
                carregarRelacoes();
                resetForm();
            })
            .catch(error => {
                console.error('Erro ao atualizar relação:', error);
                alert('Erro ao atualizar relação. Verifique o console para mais detalhes.');
            });
    }

    // Função para deletar relação
    function deletarRelacao(id) {
        fetch(`/api/DisciplinaAlunoCurso/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao deletar relação');
                }
                carregarRelacoes();
            })
            .catch(error => {
                console.error('Erro ao deletar relação:', error);
                alert('Erro ao deletar relação. Verifique o console para mais detalhes.');
            });
    }

    // Função para resetar o formulário
    function resetForm() {
        dacForm.reset();
        editingId = null;
        formTitle.textContent = 'Adicionar Nova Relação';
        cancelarBtn.style.display = 'none';
    }
});