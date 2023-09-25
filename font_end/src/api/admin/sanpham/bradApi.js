import axiosClient from '../../axios'

const bradApi = {
  findAll: () => {
    const url = `/brand/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/brand/get-list`
    return axiosClient.get(url)
  },
  getBrand: (filter) => {
    const url = `/brand`
    return axiosClient.get(url, { params: filter })
  },
  addBrand: (brand) => {
    const url = `/brand/add`
    return axiosClient.post(url, brand)
  },
  updateBrand: (id, brand) => {
    const url = `/brand/update/${id}`
    return axiosClient.put(url, brand)
  },
  swapBrand: (id) => {
    const url = `/brand/swap/${id}`
    return axiosClient.delete(url)
  },
}
export default bradApi
