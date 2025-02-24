import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class RestaurantService extends CoreService {
  private baseRoute = '/restaurantes';

  // Criar restaurante
  async createRestaurant(data: object): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().post(this.baseRoute, data);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Listar todos os restaurantes
  async getRestaurants(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Buscar restaurante por ID
  async getRestaurantById(id: string): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(`${this.baseRoute}/${id}`);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Atualizar restaurante por ID
  async updateRestaurant(
    id: string,
    data: object,
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().put(`${this.baseRoute}/${id}`, data);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Adicionar avaliação ao restaurante
  async addEvaluation(
    id: string,
    rating: number,
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().put(
        `${this.baseRoute}/${id}/avaliacao`,
        {
          avaliacao: rating,
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  // Deletar restaurante por ID
  async deleteRestaurant(id: string): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().delete(`${this.baseRoute}/${id}`);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Login do restaurante
  async login(credentials: {
    usuario: string;
    senha: string;
  }): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().post(
        `${this.baseRoute}/login`,
        credentials,
      );
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default RestaurantService;
