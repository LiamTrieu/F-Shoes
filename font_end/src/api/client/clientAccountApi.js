import { axiosApi } from '../axios'

const ClientAccountApi = {
  getOne: () => {
    const url = `/client/customer/get-one`
    return axiosApi.get(url)
  },
}
export default ClientAccountApi
