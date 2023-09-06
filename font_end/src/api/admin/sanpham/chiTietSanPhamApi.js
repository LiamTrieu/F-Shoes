import axiosClient from '../../axios'

const chiTietSanPhamApi = {
  getById: (id, filter) => {
    const url = `/product-detail/page/${id}`
    return axiosClient.get(url, { params: filter })
  },
}
export default chiTietSanPhamApi
