import React, { useState } from 'react'
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
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import khachHangApi from '../../../api/admin/khachhang/KhachHangApi'
import DiaChiApi from '../../../api/admin/khachhang/DiaChiApi'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import { toast } from 'react-toastify'

export default function AdCustomerAdd() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [xa, setXa] = useState('')
  const [huyen, setHuyen] = useState('')
  const [tinh, setTinh] = useState('')
  const [khachHang, setKhachHang] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
  })
  const [diaChi, setDiaChi] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    specificAddress: '',
    type: null,
    idCustomer: '',
  })

  const updateDiaChi = () => {
    setDiaChi({
      ...diaChi,
      name: khachHang.fullName,
      phoneNumber: khachHang.phoneNumber,
      email: khachHang.email,
      type: true,
    })
  }

  const onSubmit = (khachHang) => {
    const title = 'Xác nhận Thêm mới khách hàng?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        // Thêm mới khách hàng
        khachHangApi.addKhachHang(khachHang).then((response) => {
          const khachHangId = response.data.id
          console.log(khachHangId)
          // Cập nhật id của khách hàng trong địa chỉ
          setDiaChi({ ...diaChi, idCustomer: khachHangId })
          // Thêm mới địa chỉ
          DiaChiApi.add(diaChi).then(() => {
            toast.success('Thêm khách hàng thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            navigate('/admin/customer')
          })
        })
      }
    })
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Box sx={{ pt: 4 }}>
          <h1>Khách hàng</h1>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Tên khách hàng"
                type="text"
                size="small"
                fullWidth
                onChange={(e) => {
                  setKhachHang({ ...khachHang, fullName: e.target.value })
                  updateDiaChi()
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Email"
                type="text"
                size="small"
                fullWidth
                onChange={(e) => {
                  setKhachHang({ ...khachHang, email: e.target.value })
                  updateDiaChi()
                }}
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
                onChange={(e) => {
                  setKhachHang({ ...khachHang, phoneNumber: e.target.value })
                  updateDiaChi()
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Xã</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={xa}
                    label="Xã"
                    onChange={(e) => setXa(e.target.value)}>
                    <MenuItem value={'Xã A'}>Xã A</MenuItem>
                    <MenuItem value={'Xã B'}>Xã B</MenuItem>
                    <MenuItem value={'Xã C'}>Xã C</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Huyện</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={huyen}
                    label="Huyện"
                    onChange={(e) => setHuyen(e.target.value)}>
                    <MenuItem value={'Huyện A'}>Huyện A</MenuItem>
                    <MenuItem value={'Huyện B'}>Huyện B</MenuItem>
                    <MenuItem value={'Huyện C'}>Huyện C</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Tỉnh</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tinh}
                    label="Tỉnh"
                    onChange={(e) => setTinh(e.target.value)}>
                    <MenuItem value={'Tỉnh A'}>Tỉnh A</MenuItem>
                    <MenuItem value={'Tỉnh B'}>Tỉnh B</MenuItem>
                    <MenuItem value={'Tỉnh C'}>Tỉnh C</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Địa chỉ cụ thể"
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setDiaChi({
                    ...diaChi,
                    specificAddress: e.target.value + ', ' + xa + ', ' + huyen + ', ' + tinh,
                  })
                }
              />
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
