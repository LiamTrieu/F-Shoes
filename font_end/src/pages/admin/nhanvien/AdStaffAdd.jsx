import React, { useEffect, useState } from 'react'
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
  Autocomplete,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useZxing } from 'react-zxing'
import './AdStaffAdd.css'
import CircularProgress from '@mui/material/CircularProgress'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
import DiaChiApi from '../../../api/admin/khachhang/DiaChiApi'
import confirmSatus from '../../../components/comfirmSwal'
import khachHangApi from '../../../api/admin/khachhang/KhachHangApi'

const listBreadcrumbs = [{ name: 'Nhân viên', link: '/admin/staff' }]

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
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [confirmClicked, setConfirmClicked] = useState(false)
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])

  const [selectedTinh, setSelectedTinh] = useState(null)
  const [selectedHuyen, setSelectedHuyen] = useState(null)
  const [selectedXa, setSelectedXa] = useState(null)
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
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    gender: '',
    citizenId: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    specificAddress: '',
  })

  useEffect(() => {
    loadTinh()
    loadList()
  }, [])

  const loadList = () => {
    khachHangApi.getAll().then((response) => {
      setList(response.data)
    })
  }
  const loadTinh = () => {
    ghnAPI.getProvince().then((response) => {
      setTinh(response.data)
    })
  }

  async function loadHuyen(idProvince) {
    const response = await ghnAPI.getDistrict(idProvince)
    setHuyen(response.data)
    return response.data
  }

  async function loadXa(idDistrict) {
    const response = await ghnAPI.getWard(idDistrict)
    setXa(response.data)
    return response.data
  }

  const handleTinhChange = (_, newValue) => {
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
      name: staffAdd.fullName,
      phoneNumber: staffAdd.phoneNumber,
      type: true,
    })
  }

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
      const fullAddress = qrDataArray[5]

      const dateBirth = dayjs(dateOfBirthRaw, 'DDMMYYYY').format('DD-MM-YYYY')
      const [specificAddress, wardLabel, districtLabel, provinceLabel] = fullAddress.split(', ')

      const selectTinh = tinh.find((item) => item.provinceName === provinceLabel) || null
      setSelectedTinh({ id: selectTinh.provinceID, label: selectTinh.provinceName })

      if (selectTinh) {
        ;(async () => {
          const huyenData = await loadHuyen(selectTinh.provinceID)
          const selectHuyen =
            huyenData.find((item) => item.districtName.includes(districtLabel)) || null
          setSelectedHuyen({ id: selectHuyen.districtID, label: selectHuyen.districtName })

          if (selectHuyen) {
            ;(async () => {
              const xaData = await loadXa(selectHuyen.districtID)
              const selectXa = xaData.find((item) => item.wardName.includes(wardLabel)) || null
              setSelectedXa({ id: selectXa.wardCode, label: selectXa.wardName })
              setDiaChi({
                ...diaChi,
                provinceId: selectTinh.provinceID,
                districtId: selectHuyen.districtID,
                wardId: selectXa.wardCode,
                specificAddress: specificAddress,
              })
            })()
          }
        })()
      }

      setStaffAdd({
        ...staffAdd,
        citizenId: citizenId,
        fullName: fullName,
        dateBirth: dateBirth,
        gender: gender,
        email: initStaff.email,
        phoneNumber: initStaff.phoneNumber,
        avatar: initStaff.avatar,
        role: 0,
      })
      setQrScannerVisible(false)
    }
  }
  const getTinhOptionLabel = (option) => {
    return option ? option.label : ''
  }

  const handleOpenQRScanner = () => {
    setQrScannerVisible(true)
  }

  const handleCloseQRScanner = () => {
    setQrScannerVisible(false)
  }

  const [staffAdd, setStaffAdd] = useState(initStaff)
  const navigate = useNavigate()

  const isPhoneNumberDuplicate = (phoneNumber) => {
    return list.some((customer) => customer.phoneNumber === phoneNumber)
  }

  const isEmailDuplicate = (email) => {
    return list.some((customer) => customer.email === email)
  }
  const isCitizenIdDuplicate = (citizenId) => {
    return list.some((customer) => customer.citizenId === citizenId)
  }

  const handleStaffAdd = () => {
    const newErrors = {}
    const currentDate = dayjs()
    const dateBirth = dayjs(staffAdd.dateBirth, 'DD/MM/YYYY')
    let check = 0

    if (!staffAdd.fullName) {
      newErrors.fullName = 'Vui lòng nhập Họ và Tên.'
      check++
    } else if (staffAdd.fullName.length > 100) {
      newErrors.fullName = 'Họ và Tên không được quá 100 kí tự.'
      check++
    } else {
      newErrors.fullName = ''
    }

    if (!staffAdd.email) {
      newErrors.email = 'Vui lòng nhập Email.'
      check++
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      if (!emailRegex.test(staffAdd.email)) {
        newErrors.email = 'Vui lòng nhập một địa chỉ email hợp lệ.'
        check++
      } else if (staffAdd.email.length > 50) {
        newErrors.email = 'Email không được quá 50 kí tự.'
        check++
      } else if (isEmailDuplicate(staffAdd.email)) {
        newErrors.email = 'Email đã tồn tại trong danh sách.'
        check++
      } else {
        newErrors.email = ''
      }
    }

    if (!staffAdd.citizenId) {
      newErrors.citizenId = 'Vui lòng nhập Số CCCD.'
      check++
    } else {
      const citizenIdRegex = /^(?:\d{9}|\d{12})$/
      if (!citizenIdRegex.test(staffAdd.citizenId)) {
        newErrors.citizenId = 'Số CCCD không hợp lệ.'
        check++
      } else if (isCitizenIdDuplicate(staffAdd.citizenId)) {
        newErrors.citizenId = 'CCCD đã tồn tại trong danh sách.'
        check++
      } else {
        newErrors.citizenId = ''
      }
    }

    if (!staffAdd.phoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập Số điện thoại.'
      check++
    } else {
      const phoneNumberRegex = /^(0[1-9][0-9]{8})$/
      if (!phoneNumberRegex.test(staffAdd.phoneNumber)) {
        newErrors.phoneNumber = 'Vui lòng nhập một số điện thoại hợp lệ (VD: 0987654321).'
        check++
      } else if (isPhoneNumberDuplicate(staffAdd.phoneNumber)) {
        newErrors.phoneNumber = 'Số điện thoại đã tồn tại trong danh sách.'
        check++
      } else {
        newErrors.phoneNumber = ''
      }
    }

    if (!staffAdd.dateBirth) {
      newErrors.dateBirth = 'Vui lòng chọn Ngày sinh.'
      check++
    } else {
      if (dateBirth.isAfter(currentDate)) {
        newErrors.dateBirth = 'Ngày sinh không được lớn hơn ngày hiện tại.'
        check++
      } else {
        newErrors.dateBirth = ''
      }
    }

    if (!staffAdd.gender) {
      newErrors.gender = 'Vui lòng chọn Giới tính.'
      check++
    } else {
      newErrors.gender = ''
    }

    if (!selectedTinh) {
      newErrors.provinceId = 'Vui lòng chọn Tỉnh/Thành phố.'
      check++
    } else {
      newErrors.provinceId = ''
    }

    if (!selectedHuyen) {
      newErrors.districtId = 'Vui lòng chọn Quận/Huyện.'
      check++
    } else {
      newErrors.districtId = ''
    }

    if (!selectedXa) {
      newErrors.wardId = 'Vui lòng chọn Xã/Phường/Thị trấn.'
      check++
    } else {
      newErrors.wardId = ''
    }

    if (check > 0) {
      setErrors(newErrors)
      return
    }
    setConfirmClicked(true)

    const title = 'Xác nhận thêm mới nhân viên?'
    const text = ''
    confirmSatus(title, text).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        staffApi
          .add(staffAdd)
          .then((response) => {
            let khachHangId = response.data.id
            const obj = {
              name: diaChi.name,
              phoneNumber: staffAdd.phoneNumber,
              specificAddress:
                diaChi.specificAddress +
                ', ' +
                selectedXa.label +
                ', ' +
                selectedHuyen.label +
                ', ' +
                selectedTinh.label,
              type: 0,
              idCustomer: khachHangId,
              provinceId: diaChi.provinceId,
              districtId: diaChi.districtId,
              wardId: diaChi.wardId,
            }
            DiaChiApi.add(obj).then(() => {
              toast.success('Thêm mới nhân viên thành công!', {
                position: toast.POSITION.TOP_RIGHT,
              })

              navigate('/admin/staff')
            })
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        toast.error('Thêm nhân viên thất bại', {
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
      <BreadcrumbsCustom nameHere={'Thêm nhân viên'} listLink={listBreadcrumbs} />
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Button
          color="cam"
          className="btnqr"
          variant="outlined"
          fullWidth
          onClick={handleOpenQRScanner}>
          Quét QR
        </Button>
        <Modal open={qrScannerVisible} onClose={handleCloseQRScanner}>
          <Box sx={styleModal}>
            <RenderVideo />
          </Box>
        </Modal>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <h3>Thông tin nhân viên</h3>
            <hr />
            <div
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
            />
            <Typography>
              <span className="required"> *</span>Họ Và Tên
            </Typography>
            <TextField
              id="outlined-basic"
              size="small"
              variant="outlined"
              value={staffAdd?.fullName}
              fullWidth
              onChange={(e) => {
                setStaffAdd({ ...staffAdd, fullName: e.target.value.trim() })
                updateDiaChi()
              }}
            />
            <Typography variant="body2" color="error">
              {errors.fullName}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <h3>Thông tin chi tiết</h3>
            <hr />
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography>
                  <span className="required"> *</span>Số CCCD
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={staffAdd?.citizenId}
                  fullWidth
                  onChange={(e) => setStaffAdd({ ...staffAdd, citizenId: e.target.value.trim() })}
                />
                <Typography variant="body2" color="error">
                  {errors.citizenId}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <span className="required"> *</span>Giới tính
                </Typography>
                <FormControl size="small">
                  <RadioGroup
                    row
                    value={staffAdd.gender}
                    onChange={(e) => setStaffAdd({ ...staffAdd, gender: e.target.value })}>
                    <FormControlLabel
                      name="gioiTinh"
                      value="true"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      name="gioiTinh"
                      value="false"
                      control={<Radio />}
                      label="Nữ"
                    />
                  </RadioGroup>
                </FormControl>
                <Typography variant="body2" color="error">
                  {errors.gender}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography>
                  <span className="required"> *</span>Ngày sinh
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: '100%' }}
                    value={staffAdd.dateBirth ? dayjs(staffAdd.dateBirth, 'DD-MM-YYYY') : null}
                    className="small-datepicker"
                    onChange={(e) =>
                      setStaffAdd({ ...staffAdd, dateBirth: dayjs(e).format('DD-MM-YYYY') })
                    }
                  />
                </LocalizationProvider>
                <Typography variant="body2" color="error">
                  {errors.dateBirth}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <span className="required"> *</span>Email
                </Typography>
                <TextField
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setStaffAdd({ ...staffAdd, email: e.target.value.trim() })}
                />
                <Typography variant="body2" color="error">
                  {errors.email}
                </Typography>
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
                    getOptionLabel={getTinhOptionLabel}
                    renderInput={(params) => (
                      <TextField placeholder="nhập tên tỉnh" color="cam" {...params} />
                    )}
                  />
                </Box>
                <Typography variant="body2" color="error">
                  {errors.provinceId}
                </Typography>
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
                <Typography variant="body2" color="error">
                  {errors.districtId}
                </Typography>
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
                <Typography variant="body2" color="error">
                  {errors.wardId}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography>
                  <span className="required"> *</span>Số Điện Thoại
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) => {
                    setStaffAdd({ ...staffAdd, phoneNumber: e.target.value.trim() })
                    updateDiaChi()
                  }}
                />
                <Typography variant="body2" color="error">
                  {errors.phoneNumber}
                </Typography>
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
                  value={diaChi.specificAddress}
                  onChange={(e) =>
                    setDiaChi({
                      ...diaChi,
                      specificAddress: e.target.value,
                    })
                  }
                  disabled={!selectedXa}
                />
              </Grid>
            </Grid>
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
                variant="outlined"
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
