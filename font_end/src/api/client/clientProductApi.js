import axiosClient from '../axios'

const clientProductApi = {
  get: (filter) => {
    const url = `/client/product`
    return axiosClient.get(url, { params: filter })
  },
  getSizes: (request) => {
    const url = `/client/product/size`
    return axiosClient.get(url, { params: request })
  },
  getBrand: () => {
    const url = `/client/brand`
    return axiosClient.get(url)
  },
  getCategory: () => {
    const url = `/client/category`
    return axiosClient.get(url)
  },

  getMaterial: () => {
    const url = `/client/material`
    return axiosClient.get(url)
  },

  getSize: () => {
    const url = `/client/size`
    return axiosClient.get(url)
  },

  getColor: () => {
    const url = `/client/solor`
    return axiosClient.get(url)
  },

  getSole: () => {
    const url = `/client/sole`
    return axiosClient.get(url)
  },
}
export default clientProductApi
