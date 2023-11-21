import { axiosApi } from '../axios'
const BASE_URL = '/returns'
const clientReturnApi = {
  getBillId: (id) => {
    const url = `${BASE_URL}/bill-id/${id}`
    return axiosApi.get(url)
  },
  getBillDetail: (id) => {
    const url = `${BASE_URL}/bill-detail/${id}`
    return axiosApi.get(url)
  },
  request: (request) => {
    const url = `${BASE_URL}/request`
    return axiosApi.post(url, request)
  },
  getReturn: (filter) => {
    const url = `${BASE_URL}`
    return axiosApi.get(url, { params: filter })
  },
  huy: (id) => {
    const url = `${BASE_URL}/huy/${id}`
    return axiosApi.put(url)
  },
}
export default clientReturnApi
