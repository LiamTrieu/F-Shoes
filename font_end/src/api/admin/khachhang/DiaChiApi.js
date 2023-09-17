import axiosClient from '../../axios'

const DiaChiApi = {
  getAll: (p, idCustomer) => {
    const url = `/dia-chi/get-all?p=${p}&idCustomer=${idCustomer}`
    return axiosClient.get(url)
  },

  get: (filter) => {
    const url = `/dia-chi/get-page`
    return axiosClient.get(url, { params: filter })
  },
  getById: (id) => {
    const url = `/dia-chi/get-one/${id}`
    return axiosClient.get(url)
  },
  add: (address) => {
    const url = `/dia-chi/create`
    return axiosClient.post(url, address)
  },
  update: (id, address) => {
    const url = `/dia-chi/update/${id}`
    console.log(url)
    return axiosClient.put(url, address)
  },
}
export default DiaChiApi
