import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
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
import './AdCustomerAdd.css'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
const listBreadcrumbs = [{ name: 'Khách hàng', link: '/admin/customer' }]

export default function AdCustomerAdd() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])
  const [khachHang, setKhachHang] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    gender: null,
  })
  const [diaChi, setDiaChi] = useState({
    name: '',
    phoneNumber: '',
    specificAddress: '',
    type: null,
    provinceId: null,
    districtId: null,
    wardId: null,
    idCustomer: '',
  })

  useEffect(() => {
    loadTinh()
  }, [])

  const loadTinh = () => {
    ghnAPI.getProvince().then((response) => {
      setTinh(response.data)
    })
  }

  const loadHuyen = (idProvince) => {
    ghnAPI.getDistrict(idProvince).then((response) => {
      setHuyen(response.data)
    })
  }

  const loadXa = (idDistrict) => {
    ghnAPI.getWard(idDistrict).then((response) => {
      setXa(response.data)
    })
  }

  const [selectedTinh, setSelectedTinh] = useState(null)
  const handleTinhChange = (_, newValue) => {
    console.log(newValue)
    setSelectedTinh(newValue)
    setSelectedHuyen(null)
    if (newValue) {
      loadHuyen(newValue.id)
      setDiaChi({ ...diaChi, provinceId: newValue.id })
    } else {
      setHuyen([])
      setDiaChi({ ...diaChi, provinceId: null })
    }
  }

  const [selectedHuyen, setSelectedHuyen] = useState(null)
  const [selectedXa, setSelectedXa] = useState(null)
  const handleHuyenChange = (_, newValue) => {
    setSelectedHuyen(newValue)
    setSelectedXa(null)
    if (newValue) {
      loadXa(newValue.id)
      setDiaChi({ ...diaChi, districtId: newValue.id })
    } else {
      setXa([])
      setDiaChi({ ...diaChi, districtId: null })
    }
  }
  const handleXaChange = (_, newValue) => {
    setSelectedXa(newValue)
    setDiaChi({ ...diaChi, wardId: newValue.id })
  }

  const updateDiaChi = () => {
    setDiaChi({
      ...diaChi,
      name: khachHang.fullName,
      phoneNumber: khachHang.phoneNumber,
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
          let khachHangId = response.data.data.id
          const obj = {
            name: diaChi.name,
            phoneNumber: diaChi.phoneNumber,
            specificAddress: diaChi.specificAddress,
            type: 0,
            idCustomer: khachHangId,
            provinceId: diaChi.provinceId,
            districtId: diaChi.districtId,
            wardId: diaChi.wardId,
          }
          // Thêm mới địa chỉ
          DiaChiApi.add(obj).then(() => {
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
    <div className="khachhangadd">
      <BreadcrumbsCustom nameHere={'Thêm nhân viên'} listLink={listBreadcrumbs} />
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Box sx={{ pt: 4 }}>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 2 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <h3>Thông tin nhân viên</h3>
                <hr />
                {/* <div
              onClick={() => {
                document.getElementById('select-avatar').click()
              }}
              className="image-container">
              {image ? <img src={image} alt="Chọn ảnh" style={imageStyle} /> : 'Chọn ảnh'}
            </div>
            <input
              hidden
              id="select-avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            /> */}
                <Typography>
                  <span className="required"> *</span>Họ Và Tên
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  size="small"
                  fullWidth
                  onChange={(e) => {
                    setKhachHang({ ...khachHang, fullName: e.target.value })
                    updateDiaChi()
                  }}
                />
                <FormControl size="small">
                  <Typography>
                    <span className="required"> *</span>Giới tính
                  </Typography>
                  <RadioGroup
                    row
                    // value={khachHang.gender ? 'true' : 'false'}
                    onChange={(e) => {
                      setKhachHang({ ...khachHang, gender: e.target.value })
                    }}>
                    <FormControlLabel
                      name="genderUpdate"
                      value="true"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      name="genderUpdate"
                      value="false"
                      control={<Radio />}
                      label="Nữ"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <h3>Thông tin chi tiết</h3>
                <hr />
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography>
                      <span className="required"> *</span>Email
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        setKhachHang({ ...khachHang, email: e.target.value })
                        updateDiaChi()
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <span className="required"> *</span>Số điện thoại
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      size="small"
                      fullWidth
                      onChange={(e) => {
                        setKhachHang({ ...khachHang, phoneNumber: e.target.value })
                        updateDiaChi()
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <Typography>
                      <span className="required"> *</span>Tỉnh/thành phố
                    </Typography>
                    <Box sx={{ minWidth: 120 }}>
                      <Autocomplete
                        popupIcon={null}
                        fullWidth
                        size="small"
                        className="search-field"
                        id="combo-box-demo"
                        value={selectedTinh}
                        onChange={handleTinhChange}
                        options={tinh.map((item) => ({
                          label: item.provinceName,
                          id: item.provinceID,
                        }))}
                        getOptionLabel={(options) => options.label}
                        renderInput={(params) => (
                          <TextField placeholder="nhập tên tỉnh" color="cam" {...params} />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span className="required"> *</span>Quận/huyện
                    </Typography>
                    <Box sx={{ minWidth: 120 }}>
                      <Autocomplete
                        popupIcon={null}
                        fullWidth
                        size="small"
                        className="search-field"
                        id="huyen-autocomplete"
                        value={selectedHuyen}
                        onChange={handleHuyenChange}
                        options={huyen.map((item) => ({
                          label: item.districtName,
                          id: item.districtID,
                        }))}
                        getOptionLabel={(options) => options.label}
                        renderInput={(params) => (
                          <TextField placeholder="nhập tên huyện" color="cam" {...params} />
                        )}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <span className="required"> *</span>Xã/phường/thị trấn
                    </Typography>
                    <Box sx={{ minWidth: 120 }}>
                      <Autocomplete
                        popupIcon={null}
                        fullWidth
                        size="small"
                        className="search-field"
                        id="xa-autocomplete"
                        value={selectedXa}
                        onChange={handleXaChange}
                        options={xa.map((item) => ({ label: item.wardName, id: item.wardCode }))}
                        getOptionLabel={(options) => options.label}
                        renderInput={(params) => (
                          <TextField placeholder="nhập tên Xã" color="cam" {...params} />
                        )}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography>
                      <span className="required"> *</span>Ngày sinh
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          sx={{ width: '100%' }}
                          className="small-datepicker"
                          onChange={(e) =>
                            setKhachHang({ ...khachHang, dateBirth: dayjs(e).format('DD-MM-YYYY') })
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <span className="required"> *</span>Địa chỉ cụ thể
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      size="small"
                      fullWidth
                      onChange={(e) =>
                        setDiaChi({
                          ...diaChi,
                          specificAddress:
                            e.target.value +
                            ', ' +
                            selectedXa.label +
                            ', ' +
                            selectedHuyen.label +
                            ', ' +
                            selectedTinh.label,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12}>
              <Button
                onClick={() => onSubmit(khachHang)}
                variant="contained"
                color="cam"
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
