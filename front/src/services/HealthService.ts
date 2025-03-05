import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class HealthService extends CoreService {
  private baseRoute = '/health';

  // Verificar o status de saúde da API
  async checkHealth(): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().get(this.baseRoute);
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default HealthService;
