import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class AcompanhamentoService extends CoreService {
  private baseRoute = '/companhamentos';

  async getAcompanhamentos(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default AcompanhamentoService;
