import axiosClient from '../../axios'

const materialApi = {
  findAll: () => {
    const url = `/material/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/material/get-list`
    return axiosClient.get(url)
  },
}
export default materialApi
