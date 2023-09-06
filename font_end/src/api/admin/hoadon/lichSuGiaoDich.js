import axiosClient from '../../axios'

const lichSuGiaoDichApi = {
  getByIdBill: (idBill) => {
    const urlGetByIdBill = `/transaction/get-by-idBill/${idBill}`
    return axiosClient.get(urlGetByIdBill)
  },
}

export default lichSuGiaoDichApi
