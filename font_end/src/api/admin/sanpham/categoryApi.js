import axiosClient from '../../axios'

const categoryApi = {
  findAll: () => {
    const url = `/category/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/category/get-list`
    return axiosClient.get(url)
  },
}
export default categoryApi
