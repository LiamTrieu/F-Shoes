import { getCookie } from '../../services/cookie'
import { axiosApi } from '../axios'

const authenticationAPi = {
  loginAdmin: (email, password) => {
    const url = `/authentication/login-admin`
    return axiosApi.post(url, { email: email, password: password })
  },
  login: (email, password) => {
    const url = `/authentication/login`
    return axiosApi.post(url, { email: email, password: password })
  },
  getAdmin: () => {
    const token = getCookie('AdminToken')
    const url = `/authentication`
    if (token) {
      return axiosApi.get(url, { headers: { Authorization: `Bearer ${token}` } })
    }
  },
  getClient: () => {
    const token = getCookie('ClientToken')
    const url = `/authentication`
    if (token) {
      return axiosApi.get(url, { headers: { Authorization: `Bearer ${token}` } })
    }
  },
}
export default authenticationAPi
