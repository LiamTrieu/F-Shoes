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
  Modal,
  Box,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import { toast } from 'react-toastify'
import { useZxing } from 'react-zxing'

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function AddStaff() {
  const initStaff = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    citizenId: '',
    role: '',
    gender: '',
    avatar: null,
  }
  const [qrScannerVisible, setQrScannerVisible] = useState(false)
  const [image, setImage] = useState(null)

  const RenderVideo = () => {
    const { ref } = useZxing({
      onDecodeResult(result) {
        handleScan(result)
        setQrScannerVisible(false)
      },
      paused: !qrScannerVisible,
    })
    return <video ref={ref} width="100%" />
  }

  const handleScan = (qrData) => {
    if (qrData?.text) {
      const qrDataArray = qrData?.text.split('|')
      const citizenId = qrDataArray[0]
      const fullName = qrDataArray[2]
      const dateOfBirthRaw = qrDataArray[3]
      const gender = qrDataArray[4] === 'Nam'

      const dateBirth = dayjs(dateOfBirthRaw, 'DDMMYYYY').format('DD-MM-YYYY')
      // const dateBirth = dayjs(dateOfBirthRaw.data.dateBirth).format('DD-MM-YYYY')

      setStaffAdd({
        ...staffAdd,
        citizenId: citizenId, 
        fullName: fullName,
        dateBirth: dateBirth,
        gender: gender,
        email: initStaff.email,
        phoneNumber: initStaff.phoneNumber,
        password: initStaff.password,
        avatar: initStaff.password,
        role: initStaff.role,
      })
      setQrScannerVisible(false)
    }
  }

  const handleOpenQRScanner = () => {
    setQrScannerVisible(true)
  }
  const handleCloseQRScanner = () => {
    setQrScannerVisible(false)
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

  const handleImageChange = (event) => {
    let file = event.target.files[0]
    if (file) {
      setStaffAdd({ ...staffAdd, avatar: file })
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
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
            <Button color="cam" variant="contained" fullWidth onClick={handleOpenQRScanner}>
              Quét QR
            </Button>
          </Grid>
        </Grid>
        <Modal open={qrScannerVisible} onClose={handleCloseQRScanner}>
          <Box sx={styleModal}>
            <RenderVideo />
          </Box>
        </Modal>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              id="outlined-basic"
              label="Họ Và Tên"
              variant="outlined"
              value={staffAdd?.fullName}
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
              value={staffAdd?.citizenId}
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
                value={dayjs(staffAdd?.dateBirth, 'DD-MM-YYYY')}
                sx={{ width: '100%' }}
                onChange={(e) =>
                  setStaffAdd({ ...staffAdd, dateBirth: dayjs(e).format('DD-MM-YYYY') })
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={5.5}>
            <FormControl size="small">
              <FormLabel>Giới tính:</FormLabel>
              <RadioGroup row value={staffAdd.gender}>
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
          <Grid item xs={5.5}>
            <h4>Chọn ảnh nhân viên</h4>
            <div
              onClick={() => {
                document.getElementById('select-avatar').click()
              }}
              style={{
                border: '1px solid black',
                cursor: 'pointer',
                height: '100px',
                width: '100px',
              }}>
              {image && (
                <img src={image} alt="Chọn ảnh" style={{ width: '100%', height: '100%' }} />
              )}
              {!image && 'Chọn ảnh'}
            </div>
            <input
              hidden
              id="select-avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
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
              color="cam">
              Thêm Nhân Viên
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  )
}
