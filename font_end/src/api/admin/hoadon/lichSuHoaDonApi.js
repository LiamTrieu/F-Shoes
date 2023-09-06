import axiosClient from '../../axios'

const lichSuHoaDonApi = {
  getByIdBill: (idBill) => {
    const urlGetByIdBill = `/billHistory/get-by-idBill/${idBill}`
    return axiosClient.get(urlGetByIdBill)
  },
}

export default lichSuHoaDonApi
