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
  confirmBill: (idBill, billConfirmRequest) => {
    const url = `/bill/confirm-order/${idBill}`
    return axiosClient.put(url, billConfirmRequest)
  },
  updateStatusBill: (idBill, updateBillRequest) => {
    const url = `/bill/update-status/${idBill}`
    return axiosClient.put(url, updateBillRequest)
  },
  confirmPayment: (idBill, confirmPaymentRequest) => {
    const url = `/bill/confirm-payment/${idBill}`
    return axiosClient.put(url, confirmPaymentRequest)
  },
  updateBillDetail: (idBill, lstBillDetailRequest) => {
    const url = `/bill/update-billDetail/${idBill}`
    return axiosClient.put(url, lstBillDetailRequest)
  },
  cancelBill: (idBill, updateBillRequest) => {
    const url = `/bill/cancel/${idBill}`
    return axiosClient.put(url, updateBillRequest)
  },
}

export default hoaDonApi
