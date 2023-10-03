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

  getProductDetailCart: (id) => {
    const url = `/sell/get-product-detail-cart/${id}`
    return axiosClient.get(url)
  },

  getSize: () => {
    const url = `/sell/get-size`
    return axiosClient.get(url)
  },
  getColor: () => {
    const url = `/sell/get-color`
    return axiosClient.get(url)
  },
  getAount: (id) => {
    const url = `/sell/get-amount/${id}`
    return axiosClient.get(url)
  },
}
export default sellApi
