import axiosClient from '../../axios'
const khuyenMaiApi = {
  getAll: () => {
    const GetAll = `/promotion/get-all`
    return axiosClient.get(GetAll)
  },

  getAllProduct: () => {
    const GetAll = `/promotion/get-product`
    return axiosClient.get(GetAll)
  },

  getPage: (totalPages) => {
    const urlPage = `/promotion/get-page`
    return axiosClient.get(urlPage, totalPages)
  },

  getAllPromotion: (filter) => {
    const urlPage = `/promotion/get-Promotion-filter`
    return axiosClient.get(urlPage, { params: filter })
  },

  getById: (id) => {
    const getPageById = `/promotion/get-one/${id}`
    return axiosClient.get(getPageById)
  },

  addPromotion: (Promotion) => {
    const urlAddPromotion = `/promotion/add`
    return axiosClient.post(urlAddPromotion, Promotion)
  },

  addProductPromotion: (ProductPromotion) => {
    const urlAddPromotion = `/promotion/add-product-promotion`
    return axiosClient.post(urlAddPromotion, ProductPromotion)
  },

  UpdayePromotion: (UpdatePromotionRe, id) => {
    const urlUpdatePromotion = `/promotion/update/${id}`
    return axiosClient.put(urlUpdatePromotion, UpdatePromotionRe, id)
  },

  searchPromotionByName: (page, textSearch) => {
    const urlSearchPromotion = `/promotion/search-by-name?page=${page}&textSearch=${textSearch}`
    return axiosClient.get(urlSearchPromotion)
  },
  deletePromotion: (id) => {
    const urlDeletePromotion = `/promotion/delete/${id}`
    return axiosClient.put(urlDeletePromotion)
  },
}

export default khuyenMaiApi
