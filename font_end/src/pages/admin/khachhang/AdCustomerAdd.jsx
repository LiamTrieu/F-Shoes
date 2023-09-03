import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function AdCustomerAdd() {
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
                id="outlined-basic"
                label="Tên Khách hàng"
                variant="outlined"
                size="large"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="large"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Ngày sinh"
                type="date"
                variant="outlined"
                size="large"
                sx={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                size="large"
                sx={{ width: "83%" }}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ float: "right" }}
              >
                Chọn
              </Button>
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
