import axiosClient from '../../axios'

const sizeApi = {
  getAllSize: () => {
    const urlGetAll = `/size`
    return axiosClient.get(urlGetAll)
  },
  getPageSize: (filter) => {
    const urlGetPage = `/size/page`
    return axiosClient.get(urlGetPage, { params: filter })
  },
  getOneById: (id) => {
    const urlGetOne = `/size/get/${id}`
    return axiosClient.get(urlGetOne)
  },
  addSize: (size) => {
    const urlAdd = `/size/add`
    return axiosClient.post(urlAdd, size)
  },
  updateSize: (id, size) => {
    const urlUpdate = `/size/update/${id}`
    return axiosClient.put(urlUpdate, size)
  },
  deleted: (id, isDeleted) => {
    const url = `/size/deleted/${id}`
    return axiosClient.put(url, isDeleted)
  },
}
export default sizeApi
