import axiosClient from '../../axios'

const materialApi = {
  getAll: () => {
    const url = `/material`
    return axiosClient.get(url)
  },
}
export default materialApi
