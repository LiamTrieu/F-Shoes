import React, { useState } from 'react'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import { toast } from 'react-toastify'
import { QrReader } from 'react-qr-reader'

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
  const [qrDataArray, setQRCodeData] = useState('')
  const [qrScannerVisible, setQrScannerVisible] = useState(false)
  const handleScan = (qrData) => {
    if (qrData) {
      setQRCodeData(qrData)
      const qrDataArray = qrData.split('|')
      const citizenId = qrDataArray[0]
      const fullName = qrDataArray[2]
      const dateOfBirthRaw = qrDataArray[3]
      const gender = qrDataArray[4]

      const dateOfBirth = dayjs(dateOfBirthRaw, 'DDMMYYYY').format('DD-MM-YYYY')

      setStaffAdd({
        ...staffAdd,
        citizenId,
        fullName,
        dateBirth: dateOfBirth,
        gender,
      })

      console.log('data', qrData)
    } else {
      console.error('Không tìm thấy mã QR.')
    }
  }
  const handleOpenQRScanner = () => {
    setQrScannerVisible(true)
  }

  const [staffAdd, setStaffAdd] = useState(initStaff)
  const theme = useTheme()
  const navigate = useNavigate()

  const handleGenderRadioChange = (e) => {
    setStaffAdd({ ...staffAdd, gender: Boolean(e.target.value) })
  }

  const handleStaffAdd = () => {
    console.log('staff :', staffAdd)
    const title = 'Xác nhận thêm mới nhân viên?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        staffApi.add(staffAdd).then(() => {
          toast.success('Thêm mới nhân viên thành công!', {
            position: toast.POSITION.TOP_RIGHT,
          })
          navigate('/admin/staff')
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
        <h2>Nhân viên</h2>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              color="success"
              // component={Link}
              // to="/admin/staff/qr-code"
              onClick={handleOpenQRScanner}>
              Quét QR
            </Button>
            {qrScannerVisible && (
              <QrReader delay={300} style={{ width: '100%' }} onResult={handleScan} />
            )}
          </Grid>
        </Grid>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format={'DD-MM-YYYY'}
                label="Ngày Sinh"
                sx={{ width: '100%' }}
                onChange={(e) =>
                  setStaffAdd({ ...staffAdd, dateBirth: dayjs(e).format('DD-MM-YYYY') })
                }
              />
            </LocalizationProvider>
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
            <FormControl size="small">
              <FormLabel>Giới tính:</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  name="genderUpdate"
                  value={true}
                  control={<Radio />}
                  label="Nam"
                  onChange={handleGenderRadioChange}
                />
                <FormControlLabel
                  name="genderUpdate"
                  value={false}
                  control={<Radio />}
                  label="Nữ"
                  onChange={handleGenderRadioChange}
                />
              </RadioGroup>
            </FormControl>
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
