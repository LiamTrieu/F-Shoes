import axiosClient from '../../axios'
const hoaDonApi = {
  getPage: (pageNo) => {
    const urlGetPage = `/bill/get-page?pageNo=${pageNo}`
    return axiosClient.get(urlGetPage)
  },
  searchInput: (pageNo, inputSearch) => {
    const urlSearchByInput = `/bill/search-by-inputText?pageNo=${pageNo}&inputSearch=${inputSearch}`
    return axiosClient.get(urlSearchByInput)
  },
  searchByDateRange: (pageNo, startDate, endDate) => {
    const urlSearchByDateRange = `/bill/get-by-dateRange?pageNo=${pageNo}&startDate=${startDate}&endDate=${endDate}`
    return axiosClient.get(urlSearchByDateRange)
  },
  filterBillByStatusAndType: (pageNo, statusBill, typeBill) => {
    const urlFilterBillByStatusAndType = `/bill/get-by-status-and-type?pageNo=${pageNo}&status=${statusBill}&type=${typeBill}`
    return axiosClient.get(urlFilterBillByStatusAndType)
  },
  getOne: (id) => {
    const urlGetOne = `/bill/get/${id}`
    return axiosClient.get(urlGetOne)
  },
}

export default hoaDonApi
