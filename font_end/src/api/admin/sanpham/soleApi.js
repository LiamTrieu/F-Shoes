import axiosClient from '../../axios'

const soleApi = {
  getAllSole: () => {
    const urlGetAll = `/sole`
    return axiosClient.get(urlGetAll)
  },
  getPageSole: (page) => {
    const urlGetPage = `/sole/page?page=${page.page}&size=${page.size}`
    return axiosClient.get(urlGetPage)
  },
  getOneById: (id) => {
    const urlGetOne = `/sole/get/${id}`
    return axiosClient.get(urlGetOne)
  },
  addSole: (sole) => {
    const urlAdd = `/sole/add`
    return axiosClient.post(urlAdd, sole)
  },
  updateSole: (id, sole) => {
    const urlUpdate = `/sole/update/${id}`
    return axiosClient.put(urlUpdate, sole)
  },
  deleted: (id, isDeleted) => {
    const url = `/sole/deleted/${id}`
    return axiosClient.put(url, isDeleted)
  },
}
export default soleApi
