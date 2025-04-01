import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class IngredienteService extends CoreService {
  private baseRoute = '/ingredientes';

  // Criar um ingrediente
  async createIngrediente(credentials: {
    nome: string;
  }): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().post(
        `${this.baseRoute}`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  // Listar ingredientes do restaurante do usuário
  async getIngredientes(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Buscar ingrediente por ID
  async getIngredienteById(id: string): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(`${this.baseRoute}/${id}`);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Atualizar ingrediente
  async updateIngrediente(
    id: string,
    data: { nome: string },
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().put(`${this.baseRoute}/${id}`, data);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Deletar ingrediente
  async deleteIngrediente(id: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().delete(`${this.baseRoute}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }

  // Listar ingredientes de um restaurante específico
  async getIngredientesByRestaurante(
    restauranteId: string,
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(
        `${this.baseRoute}/restaurante/${restauranteId}`,
      );
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default IngredienteService;
