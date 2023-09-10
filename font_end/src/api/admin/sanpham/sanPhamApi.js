import axiosClient from '../../axios'

const sanPhamApi = {
  get: (filter) => {
    const url = `/product/page`
    return axiosClient.get(url, { params: filter })
  },
  getById: (id) => {
    const url = `/product/get/${id}`
    return axiosClient.get(url)
  },
  deleted: (id, isDeleted) => {
    const url = `/product/deleted/${id}`
    return axiosClient.put(url, isDeleted)
  },
  add: (product) => {
    const url = `/product/add`
    return axiosClient.post(url, product)
  },
  update: (id, product) => {
    const url = `/product/update/${id}`
    console.log(url)
    return axiosClient.put(url, product)
  },
}
export default sanPhamApi
