import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from '@mui/material'
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
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DiaChiApi from '../../../api/admin/khachhang/DiaChiApi'
import StarIcon from '@mui/icons-material/Star'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Toast from '../../../components/Toast'
import './AdCustomerAdd.css'
import './AdCustomerDetail.css'
import StarBorderPurple500SharpIcon from '@mui/icons-material/StarBorderPurple500Sharp'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'

const listBreadcrumbs = [{ name: 'Khách hàng', link: '/admin/customer' }]
export default function AdCustomerDetail() {
  const theme = useTheme()
  const { id } = useParams()
  const { idCustomer } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [diaChi, setDiaChi] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])
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
    loadData(id)
    loadDiaChi(initPage - 1, id)
    loadTinh()
  }, [id, idCustomer, initPage])
  const handleOnChangePage = (page) => {
    setInitPage(page)
  }
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

  const loadData = (id) => {
    khachHangApi.getOne(id).then((response) => {
      const formattedBirthDate = dayjs(response.data.data.dateBirth).format('DD-MM-YYYY')
      setKhachHang({ ...response.data.data, dateBirth: formattedBirthDate })
    })
  }

  const loadDiaChi = (initPage, idCustomer) => {
    DiaChiApi.getAll(initPage, idCustomer).then((response) => {
      setDiaChi(
        response.data.data.content.map((item) => {
          const specificAddressParts = item.specificAddress.split(', ')
          const [diaChiCuThe, xaDetail, huyenDetail, tinhDetail] = specificAddressParts
          return {
            id: item.id,
            name: item.name,
            phoneNumber: item.phoneNumber,
            tinh: tinhDetail,
            huyen: huyenDetail,
            xa: xaDetail,
            specificAddress: diaChiCuThe,
            provinceId: item.provinceId,
            districtId: item.districtId,
            wardId: item.wardId,
            type: item.type,
          }
        }),
      )
      setTotalPages(response.data.data.totalPages)
    })
  }

  const updateKhachHang = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    const updatedKhachHang = { ...khachHang }
    if (
      fieldName === 'fullName' ||
      fieldName === 'email' ||
      fieldName === 'phoneNumber' ||
      fieldName === 'dateBirth' ||
      fieldName === 'gender'
    ) {
      updatedKhachHang[fieldName] = fieldValue
    }

    setKhachHang(updatedKhachHang)
  }

  const onSubmit = (id, khachHang) => {
    const newErrors = {}
    const currentDate = dayjs()
    const dateBirth = dayjs(khachHang.dateBirth, 'DD/MM/YYYY')
    let check = 0

    if (!khachHang.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập Họ và Tên.'
      check++
    } else if (khachHang.fullName.trim().length > 100) {
      newErrors.fullName = 'Họ và Tên không được quá 100 kí tự.'
      check++
    } else {
      newErrors.fullName = ''
    }

    if (!khachHang.email.trim()) {
      newErrors.email = 'Vui lòng nhập Email.'
      check++
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      if (!emailRegex.test(khachHang.email.trim())) {
        newErrors.email = 'Vui lòng nhập một địa chỉ email hợp lệ.'
        check++
        // } else if (isEmailDuplicate(khachHang.email)) {
        //   newErrors.email = 'Email đã tồn tại trong danh sách.'
        //   check++
      } else if (khachHang.email.trim().length > 50) {
        newErrors.email = 'Email không được quá 50 kí tự.'
        check++
      } else {
        newErrors.email = ''
      }
    }

    if (!khachHang.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập Số điện thoại.'
      check++
    } else {
      const phoneNumberRegex = /^(0[1-9][0-9]{8})$/
      if (!phoneNumberRegex.test(khachHang.phoneNumber.trim())) {
        newErrors.phoneNumber = 'Vui lòng nhập một số điện thoại hợp lệ (VD: 0987654321).'
        check++
        // } else if (isPhoneNumberDuplicate(khachHang.phoneNumber)) {
        //   newErrors.phoneNumber = 'Số điện thoại đã tồn tại trong danh sách.'
        //   check++
      } else {
        newErrors.phoneNumber = ''
      }
    }

    if (!khachHang.dateBirth) {
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

    if (khachHang.gender === null) {
      newErrors.gender = 'Vui lòng chọn Giới tính.'
      check++
    } else {
      newErrors.gender = ''
    }

    if (check > 0) {
      setErrorsKH(newErrors)
      return
    }
    const title = 'Xác nhận sửa mới khách hàng?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        khachHangApi
          .updateKhachHang(id, khachHang)
          .then(() => {
            toast.success('Sửa khách hàng thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            navigate('/admin/customer')
          })
          .finally(() => {
            setLoading(false)
          })
      }
    })
  }
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
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [newDiaChi, setNewDiaChi] = useState({
    name: '',
    phoneNumber: '',
    specificAddress: '',
    provinceId: { id: '', label: '' },
    districtId: { id: '', label: '' },
    wardId: { id: '', label: '' },
    type: null,
    idCustomer: id,
  })
  const handleTinhChange = (newValue, index) => {
    let preDiaChi = diaChi
    if (newValue) {
      setSelectedProvince(newValue)
      setNewDiaChi({ ...newDiaChi, provinceId: { id: newValue.id, label: newValue.label } })
      preDiaChi[index] = { ...preDiaChi[index], provinceId: newValue.id, tinh: newValue.label }
      setDiaChi(preDiaChi)
    } else {
      setHuyen([])
      setSelectedProvince(null)
      setSelectedDistrict(null)
      setSelectedWard(null)

      preDiaChi[index] = { ...preDiaChi[index], provinceId: '', tinh: '' }
      preDiaChi[index] = { ...preDiaChi[index], districtId: '', huyen: '' }
      preDiaChi[index] = { ...preDiaChi[index], wardId: '', xa: '' }
      setDiaChi(preDiaChi)
    }
  }

  const handleHuyenChange = (newValue, index) => {
    let preDiaChi = diaChi
    if (newValue) {
      loadXa(newValue.id)
      setSelectedDistrict(newValue)
      setNewDiaChi({ ...newDiaChi, districtId: { id: newValue.id, label: newValue.label } })
      preDiaChi[index] = { ...preDiaChi[index], districtId: newValue.id, huyen: newValue.label }
      setDiaChi(preDiaChi)
    } else {
      setXa([])
      setSelectedDistrict(null)
      setSelectedWard(null)
      preDiaChi[index] = { ...preDiaChi[index], districtId: '', huyen: '' }
      preDiaChi[index] = { ...preDiaChi[index], wardId: '', xa: '' }
      setDiaChi(preDiaChi)
    }
  }

  const handleXaChange = (newValue, index) => {
    let preDiaChi = diaChi
    if (newValue) {
      setSelectedWard(newValue)
      preDiaChi[index] = { ...preDiaChi[index], wardId: newValue.id, xa: newValue.label }
      setDiaChi(preDiaChi)
    } else {
      setSelectedWard(null)
      setNewDiaChi({ ...newDiaChi, wardId: { id: '', label: '' } })
      setDiaChi(preDiaChi)
    }
  }

  const onCreateDiaChi = (newDiaChi) => {
    const title = 'Xác nhận Thêm mới địa chỉ?'
    const text = ''
    const obj = {
      name: newDiaChi.name,
      phoneNumber: newDiaChi.phoneNumber,
      email: newDiaChi.email,
      provinceId: selectedProvince ? selectedProvince.id : null,
      districtId: selectedDistrict ? selectedDistrict.id : null,
      wardId: selectedWard ? selectedWard.id : null,
      specificAddress:
        newDiaChi.specificAddress +
        (selectedWard ? `, ${selectedWard.label}` : '') +
        (selectedDistrict ? `, ${selectedDistrict.label}` : '') +
        (selectedProvince ? `, ${selectedProvince.label}` : ''),
      type: 0,
      idCustomer: id,
    }
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        DiaChiApi.add(obj).then(() => {
          loadDiaChi(initPage - 1, id)
          toast.success('Thêm địa chỉ thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
      }
    })
  }

  const [errorsAU, setErrorsAU] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    provinceId: '',
    districtId: '',
    wardId: '',
    specificAddress: '',
  })

  const deleteDiaChi = (idDC) => {
    const title = 'Xác nhận xóa địa chỉ?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        DiaChiApi.delete(idDC).then(() => {
          loadDiaChi(initPage - 1, id)
          toast.success('xóa địa chỉ thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
      }
    })
  }

  const onUpdateDiaChi = (diaChi) => {
    const newErrors = {}
    let checkAU = 0

    if (!diaChi.name.trim()) {
      newErrors.name = 'Tên người nhận không được để trống'
      checkAU++
    } else if (diaChi.name.trim().length > 100) {
      newErrors.fullName = 'Tên người nhận không được quá 100 kí tự.'
      checkAU++
    } else {
      newErrors.name = ''
    }

    if (!diaChi.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập Số điện thoại.'
      checkAU++
    } else {
      const phoneNumberRegex = /^(0[1-9][0-9]{8})$/
      if (!phoneNumberRegex.test(diaChi.phoneNumber.trim())) {
        newErrors.phoneNumber = 'Vui lòng nhập một số điện thoại hợp lệ (VD: 0987654321).'
        checkAU++
      } else {
        newErrors.phoneNumber = ''
      }
    }

    if (checkAU > 0) {
      setErrorsAU(newErrors)
      return
    }
    const title = 'Xác nhận Cập nhật địa chỉ?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        diaChi.specificAddress = `${diaChi.specificAddress}, ${diaChi.xa}, ${diaChi.huyen}, ${diaChi.tinh}`

        DiaChiApi.update(diaChi.id, diaChi)
          .then(() => {
            loadDiaChi(initPage - 1, id)
            toast.success('Cập nhật địa chỉ thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          .catch(() => {
            toast.error('Đã xảy ra lỗi khi cập nhật địa chỉ', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
      }
    })
  }

  const handleUpdateType = (idDC) => {
    DiaChiApi.updateStatus(idDC, id).then(() => {
      loadDiaChi(initPage - 1, id)
      toast.success('Xét địa chỉ mặc định thành công thành công', {
        position: toast.POSITION.TOP_RIGHT,
      })
    })
  }
  return (
    <div className="khachhangdetail">
      <BreadcrumbsCustom nameHere={'Chi tiết khách hàng'} listLink={listBreadcrumbs} />
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Toast />
        <Box>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <h2>Thông tin khách hàng</h2>
              <hr />
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
              <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
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
                  onChange={(e) => updateKhachHang(e)}
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
                  onChange={(e) => updateKhachHang(e)}
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
                  onChange={(e) => updateKhachHang(e)}
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
                    onChange={(e) => updateKhachHang(e)}>
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
                    <Button
                      onClick={() => onSubmit(id, khachHang)}
                      variant="outlined"
                      color="cam"
                      size="small"
                      sx={{ float: 'left' }}>
                      Cập nhật khách hàng
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <h2>Danh sách địa chỉ</h2>
              <hr />
              {diaChi.map((item, index) => {
                return (
                  <div key={index} className="custom-accordion">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                        className="custom-accordion-header">
                        <div className="accordion-content">
                          <Typography
                            sx={{ color: 'cam', fontWeight: '600' }}
                            variant="body1"
                            className="accordion-text">
                            Địa chỉ {index + 1}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography>
                              <span className="required"> *</span>Tên
                            </Typography>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              type="text"
                              size="small"
                              fullWidth
                              name="name"
                              value={item.name}
                              onChange={(e) => {
                                const updatedDiaChi = [...diaChi]
                                updatedDiaChi[index].name = e.target.value
                                setDiaChi(updatedDiaChi)
                              }}
                            />
                            <Typography variant="body2" color="error">
                              {errorsAU.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
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
                              value={item.phoneNumber}
                              onChange={(e) => {
                                const updatedDiaChi = [...diaChi]
                                updatedDiaChi[index].phoneNumber = e.target.value
                                setDiaChi(updatedDiaChi)
                              }}
                            />
                            <Typography variant="body2" color="error">
                              {errorsAU.phoneNumber}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Grid item xs={12} md={4}>
                            <Box sx={{ minWidth: 120 }}>
                              <Typography>
                                <span className="required"> *</span>Tỉnh/thành phố
                              </Typography>
                              <Autocomplete
                                popupIcon={null}
                                fullWidth
                                size="small"
                                className="search-field"
                                id="combo-box-demo"
                                value={{ label: item.tinh, id: item.provinceId }}
                                onChange={(_, newValue) => {
                                  handleTinhChange(newValue, index)
                                }}
                                options={
                                  tinh &&
                                  tinh.map((item) => ({
                                    label: item.provinceName,
                                    id: item.provinceID,
                                  }))
                                }
                                getOptionLabel={(options) => options.label}
                                renderInput={(params) => (
                                  <TextField placeholder="nhập tên tỉnh" color="cam" {...params} />
                                )}
                              />
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={4}
                            onClick={() => {
                              loadHuyen(item.provinceId)
                            }}>
                            <Box sx={{ minWidth: 120 }}>
                              <Typography>
                                <span className="required"> *</span>Quận/huyện
                              </Typography>
                              <Autocomplete
                                popupIcon={null}
                                fullWidth
                                size="small"
                                className="search-field"
                                value={{ label: item.huyen, id: item.districtId }}
                                onChange={(_, newValue) => {
                                  handleHuyenChange(newValue, index)
                                }}
                                options={huyen.map((item) => ({
                                  label: item.districtName,
                                  id: item.districtID,
                                }))}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField placeholder="Chọn huyện" color="cam" {...params} />
                                )}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Box
                              sx={{ minWidth: 120 }}
                              onClick={() => {
                                loadXa(item.districtId)
                              }}>
                              <Typography>
                                <span className="required"> *</span>Xã/phường/thị trấn
                              </Typography>
                              <Autocomplete
                                popupIcon={null}
                                fullWidth
                                size="small"
                                className="search-field"
                                value={{ label: item.xa, id: item.wardId }}
                                onChange={(_, newValue) => {
                                  handleXaChange(newValue, index)
                                }}
                                options={
                                  xa &&
                                  xa.map((item) => ({ label: item.wardName, id: item.wardCode }))
                                }
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField placeholder="Chọn xã" color="cam" {...params} />
                                )}
                              />
                            </Box>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Grid item xs={12} md={12}>
                            <Typography>
                              <span className="required"> *</span>Địa chỉ cụ thể
                            </Typography>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              type="text"
                              size="small"
                              fullWidth
                              name="specificAddress"
                              value={item.specificAddress}
                              onChange={(e) => {
                                const updatedDiaChi = [...diaChi]
                                updatedDiaChi[index].specificAddress = e.target.value
                                setDiaChi(updatedDiaChi)
                              }}
                            />
                          </Grid>
                        </Grid>
                        <IconButton
                          color="cam"
                          aria-label="favorite"
                          size="small"
                          onClick={() => handleUpdateType(item.id)}>
                          {item.type === true ? <StarIcon /> : <StarBorderPurple500SharpIcon />}
                        </IconButton>
                        <IconButton
                          onClick={() => deleteDiaChi(item.id)}
                          size="small"
                          color="error"
                          sx={{ float: 'right' }}>
                          <DeleteIcon />
                        </IconButton>
                        <Tooltip title="chỉnh sửa">
                          <IconButton
                            onClick={() => onUpdateDiaChi(item)}
                            size="small"
                            color="cam"
                            sx={{ float: 'right' }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                )
              })}
              <Grid container item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
                <Grid item xs={12} md={4}>
                  <Button
                    onClick={() => {
                      onCreateDiaChi(newDiaChi)
                    }}
                    variant="outlined"
                    color="cam"
                    size="small">
                    Thêm địa chỉ
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={1}></Grid>
                <Grid item xs={12} md={5}>
                  {initPage >= 0 ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                        float: 'right',
                      }}>
                      <Pagination
                        page={initPage}
                        onChange={(_, page) => handleOnChangePage(page)}
                        count={totalPages}
                        color="cam"
                        variant="outlined"
                      />
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
