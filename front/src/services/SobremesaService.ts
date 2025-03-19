import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class SobremresaService extends CoreService {
  private baseRoute = '/sobremresas';

  async getSobremresas(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default SobremresaService;
