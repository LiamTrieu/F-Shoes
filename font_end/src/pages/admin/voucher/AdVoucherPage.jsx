import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Link } from "react-router-dom";

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
  {
    id: 2,
    ma: 4,
    giaTri: 2,
    giaTriToiDa: 2,
    choDonToiThieu: 2,
    soLuong: 2,
    quyen: 0,
    trangThai: 0,
    thoiGian: "9/10/2023 - 10/10/2023",
  },
  {
    id: 3,
    ma: 5,
    giaTri: 3,
    giaTriToiDa: 3,
    choDonToiThieu: 3,
    soLuong: 3,
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
            <Grid item xs={1.5}></Grid>
            <Grid item xs={2.5}>
              <Link to={"/admin/voucher/add"}>
                <Button color="success" variant="contained">
                  <AddIcon />
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
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Mã</TableCell>
                  <TableCell align="center">Giá trị</TableCell>
                  <TableCell align="center">Giá trị tối đa</TableCell>
                  <TableCell align="center">Điều kiện (tối thiểu)</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="center">Quyền</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thời gian</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.ma}</TableCell>
                    <TableCell align="center">{row.giaTri}%</TableCell>
                    <TableCell align="center">{row.giaTriToiDa}</TableCell>
                    <TableCell align="center">{row.choDonToiThieu}</TableCell>
                    <TableCell align="center">{row.soLuong}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: row.quyen === 0 ? "#00e676" : "#ffea00",
                        textTransform: "none",
                      }}
                    >
                      {row.quyen === 0 ? "Tất cả" : "Cá nhân"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: row.trangThai === 0 ? "#ff1744" : "#2979ff",
                        textTransform: "none",
                      }}
                    >
                      {row.trangThai === 0 ? "Hết hạn" : "Còn hạn"}
                    </TableCell>
                    <TableCell align="center">{row.thoiGian}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
