import { axiosApi } from '../axios'

const ClientAccountApi = {
  getAllBill: (filter) => {
    const url = `/client/account/all-bill`
    return axiosApi.get(url, { params: filter })
  },
  getBillDetailByIdBill: (idBill) => {
    const url = `/client/account/get-by-idBill/${idBill}`
    return axiosApi.get(url)
  },
  getBillHistoryByIdBill: (idBill) => {
    const url = `/client/account/get-bill-history-by-idBill/${idBill}`
    return axiosApi.get(url)
  },
  getTransactionByIdBill: (idBill) => {
    const url = `/client/account/get-transaction-by-idBill/${idBill}`
    return axiosApi.get(url)
  },
}
export default ClientAccountApi
