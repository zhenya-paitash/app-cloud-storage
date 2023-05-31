import axios, { InternalAxiosRequestConfig } from 'axios'
import { parseCookies } from 'nookies'

axios.defaults.baseURL = "http://localhost:3000/api/v1"

const bearerReqInterceptor = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  if (typeof window !== 'undefined') {
    const { _token } = parseCookies();
    config.headers.Authorization = `Bearer ${_token}`;
  }

  return config
}

axios.interceptors.request.use(bearerReqInterceptor);

export default axios;