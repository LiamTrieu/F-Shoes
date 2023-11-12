import { axiosApi } from '../axios'

const ClientAccountApi = {
  getAllBill: (filter) => {
    const url = `/client/customer/all-bill`
    return axiosApi.get(url, { params: filter })
  },
  getBillDetailByIdBill: (idBill) => {
    const url = `/client/customer/get-by-idBill/${idBill}`
    return axiosApi.get(url)
  },
  getBillHistoryByIdBill: (idBill) => {
    const url = `/client/customer/get-bill-history-by-idBill/${idBill}`
    return axiosApi.get(url)
  },
  getTransactionByIdBill: (idBill) => {
    const url = `/client/customer/get-transaction-by-idBill/${idBill}`
    return axiosApi.get(url)
  },

  getBillDetailByCode: (code) => {
    const url = `/client/customer/get-by-code/${code}`
    return axiosApi.get(url)
  },
  getBillHistoryByCode: (code) => {
    const url = `/client/customer/get-bill-history-by-code/${code}`
    return axiosApi.get(url)
  },
}
export default ClientAccountApi
