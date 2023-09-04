import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import voucherApi from "../../../api/admin/voucher/VoucherApi";
import { useNavigate } from "react-router-dom";
// import PercentIcon from "@mui/icons-material/Percent";

export default function AdVoucherAdd() {
  const initialVoucher = {
    code: "",
    name: "",
    value: 0,
    maximumValue: 0,
    type: "true",
    minimumAmount: 0,
    quantity: 0,
    startDate: 0,
    endDate: 0,
    status: 1,
  };

  const navigate = useNavigate();
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [voucherAdd, setVoucherAdd] = useState(initialVoucher);

  const handleTypeChange = (event) => {
    const newValue = event.target.value === "true";
    setVoucherAdd({ ...voucherAdd, type: Boolean(event.target.value) });
    setIsSelectVisible(newValue === false);
  };

  const handleVoucherAdd = (voucherAdd) => {
    console.log("voucher :", voucherAdd);
    voucherApi
      .addVoucher(voucherAdd)
      .then(() => {
        alert("Thêm mới voucher thành công!");
        navigate("/admin/voucher");
      })
      .catch(() => {
        alert("Thêm mới voucher thất bại!");
      });
  };
  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 1 }}>
        <h1>Thêm mới Voucher</h1>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Mã voucher"
              type="text"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({ ...voucherAdd, code: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Tên voucher"
              type="text"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({ ...voucherAdd, name: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/*------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Giá trị"
              type="number"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({ ...voucherAdd, value: Number(e.target.value) })
              }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Giá trị tối đa"
              type="number"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({
                  ...voucherAdd,
                  maximumValue: Number(e.target.value),
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">VNĐ</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Số lượng"
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({
                  ...voucherAdd,
                  quantity: Number(e.target.value),
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Điều kiện"
              type="number"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({
                  ...voucherAdd,
                  minimumAmount: Number(e.target.value),
                })
              }
              endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">VNĐ</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                // onChange={(e) => setVoucherAdd({...voucherAdd, startDate: e.target.value })}
                label="Từ ngày"
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                // onChange={(e) => setVoucherAdd({...voucherAdd, endDate: e.target.value })}
                label="Đến ngày"
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}>
            <FormControl size="small">
              <FormLabel>Kiểu</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  name="typeAdd"
                  value={true}
                  control={<Radio />}
                  label="Tất cả"
                  onChange={(e) => handleTypeChange(e)}
                  checked={isSelectVisible === false}
                />
                <FormControlLabel
                  name="typeAdd"
                  value={false}
                  control={<Radio />}
                  label="Cá nhân"
                  onChange={(e) => handleTypeChange(e)}
                  checked={isSelectVisible === true}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            {isSelectVisible && (
              <FormControl size="small" sx={{ mt: 2.5 }} fullWidth>
                <InputLabel>Quyền sử dụng</InputLabel>
                <Select>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={3}>
            {isSelectVisible && (
              <Button
                sx={{ width: 150, float: "left", mt: 2.5 }}
                variant="contained"
              >
                Chọn
              </Button>
            )}
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <Button
              onClick={() => handleVoucherAdd(voucherAdd)}
              variant="contained"
              fullWidth
              color="success"
            >
              Xác nhận
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  );
}
