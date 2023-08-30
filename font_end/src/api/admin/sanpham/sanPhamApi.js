import axios from "axios";

const sanPhamApi = {
  get: () => {
    const url = `/product`;
    return axios.get(url);
  },
  updateSanPham: (sanpham) => {
    const url = `/product`;
    return axios.put(url, sanpham);
  },
};
export default sanPhamApi;
