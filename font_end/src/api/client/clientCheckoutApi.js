import axiosClient from '../axios'

const clientCheckoutApi = {
  datHang: (request) => {
    const url = `/client/checkout`
    return axiosClient.post(url, request)
  },
}
export default clientCheckoutApi
