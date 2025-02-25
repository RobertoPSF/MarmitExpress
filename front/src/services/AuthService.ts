import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class AuthService extends CoreService {
  private baseRoute = '/auth';

  async registerUser(data: {
    nome: string;
    email: string;
    senha: string;
    endereco: string;
    telefone: string;
    role: 'CLIENTE' | 'RESTAURANTE';
  }): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().post(
        `${this.baseRoute}/register`,
        data,
      );
      return response;
    } catch (error) {
      return null;
    }
  }

  async loginUser(credentials: {
    email: string;
    senha: string;
  }): Promise<AxiosResponse | null> {
    try {
      const response = await this.getApi().post(
        `${this.baseRoute}/login`,
        credentials,
      );
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
