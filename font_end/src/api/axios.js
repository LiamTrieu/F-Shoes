import axios from 'axios'
import { setLoading } from '../services/slices/loadingSlice'
import store from '../services/store'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true))
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
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
    return Promise.reject(error)
  },
)

export default axiosClient
