import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import khachHangApi from "../../../api/admin/khachhang/KhachHangApi";
import { useParams } from "react-router-dom";

export default function AdCustomerDetail() {
  const { id } = useParams();
  const [khachHang, setKhachHang] = useState([]);

  useEffect(() => {
    loadData(id);
  }, []);

  const loadData = (id) => {
    khachHangApi.getOne(id).then((response) => {
      setKhachHang(response.data);
    });
  };

  const setSelectImage = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Đọc tệp ảnh và cập nhật state khi hoàn thành
      const reader = new FileReader();
      reader.onload = () => {
        setSelectImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: "97%" }}>
        <Box sx={{ pt: 4 }}>
          <h1>Khách hàng</h1>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Tên khách hàng"
                variant="outlined"
                id="outlined-basic"
                type="text"
                size="small"
                fullWidth
                value={khachHang.data?.fullName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                placeholder="Email"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={khachHang.data?.email}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                placeholder="Số điện thoại"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={khachHang.data?.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                placeholder="Địa chỉ"
                variant="outlined"
                style={{ width: "82%" }}
                type="text"
                size="small"
              />
              <Button
                variant="contained"
                color="success"
                sx={{ float: "right" }}
              >
                Chọn
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Ngày sinh" />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <h3>Chọn ảnh khách hàng</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                sx={{ float: "right" }}
              >
                Tạo Mới
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}
