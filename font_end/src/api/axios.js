import axios from 'axios'
import { setLoading } from '../services/slices/loadingSlice'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    setLoading(true)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  (response) => {
    setLoading(false)
    return response
  },
  (error) => {
    setLoading(false)
    return Promise.reject(error)
  },
)

export default axiosClient
