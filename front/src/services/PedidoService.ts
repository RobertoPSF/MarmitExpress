import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class PedidoService extends CoreService {
  private baseRoute = '/pedidos';

  // Criar um pedido
  async createPedido(data: object): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().post(this.baseRoute, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }

  // Buscar pedido por ID
  async getPedidoById(id: string): Promise<AxiosResponse | null> {
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

  // Atualizar status do pedido
  async updatePedidoStatus(
    id: string,
    status: string,
  ): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().put(
        `${this.baseRoute}/${id}/status`,
        { status },
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  // Listar pedidos de um cliente
  async getPedidosByCliente(): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(`${this.baseRoute}/cliente`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return null;
    }
  }

  // Cancelar um pedido
  async cancelPedido(id: string): Promise<AxiosResponse | null> {
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

export default PedidoService;
