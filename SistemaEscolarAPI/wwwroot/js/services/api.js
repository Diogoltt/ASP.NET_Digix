// Serviço centralizado para comunicação com a API
const API_BASE_URL = 'http://localhost:5204/api';

const ApiService = {
    // Método para realizar requisições GET
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erro ao fazer GET para ${endpoint}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição GET para ${endpoint}:`, error);
            throw error;
        }
    },
    
    // Método para realizar requisições POST
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erro ao fazer POST para ${endpoint}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição POST para ${endpoint}:`, error);
            throw error;
        }
    },
    
    // Método para realizar requisições PUT
    put: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erro ao fazer PUT para ${endpoint}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição PUT para ${endpoint}:`, error);
            throw error;
        }
    },
    
    // Método para realizar requisições DELETE
    delete: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erro ao fazer DELETE para ${endpoint}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição DELETE para ${endpoint}:`, error);
            throw error;
        }
    }
};