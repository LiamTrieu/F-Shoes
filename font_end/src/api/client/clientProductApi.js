import { axiosApi } from '../axios'

const clientProductApi = {
  get: (filter) => {
    const url = `/client/product`
    return axiosApi.get(url, { params: filter })
  },
  getProductHome: (filter) => {
    const url = `/client/product-home`
    return axiosApi.get(url, { params: filter })
  },
  getSellingProduct: (filter) => {
    const url = `/client/selling-product`
    return axiosApi.get(url, { params: filter })
  },
  getSizes: (request) => {
    const url = `/client/product/size`
    return axiosApi.get(url, { params: request })
  },
  getBrand: () => {
    const url = `/client/brand`
    return axiosApi.get(url)
  },
  getCategory: () => {
    const url = `/client/category`
    return axiosApi.get(url)
  },

  getMaterial: () => {
    const url = `/client/material`
    return axiosApi.get(url)
  },

  getSize: () => {
    const url = `/client/size`
    return axiosApi.get(url)
  },

  getColor: () => {
    const url = `/client/solor`
    return axiosApi.get(url)
  },

  getSole: () => {
    const url = `/client/sole`
    return axiosApi.get(url)
  },
}
export default clientProductApi
