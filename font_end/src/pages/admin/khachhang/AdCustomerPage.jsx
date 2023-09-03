import {
  Box,
  Button,
  Container,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function createData(
  stt,
  anh,
  tenTaiKhoan,
  email,
  hoTen,
  ngayTao,
  trangThai,
  thaoTac
) {
  return { stt, anh, tenTaiKhoan, email, hoTen, ngayTao, trangThai, thaoTac };
}

const rows = [
  createData(
    1,
    "anh1",
    "taikhoan1",
    "taikhoan1@gmail.com",
    "tai khoan 1",
    "03-09-2023",
    "trangthai1",
    ""
  ),
  createData(
    2,
    "anh1",
    "taikhoan1",
    "taikhoan1@gmail.com",
    "tai khoan 1",
    "03-09-2023",
    "trangthai1",
    ""
  ),
  createData(
    3,
    "anh1",
    "taikhoan1",
    "taikhoan1@gmail.com",
    "tai khoan 1",
    "03-09-2023",
    "trangthai1",
    ""
  ),
  createData(
    4,
    "anh1",
    "taikhoan1",
    "taikhoan1@gmail.com",
    "tai khoan 1",
    "03-09-2023",
    "trangthai1",
    ""
  ),
];
export default function AdCustomerPage() {
  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TextField
          id="outlined-basic"
          label="Mã khách hàng"
          variant="outlined"
          size="small"
        />
        <Button
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
          to="/admin/customer/add"
        >
          <Typography sx={{ ml: 1 }}>Tạo khách hàng</Typography>
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
                <TableCell align="right">Ngày tạo</TableCell>
                <TableCell align="right">trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.stt}</TableCell>
                  <TableCell align="right">{row.anh}</TableCell>
                  <TableCell align="right">{row.tenTaiKhoan}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.hoTen}</TableCell>
                  <TableCell align="right">{row.ngayTao}</TableCell>
                  <TableCell align="right">{row.trangThai}</TableCell>
                  <TableCell align="right">{row.thaoTac}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
