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
  delete: (id) => {
    const url = `/billDetail/delete/${id}`
    return axiosAdmin.put(url)
  },
  returnProduct: (idBillDetail, hdBillDetailReq) => {
    const url = `/billDetail/return-product/${idBillDetail}`
    return axiosAdmin.put(url, hdBillDetailReq)
  },
  getByIdBillAndIdPrd: (idBill, idPrd) => {
    const urlGetByIdBill = `/billDetail/get-by-billAndProductDetail`
    return axiosAdmin.get(urlGetByIdBill, { params: { idBill, idPrd } })
  },
  getByIdBillAndIdPrdAndPrice: (idBill, idPrd, price) => {
    const urlGetByIdBillPrdAndPrice = `/billDetail/get-by-billAndProductDetailAndPrice`
    return axiosAdmin.get(urlGetByIdBillPrdAndPrice, { params: { idBill, idPrd, price } })
  },
  // isCheckDonGiaVsPricePrd: (id) => {
  //   const url = `/billDetail/getHDPrdRes/${id}`
  //   return axiosAdmin.get(url)
  // },
  isCheckDonGiaVsPricePrd: (id) => {
    const url = `/billDetail/isCheckDonGiaVsPricePrd/${id}`
    return axiosAdmin.get(url)
  },
  getVoucherByIdBill: (idBill) => {
    const urlGetByIdBillPrdAndPrice = `/billDetail/get/voucher/by/idBill/${idBill}`
    return axiosAdmin.get(urlGetByIdBillPrdAndPrice)
  },
  getPercentByIdBill: (idBill) => {
    const urlGetByIdBillPrdAndPrice = `/billDetail/get/percent/by/idBill/${idBill}`
    return axiosAdmin.get(urlGetByIdBillPrdAndPrice)
  },
  getOneVoucherById: (idVoucher) => {
    const urlOneVoucherById = `/billDetail/view/one/voucher/${idVoucher}`
    return axiosAdmin.get(urlOneVoucherById)
  },
}

export default hoaDonChiTietApi
