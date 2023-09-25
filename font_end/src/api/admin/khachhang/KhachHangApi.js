import axiosClient from '../../axios'
const khachHangApi = {
  getOne: (id) => {
    const url = `/khach-hang/get-one/${id}`
    return axiosClient.get(url)
  },

  get: (searchKhachHang) => {
    const url = `/khach-hang/search`
    return axiosClient.get(url, { params: searchKhachHang })
  },

  addKhachHang: (khachhang) => {
    const url = `/khach-hang/create`
    return axiosClient.post(url, khachhang)
  },

  delete: (id) => {
    const url = `/khach-hang/delete/${id}`
    return axiosClient.delete(url)
  },
  updateKhachHang: (id, khachhang) => {
    const url = `/khach-hang/update/${id}`
    return axiosClient.put(url, khachhang)
  },
}
export default khachHangApi
