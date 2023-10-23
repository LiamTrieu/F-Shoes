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
    store.dispatch(setLoading(false))
    return response
  },
  (error) => {
    store.dispatch(setLoading(false))
    return Promise.reject(error)
  },
)

export default axiosClient
