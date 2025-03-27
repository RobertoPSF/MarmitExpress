import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class ProteinaService extends CoreService {
  private baseRoute = '/proteinas';

  async getProteinas(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default ProteinaService;
