import axios from "axios";
const urlPromotion = "http://localhost:8080";
const khuyenMaiApi = {
  getAll: () => {
    const GetAll = `${urlPromotion}/api/promotion/get-all`;
    return axios.get(GetAll);
  },

  getPage: (totalPages) => {
    const urlPage = `${urlPromotion}/api/promotion/page?page=${totalPages}`;
    return axios.get(urlPage);
  },

  getById: (id) => {
    const getPageById = `${urlPromotion}/api/promotion/get-one/${id}`;
    return axios.get(getPageById);
  },

  addPromotion: (Promotion) => {
    const urlAddPromotion = `${urlPromotion}/api/promotion/add`;
    return axios.post(urlAddPromotion, Promotion);
  },
};

export default khuyenMaiApi;
