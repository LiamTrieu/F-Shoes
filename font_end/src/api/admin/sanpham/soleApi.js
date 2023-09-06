import axiosClient from '../../axios'

const soleApi = {
  getAll: () => {
    const url = `/sole`
    return axiosClient.get(url)
  },
}
export default soleApi
