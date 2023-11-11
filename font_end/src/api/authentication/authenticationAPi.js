import axios from 'axios'
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
  register: (email, password, name) => {
    const url = `/authentication/register`
    return axiosApi.post(url, { name: name, email: email, password: password })
  },
  checkMail: (email) => {
    const url = `/authentication/check-mail?email=${email}`
    return axiosApi.get(url)
  },

  getAdmin: () => {
    const token = getCookie('AdminToken')
    const url = `http://localhost:8080/api/authentication`
    if (token) {
      return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
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
