import axios from 'axios'

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return request
  }

  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})

protectedApi.interceptors.response.use(
  // Será executada caso tenha sucesso
  (response) => response,
  // Será executada caso tenha erro
  async (error) => {
    const request = error.config
    // Verificar se tenho refresh token
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      return Promise.reject(error)
    }
    // Verificar se o erro é 401 (token inválido ou inexistente)
    if (
      error.response.status == 401 &&
      !request._retry &&
      !request.url.includes('/users/refresh-token')
    ) {
      request._retry = true
      // Se eu tiver o refresh token, eu tento atualizar o meu access token e refazer a requisição
      try {
        const response = await protectedApi.post('/users/refresh-token', {
          refreshToken,
        })
        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken)
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken)
        // Refazer a request
        request.headers.Authorization = `Bearer ${newAccessToken}`
        return protectedApi(request)
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
        console.log(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
