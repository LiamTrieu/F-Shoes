import axiosClient from '../../axios'

const bradApi = {
  getAll: () => {
    const url = `/brand`
    return axiosClient.get(url)
  },
  get: (filter) => {
    const url = `/brand/page`
    return axiosClient.get(url, { params: filter })
  },
  getById: (id) => {
    const url = `/brand/get/${id}`
    return axiosClient.get(url)
  },
  add: (brand) => {
    const url = `/brand/add`
    return axiosClient.post(url, brand)
  },
  update: (id, brand) => {
    const url = `/brand/update/${id}`
    console.log(url)
    return axiosClient.put(url, brand)
  },
}
export default bradApi
