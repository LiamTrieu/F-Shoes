import axiosAdmin from '../../axios'

const ghnAPI = {
  getProvince: () => {
    const url = `/ghn/getProvince`
    return axiosAdmin.get(url)
  },

  getDistrict: (idProvince) => {
    const url = `/ghn/getDistrict?idProvince=${idProvince}`
    return axiosAdmin.get(url)
  },

  getWard: (idDistrict) => {
    const url = `/ghn/getWard?idDistrict=${idDistrict}`
    return axiosAdmin.get(url)
  },

  getTotal: (filterTotal) => {
    const url = `/ghn/getShipping-order`
    return axiosAdmin.get(url, { params: filterTotal })
  },

  getServiceId: (filtelService) => {
    const url = `/ghn/get-serviceId`
    return axiosAdmin.get(url, { params: filtelService })
  },

  getime: (filtelTime) => {
    const url = `/ghn/get-time`
    return axiosAdmin.get(url, { params: filtelTime })
  },
}
export default ghnAPI
