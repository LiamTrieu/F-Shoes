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
    return axiosClient.put(url, address)
  },

  delete: (id) => {
    const url = `/dia-chi/delete/${id}`
    return axiosClient.delete(url)
  },

  updateStatus: (id, idCustomer) => {
    const url = `/dia-chi/status?id=${id}&idCustomer=${idCustomer}`
    return axiosClient.put(url)
  },

  getAddressDefault: (idCustomer) => {
    const url = `/dia-chi/get-default?idCustomer=${idCustomer}`
    return axiosClient.get(url)
  },
}
export default DiaChiApi
