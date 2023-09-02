import axios from "axios";
const url = "http://localhost:8080";
const hoaDonApi = {
  getPage: (pageNo) => {
    const urlGetPage = `${url}/api/bill/get-page?pageNo=${pageNo}`;
    return axios.get(urlGetPage);
  },
  searchInput: (pageNo, inputSearch) => {
    const urlSearchByInput = `${url}/api/bill/search-by-inputText?pageNo=${pageNo}&inputSearch=${inputSearch}`;
    return axios.get(urlSearchByInput);
  },
  searchByDateRange: (pageNo, startDate, endDate) => {
    const urlSearchByDateRange = `${url}/api/bill/get-by-dateRange?pageNo=${pageNo}&startDate=${startDate}&endDate=${endDate}`;
    return axios.get(urlSearchByDateRange);
  },
};

export default hoaDonApi;
