/**
 * THE DEAL - Alpha API Client
 */

export const api = {
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
    let data;
    
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Resposta não-JSON detectada:", text);
      throw new Error('O servidor Alpha retornou um erro inesperado. Verifique os logs do sistema.');
    }

    if (!response.ok) {
      // Prioriza a mensagem vinda do PHP se existir
      throw new Error(data.message || `Erro do terminal (Status: ${response.status})`);
    }
    
    return data;
  }
};