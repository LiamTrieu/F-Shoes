import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import khachHangApi from "../../../api/admin/khachhang/KhachHangApi";
import { useNavigate } from "react-router-dom";

export default function AdCustomerAdd() {
  const navigate = useNavigate();
  const [khachHang, setKhachHang] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateBirth: "",
    avatar: "",
  });
  const onSubmit = (khachHang) => {
    khachHangApi.addKhachHang(khachHang).then(() => {
      alert("thành công");
      navigate("/admin/customer");
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
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setKhachHang({ ...khachHang, fullName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Email"
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setKhachHang({ ...khachHang, email: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Số điện thoại"
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setKhachHang({ ...khachHang, phoneNumber: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Địa chỉ"
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
                onClick={() => onSubmit(khachHang)}
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
