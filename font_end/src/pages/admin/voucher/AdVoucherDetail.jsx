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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import voucherApi from "../../../api/admin/voucher/VoucherApi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
// import PercentIcon from "@mui/icons-material/Percent";

export default function AdVoucherDetail() {
  const initialVoucher = {
    code: "",
    name: "",
    value: 0,
    maximumValue: 0,
    type: true,
    minimumAmount: 0,
    quantity: 0,
    startDate: 0,
    endDate: 0,
  };
  const { id } = useParams();
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [voucher, setVoucher] = useState(initialVoucher);

  useEffect(() => {
    fetchData(id);
  }, [id]);

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

  const handleTypeChange = (event) => {
    const newValue = event.target.value === "true";
    setVoucher({ ...voucher, type: Boolean(event.target.value) });
    setIsSelectVisible(newValue === false);
  };

  const handleUpdateVoucher = (idUpdate, voucherUpdate) => {
    voucherApi
      .updateVoucher(idUpdate, voucherUpdate)
      .then(() => {
        console.log(idUpdate);
        console.log(voucherUpdate.data);
        alert("updateVoucher success!");
      })
      .catch(() => {
        console.log(idUpdate);
        console.log(voucherUpdate.data);
        alert("updateVoucher error!");
      });
  };

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 1 }}>
        <h1>Chi tiết Voucher</h1>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Mã voucher"
              type="text"
              size="small"
              value={voucher.data?.code}
              onChange={(e) => setVoucher({ ...voucher, code: e.target.value })}
              fullWidth
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
              value={voucher.data?.name}
              onChange={(e) => setVoucher({ ...voucher, name: e.target.value })}
              fullWidth
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
              value={voucher.data?.value}
              onChange={(e) =>
                setVoucher({ ...voucher, value: Number(e.target.value) })
              }
              fullWidth
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
              value={voucher.data?.maximumValue}
              onChange={(e) =>
                setVoucher({ ...voucher, maximumValue: Number(e.target.value) })
              }
              fullWidth
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
              value={voucher.data?.quantity}
              onChange={(e) =>
                setVoucher({ ...voucher, quantity: Number(e.target.value) })
              }
              fullWidth
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
              value={voucher.data?.minimumAmount}
              onChange={(e) =>
                setVoucher({
                  ...voucher,
                  minimumAmount: Number(e.target.value),
                })
              }
              fullWidth
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
              <DateTimePicker label="Từ ngày" sx={{ width: "100%" }} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Đến ngày" sx={{ width: "100%" }} />
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
                  name="typeUpdate"
                  value={true}
                  control={<Radio />}
                  label="Tất cả"
                  checked={voucher.data?.type === true}
                  onChange={handleTypeChange}
                />
                <FormControlLabel
                  name="typeUpdate"
                  value={false}
                  control={<Radio />}
                  label="Cá nhân"
                  checked={voucher.data?.type === false}
                  onChange={handleTypeChange}
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
              onClick={() => handleUpdateVoucher(id, voucher)}
              variant="contained"
              fullWidth
              color="warning"
            >
              Cập nhật
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  );
}
