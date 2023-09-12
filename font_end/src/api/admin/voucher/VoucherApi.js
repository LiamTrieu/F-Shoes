import axiosClient from '../../axios'

const voucherApi = {
  getAllVoucher: () => {
    const urlGetAll = `/voucher/view/all`
    return axiosClient.get(urlGetAll)
  },
  getOneVoucherById: (id) => {
    const urlOneVoucherById = `/voucher/view/one/${id}`
    return axiosClient.get(urlOneVoucherById)
  },
  getPageVoucher: (numberPage) => {
    const urlPageVoucher = `/voucher/view/page?numberPage=${numberPage}`
    return axiosClient.get(urlPageVoucher)
  },
  addVoucher: (adVoucherRequest) => {
    const urlAddVoucher = `/voucher/add`
    return axiosClient.post(urlAddVoucher, adVoucherRequest)
  },
  updateVoucher: (id, adVoucherRequest) => {
    const urlUpdateVoucher = `/voucher/update/${id}`
    return axiosClient.put(urlUpdateVoucher, adVoucherRequest)
  },
  deleteVoucher: (id) => {
    const urlDeleteVoucher = `/voucher/delete/${id}`
    return axiosClient.delete(urlDeleteVoucher)
  },
  searchVoucher: (pageableRequest, adVoucherSearch) => {
    const urlSearchVoucher = `/voucher/search?startDateSearch=${adVoucherSearch.startDateSearch}&endDateSearch=${adVoucherSearch.endDateSearch}&pageSearch=${pageableRequest}&nameSearch=${adVoucherSearch.nameSearch}&typeSearch=${adVoucherSearch.typeSearch}&statusSearch=${adVoucherSearch.statusSearch}`
    return axiosClient.get(urlSearchVoucher)
  },
  getPageCustomer: (p) => {
    const url = `/khach-hang/get-page?p=${p}`
    return axiosClient.get(url)
  },
}

export default voucherApi
