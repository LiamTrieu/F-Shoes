import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import voucherApi from "../../../api/admin/voucher/VoucherApi";
// import PercentIcon from "@mui/icons-material/Percent";

export default function AdVoucherDetail() {
  const { id } = useParams();
  const [voucher, setVoucher] = useState();

  useEffect(() => {
    fetchData(id);
  }, []);

  const fetchData = (id) => {
    voucherApi
      .getOneVoucherById(id)
      .then((response) => {
        console.log(response.data);
        setVoucher(response.data);
      })
      .catch(() => {
        alert("Error: Không tải được dữ liệu API");
      });
  };
  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 1 }}>
        <h1>Voucher Detail</h1>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              placeholder="Mã voucher"
              type="text"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              placeholder="Tên voucher"
              type="text"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/*------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <OutlinedInput
              placeholder="Giá trị"
              type="number"
              size="small"
              fullWidth
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </Grid>
          <Grid item xs={5.5}>
            <OutlinedInput
              placeholder="Giá trị tối đa"
              type="number"
              size="small"
              fullWidth
              endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <FormControl size="small" fullWidth>
              <InputLabel>Kiểu</InputLabel>
              <Select>
                <MenuItem value={true}>Tất cả</MenuItem>
                <MenuItem value={false}>Cá nhân</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5.5}>
            <OutlinedInput
              placeholder="Điều kiện"
              type="number"
              size="small"
              fullWidth
              endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              sx={{ mt: 2 }}
              id="TN"
              label="Từ ngày"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              sx={{ mt: 2 }}
              id="DN"
              label="Đến ngày"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}>
            <TextField
              placeholder="Số lượng"
              type="number"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl size="small" fullWidth>
              <InputLabel>Quyền sử dụng</InputLabel>
              <Select>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button sx={{ width: 150, float: "left" }} variant="contained">
              Chọn
            </Button>
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={3}>
            <Button variant="contained" fullWidth color="success">
              Xác nhận
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  );
}
