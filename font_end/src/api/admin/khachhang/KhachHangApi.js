import axios from 'axios'
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
    const formData = new FormData()
    formData.append('fullName', khachhang.fullName)
    formData.append('dateBirth', khachhang.dateBirth)
    formData.append('phoneNumber', khachhang.phoneNumber)
    formData.append('email', khachhang.email)
    formData.append('gender', khachhang.gender)
    formData.append('avatar', khachhang.avatar)
    formData.append('role', khachhang.role)

    return axios.post(`http://localhost:8080/api/khach-hang/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  delete: (id) => {
    const url = `/khach-hang/delete/${id}`
    return axiosClient.delete(url)
  },
  updateKhachHang: (id, khachhang) => {
    const formData = new FormData()
    formData.append('fullName', khachhang.fullName)
    formData.append('dateBirth', khachhang.dateBirth)
    formData.append('phoneNumber', khachhang.phoneNumber)
    formData.append('email', khachhang.email)
    formData.append('gender', khachhang.gender)
    formData.append('avatar', khachhang.avatar)
    formData.append('role', khachhang.role)
    formData.append('status', khachhang.status)

    return axios.put(`http://localhost:8080/api/khach-hang/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
export default khachHangApi
