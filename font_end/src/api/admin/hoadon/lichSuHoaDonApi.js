import axios from "axios";
const url = "http://localhost:8080/api/billHistory";
const lichSuHoaDonApi = {
  getByIdBill: (idBill) => {
    const urlGetByIdBill = `${url}/get-by-idBill/${idBill}`;
    return axios.get(urlGetByIdBill);
  },
};

export default lichSuHoaDonApi;
