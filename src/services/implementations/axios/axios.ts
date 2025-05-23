import { ApiProtocols } from '@/services/protocols/axios/axios';
import axios, { AxiosRequestConfig } from 'axios';

export class AxiosHelper implements ApiProtocols {
  constructor() {}

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await axios.get(url, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return await axios.post(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return await axios.put(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await axios.delete(url, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return await axios.patch(url, data, config);
  }
}
