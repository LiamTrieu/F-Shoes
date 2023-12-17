import { axiosApi } from '../../axios'

const ghnAPI = {
  getProvince: () => {
    const url = `/ghn/getProvince`
    return axiosApi.get(url)
  },

  getDistrict: (idProvince) => {
    const url = `/ghn/getDistrict?idProvince=${idProvince}`
    return axiosApi.get(url)
  },

  getWard: (idDistrict) => {
    const url = `/ghn/getWard?idDistrict=${idDistrict}`
    return axiosApi.get(url)
  },

  getTotal: (filterTotal) => {
    const url = `/ghn/getShipping-order`
    return axiosApi.get(url, { params: filterTotal })
  },

  getServiceId: (filtelService) => {
    const url = `/ghn/get-serviceId`
    return axiosApi.get(url, { params: filtelService })
  },

  getime: (filtelTime) => {
    const url = `/ghn/get-time`
    return axiosApi.get(url, { params: filtelTime })
  },
}
export default ghnAPI
