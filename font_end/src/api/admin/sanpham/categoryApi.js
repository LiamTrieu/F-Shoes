import axiosClient from '../../axios'

const categoryApi = {
  getAll: () => {
    const url = `/category`
    return axiosClient.get(url)
  },

  get: (filter) => {
    const url = `/category/page`
    return axiosClient.get(url, { params: filter })
  },
  getById: (id) => {
    const url = `/category/get/${id}`
    return axiosClient.get(url)
  },
  add: (category) => {
    const url = `/category/add`
    return axiosClient.post(url, category)
  },
  update: (id, category) => {
    const url = `/category/update/${id}`
    console.log(url)
    return axiosClient.put(url, category)
  },
}
export default categoryApi
