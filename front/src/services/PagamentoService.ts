import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class PagamentoService extends CoreService {
  private baseRoute = '/pagamentos';

  // Criar um pagamento
  async createPagamento(data: object): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().post(this.baseRoute, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      return null;
    }
  }

  // Obter payload PIX para gerar QR Code
  async getPixPayload(id: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(
        `${this.baseRoute}/${id}/payload`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    } catch (error) {
      console.error('Erro ao obter payload PIX:', error);
      return null;
    }
  }

  // Confirmar pagamento
  async confirmarPagamento(id: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().patch(
        `${this.baseRoute}/${id}/confirmar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      return null;
    }
  }

  // Verificar status do pagamento
  async getStatusPagamento(id: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(
        `${this.baseRoute}/${id}/status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      return null;
    }
  }
}

export default PagamentoService;
