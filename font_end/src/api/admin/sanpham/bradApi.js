import axiosClient from '../../axios'

const bradApi = {
  findAll: () => {
    const url = `/brand/find-all`
    return axiosClient.get(url)
  },
  getList: () => {
    const url = `/brand/get-list`
    return axiosClient.get(url)
  },
}
export default bradApi
