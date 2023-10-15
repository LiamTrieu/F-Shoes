import axiosClient from '../../axios'

const colorApi = {
  findAll: () => {
    const url = `/color/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/color/get-list`
    return axiosClient.get(url)
  },
  getColor: (filter) => {
    const url = `/color`
    return axiosClient.get(url, { params: filter })
  },
  addColor: (color) => {
    const url = `/color/add`
    return axiosClient.post(url, color)
  },
  updateColor: (id, color) => {
    const url = `/color/update/${id}`
    return axiosClient.put(url, color)
  },
  swapColor: (id) => {
    const url = `/color/swap/${id}`
    return axiosClient.delete(url)
  },
  getAllCodeColor: () => {
    const url = `/color/get-all-code`
    return axiosClient.get(url)
  },
  getAllNameColor: () => {
    const url = `/color/get-all-name`
    return axiosClient.get(url)
  },
}
export default colorApi
