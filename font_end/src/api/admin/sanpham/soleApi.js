import axiosClient from '../../axios'

const soleApi = {
  findAll: () => {
    const url = `/sole/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/sole/get-list`
    return axiosClient.get(url)
  },
}
export default soleApi
