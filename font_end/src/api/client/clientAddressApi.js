import { axiosApi } from '../axios'

const ClientAddressApi = {
  getAll: (p) => {
    const url = `/client/address/get-all?p=${p}`
    return axiosApi.get(url)
  },

  getDefault: () => {
    const url = `/client/address/get-default`
    return axiosApi.get(url)
  },
}
export default ClientAddressApi
