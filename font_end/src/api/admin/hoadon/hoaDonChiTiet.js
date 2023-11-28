import axiosAdmin from '../../axios'

const hoaDonChiTietApi = {
  getByIdBillAndStt: (idBill, status) => {
    const urlGetByIdBill = `/billDetail/get-by-idBill-and-status/${idBill}`
    return axiosAdmin.get(urlGetByIdBill, { params: { status } })
  },
  getByIdBill: (idBill) => {
    const urlGetByIdBill = `/billDetail/get-by-idBill/${idBill}`
    return axiosAdmin.get(urlGetByIdBill)
  },
  decrementQuantity: (idBillDetail) => {
    const url = `/billDetail/decrementQuantity/${idBillDetail}`
    return axiosAdmin.put(url)
  },
  incrementQuantity: (idBillDetail) => {
    const url = `/billDetail/incrementQuantity/${idBillDetail}`
    return axiosAdmin.put(url)
  },
  changeQuantity: (idBillDetail, quantity) => {
    const url = `/billDetail/changeQuantity/${idBillDetail}`
    return axiosAdmin.put(url, quantity)
  },
  saveBillDetail: (billDetailReq) => {
    const url = `/billDetail/save`
    return axiosAdmin.post(url, billDetailReq)
  },
  delete: (billDetailReq) => {
    const url = `/billDetail/delete`
    return axiosAdmin.put(url, billDetailReq)
  },
  returnProduct: (idBillDetail, hdBillDetailReq) => {
    const url = `/billDetail/return-product/${idBillDetail}`
    return axiosAdmin.put(url, hdBillDetailReq)
  },
}

export default hoaDonChiTietApi
