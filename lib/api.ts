
/**
 * THE DEAL - Alpha API Client
 * Standardized fetch calls for MySQL/PHP backend.
 */

export const api = {
  // Verifica se o servidor de banco de dados está respondendo
  async checkConnection() {
    try {
      const response = await fetch('/api/health-check.php', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      return response.ok;
    } catch (e) {
      return false;
    }
  },

  async get(endpoint: string) {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(endpoint, {
      headers: { 
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/json'
      }
    });
    return this.handleResponse(response);
  },

  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return this.handleResponse(response);
  },

  async handleResponse(response: Response) {
    // Caso o servidor caia ou não exista (404)
    if (response.status === 404) {
       throw new Error('Terminal Offline: O endpoint da API não foi encontrado no servidor.');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro de comunicação com o terminal Alpha.');
    }
    return data;
  }
};
