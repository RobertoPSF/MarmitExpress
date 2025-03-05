import axios, { AxiosInstance } from 'axios';
import config from '../config.json'; // Ajuste o caminho se necessário
import Cookies from 'js-cookie'; // Para acessar o token JWT dos cookies

const API_URL = config.API_URL;

class CoreService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 1000 * 10,
    });

    this.api.interceptors.request.use((config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getApi(): AxiosInstance {
    return this.api;
  }
}

export default CoreService;
