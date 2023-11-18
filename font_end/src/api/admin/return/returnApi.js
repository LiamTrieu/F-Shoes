import axiosAdmin from '../../axios'
const BASE_URL = '/returns'
const returnApi = {
  getBill: (filter) => {
    const url = `${BASE_URL}/bill`
    return axiosAdmin.get(url, { params: filter })
  },
}
export default returnApi
