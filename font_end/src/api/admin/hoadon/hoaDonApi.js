import axiosClient from '../../axios'
const hoaDonApi = {
  getOne: (id) => {
    const urlGetOne = `/bill/get/${id}`
    return axiosClient.get(urlGetOne)
  },
  getBillFilter: (filterBill) => {
    const url = `/bill/filter`
    return axiosClient.get(url, { params: filterBill })
  },
  confirmBill: (billConfirmRequest) => {
    const url = `/bill/confirm-order/{idBill}`
    return axiosClient.put(url, billConfirmRequest)
  },
}

export default hoaDonApi
