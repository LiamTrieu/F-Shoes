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
}
export default ghnAPI
