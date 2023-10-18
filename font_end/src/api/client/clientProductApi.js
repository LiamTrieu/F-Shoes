import axiosClient from '../axios'

const clientProductApi = {
  get: (id) => {
    const url = `/client/product`
    return axiosClient.get(url, { params: id })
  },
  getSizes: (request) => {
    const url = `/client/product/size`
    return axiosClient.get(url, { params: request })
  },
}
export default clientProductApi
