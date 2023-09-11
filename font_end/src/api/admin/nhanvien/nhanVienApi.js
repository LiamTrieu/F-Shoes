import axiosClient from '../../axios'

const staffApi = {
  get: (page, filter) => {
    const url = `/staff/search-getPage?page=${page}&searchTen=${filter}`
    return axiosClient.get(url)
  },
  getOne: (id) => {
    const url = `/staff/detail/${id}`
    return axiosClient.get(url)
  },
  add: (staff) => {
    const url = `/staff/add`
    return axiosClient.post(url, staff)
  },
  update: (id, staff) => {
    const url = `/staff/update/${id}`
    console.log(url)
    return axiosClient.put(url, staff)
  },
}
export default staffApi
