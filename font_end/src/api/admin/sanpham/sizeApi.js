import axiosClient from '../../axios'

const sizeApi = {
  getAll: () => {
    const url = `/size`
    return axiosClient.get(url)
  },
}
export default sizeApi
