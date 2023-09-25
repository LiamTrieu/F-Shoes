import axiosClient from '../../axios'

const categoryApi = {
  findAll: () => {
    const url = `/category/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/category/get-list`
    return axiosClient.get(url)
  },
  getCategory: (filter) => {
    const url = `/category`
    return axiosClient.get(url, { params: filter })
  },
  addCategory: (category) => {
    const url = `/category/add`
    return axiosClient.post(url, category)
  },
  updateCategory: (id, category) => {
    const url = `/category/update/${id}`
    return axiosClient.put(url, category)
  },
  swapCategory: (id) => {
    const url = `/category/swap/${id}`
    return axiosClient.delete(url)
  },
}
export default categoryApi
