import axiosClient from '../../axios'

const bradApi = {
  getAll: () => {
    const url = `/brand`
    return axiosClient.get(url)
  },
}
export default bradApi
