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
  getAllBillReturn: () => {
    const url = `/client/customer/all-bill-return`
    return axiosApi.get(url)
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
  getBillDetailsByIdBillAndStt: (idBill, status) => {
    const urlGetByIdBillAndStt = `/client/customer/get-billDetail-by-idBill-and-status/${idBill}`
    return axiosApi.get(urlGetByIdBillAndStt, { params: { status } })
  },
  findAllBrand: () => {
    const url = `/client/customer/find-all-brand`
    return ClientAccountApi.get(url)
  },
  findAllMaterial: () => {
    const url = `/client/customer/get-list-material`
    return ClientAccountApi.get(url)
  },
  findAllColor: () => {
    const url = `/client/customer/find-all-color`
    return ClientAccountApi.get(url)
  },
  findAllSole: () => {
    const url = `/client/customer/find-all-sole`
    return ClientAccountApi.get(url)
  },
  findAllCategory: () => {
    const url = `/client/customer/find-all-category`
    return ClientAccountApi.get(url)
  },
  findAllSize: () => {
    const url = `/client/customer/find-all-size`
    return ClientAccountApi.get(url)
  },
  getAllProduct: () => {
    const url = `/client/customer/getProduct`
    return ClientAccountApi.get(url)
  },
}
export default ClientAccountApi
