import axiosClient from "../../axios";
const khachHangApi = {
  get: (p) => {
    const url = `/khach-hang/get-page?p=${p}`;
    return axiosClient.get(url);
  },
  getOne: (id) => {
    const url = `/khach-hang/get-one/${id}`;
    return axiosClient.get(url);
  },

  search: (p, textSearch) => {
    const url = `/khach-hang/search?p=${p}&textSearch=${textSearch}`;
    return axiosClient.get(url);
  },

  addKhachHang: (khachhang) => {
    const url = `/khach-hang/create`;
    return axiosClient.post(url, khachhang);
  },

  delete: (id) => {
    const url = `/khach-hang/delete/${id}`;
    return axiosClient.delete(url);
  },
};
export default khachHangApi;
