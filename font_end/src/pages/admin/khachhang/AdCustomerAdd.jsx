import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import khachHangApi from '../../../api/admin/khachhang/KhachHangApi'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import Toast from '../../../components/Toast'
import { toast } from 'react-toastify'

export default function AdCustomerAdd() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [khachHang, setKhachHang] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
  })
  const onSubmit = (khachHang) => {
    const title = 'Xác nhận Thêm mới khách hàng?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        khachHangApi.addKhachHang(khachHang).then(() => {
          toast.success('Thêm khách hàng thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          navigate('/admin/customer')
        })
      } else {
        toast.error('Thêm khách hàng thất bại', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Toast />
        <Box sx={{ pt: 4 }}>
          <h1>Khách hàng</h1>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Tên khách hàng"
                type="text"
                size="small"
                fullWidth
                onChange={(e) => setKhachHang({ ...khachHang, fullName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Email"
                type="text"
                size="small"
                fullWidth
                onChange={(e) => setKhachHang({ ...khachHang, email: e.target.value })}
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
                onChange={(e) => setKhachHang({ ...khachHang, phoneNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField placeholder="Địa chỉ" style={{ width: '82%' }} type="text" size="small" />
              <Button variant="contained" color="success" sx={{ float: 'right' }}>
                Chọn
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Ngày sinh"
                    onChange={(e) =>
                      setKhachHang({ ...khachHang, dateBirth: dayjs(e).format('DD-MM-YYYY') })
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12}>
              <Button
                onClick={() => onSubmit(khachHang)}
                variant="contained"
                color="success"
                sx={{ float: 'right' }}>
                Tạo Mới
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
