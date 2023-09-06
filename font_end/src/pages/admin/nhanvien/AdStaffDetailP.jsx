import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

export default function AdStaffDetail() {
  const { id } = useParams();
  const [staffDetail, setStaffDetail] = useState();

  useEffect(() => {
    loadData(id)
  }, [])

  const loadData = (id) => {
    staffApi
      .getOne(id)
      .then((response) => {
        console.log(response.data);
        setStaffDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setSelectImage = useState(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Box sx={{ pt: 4 }}>
          <h1>Nhân Viên</h1>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Tên nhân viên"
                variant="outlined"
                id="outlined-basic"
                type="text"
                size="small"
                fullWidth
                value={staffDetail?.fullName}
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
                value={staffDetail?.email}
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
                value={staffDetail?.phoneNumber}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Ngày sinh" />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <h3>Chọn ảnh nhân viên</h3>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12}>
              <Button variant="contained" color="success" sx={{ float: 'right' }}>
                Tạo Mới
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
