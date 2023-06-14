// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { APP_KEYS } from '../modules/common/consts';

type FetchingService = typeof axios;

interface Config extends AxiosRequestConfig {
  url: string;
  recieveAuthHeader?: boolean;
}

export default class HttpService {
  constructor(
    public baseUrl = process.env.REACT_APP_SERVER_URL,
    public fetchingService: FetchingService = axios,
    public apiVersion = APP_KEYS.BACKEND_KEYS.API_VERSION
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): Record<string, string> {
    return {
      Authorization: localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN) || ''
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: Config) {
    return configWithoutDataAndUrl;
  }

  private handleRequestError(error: AxiosError): never {
    throw error.response;
  }

  async get<T>(config: any, withAuth = false): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateTokenToHeaderConfig()
        };
      }

      const { data } = await this.fetchingService.get(
        this.getFullApiUrl(config.url),
        this.extractUrlAndDataFromConfig(config)
      );
      return data;
    } catch (error) {
      this.handleRequestError(error as AxiosError);
    }
  }

  async post<T>(config: Config, withAuth = false): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateTokenToHeaderConfig()
        };
      }
      const res = await this.fetchingService.post(
        this.getFullApiUrl(config.url),
        config.data,
        this.extractUrlAndDataFromConfig(config)
      );

      if (config.recieveAuthHeader) {
        const token = res.headers.authorization;
        localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, token || '');
      }
      return res.data;
    } catch (error) {
      this.handleRequestError(error as AxiosError);
    }
  }

  async put<T>(config: Config, withAuth = true): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateTokenToHeaderConfig()
        };
      }
      const { data } = await this.fetchingService.put(
        this.getFullApiUrl(config.url),
        config.data,
        this.extractUrlAndDataFromConfig(config)
      );
      return data;
    } catch (error) {
      this.handleRequestError(error as AxiosError);
    }
  }

  async delete<T>(config: Config, withAuth = true): Promise<T> {
    try {
      if (withAuth) {
        config.headers = {
          ...config.headers,
          ...this.populateTokenToHeaderConfig()
        };
      }
      const { data } = await this.fetchingService.delete(
        this.getFullApiUrl(config.url),
        this.extractUrlAndDataFromConfig(config)
      );
      return data;
    } catch (error) {
      this.handleRequestError(error as AxiosError);
    }
  }
}
