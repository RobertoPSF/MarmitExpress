import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class BebidaService extends CoreService {
  private baseRoute = '/bebidas';

  async getBebidas(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default BebidaService;
