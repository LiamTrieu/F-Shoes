import axiosClient from '../axios'

const ClientVoucherApi = {
  fetchVoucher: (request) => {
    const url = `/client/voucher/view/voucher-by-customer`
    return axiosClient.get(url, { params: request })
  },
}
export default ClientVoucherApi
