import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import khachHangApi from '../../../api/admin/khachhang/KhachHangApi'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'

export default function AdCustomerDetail() {
  const theme = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()

  // State để lưu trữ dữ liệu khách hàng
  const [khachHang, setKhachHang] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: null,
  })

  // Nạp dữ liệu khách hàng khi thành phần được tạo ra (hoặc khi tham số id thay đổi)
  useEffect(() => {
    loadData(id)
  }, [id])

  const loadData = (id) => {
    khachHangApi.getOne(id).then((response) => {
      const formattedBirthDate = dayjs(response.data.data.dateBirth).format('DD-MM-YYYY')
      // Khởi tạo trạng thái khách hàng khi tải dữ liệu
      setKhachHang({ ...response.data.data, dateBirth: formattedBirthDate })
    })
  }

  const updateKhachHang = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    // Tạo một bản sao của trạng thái khách hàng
    const updatedKhachHang = { ...khachHang }

    // Cập nhật giá trị cho trường chỉ khi fieldName khớp với trường muốn cập nhật
    if (
      fieldName === 'fullName' ||
      fieldName === 'email' ||
      fieldName === 'phoneNumber' ||
      fieldName === 'dateBirth'
    ) {
      updatedKhachHang[fieldName] = fieldValue
    }

    // Cập nhật trạng thái khách hàng
    setKhachHang(updatedKhachHang)
  }

  const onSubmit = (id, khachHang) => {
    const title = 'Xác nhận sửa mới khách hàng?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        khachHangApi.updateKhachHang(id, khachHang).then(() => {
          toast.success('Sửa khách hàng thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          navigate('/admin/customer')
        })
      } else {
        toast.error('Sửa khách hàng thất bại', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '100%' }}>
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
                name="fullName"
                value={khachHang.fullName}
                onChange={(e) => updateKhachHang(e)}
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
                name="email"
                value={khachHang.email}
                onChange={(e) => updateKhachHang(e)}
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
                name="phoneNumber"
                value={khachHang.phoneNumber}
                onChange={(e) => updateKhachHang(e)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                placeholder="Địa chỉ"
                variant="outlined"
                style={{ width: '82%' }}
                type="text"
                size="small"
              />
              <Button variant="contained" color="secondary" size="medium">
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
                    name="dateBirth"
                    value={khachHang.dateBirth ? dayjs(khachHang.dateBirth) : null}
                    onChange={(date) =>
                      updateKhachHang({
                        target: {
                          name: 'dateBirth',
                          value: date ? dayjs(date).format('DD-MM-YYYY') : null,
                        },
                      })
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={3}>
              <Button
                variant="contained"
                sx={{ float: 'left' }}
                color="primary"
                onClick={() => navigate('/admin/customer')}>
                Quay lại danh sách
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              <Button
                onClick={() => onSubmit(id, khachHang)}
                variant="contained"
                color="primary"
                size="large"
                sx={{ float: 'right' }}>
                Cập nhật
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
