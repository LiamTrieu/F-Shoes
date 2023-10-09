import axios from 'axios'
import axiosClient from '../../axios'

const sanPhamApi = {
  get: (filter) => {
    const url = `/product`
    return axiosClient.get(url, { params: filter })
  },
  getList: () => {
    const url = `/product/get-list`
    return axiosClient.get(url)
  },
  getListImage: (idColor) => {
    const url = `/product/get-list-image/${idColor}`
    return axiosClient.get(url)
  },
  uploadImage: (formData, nameFolder) => {
    const url = `/product/upload-image/${nameFolder}`
    return axios.post(`http://localhost:8080/api${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  addProuct: (request) => {
    const url = `/product/add`
    return axiosClient.post(url, request)
  },
  updateProduct: (request) => {
    const url = `/product/update/${request.id}`
    return axiosClient.post(url, request)
  },
  getProductDetail: (request) => {
    const url = `/product/product-detail`
    return axiosClient.get(url, { params: request })
  },
  getNameProduct: (id) => {
    const url = `/product/name-by-id/${id}`
    return axiosClient.get(url)
  },

  getImageProduct: (id) => {
    const url = `/product/image-product/${id}`
    return axiosClient.get(url)
  },
  updateProductDetail: (id) => {
    const url = `/product/product-detail/${id}`
    return axiosClient.get(url)
  },
  deleteProduct: (id) => {
    const url = `/product/delete/${id}`
    return axiosClient.delete(url)
  },
  changeStatus: (id) => {
    const url = `/product/change-status/${id}`
    return axiosClient.delete(url)
  },
}
export default sanPhamApi
