/**
 * THE DEAL - Alpha API Client
 * Standardized fetch calls for MySQL/PHP backend.
 * Robust handling for non-JSON responses.
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
    const text = await response.text();
    
    // Se o terminal estiver offline ou rota não existir
    if (response.status === 404) {
       throw new Error('Terminal Offline: O endpoint da API não foi encontrado.');
    }

    let data;
    try {
      // Tenta transformar em JSON
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      // Se não for JSON, loga o erro bruto e lança uma mensagem amigável
      console.error("Resposta inválida do servidor:", text);
      throw new Error('O servidor retornou uma resposta corrompida. Verifique os logs do console.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Erro de comunicação com o terminal Alpha.');
    }
    return data;
  }
};