import axiosClient from '../../axios'

const sizeApi = {
  getAllSize: () => {
    const urlGetAll = `/size`
    return axiosClient.get(urlGetAll)
  },
  getPageSize: (filter) => {
    const urlGetPage = `/size/page?page=${filter.page}&size=${filter.size}`
    return axiosClient.get(urlGetPage)
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
}
export default sizeApi
