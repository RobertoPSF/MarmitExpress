import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class PagamentoService extends CoreService {
  private baseRoute = '/pagamentos';

  // Criar pagamento
  async criarPagamento(
    descricao: string,
    idPedido: string,
  ): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().post(
        this.baseRoute,
        { descricao, idPedido },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  // Obter payload PIX para gerar QR Code
  async obterPayloadPix(idPagamento: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(
        `${this.baseRoute}/${idPagamento}/payload`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  // Confirmar pagamento
  async confirmarPagamento(idPagamento: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().patch(
        `${this.baseRoute}/${idPagamento}/confirmar`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  // Verificar status do pagamento
  async verificarStatus(idPagamento: string): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().get(
        `${this.baseRoute}/${idPagamento}/status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default PagamentoService;
