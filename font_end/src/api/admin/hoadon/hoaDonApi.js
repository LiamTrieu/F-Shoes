import axiosAdmin from '../../axios'
const hoaDonApi = {
  getOne: (id) => {
    const urlGetOne = `/bill/get/${id}`
    return axiosAdmin.get(urlGetOne)
  },
  checkBillExist: (id) => {
    const urlGetOne = `/bill/check-bill-exist/${id}`
    return axiosAdmin.get(urlGetOne)
  },
  getBillFilter: (filterBill) => {
    const url = `/bill/filter`
    return axiosAdmin.get(url, { params: filterBill })
  },
  confirmBill: (idBill, billConfirmRequest) => {
    const url = `/bill/confirm-order/${idBill}`
    return axiosAdmin.put(url, billConfirmRequest)
  },
  updateStatusBill: (idBill, updateBillRequest) => {
    const url = `/bill/update-status/${idBill}`
    return axiosAdmin.put(url, updateBillRequest)
  },
  confirmPayment: (idBill, confirmPaymentRequest) => {
    const url = `/bill/confirm-payment/${idBill}`
    return axiosAdmin.put(url, confirmPaymentRequest)
  },
  updateBillDetail: (idBill, lstBillDetailRequest) => {
    const url = `/bill/update-billDetail/${idBill}`
    return axiosAdmin.put(url, lstBillDetailRequest)
  },
  cancelBill: (idBill, updateBillRequest) => {
    const url = `/bill/cancel/${idBill}`
    return axiosAdmin.put(url, updateBillRequest)
  },
  update: (idBill, hdBillReq) => {
    const url = `/bill/update/${idBill}`
    return axiosAdmin.put(url, hdBillReq)
  },
  printBill: (idBill) => {
    const url = `/bill/print-bill/${idBill}`
    return axiosAdmin.post(url)
  },
  returnStt: (idBill, hdBillReq) => {
    const url = `/bill/return-stt/${idBill}`
    return axiosAdmin.put(url, hdBillReq)
  },
}

export default hoaDonApi
