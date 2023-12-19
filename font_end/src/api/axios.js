import axios from 'axios'
import { setLoading } from '../services/slices/loadingSlice'
import store from '../services/store'
import { getCookie, removeCookie } from '../services/cookie'

const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_API_ADMIN_URL,
  headers: {
    'content-type': 'application/json',
  },
})
export const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

export const axiosApiGhn = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

axiosApi.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true))
    const token = getCookie('ClientToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  () => {},
)

axiosApi.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.dispatch(setLoading(false))
    }, 400)
    return response
  },
  (error) => {
    setTimeout(() => {
      store.dispatch(setLoading(false))
    }, 400)
    if (error.response && error.response.status === 403) {
      removeCookie('ClientToken')
      window.location.href = '/login'
    }
    if (error.response && error.response.status === 400) {
      console.error(error.response.data.message)
    }
  },
)

axiosAdmin.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true))
    const token = getCookie('AdminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  () => {},
)

axiosAdmin.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.dispatch(setLoading(false))
    }, 400)
    return response
  },
  (error) => {
    setTimeout(() => {
      store.dispatch(setLoading(false))
    }, 400)
    if (error.response && error.response.status === 403) {
      window.location.href = '/not-authorization'
    }
    if (error.response && error.response.status === 400) {
      console.error(error.response.data.message)
    }
  },
)

export default axiosAdmin
