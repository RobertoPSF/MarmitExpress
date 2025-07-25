import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class ItemService extends CoreService {
  private baseRoute = '/itens';

  // Criar um item
  async createItem(credentials: {
    nome: string;
    preco: number;
    quantidade: number;
    restauranteId: string;
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

  // Listar todos os itens
  async getItens(): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(this.baseRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }

  // Buscar um item por ID
  async getItemById(id: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(`${this.baseRoute}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }

  // Atualizar um item
  async updateItem(id: string, data: object): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().put(`${this.baseRoute}/${id}`, data);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Deletar um item
  async deleteItem(id: string): Promise<AxiosResponse | null> {
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

  // Buscar itens de um restaurante
  async getItensByRestaurante(
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

export default ItemService;
