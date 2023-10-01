import axiosClient from '../../axios'

const sizeApi = {
  findAll: () => {
    const url = `/size/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/size/get-list`
    return axiosClient.get(url)
  },
  getSize: (filter) => {
    const url = `/size`
    return axiosClient.get(url, { params: filter })
  },
  addSize: (size) => {
    const url = `/size/add`
    return axiosClient.post(url, size)
  },
  updateSize: (id, size) => {
    const url = `/size/update/${id}`
    return axiosClient.put(url, size)
  },
  swapSize: (id) => {
    const url = `/size/swap/${id}`
    return axiosClient.delete(url)
  },
  getAllNameSize: () => {
    const url = `/size/get-all-name`
    return axiosClient.get(url)
  },
}
export default sizeApi
