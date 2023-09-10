import axiosClient from '../../axios'

const categoryApi = {
  getAll: () => {
    const url = `/category`
    return axiosClient.get(url)
  },
}
export default categoryApi
