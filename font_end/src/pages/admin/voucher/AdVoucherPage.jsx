import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  { field: "ma", headerName: "Mã" },
  { field: "giaTri", headerName: "Giá trị" },
  { field: "giaTriToiDa", headerName: "Giá trị tối đa" },
  { field: "choDonToiThieu", headerName: "Cho đơn tối thiểu" },
  { field: "soLuong", headerName: "Số lượng" },
  { field: "quyen", headerName: "Quyền" },
  { field: "trangThai", headerName: "Trạng thái" },
  { field: "thoiGian", headerName: "Thời Gian" },
  {
    field: "",
    headerName: "Thao tác",
    width: 100,
    renderCell: (params) => (
      <div>
        <button>Xem chi tiết</button>
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    ma: 1,
    giaTri: 1,
    giaTriToiDa: 1,
    choDonToiThieu: 1,
    soLuong: 1,
    quyen: 1,
    trangThai: 1,
    thoiGian: "9/10/2023 - 10/10/2023",
  },
];

export default function AdVoucherPage() {
  return (
    <div>
      <Container>
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                id="outlined"
                label="Tìm Voucher"
                type="text"
                size="small"
              />
            </Grid>
            <Grid xs={1.5}>
              <Button sx={{ ml: 1, mt: 2 }} variant="contained">
                Tìm kiếm
              </Button>
            </Grid>
            <Grid xs={0.5}></Grid>
            <Grid xs={2.3}>
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={2.2}>
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="Đến ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={2.5}>
              <Link to={"/admin/voucher/add"}>
                <Button
                  sx={{ ml: 1, mt: 2 }}
                  color="success"
                  variant="contained"
                >
                  <AddIcon />
                  <Typography sx={{ ml: 1 }}>Tạo voucher</Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
        {/*----------------------------------------------------------------*/}
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[1, 5, 10]}
            checkboxSelection
          />
        </Paper>
      </Container>
    </div>
  );
}
