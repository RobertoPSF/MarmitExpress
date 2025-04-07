import CoreService from './CoreService';
import { AxiosResponse } from 'axios';

class AuthService extends CoreService {
  private baseRoute = '/auth';

  async registerUser(data: {
    nome: string;
    email: string;
    senha: string;
    descricao?: string;
    chavePix?: string;
    endereco: string;
    telefone: string;
    nomeProprietario?: string;
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

  async changePassword(credentials: {
    email: string;
    senha: string;
  }): Promise<AxiosResponse | null> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await this.getApi().post(
        `${this.baseRoute}/new-password`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
