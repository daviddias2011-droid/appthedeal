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
    // Limpeza profunda para evitar que quebras de linha no PHP quebrem o JSON.parse
    const cleanText = text.trim();
    
    let data;
    try {
      data = cleanText ? JSON.parse(cleanText) : {};
    } catch (e) {
      console.error("ERRO DE PROTOCOLO ALPHA - Resposta bruta:", text);
      throw new Error('Resposta do servidor não é um JSON válido. Verifique o terminal PHP.');
    }

    if (!response.ok) {
      throw new Error(data.message || `Erro do Terminal (Código: ${response.status})`);
    }
    
    return data;
  }
};