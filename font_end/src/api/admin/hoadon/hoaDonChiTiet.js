import axiosClient from '../../axios'

const hoaDonChiTietApi = {
  getByIdBillAndStt: (idBill, status) => {
    const urlGetByIdBill = `/billDetail/get-by-idBill-and-status/${idBill}`
    return axiosClient.get(urlGetByIdBill, { params: { status } }) // Đặt status vào một object params
  },
  getByIdBill: (idBill) => {
    const urlGetByIdBill = `/billDetail/get-by-idBill-and-status/${idBill}`
    return axiosClient.get(urlGetByIdBill)
  },
  decrementQuantity: (idBillDetail) => {
    const url = `/billDetail/decrementQuantity/${idBillDetail}`
    return axiosClient.put(url)
  },
  incrementQuantity: (idBillDetail) => {
    const url = `/billDetail/incrementQuantity/${idBillDetail}`
    return axiosClient.put(url)
  },
  changeQuantity: (idBillDetail, quantity) => {
    const url = `/billDetail/changeQuantity/${idBillDetail}`
    return axiosClient.put(url, quantity)
  },
}

export default hoaDonChiTietApi
