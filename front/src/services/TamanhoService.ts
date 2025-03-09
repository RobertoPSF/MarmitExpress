import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class TamanhoService extends CoreService {
  private baseRoute = '/tamanhos';

  async getTamanhos(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default TamanhoService;
