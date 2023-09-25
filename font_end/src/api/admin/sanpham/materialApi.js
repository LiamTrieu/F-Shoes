import axiosClient from '../../axios'

const materialApi = {
  findAll: () => {
    const url = `/material/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/material/get-list`
    return axiosClient.get(url)
  },
  getMaterial: (filter) => {
    const url = `/material`
    return axiosClient.get(url, { params: filter })
  },
  addMaterial: (material) => {
    const url = `/material/add`
    return axiosClient.post(url, material)
  },
  updateMaterial: (id, material) => {
    const url = `/material/update/${id}`
    return axiosClient.put(url, material)
  },
  swapMaterial: (id) => {
    const url = `/material/swap/${id}`
    return axiosClient.delete(url)
  },
}
export default materialApi
