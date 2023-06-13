// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosError } from 'axios';
import { APP_KEYS } from '../modules/common/consts';

export default class HttpService {
  constructor(
    public baseUrl = process.env.REACT_APP_SERVER_URL,
    public fetchingService = axios,
    public apiVersion = APP_KEYS.BACKEND_KEYS.API_VERSION
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN)
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: any) {
    return configWithoutDataAndUrl;
  }

  private handleRequestError(error: AxiosError): never {
    throw error.response;
  }

  async get(config: any, withAuth = false) {
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

  async post(config: any, withAuth = false) {
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
        localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, token);
      }
      return res.data;
    } catch (error) {
      this.handleRequestError(error as AxiosError);
    }
  }

  async put(config: any, withAuth = true) {
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

  async delete(config: any, withAuth = true) {
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
