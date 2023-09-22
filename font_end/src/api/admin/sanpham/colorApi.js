import axiosClient from '../../axios'

const colorApi = {
  findAll: () => {
    const url = `/color/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/color/get-list`
    return axiosClient.get(url)
  },
}
export default colorApi
