/**
 * THE DEAL - Alpha API Client
 * Comunicação resiliente com terminais PHP/MySQL
 */

export const api = {
  async get(endpoint: string) {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await fetch(endpoint, {
        headers: { 
          'Authorization': token ? `Bearer ${token}` : '',
          'Accept': 'application/json'
        }
      });
      return await this.handleResponse(response);
    } catch (error: any) {
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await this.handleResponse(response);
    } catch (error: any) {
      throw error;
    }
  },

  async handleResponse(response: Response) {
    const text = await response.text();
    const cleanText = text.trim(); // Remove espaços que o PHP pode ter inserido
    
    let data;
    try {
      data = cleanText ? JSON.parse(cleanText) : {};
    } catch (e) {
      console.error("ERRO DE PROTOCOLO ALPHA:", text);
      throw new Error('Resposta inválida do servidor. Verifique os logs de sistema.');
    }

    if (!response.ok) {
      throw new Error(data.message || `Erro do Terminal (Código: ${response.status})`);
    }
    
    return data;
  }
};