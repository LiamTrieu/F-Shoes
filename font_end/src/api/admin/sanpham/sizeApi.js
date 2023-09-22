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
}
export default sizeApi
