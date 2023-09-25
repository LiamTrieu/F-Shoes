import axios from 'axios'
import axiosClient from '../../axios'

const staffApi = {
  get: (searchStaff) => {
    const url = `/staff/search-getPage`
    return axiosClient.get(url, { params: searchStaff })
  },
  getOne: (id) => {
    const url = `/staff/detail/${id}`
    return axiosClient.get(url)
  },
  add: (staff) => {
    const formData = new FormData()
    formData.append('fullName', staff.fullName)
    formData.append('dateBirth', staff.dateBirth)
    formData.append('phoneNumber', staff.phoneNumber)
    formData.append('email', staff.email)
    formData.append('gender', staff.gender)
    formData.append('avatar', staff.avatar)
    formData.append('CitizenId', staff.citizenId)
    formData.append('role', staff.role)

    return axios.post(`http://localhost:8080/api/staff/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  update: (id, staff) => {
    const formData = new FormData()
    formData.append('fullName', staff.fullName)
    formData.append('dateBirth', staff.dateBirth)
    formData.append('phoneNumber', staff.phoneNumber)
    formData.append('email', staff.email)
    formData.append('gender', staff.gender)
    formData.append('avatar', staff.avatar)
    formData.append('CitizenId', staff.citizenId)
    formData.append('role', staff.role)
    formData.append('status', staff.status)

    return axios.put(`http://localhost:8080/api/staff/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  delete: (id) => {
    const url = `/staff/delete/${id}`
    return axiosClient.put(url)
  },
}
export default staffApi
