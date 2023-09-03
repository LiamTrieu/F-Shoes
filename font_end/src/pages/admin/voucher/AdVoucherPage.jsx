import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
// import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import voucherApi from "../../../api/admin/voucher/VoucherApi";

export default function AdVoucherPage() {
  const [listVoucher, setListVoucher] = useState([]);
  const [initPage, setInitPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(initPage - 1);
  }, []);

  const handelOnchangePage = (page) => {
    setInitPage(page);
    fetchData(page - 1);
  };

  const fetchData = (initPage) => {
    voucherApi
      .getPageVoucher(initPage)
      .then((response) => {
        setListVoucher(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      })
      .catch(() => {
        alert("Error: Không tải được dữ liệu API");
      });
  };

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id="outlined"
              label="Nhập mã voucher"
              type="text"
              size="small"
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              id="outlined"
              label="Từ ngày"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              id="outlined"
              label="Đến ngày"
              type="date"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={1.8}></Grid>
          <Grid item xs={2.2}>
            <Link to={"/admin/voucher/add"}>
              <Button color="success" variant="contained">
                <Typography sx={{ ml: 1 }}>Tạo voucher</Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
      {/*----------------------------------------------------------------*/}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Mã</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Giá trị</TableCell>
                <TableCell align="center">Giá trị (tối đa)</TableCell>
                <TableCell align="center">Kiểu</TableCell>
                <TableCell align="center">Điều kiện</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Ngày bắt đầu</TableCell>
                <TableCell align="center">Ngày kết thúc</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listVoucher.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.value}%</TableCell>
                  <TableCell align="center">{row.maximumValue}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: row.type === true ? "#00b0ff" : "#ffea00",
                    }}>
                    {row.type === true ? "Tất cả" : "Cá nhân"}
                  </TableCell>
                  <TableCell align="center">{row.minimumAmount}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.startDate}</TableCell>
                  <TableCell align="center">{row.endDate}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: row.status === 0 ? "#e91e63" : "#357a38",
                    }}>
                    {row.status === 0 ? "Hết hạn" : "Còn hạn"}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/admin/voucher/${row.id}/detail`}>
                      <Tooltip title="Xem chi tiết">
                        <Button style={{ color: "#C0C0C0" }}>
                          <span>XCT</span>
                        </Button>
                      </Tooltip>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Pagination
              page={initPage}
              onChange={(event, page) => handelOnchangePage(page)}
              count={totalPages}
              color="primary"
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>
    </div>
  );
}
