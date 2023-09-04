import axios from "axios";
const urlStaff = "http://localhost:8080";

const staffApi = {
  getAllStaff: () => {
    const urlGetAll = `${urlStaff}/api/staff/find-all`;
    return axios.get(urlGetAll);
  },
  searchAndGetPageStaff: (page, searchTen) => {
    const urlSearchByInput = `${urlStaff}/api/staff/search-getPage?page=${page}&searchTen=${searchTen}`;
    return axios.get(urlSearchByInput);
  },
  addStaff: (addStaffRequest) => {
    const urlAddStaff = {
      url: `${urlStaff}/api/staff/add`,
      body: addStaffRequest,
    };
    return axios.get(urlAddStaff);
  },
  updateStaff: (id, addStaffRequest) => {
    const urlUpdateStaff = {
      url: `${urlStaff}/api/staff/update/${id}`,
      body: addStaffRequest,
    };
    return axios.get(urlUpdateStaff);
  },
};
export default staffApi;
