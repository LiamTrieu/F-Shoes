import axiosClient from '../../axios'

const colorApi = {
  getAllColor: () => {
    const urlGetAll = `/color`
    return axiosClient.get(urlGetAll)
  },
  getPageColor: (filter) => {
    const urlGetPage = `/color/page`
    return axiosClient.get(urlGetPage, { params: filter })
  },
  getOneById: (id) => {
    const urlGetOne = `/color/get/${id}`
    return axiosClient.get(urlGetOne)
  },
  addColor: (color) => {
    const urlAdd = `/color/add`
    return axiosClient.post(urlAdd, color)
  },
  updateColor: (id, color) => {
    const urlUpdate = `/color/update/${id}`
    return axiosClient.put(urlUpdate, color)
  },
  deleted: (id, isDeleted) => {
    const url = `/color/deleted/${id}`
    return axiosClient.put(url, isDeleted)
  },
}
export default colorApi
