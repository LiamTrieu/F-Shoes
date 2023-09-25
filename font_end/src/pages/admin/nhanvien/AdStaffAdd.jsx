import React, { useState } from 'react'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Modal,
  Box,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { toast } from 'react-toastify'
import { useZxing } from 'react-zxing'
import './AdStaffAdd.css'
import CircularProgress from '@mui/material/CircularProgress'

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

const imageContainerStyle = {
  border: '2px dashed #ddd',
  borderRadius: '50%',
  cursor: 'pointer',
  height: '150px',
  width: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

const AddStaff = () => {
  const initStaff = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    citizenId: '',
    role: 0,
    gender: '',
    avatar: null,
  }

  const [qrScannerVisible, setQrScannerVisible] = useState(false)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false) // Thêm state loading
  const [confirmClicked, setConfirmClicked] = useState(false) // Thêm state để theo dõi xác nhận

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

      setStaffAdd({
        ...staffAdd,
        citizenId: citizenId,
        fullName: fullName,
        dateBirth: dateBirth,
        gender: gender,
        email: initStaff.email,
        phoneNumber: initStaff.phoneNumber,
        avatar: initStaff.avatar,
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
  const navigate = useNavigate()

  const handleStaffAdd = () => {
    setConfirmClicked(true) // Đánh dấu người dùng đã xác nhận

    const title = 'Xác nhận thêm mới nhân viên?'
    const text = ''
    confirmSatus(title, text).then((result) => {
      if (result.isConfirmed) {
        setLoading(true) // Bắt đầu hiển thị CircularProgress
        staffApi
          .add(staffAdd)
          .then(() => {
            toast.success('Thêm mới nhân viên thành công!', {
              position: toast.POSITION.TOP_RIGHT,
            })

            navigate('/admin/staff')
          })
          .catch((error) => {
            toast.error('Thêm khách hàng thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          .finally(() => {
            setLoading(false) // Kết thúc hiển thị CircularProgress
          })
      } else {
        // Người dùng không xác nhận
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
    <div className="nhanvienadd">
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <h2>Nhân viên</h2>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={7}>
            <div
              onClick={() => {
                document.getElementById('select-avatar').click()
              }}
              style={imageContainerStyle}>
              {image ? <img src={image} alt="Chọn ảnh" style={imageStyle} /> : 'Chọn ảnh'}
            </div>
            <input
              hidden
              id="select-avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Grid>
          <Grid item xs={2.5}>
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
            <Typography>Họ Và Tên</Typography>
            <TextField
              id="outlined-basic"
              size="small"
              variant="outlined"
              value={staffAdd?.fullName}
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, fullName: e.target.value })}
            />
          </Grid>
          <Grid item xs={5.5}>
            <Typography>Email</Typography>
            <TextField
              id="outlined-basic"
              size="small"
              variant="outlined"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, email: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>

          <Grid item xs={5.5}>
            <Typography>Số CCCD</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={staffAdd?.citizenId}
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, citizenId: e.target.value })}
            />
          </Grid>
          <Grid item xs={5.5}>
            <Typography>Số Điện Thoại</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => setStaffAdd({ ...staffAdd, phoneNumber: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>

          <Grid item xs={5.5}>
            <Typography>Giới tính</Typography>
            <FormControl size="small">
              <RadioGroup
                row
                value={staffAdd.gender}
                onChange={(e) => setStaffAdd({ ...staffAdd, gender: e.target.value })}>
                <FormControlLabel name="gioiTinh" value="true" control={<Radio />} label="Nam" />
                <FormControlLabel name="gioiTinh" value="false" control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={5.5}>
            <Typography>Ngày sinh</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%' }}
                className="small-datepicker"
                onChange={(e) =>
                  setStaffAdd({ ...staffAdd, dateBirth: dayjs(e).format('DD-MM-YYYY') })
                }
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {confirmClicked && loading && (
                <div
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                  }}>
                  <CircularProgress size={50} />
                </div>
              )}
              <Button
                onClick={handleStaffAdd}
                variant="contained"
                fullWidth
                color="cam"
                disabled={loading}>
                {loading ? 'Đang thêm...' : 'Thêm Nhân Viên'}
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  )
}

export default AddStaff
