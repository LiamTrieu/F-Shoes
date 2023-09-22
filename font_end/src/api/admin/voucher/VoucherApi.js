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
  searchVoucher: (adVoucherSearch) => {
    const urlSearchVoucher = `/voucher/search`
    return axiosClient.get(urlSearchVoucher, { params: adVoucherSearch })
  },
  getPageCustomer: (p) => {
    const url = `/khach-hang/get-page?p=${p}`
    return axiosClient.get(url)
  },

  getListIdCustomerByIdVoucher: (idVoucher) => {
    const urlListIdCustomerByIdVoucher = `/customerVoucher/view/list-id-customer/${idVoucher}`
    return axiosClient.get(urlListIdCustomerByIdVoucher)
  },
}

export default voucherApi
