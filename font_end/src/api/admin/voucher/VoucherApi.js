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
    const urlAddVoucher = {
      url: `${urlVoucher}/api/voucher/add`,
      body: adVoucherRequest,
    };
    return axios.get(urlAddVoucher);
  },
  updateVoucher: (id, adVoucherRequest) => {
    const urlUpdateVoucher = {
      url: `${urlVoucher}/api/voucher/update/${id}`,
      body: adVoucherRequest,
    };
    return axios.get(urlUpdateVoucher);
  },
  deleteVoucher: (id) => {
    const urlDeleteVoucher = `${urlVoucher}/api/voucher/delete/${id}`;
    return axios.get(urlDeleteVoucher);
  },
  searchVoucher: (pageableRequest, adVoucherSearch) => {
    const urlSearchVoucher = {
      url: `${urlVoucher}/api/voucher/search`,
      body: { pageableRequest, adVoucherSearch },
    };
    return axios.get(urlSearchVoucher);
  },
};

export default voucherApi;
