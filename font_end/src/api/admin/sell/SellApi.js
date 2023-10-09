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

  getAllBillTaoDonHang: () => {
    const urlGetAll = `/sell/get-all-bill-tao-don-hang`
    return axiosClient.get(urlGetAll)
  },

  getAllCustomer: () => {
    const urlGetAll = `/sell/getCustomer`
    return axiosClient.get(urlGetAll)
  },

  addBillDetail: (billDetail, id) => {
    const urlGetAll = `/sell/add-product-sell/${id}`
    return axiosClient.post(urlGetAll, billDetail)
  },
  createBill: () => {
    const url = `/sell/create-bill`
    return axiosClient.post(url)
  },
  deleteBill: (id) => {
    const url = `/sell/delete-bill/${id}`
    return axiosClient.delete(url)
  },

  getProductDetailBill: (id) => {
    const url = `/sell/get-product-detail-bill/${id}`
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

  addBill: (data, id) => {
    const url = `/sell/add-bill/${id}`
    return axiosClient.put(url, data)
  },

  updateQuantityProductDetail: (id, quantity) => {
    const url = `/sell/update-quantity-product-detail/${id}?quantity=${quantity}`
    return axiosClient.put(url)
  },

  rollBackQuantityProductDetail: (idBill, idPrDetail) => {
    const url = `/sell/roll-back-quantity-product-detail?idBill=${idBill}&idPrDetail=${idPrDetail}`
    return axiosClient.put(url)
  },
}
export default sellApi
