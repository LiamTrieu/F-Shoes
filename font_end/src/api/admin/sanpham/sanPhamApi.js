import axiosClient from '../../axios'

const sanPhamApi = {
  get: (filter) => {
    const url = `/product`
    return axiosClient.get(url, { params: filter })
  },
  getList: () => {
    const url = `/product/get-list`
    return axiosClient.get(url)
  },
}
export default sanPhamApi
