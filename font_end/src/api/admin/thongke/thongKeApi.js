import axiosClient from '../../axios'

const thongKeApi = {
  getAllProductInMounth: (filter) => {
    const urlGetAll = `/statistical/get-product-in-mounth`
    return axiosClient.get(urlGetAll, { params: filter })
  },

  getDoanhThu: () => {
    const urlGetAll = `/statistical/doanh-thu`
    return axiosClient.get(urlGetAll)
  },

  getThongKeDonHang: (request) => {
    const urlGetAll = `/statistical/view/thong-ke-don-hang`
    return axiosClient.get(urlGetAll, { params: request })
  },

  getThongKeTongTien: (request) => {
    const urlGetAll = `/statistical/view/thong-ke-tong-tien`
    return axiosClient.get(urlGetAll, { params: request })
  },
}
export default thongKeApi
