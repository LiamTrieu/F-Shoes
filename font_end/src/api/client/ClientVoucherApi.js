import axiosClient from '../axios'

const ClientVoucherApi = {
  fetchVoucher: (request) => {
    const url = `/client/voucher/view/voucher-by-customer`
    return axiosClient.get(url, { params: request })
  },
  voucherByCode: (code) => {
    const url = `/client/voucher/view/voucher-by-code/${code}`
    return axiosClient.get(url)
  },
}
export default ClientVoucherApi
