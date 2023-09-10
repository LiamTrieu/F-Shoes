import React, { useState } from 'react'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

export default function AddStaff() {
  const initStaff = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    avatar: '',
    citizenId: '',
    gender: '',
    password: '',
    role: 1,
    status: 1,
  }
  const navigate = useNavigate()
  const [staffAdd, setStaffAdd] = useState(initStaff)

  const handleStaffAdd = (staffAdd) => {
    console.log('staff :', staffAdd)
    staffApi.add(staffAdd).then(() => {
      alert('Thêm mới nhân viên thành công!')
      navigate('/admin/staff')
    })
    .catch(() => {
      alert('Thêm mới nhân viên thất bại!')
    })
  }
  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <h2>Nhân viên</h2>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              id="outlined-basic"
              label="Họ Và Tên"
              variant="outlined"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, fullName: e.target.value })}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, email: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              id="outlined-basic"
              label="Số Điện Thoại"
              variant="outlined"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, phoneNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              id="outlined-basic"
              label="Số CCCD"
              variant="outlined"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, citizenId: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              id="outlined-basic"
              label="Giới tính"
              variant="outlined"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, gender: e.target.value })}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              id="outlined-basic"
              label="Mật khẩu"
              variant="outlined"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, password: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker format={'DD-MM-YYYY'} label="Ngày Sinh" sx={{ width: '100%' }} 
              onChange={(e) =>
                setStaffAdd({ ...staffAdd, dateBirth: dayjs(e).format('DD-MM-YYYY') })
                
              }/>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <Button
              onClick={() => handleStaffAdd(staffAdd)}
              variant="contained"
              fullWidth
              color="success">
              Thêm Nhân Viên
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  )
}
