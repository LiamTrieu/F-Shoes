import axiosClient from '../../axios'

const staffApi = {
  get: (page, filter) => {
    const url = `/staff/search-getPage?page=${page}&searchTen=${filter}`
    return axiosClient.get(url)
  },
  getOne: (id) => {
    const url = `/staff/detail/${id}`
    return axiosClient.get(url)
  },
  add: (staff) => {
    const url = `/staff/add`
    return axiosClient.post(url, staff)
  },
  update: (id, staff) => {
    const url = `/staff/update/${id}`
    console.log(url)
    return axiosClient.put(url, staff)
  },
  // getAllStaff: () => {
  //   const urlGetAll = `${urlStaff}/api/staff/find-all`;
  //   return axios.get(urlGetAll);
  // },
  // searchAndGetPageStaff: (page, searchTen) => {
  //   const urlSearchByInput = `${urlStaff}/api/staff/search-getPage?page=${page}&searchTen=${searchTen}`;
  //   return axios.get(urlSearchByInput);
  // },
  // getOne: (id) =>{
  //   const url = `${urlStaff}/api/staff/detail/${id}`;
  //   return axios.get(url);
  // },
  // addStaff: (addStaffRequest) => {
  //   const urlAddStaff = {
  //     url: `${urlStaff}/api/staff/add`,
  //     body: addStaffRequest,
  //   };
  //   return axios.get(urlAddStaff);
  // },
  // updateStaff: (id, addStaffRequest) => {
  //   const urlUpdateStaff = {
  //     url: `${urlStaff}/api/staff/update/${id}`,
  //     body: addStaffRequest,
  //   };
  //   return axios.get(urlUpdateStaff);
  // },
}
export default staffApi
