// Arquivo: js/pages/index.js
document.addEventListener('DOMContentLoaded', function() {
    const Modal = new CustomModal();

    document.getElementById('saiba-mais').addEventListener('click', function () {
        Modal.show('Sobre o Sistema de educação', `
                <p>Sistemas de educação</p>
                <p><strong>Principais recursos:</strong></p>
                <ul>
                <li>Gestão completa de alunos, cursos e disciplinas</li>
                <li>Controle de matrículas e frequência</li>
                <li>Relatórios personalizados</li>
                <li>Acesso multiperfil</li>
                <li>Interface responsiva</li>
                </ul>
            `, []);
    });
});