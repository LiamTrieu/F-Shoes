import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  CircularProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Autocomplete,
  Box,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import './AdStaffPage.css'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
import DiaChiApi from '../../../api/admin/khachhang/DiaChiApi'
import { useTheme } from '@emotion/react'

const listBreadcrumbs = [{ name: 'Nhân viên', link: '/admin/staff' }]

export default function AdStaffDetail() {
  const theme = useTheme()
  const { id } = useParams()
  const [staffDetail, setStaffDetail] = useState({ avatar: null, gender: '', role: '' }) // Khởi tạo giá trị ban đầu cho gender và role
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [diaChi, setDiaChi] = useState([])
  // eslint-disable-next-line
  const [initPage, setInitPage] = useState(1)
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadData(id)
    loadDiaChi(initPage - 1, id)
    loadTinh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, initPage])

  const loadData = (id) => {
    setLoading(true)

    staffApi
      .getOne(id)
      .then((response) => {
        const formatDateBirth = dayjs(response.data.dateBirth).format('DD-MM-YYYY')
        console.log(response.data)
        setStaffDetail({
          ...response.data,
          dateBirth: formatDateBirth,
        })
      })
      .catch(() => {
        console.error('Error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleRoleRadioChange = (event) => {
    setStaffDetail({
      ...staffDetail,
      role: event.target.value,
    })
  }

  const handleGenderRadioChange = (event) => {
    setStaffDetail({
      ...staffDetail,
      gender: event.target.value,
    })
  }

  const handleImageChange = (event) => {
    let file = event.target.files[0]
    if (file) {
      setStaffDetail({ ...staffDetail, avatar: file })
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonUpdateStaff = () => {
    const title = 'Xác nhận cập nhật nhân viên?'
    const text = ''
    confirmSatus(title, text).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)

        staffApi
          .update(id, staffDetail)
          .then(() => {
            toast.success('Cập nhật nhân viên thành công!', {
              position: toast.POSITION.TOP_RIGHT,
            })
            navigate('/admin/staff')
          })
          .catch(() => {
            toast.error('Cập nhật nhân viên thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        toast.error('Cập nhật nhân viên thất bại', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  }
  const loadDiaChi = (initPage, idCustomer) => {
    DiaChiApi.getAll(initPage, idCustomer).then((response) => {
      setDiaChi(response.data.data.content)
      fillDetailDiaChi(response.data.data.content[0].id)
    })
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

  const handleTinhChange = (_, newValue) => {
    if (newValue) {
      loadHuyen(newValue.id)
      // Lưu tên tỉnh đã chọn vào state
      setTinhName(newValue.label)
      // Đặt giá trị tỉnh vào chi tiết địa chỉ
      setDetailDiaChi({ ...detailDiaChi, provinceId: newValue.id })
    } else {
      setHuyen([])
      setDetailDiaChi({ ...detailDiaChi, provinceId: '' })
    }
  }

  const handleHuyenChange = (_, newValue) => {
    if (newValue) {
      loadXa(newValue.id)
      // Lưu tên huyện đã chọn vào state
      setHuyenName(newValue.label)
      // Đặt giá trị huyện vào chi tiết địa chỉ
      setDetailDiaChi({ ...detailDiaChi, districtId: newValue.id })
    } else {
      setXa([])
      setDetailDiaChi({ ...detailDiaChi, districtId: '' })
    }
  }

  const handleXaChange = (_, newValue) => {
    if (newValue) {
      setDetailDiaChi({ ...detailDiaChi, wardId: newValue.id })
    } else {
      setDetailDiaChi({ ...detailDiaChi, wardId: '' })
    }
  }

  const [detailDiaChi, setDetailDiaChi] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    specificAddress: '',
    type: 0,
    idCustomer: id,
  })
  const [xaName, setXaName] = useState('')
  const [huyenName, setHuyenName] = useState('')
  const [tinhName, setTinhName] = useState('')

  const fillDetailDiaChi = (idDiaChi) => {
    DiaChiApi.getById(idDiaChi).then((response) => {
      const { name, email, phoneNumber, specificAddress, provinceId, districtId, wardId, type } =
        response.data.data

      console.log(response.data.data)
      loadTinh()
      loadHuyen(provinceId)
      loadXa(districtId)
      console.log(response.data.data)
      // Cắt chuỗi specificAddress thành các phần riêng biệt
      const addressParts = specificAddress.split(', ')
      if (addressParts.length === 4) {
        const [address, xaDetail, huyenDetail, tinhDetail] = addressParts
        // Đặt giá trị cho các biến state tương ứng
        setXaName(xaDetail)
        setHuyenName(huyenDetail)
        setTinhName(tinhDetail)

        setDetailDiaChi({
          id: idDiaChi,
          name: name,
          type: type,
          phoneNumber: phoneNumber,
          email: email,
          specificAddress: address,
          provinceId: provinceId,
          districtId: districtId,
          wardId: wardId,
        })
      }
    })
  }

  const onUpdateDiaChi = (detailDiaChi) => {
    const title = 'Xác nhận Cập nhật địa chỉ?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        detailDiaChi.specificAddress = `${detailDiaChi.specificAddress}, ${xaName}, ${huyenName}, ${tinhName}`

        DiaChiApi.update(detailDiaChi.id, detailDiaChi)
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

  return (
    <div className="nhanvienadd">
      <BreadcrumbsCustom nameHere={'Chi tiết nhân viên'} listLink={listBreadcrumbs} />
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <h3>Thông tin nhân viên</h3>
            <hr />
            <div
              onClick={() => {
                document.getElementById('select-avatar').click()
              }}
              className="image-container">
              {staffDetail.avatar || image ? (
                <img
                  src={image || staffDetail.avatar}
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
            <Grid sx={{ mb: 3 }}>
              <Typography>
                <span className="required"> *</span>Họ và tên
              </Typography>
              <TextField
                size="small"
                type="text"
                value={staffDetail.fullName || ''}
                onChange={(e) => {
                  setStaffDetail({
                    ...staffDetail,
                    fullName: e.target.value,
                  })
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid sx={{ mb: 3 }}>
              <Typography>
                <span className="required"> *</span>Số CCCD
              </Typography>
              <TextField
                size="small"
                type="text"
                value={staffDetail.citizenId || ''}
                onChange={(e) => {
                  setStaffDetail({
                    ...staffDetail,
                    citizenId: e.target.value,
                  })
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid sx={{ mb: 3 }}>
              <Typography>
                <span className="required"> *</span>Email
              </Typography>
              <TextField
                size="small"
                type="text"
                value={staffDetail.email || ''}
                onChange={(e) => {
                  setStaffDetail({
                    ...staffDetail,
                    email: e.target.value,
                  })
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid sx={{ mb: 3 }}>
              <Typography>
                <span className="required"> *</span>Số Điện Thoại
              </Typography>
              <TextField
                type="text"
                size="small"
                value={staffDetail.phoneNumber || ''}
                onChange={(e) => {
                  setStaffDetail({
                    ...staffDetail,
                    phoneNumber: e.target.value,
                  })
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Typography>
              <span className="required"> *</span>Ngày sinh
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format={'DD-MM-YYYY'}
                className="small-datepicker"
                sx={{ width: '100%' }}
                value={dayjs(staffDetail.dateBirth, 'DD-MM-YYYY')}
                onChange={(e) => {
                  setStaffDetail({
                    ...staffDetail,
                    dateBirth: dayjs(e).format('DD-MM-YYYY'),
                  })
                }}
              />
            </LocalizationProvider>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={5}>
                <Typography>
                  <span className="required"> *</span>Giới tính
                </Typography>
                <FormControl size="small">
                  <RadioGroup
                    name="gender"
                    row
                    value={staffDetail.gender}
                    onChange={handleGenderRadioChange}>
                    <FormControlLabel value={true} control={<Radio />} label="Nam" />
                    <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={7}>
                <Typography>
                  <span className="required"> *</span>Chức vụ
                </Typography>
                <FormControl size="small">
                  <RadioGroup
                    name="gender"
                    row
                    value={staffDetail.role}
                    onChange={handleRoleRadioChange}>
                    <FormControlLabel value={0} control={<Radio />} label="Nhân viên" />
                    <FormControlLabel value={1} control={<Radio />} label="Quản lí" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <h3>Thông tin địa chỉ</h3>
            <hr />
            {diaChi.map((item, index) => (
              <div key={index} className="custom-accordion">
                <Accordion expanded={true}>
                  {console.log(item)}
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}>
                    <Typography>Địa chỉ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
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
                          value={detailDiaChi.name}
                          onChange={(e) => {
                            setDetailDiaChi({ ...detailDiaChi, name: e.target.value })
                          }}
                        />
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
                          value={detailDiaChi.phoneNumber}
                          onChange={(e) => {
                            setDetailDiaChi({ ...detailDiaChi, phoneNumber: e.target.value })
                          }}
                        />
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
                            value={{ label: tinhName, id: detailDiaChi.provinceId }}
                            onChange={handleTinhChange}
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
                      <Grid item xs={12} md={4}>
                        <Box sx={{ minWidth: 120 }}>
                          <Typography>
                            <span className="required"> *</span>Quận/huyện
                          </Typography>
                          <Autocomplete
                            popupIcon={null}
                            fullWidth
                            size="small"
                            className="search-field"
                            value={{ label: huyenName, id: detailDiaChi.districtId }}
                            onChange={handleHuyenChange}
                            options={
                              huyen &&
                              huyen.map((item) => ({
                                label: item.districtName,
                                id: item.districtID,
                              }))
                            }
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField placeholder="Chọn huyện" color="cam" {...params} />
                            )}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ minWidth: 120 }}>
                          <Typography>
                            <span className="required"> *</span>Xã/phường/thị trấn
                          </Typography>
                          <Autocomplete
                            popupIcon={null}
                            fullWidth
                            size="small"
                            className="search-field"
                            value={{ label: xaName, id: detailDiaChi.wardId }}
                            onChange={handleXaChange}
                            options={
                              xa && xa.map((item) => ({ label: item.wardName, id: item.wardCode }))
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
                          value={detailDiaChi.specificAddress}
                          onChange={(e) => {
                            const updatedDetailDiaChi = { ...detailDiaChi }
                            updatedDetailDiaChi.specificAddress = e.target.value
                            setDetailDiaChi(updatedDetailDiaChi)
                          }}
                        />
                      </Grid>
                    </Grid>

                    <IconButton
                      onClick={() => onUpdateDiaChi(detailDiaChi)}
                      size="small"
                      color="cam"
                      sx={{ float: 'right' }}>
                      <EditIcon />
                    </IconButton>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
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
              <Button onClick={handleButtonUpdateStaff} variant="contained" fullWidth color="cam">
                {loading ? 'Đang cập nhật...' : 'Cập Nhật Nhân Viên'}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
