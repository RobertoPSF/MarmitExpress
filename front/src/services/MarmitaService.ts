import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class MarmitaService extends CoreService {
  private baseRoute = '/marmitas';

  // Criar Marmita
  async createMarmita(data: object): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().post(this.baseRoute, data);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Listar todas as Marmitas
  async getMarmitas(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Buscar Marmita por ID
  async getMarmitaById(id: string): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(`${this.baseRoute}/${id}`);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Listar Marmitas de um Restaurante
  async getMarmitasByRestaurant(
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

  // Atualizar Marmita
  async updateMarmita(id: string, data: object): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().put(`${this.baseRoute}/${id}`, data);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Deletar Marmita
  async deleteMarmita(id: string): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().delete(`${this.baseRoute}/${id}`);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default MarmitaService;
