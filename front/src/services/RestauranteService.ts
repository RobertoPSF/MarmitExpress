import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class RestaurantService extends CoreService {
  private baseRoute = '/restaurantes';

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

  // Buscar meu perfil
  async getMyProfile(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(`${this.baseRoute}/me`);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Atualizar meu perfil
  async updateMyProfile(data: object): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().put(`${this.baseRoute}/me`, data);
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
}

export default RestaurantService;
