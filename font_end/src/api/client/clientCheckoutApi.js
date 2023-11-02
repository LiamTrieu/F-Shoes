import axiosClient from '../axios'

const clientCheckoutApi = {
  datHang: (request) => {
    const url = `/client/checkout`
    return axiosClient.post(url, request)
  },
  submitOrder: (request) => {
    const url = `/client/checkout/submitOrder`
    return axiosClient.post(url, request)
  },
  payment: (request) => {
    const url = `/client/checkout/payment`
    return axiosClient.get(url, { params: request })
  },
}
export default clientCheckoutApi
