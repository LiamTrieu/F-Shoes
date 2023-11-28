import { axiosApi } from './axios'

const checkStartApi = {
  check: () => {
    const url = `/check-start`
    return axiosApi.get(url)
  },
}
export default checkStartApi
