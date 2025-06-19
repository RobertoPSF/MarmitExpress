import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class ClienteService extends CoreService {
  private baseRoute = '/clientes';

  // Listar todos os clientes
  async getClientes(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }

  // Buscar meu perfil
  async getMeuPerfil(): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(`${this.baseRoute}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }

  // Atualizar meu perfil
  async updateMeuPerfil(data: object): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().put(`${this.baseRoute}/me`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }

  // Deletar cliente por ID
  async deleteCliente(id: string): Promise<AxiosResponse | null> {
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
}

export default ClienteService;
