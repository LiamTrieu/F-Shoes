import axiosClient from '../../axios'

const materialApi = {
  getAll: () => {
    const url = `/material`
    return axiosClient.get(url)
  },
  get: (filter) => {
    const url = `/material/page`
    return axiosClient.get(url, { params: filter })
  },
  getById: (id) => {
    const url = `/material/get/${id}`
    return axiosClient.get(url)
  },
  add: (material) => {
    const url = `/material/add`
    return axiosClient.post(url, material)
  },
  update: (id, material) => {
    const url = `/material/update/${id}`
    console.log(url)
    return axiosClient.put(url, material)
  },
}
export default materialApi
