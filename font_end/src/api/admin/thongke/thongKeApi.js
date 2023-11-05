import axiosAdmin from '../../axios'

const thongKeApi = {
  getAllProductInMounth: (filter) => {
    const urlGetAll = `/statistical/get-product-in-mounth`
    return axiosAdmin.get(urlGetAll, { params: filter })
  },

  getDoanhThu: () => {
    const urlGetAll = `/statistical/doanh-thu`
    return axiosAdmin.get(urlGetAll)
  },

  getThongKeDonHang: (request) => {
    const urlGetAll = `/statistical/view/thong-ke-don-hang`
    return axiosAdmin.get(urlGetAll, { params: request })
  },

  getThongKeTongTien: (request) => {
    const urlGetAll = `/statistical/view/thong-ke-tong-tien`
    return axiosAdmin.get(urlGetAll, { params: request })
  },
}
export default thongKeApi
