import axiosClient from '../../axios'

const soleApi = {
  findAll: () => {
    const url = `/sole/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/sole/get-list`
    return axiosClient.get(url)
  },
  getSole: (filter) => {
    const url = `/sole`
    return axiosClient.get(url, { params: filter })
  },
  addSole: (sole) => {
    const url = `/sole/add`
    return axiosClient.post(url, sole)
  },
  updateSole: (id, sole) => {
    const url = `/sole/update/${id}`
    return axiosClient.put(url, sole)
  },
  swapSole: (id) => {
    const url = `/sole/swap/${id}`
    return axiosClient.delete(url)
  },
}
export default soleApi
