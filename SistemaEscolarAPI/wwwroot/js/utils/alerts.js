// Utilitário para gerenciar alertas na aplicação
const AlertManager = {
    /**
     * Exibe um alerta na página
     * @param {string} message - Mensagem a ser exibida
     * @param {string} type - Tipo do alerta (success, danger, warning, info)
     */
    show: (message, type = 'success') => {
        const alertContainer = document.getElementById('alert-container');
        if (!alertContainer) {
            console.error('Elemento com ID "alert-container" não encontrado na página');
            return;
        }
        
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
    },
    
    /**
     * Exibe um alerta de sucesso
     * @param {string} message - Mensagem a ser exibida
     */
    success: (message) => {
        AlertManager.show(message, 'success');
    },
    
    /**
     * Exibe um alerta de erro
     * @param {string} message - Mensagem a ser exibida
     */
    error: (message) => {
        AlertManager.show(message, 'danger');
    },
    
    /**
     * Exibe um alerta de aviso
     * @param {string} message - Mensagem a ser exibida
     */
    warning: (message) => {
        AlertManager.show(message, 'warning');
    },
    
    /**
     * Exibe um alerta informativo
     * @param {string} message - Mensagem a ser exibida
     */
    info: (message) => {
        AlertManager.show(message, 'info');
    }
};