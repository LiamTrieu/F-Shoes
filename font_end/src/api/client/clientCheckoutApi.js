import axiosClient from '../axios'

const clientCheckoutApi = {
  datHang: (request) => {
    const url = `/client/checkout`
    return axiosClient.post(url, request)
  },
  submitOrder: (amount, orderInfo) => {
    const url = `/client/checkout/submitOrder?amount=${amount}&orderInfo=${orderInfo}`
    return axiosClient.post(url)
  },
  payment: (request) => {
    const url = `/client/checkout/payment`
    return axiosClient.post(url, request)
  },
}
export default clientCheckoutApi
