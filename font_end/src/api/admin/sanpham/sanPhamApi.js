import axiosClient from '../../axios'

const sanPhamApi = {
  get: (filter) => {
    const url = `/product`
    return axiosClient.get(url, { params: filter })
  },
}
export default sanPhamApi
