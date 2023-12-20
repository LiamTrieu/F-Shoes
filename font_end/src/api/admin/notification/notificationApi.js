import { axiosApiGhn } from '../../axios'

const notificationApi = {
  save: (request) => {
    const url = `/notification/save`
    return axiosApiGhn.post(url, request)
  },
  read: (id) => {
    const url = `/notification/read/${id}`
    return axiosApiGhn.put(url)
  },
  getAll: () => {
    const url = `/notification`
    return axiosApiGhn.get(url)
  },
}
export default notificationApi
