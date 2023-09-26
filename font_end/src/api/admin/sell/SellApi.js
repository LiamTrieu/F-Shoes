import axiosClient from '../../axios'

const sellApi = {
  getAllProduct: () => {
    const urlGetAll = `/sell/getProduct`
    return axiosClient.get(urlGetAll)
  },

  getAllCustomer: () => {
    const urlGetAll = `/sell/getCustomer`
    return axiosClient.get(urlGetAll)
  },
}
export default sellApi
