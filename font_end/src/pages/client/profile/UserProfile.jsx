import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useEffect, useState } from 'react'
import ClientAccountApi from '../../../api/client/clientAccountApi'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './UserProfile.css'

export default function UserProfile() {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [khachHang, setKhachHang] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: null,
    gender: '',
    avatar: '',
  })

  const [errorsKH, setErrorsKH] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    gender: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    specificAddress: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const handleImageChange = (event) => {
    let file = event.target.files[0]
    if (file) {
      setKhachHang({ ...khachHang, avatar: file })
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const loadData = (id) => {
    ClientAccountApi.getOne().then((response) => {
      const formattedBirthDate = dayjs(response.data.data.dateBirth).format('DD-MM-YYYY')
      setKhachHang({ ...response.data.data, dateBirth: formattedBirthDate })
    })
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <p className="hs-user">Hồ sơ của tôi</p>
        <p className="title-user">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        <hr />
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={7}>
            <Grid item xs={12} md={12} sx={{ pr: 5 }}>
              <Typography>
                <span className="required"> *</span>Tên khách hàng
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                name="fullName"
                value={khachHang.fullName}
                // onChange={(e) => updateKhachHang(e)}
              />
              <Typography variant="body2" color="error">
                {errorsKH.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
              <Typography>
                <span className="required"> *</span>Email
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                name="email"
                value={khachHang.email}
                // onChange={(e) => updateKhachHang(e)}
              />
              <Typography variant="body2" color="error">
                {errorsKH.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
              <Typography>
                <span className="required"> *</span>Số điện thoại
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                name="phoneNumber"
                value={khachHang.phoneNumber}
                // onChange={(e) => updateKhachHang(e)}
              />
              <Typography variant="body2" color="error">
                {errorsKH.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
              <Typography>
                <span className="required"> *</span>Ngày sinh
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    className="small-datepicker"
                    name="dateBirth"
                    value={dayjs(khachHang.dateBirth, 'DD-MM-YYYY')}
                    // onChange={(date) =>
                    //   updateKhachHang({
                    //     target: {
                    //       name: 'dateBirth',
                    //       value: date ? dayjs(date).format('DD-MM-YYYY') : null,
                    //     },
                    //   })
                    // }
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Typography variant="body2" color="error">
                {errorsKH.dateBirth}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
              <Typography>
                <span className="required"> *</span>Giới tính
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name="gender"
                  value={khachHang.gender}
                  //   onChange={(e) => updateKhachHang(e)}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Nam" />
                  <FormControlLabel value="false" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              <Typography variant="body2" color="error">
                {errorsKH.gender}
              </Typography>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
              <Grid item xs={6}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  {loading && (
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
                </div>
              </Grid>
            </Grid>
          </Grid>
          <hr className="hr-pcuser" />
          <Grid item xs={12} md={4}>
            <div className="img-user">
              <div
                onClick={() => {
                  document.getElementById('select-avatar').click()
                }}
                className="image-container">
                {khachHang.avatar || image ? (
                  <img
                    src={image || khachHang.avatar}
                    alt="Ảnh nhân viên"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  'Chọn ảnh'
                )}
              </div>
              <input
                hidden
                id="select-avatar"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button
                className="btn-img-us"
                onClick={() => {
                  document.getElementById('select-avatar').click()
                }}>
                Chọn ảnh
              </Button>
            </div>
            <div className="img-title-user">
              <p className="tt-img">Dụng lượng file tối đa 1 MB</p>
              <p className="tt-img">Định dạng:.JPEG, .PNG</p>
            </div>
          </Grid>
        </Grid>
        <Button
          //   onClick={() => onSubmit(id, khachHang)}
          variant="outlined"
          color="success"
          size="small"
          sx={{ float: 'left' }}>
          Lưu
        </Button>
      </Paper>
    </div>
  )
}
