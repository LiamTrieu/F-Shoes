import axios from "axios";
const urlVoucher = "http://localhost:8080";
const voucherApi = {
  getAllVoucher: () => {
    const urlGetAll = `${urlVoucher}/api/voucher/view/all`;
    return axios.get(urlGetAll);
  },
  getOneVoucherById: (id) => {
    const urlOneVoucherById = `${urlVoucher}/api/voucher/view/one/${id}`;
    return axios.get(urlOneVoucherById);
  },
  getPageVoucher: (numberPage) => {
    const urlPageVoucher = `${urlVoucher}/api/voucher/view/page?numberPage=${numberPage}`;
    return axios.get(urlPageVoucher);
  },
  addVoucher: (adVoucherRequest) => {
    const urlAddVoucher = `${urlVoucher}/api/voucher/add`;
    return axios.post(urlAddVoucher, adVoucherRequest);
  },
  updateVoucher: (id, adVoucherRequest) => {
    const urlUpdateVoucher = `${urlVoucher}/api/voucher/update/${id}`;
    return axios.put(urlUpdateVoucher, adVoucherRequest);
  },
  deleteVoucher: (id) => {
    const urlDeleteVoucher = `${urlVoucher}/api/voucher/delete/${id}`;
    return axios.delete(urlDeleteVoucher);
  },
  searchVoucher: (pageableRequest, adVoucherSearch) => {
    const urlSearchVoucher = `${urlVoucher}/api/voucher/search?startDateSearch=${adVoucherSearch.startDateSearch}&endDateSearch=${adVoucherSearch.endDateSearch}&pageSearch=${pageableRequest}&nameSearch=${adVoucherSearch.nameSearch}`;
    return axios.get(urlSearchVoucher);
  },
};

export default voucherApi;
