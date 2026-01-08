
/**
 * THE DEAL - Alpha API Client
 * Standardized fetch calls for MySQL/PHP backend.
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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro de comunicação com o terminal Alpha.');
    }
    return data;
  }
};
