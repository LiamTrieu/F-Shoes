import axiosAdmin from '../../axios'

const thongKeApi = {
  getAllProductInDay: (filter) => {
    const urlGetAll = `/statistical/get-product-in-day`
    return axiosAdmin.get(urlGetAll, { params: filter })
  },

  getAllProductInWeek: (filter) => {
    const urlGetAll = `/statistical/get-product-in-week`
    return axiosAdmin.get(urlGetAll, { params: filter })
  },

  getAllProductInMonth: (filter) => {
    const urlGetAll = `/statistical/get-product-in-month`
    return axiosAdmin.get(urlGetAll, { params: filter })
  },

  getAllProductInYear: (filter) => {
    const urlGetAll = `/statistical/get-product-in-year`
    return axiosAdmin.get(urlGetAll, { params: filter })
  },

  getDoanhThu: () => {
    const urlGetAll = `/statistical/doanh-thu`
    return axiosAdmin.get(urlGetAll)
  },

  getDoanhThuCu: () => {
    const urlGetAll = `/statistical/doanh-thu-cu`
    return axiosAdmin.get(urlGetAll)
  },

  getThongKeDonHang: () => {
    const urlGetAll = `/statistical/view/thong-ke-don-hang`
    return axiosAdmin.get(urlGetAll)
  },

  getProductTakeOut: (filter) => {
    const urlGetAll = `/statistical/get-product-take-out`
    return axiosAdmin.get(urlGetAll, { params: filter })
  },

  getProductInCustom: (filter) => {
    const urlGetAll = `/statistical/get-product-in-custom`
    return axiosAdmin.get(urlGetAll, { params: filter })
  },
}
export default thongKeApi
