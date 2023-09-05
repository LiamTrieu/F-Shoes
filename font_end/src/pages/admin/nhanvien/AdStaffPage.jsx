import {
  Button,
  TextField,
  Table,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import staffApi from "../../../api/admin/nhanvien/nhanVienApi";
import { useEffect, useState } from "react";

export default function AdCustomerPage() {
  const [listStaff, setListStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setToTalPages] = useState(0);
  const [tenSearch, setTenSearch] = useState('');

  const fetchData = () => {
    staffApi
      .searchAndGetPageStaff(0, tenSearch)
      .then((response) => {
        console.log(response.data);
        setListStaff(response.data.data);
        setCurrentPage(response.data.number);
        setToTalPages(response.data.totalPages);
      })
      .catch(() => {
        alert("Error: Không tải dữ liệu API");
      });
  };

  useEffect(() => {
    fetchData(currentPage - 1);
  }, [currentPage]);

  const Search = (e) =>{
    setTenSearch(e.target.value)
  }
  // const fetchData = () => {
    
  //   staffApi
  //     .getAllStaff()
  //     .then((response) => {
  //       console.log(response.data);
  //       setListStaff(response.data);
  //     })
  //     .catch(() => {
  //       alert("Error: Không tải dữ liệu API");
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TextField
          onChange={Search} 
          id="outlined-basic"
          label="Tên Nhân Viên"
          variant="outlined"
          size="small"
        />
        
        <Button
          onClick={()=> {
            fetchData()
          }}
          variant="contained"
          style={{ marginLeft: "10px" }}
          AiOutlineSearch
        >
          Tìm kiếm
        </Button>
        <Button
          variant="outlined"
          style={{ float: "right" }}
          color="success"
          component={Link}
          to="/admin/staff/add"
        >
          <Typography sx={{ ml: 1 }}>Tạo Nhân Viên</Typography>
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="right">Ảnh</TableCell>
                <TableCell align="right">Tên tài khoản</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Họ tên</TableCell>
                <TableCell align="right">Ngày sinh</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listStaff && listStaff.length > 0 ? (
                listStaff.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="right">{row.avatar}</TableCell>
                    <TableCell align="right">{row.fullName}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.dateBirth}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    Không có dữ liệu để hiển thị.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
