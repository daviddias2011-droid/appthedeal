
/**
 * THE DEAL - API Service Layer
 * Centraliza a comunicação com o backend PHP/MySQL hospedado na Locaweb.
 */

const BASE_URL = './api'; // Caminho relativo para os arquivos PHP

export const api = {
  async post(endpoint: string, data: any) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Erro na requisição ao terminal.');
    return result;
  },

  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Erro ao carregar dados do banco.');
    return result;
  }
};
