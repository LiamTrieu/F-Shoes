import { axiosApi } from '../axios'

const ClientAccountApi = {
  getAllBill: (filter) => {
    const url = `/client/customer/all-bill`
    return axiosApi.get(url, { params: filter })
  },
  getAllBillTable: (filter) => {
    const url = `/client/customer/all-bill-table`
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
  getBillClient: (idBill) => {
    const url = `/client/customer/get-client-billResponse/${idBill}`
    return axiosApi.get(url)
  },
  updateInfBill: (idBill, clientBillReq) => {
    const url = `/client/customer/update-inf-bill/${idBill}`
    return axiosApi.put(url, clientBillReq)
  },
  saveBillDetail: (billDetailReq) => {
    const url = `/client/customer/save-billDetail`
    return axiosApi.post(url, billDetailReq)
  },
  deleteBillDetail: (id) => {
    const url = `/client/customer/delete-billDetail/${id}`
    return axiosApi.delete(url)
  },
  cancelBill: (idBill, clientCancelBillReq) => {
    const url = `/client/customer/cancel-bill/${idBill}`
    return axiosApi.put(url, clientCancelBillReq)
  },
}
export default ClientAccountApi
