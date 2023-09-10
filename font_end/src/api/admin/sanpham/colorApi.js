import axiosClient from '../../axios'

const colorApi = {
  getAll: () => {
    const url = `/color`
    return axiosClient.get(url)
  },
}
export default colorApi
