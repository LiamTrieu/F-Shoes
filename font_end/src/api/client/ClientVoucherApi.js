import { axiosApi } from '../axios'

const ClientVoucherApi = {
  fetchVoucher: (request) => {
    const url = `/client/voucher/view/voucher-by-customer`
    return axiosApi.get(url, { params: request })
  },
  voucherByCode: (code) => {
    const url = `/client/voucher/view/voucher-by-code/${code}`
    return axiosApi.get(url)
  },
  getVoucherPublicMyProfileOldest: () => {
    const url = `/client/voucher/view/voucher-profile-public-oldest`
    return axiosApi.get(url)
  },
  getVoucherPublicMyProfileLatest: () => {
    const url = `/client/voucher/view/voucher-profile-public-latest`
    return axiosApi.get(url)
  },
  getVoucherPrivateMyProfileOldest: () => {
    const url = `/client/voucher/view/voucher-profile-private-oldest`
    return axiosApi.get(url)
  },
  getVoucherPrivateMyProfileLatest: () => {
    const url = `/client/voucher/view/voucher-profile-private-latest`
    return axiosApi.get(url)
  },
}
export default ClientVoucherApi
