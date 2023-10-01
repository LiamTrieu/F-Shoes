import axiosClient from '../../axios'

const sellApi = {
  getAllProduct: (filter) => {
    const urlGetAll = `/sell/getProduct`
    return axiosClient.get(urlGetAll, { params: filter })
  },

  getAllProductCart: () => {
    const urlGetAll = `/sell/get-product-cart`
    return axiosClient.get(urlGetAll)
  },

  getAllCustomer: () => {
    const urlGetAll = `/sell/getCustomer`
    return axiosClient.get(urlGetAll)
  },

  addCartDetail: (cartDetail) => {
    const urlGetAll = `/sell/add-product-sell`
    return axiosClient.post(urlGetAll, cartDetail)
  },
  createCart: () => {
    const url = `/sell/create-cart`
    return axiosClient.post(url)
  },
  deleteCart: (id) => {
    const url = `/sell/delete-cart/${id}`
    return axiosClient.delete(url)
  },
}
export default sellApi
