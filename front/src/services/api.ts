import axios, { AxiosInstance } from 'axios';
import config from '../config.json';

const API_URL = config.API_URL;

class CoreService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 1000 * 10,
    });
  }

  getApi(): AxiosInstance {
    return this.api;
  }
}

export default CoreService;
