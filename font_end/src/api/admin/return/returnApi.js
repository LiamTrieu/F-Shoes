import axiosAdmin from '../../axios'
const BASE_URL = '/returns'
const returnApi = {
  getReturn: (filter) => {
    const url = `${BASE_URL}`
    return axiosAdmin.get(url, { params: filter })
  },
  getReturnDetail: (id) => {
    const url = `${BASE_URL}/detail/${id}`
    return axiosAdmin.get(url)
  },
  getBill: (filter) => {
    const url = `${BASE_URL}/bill`
    return axiosAdmin.get(url, { params: filter })
  },
  getBillId: (id) => {
    const url = `${BASE_URL}/bill-id/${id}`
    return axiosAdmin.get(url)
  },
  getBillDetail: (id) => {
    const url = `${BASE_URL}/bill-detail/${id}`
    return axiosAdmin.get(url)
  },
  getReturnDetail2: (id) => {
    const url = `${BASE_URL}/return-detail/${id}`
    return axiosAdmin.get(url)
  },
  accept: (request) => {
    const url = `${BASE_URL}/accept`
    return axiosAdmin.post(url, request)
  },
  hoanThanh: (request) => {
    const url = `${BASE_URL}/hoan-thanh`
    return axiosAdmin.post(url, request)
  },
  xacNhan: (id) => {
    const url = `${BASE_URL}/xac-nhan/${id}`
    return axiosAdmin.put(url)
  },
  huy: (id) => {
    const url = `${BASE_URL}/huy/${id}`
    return axiosAdmin.put(url)
  },
}
export default returnApi
