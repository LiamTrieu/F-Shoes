import axiosClient from '../../axios'

const hoaDonChiTietApi = {
  getByIdBill: (idBill) => {
    const urlGetByIdBill = `/billDetail/get-by-idBill/${idBill}`
    return axiosClient.get(urlGetByIdBill)
  },
}

export default hoaDonChiTietApi
