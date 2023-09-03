import { Box, Button, Container, Popper, TextField } from "@mui/material";
import React from "react";
// import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
// import AddIcon from "@mui/icons-material/Add";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "anh", headerName: "Ảnh", width: 110 },
  { field: "tenTaiKhoan", headerName: "Tên tài khoản", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "hoTen",
    headerName: "Họ Tên",
    width: 200,
  },
  {
    field: "ngayTao",
    headerName: "Ngày tạo",
    width: 200,
  },
  {
    field: "trangThai",
    headerName: "trạng thái",
    width: 200,
  },
  {
    field: "thaoTac",
    headerName: "Thao tác",
    width: 200,
  },
];

const rows = [
  { id: 1, anh: "anh1", firstName: "Jon", age: 35 },
  { id: 2, anh: "anh2", firstName: "Cersei", age: 42 },
  { id: 3, anh: "anh3", firstName: "Jaime", age: 45 },
  { id: 4, anh: "anh4", firstName: "Arya", age: 16 },
  { id: 5, anh: "anh5", firstName: "Daenerys", age: null },
  { id: 6, anh: "anh6", firstName: null, age: 150 },
  { id: 7, anh: "anh7", firstName: "Ferrara", age: 44 },
  { id: 8, anh: "anh8", firstName: "Rossini", age: 36 },
  { id: 9, anh: "anh9", firstName: "Harvey", age: 65 },
];
export default function AdCustomerPage() {
  return (
    <div>
      <Container maxWidth="xl">
        <Box sx={{ border: "2px solid black", p: 2 }}>
          <TextField
            id="outlined-basic"
            label="Mã khách hàng"
            variant="outlined"
            size="small"
          />
          {/* <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            startIcon={<SearchIcon />}>
            Tìm kiếm
          </Button> */}
          {/* <Button
            variant="outlined"
            style={{ float: "right" }}
            color="success"
            startIcon={<AddIcon />}>
            Tạo tài khoản
          </Button> */}
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Container>
    </div>
  );
}
