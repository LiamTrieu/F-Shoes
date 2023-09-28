import axiosClient from '../../axios'

const ghnAPI = {
  getProvince: () => {
    const url = `/ghn/getProvince`
    return axiosClient.get(url)
  },

  getDistrict: (idProvince) => {
    const url = `/ghn/getDistrict?idProvince=${idProvince}`
    return axiosClient.get(url)
  },

  getWard: (idDistrict) => {
    const url = `/ghn/getWard?idDistrict=${idDistrict}`
    return axiosClient.get(url)
  },

  getTotal: (filterTotal) => {
    const url = `/ghn/getShipping-order`
    return axiosClient.get(url, { params: filterTotal })
  },

  getServiceId: (filtelService) => {
    const url = `/ghn/get-serviceId`
    return axiosClient.get(url, { params: filtelService })
  },

  getime: (filtelTime) => {
    const url = `/ghn/get-time`
    return axiosClient.get(url, { params: filtelTime })
  },
}
export default ghnAPI
