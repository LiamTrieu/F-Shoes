import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Pagination,
  Paper,
  TextField,
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
import StarBorderPurple500SharpIcon from '@mui/icons-material/StarBorderPurple500Sharp'
import ghnAPI from '../../../api/admin/ghn/ghnApi'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}
export default function AdCustomerDetail() {
  const theme = useTheme()
  const { id } = useParams()
  const { idCustomer } = useParams()
  const navigate = useNavigate()
  const [diaChi, setDiaChi] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])

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
      // Khởi tạo trạng thái khách hàng khi tải dữ liệu
      setKhachHang({ ...response.data.data, dateBirth: formattedBirthDate })
    })
  }

  const loadDiaChi = (initPage, idCustomer) => {
    DiaChiApi.getAll(initPage, idCustomer).then((response) => {
      setDiaChi(response.data.data.content)
      setTotalPages(response.data.data.totalPages)
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
      }
    })
  }
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [newDiaChi, setNewDiaChi] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    specificAddress: '',
    provinceId: { id: '', label: '' },
    districtId: { id: '', label: '' },
    wardId: { id: '', label: '' },
    type: null,
    idCustomer: id,
  })

  const handleTinhChange = (_, newValue) => {
    if (newValue) {
      loadHuyen(newValue.id)
      setSelectedProvince(newValue)
      setNewDiaChi({ ...newDiaChi, provinceId: { id: newValue.id, label: newValue.label } })
      // Lưu tên tỉnh đã chọn vào state
      setTinhName(newValue.label)
      // Đặt giá trị tỉnh vào chi tiết địa chỉ
      setDetailDiaChi({ ...detailDiaChi, provinceId: newValue.id })
    } else {
      setHuyen([])
      setSelectedProvince(null)
      setSelectedDistrict(null)
      setSelectedWard(null)
      setDetailDiaChi({ ...detailDiaChi, provinceId: '' })
      setNewDiaChi({ ...newDiaChi, provinceId: { id: '', label: '' } })
    }
  }

  const handleHuyenChange = (_, newValue) => {
    if (newValue) {
      loadXa(newValue.id)
      setSelectedDistrict(newValue)
      setNewDiaChi({ ...newDiaChi, districtId: { id: newValue.id, label: newValue.label } })
      // Lưu tên huyện đã chọn vào state
      setHuyenName(newValue.label)
      // Đặt giá trị huyện vào chi tiết địa chỉ
      setDetailDiaChi({ ...detailDiaChi, districtId: newValue.id })
    } else {
      setXa([])
      setSelectedDistrict(null)
      setSelectedWard(null)
      setDetailDiaChi({ ...detailDiaChi, districtId: '' })
      setNewDiaChi({ ...newDiaChi, districtId: { id: '', label: '' } })
    }
  }

  const handleXaChange = (_, newValue) => {
    if (newValue) {
      setSelectedWard(newValue)
      setNewDiaChi({ ...newDiaChi, wardId: { id: newValue.id, label: newValue.label } })
      // Lưu tên xã đã chọn vào state
      setXaName(newValue.label)
      // Đặt giá trị xã vào chi tiết địa chỉ
      setDetailDiaChi({ ...detailDiaChi, wardId: newValue.id })
    } else {
      setSelectedWard(null)
      setDetailDiaChi({ ...detailDiaChi, wardId: '' })
      setNewDiaChi({ ...newDiaChi, wardId: { id: '', label: '' } })
    }
  }

  //Thêm mới địa chỉ
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setNewDiaChi({
      name: '',
      phoneNumber: '',
      email: '',
      specificAddress: '',
      provinceId: null,
      districtId: null,
      wardId: null,
      type: null,
      idCustomer: id,
    })
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const onCreateDiaChi = (newDiaChi) => {
    const title = 'Xác nhận Thêm mới địa chỉ?'
    const text = ''
    console.log(newDiaChi.name, newDiaChi.phoneNumber, newDiaChi.email)
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
          handleClose()
          loadDiaChi(initPage - 1, id)
          toast.success('Thêm địa chỉ thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
      }
    })
  }

  // Update địa chỉ
  const [openUpdate, setOpenUpdate] = React.useState(false)
  const handleOpenUpdate = (idDC) => {
    fillDetailDiaChi(idDC)
    setOpenUpdate(true)
    console.log(idDC)
    console.log(detailDiaChi)
  }
  const handleCloseUpdate = () => setOpenUpdate(false)
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

  const onUpdateDiaChi = (detailDiaChi) => {
    const title = 'Xác nhận Cập nhật địa chỉ?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        detailDiaChi.specificAddress = `${detailDiaChi.specificAddress}, ${xaName}, ${huyenName}, ${tinhName}`

        DiaChiApi.update(detailDiaChi.id, detailDiaChi)
          .then(() => {
            handleCloseUpdate()
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

  //Cập nhật địa chỉ mặc định
  const handleUpdateType = (idDC) => {
    DiaChiApi.updateStatus(idDC, id).then(() => {
      loadDiaChi(initPage - 1, id)
      toast.success('Xét địa chỉ mặc định thành công thành công', {
        position: toast.POSITION.TOP_RIGHT,
      })
    })
  }
  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '100%' }}>
        <Toast />
        <Box>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10 }}>
            <Grid item xs={12} md={6}>
              <h2>Thông tin khách hàng</h2>
              <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
                <Typography>Tên khách hàng</Typography>
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
              </Grid>
              <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
                <Typography>Email</Typography>
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
              </Grid>
              <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
                <Typography>Số điện thoại</Typography>
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
              </Grid>
              <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
                <Typography>Ngày sinh</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      className="small-datepicker"
                      name="dateBirth"
                      value={dayjs(khachHang.dateBirth, 'DD-MM-YYYY')} // Chuyển đổi sang đối tượng Date
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
              <Grid item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
                <Button
                  onClick={() => onSubmit(id, khachHang)}
                  variant="contained"
                  color="cam"
                  size="small"
                  sx={{ float: 'left' }}>
                  Cập nhật khách hàng
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <h2>Danh sách địa chỉ</h2>
              {diaChi.map((item, index) => (
                <div key={index} className="custom-accordion">
                  <Accordion>
                    {console.log(item)}
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                      className="custom-accordion-header">
                      <div className="accordion-content">
                        <Typography variant="body1" className="accordion-text">
                          Địa chỉ: {item.specificAddress}
                        </Typography>
                        <Typography variant="body1" className="accordion-text">
                          Số điện thoại: {item.phoneNumber}
                        </Typography>
                        <Typography variant="body1" className="accordion-text">
                          Tên người nhận: {item.name}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
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
                      <IconButton
                        onClick={() => handleOpenUpdate(item.id)}
                        size="small"
                        color="cam"
                        sx={{ float: 'right' }}>
                        <EditIcon />
                      </IconButton>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
              <Grid container item xs={12} md={12} sx={{ pr: 5, mt: 3 }}>
                <Grid item xs={12} md={4}>
                  <Button onClick={handleOpen} variant="contained" color="cam" size="small">
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
                      />
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Modal thêm địa chỉ */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h1>Thêm địa chỉ</h1>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Tên người nhận"
                variant="outlined"
                type="text"
                size="small"
                name="name"
                fullWidth
                onChange={(e) => {
                  setNewDiaChi({ ...newDiaChi, name: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                size="small"
                name="email"
                fullWidth
                onChange={(e) => {
                  setNewDiaChi({ ...newDiaChi, email: e.target.value })
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                type="text"
                size="small"
                name="phoneNumber"
                fullWidth
                onChange={(e) => {
                  setNewDiaChi({ ...newDiaChi, phoneNumber: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  id="combo-box-demo"
                  value={selectedProvince}
                  onChange={handleTinhChange}
                  options={
                    tinh && tinh.map((item) => ({ label: item.provinceName, id: item.provinceID }))
                  }
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => (
                    <TextField placeholder="nhập tên tỉnh" color="cam" {...params} />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  id="huyen-autocomplete"
                  value={selectedDistrict}
                  onChange={handleHuyenChange}
                  options={
                    huyen &&
                    huyen.map((item) => ({ label: item.districtName, id: item.districtID }))
                  }
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => (
                    <TextField placeholder="nhập tên huyện" color="cam" {...params} />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  id="xa-autocomplete"
                  value={selectedWard}
                  onChange={handleXaChange}
                  options={xa && xa.map((item) => ({ label: item.wardName, id: item.wardCode }))}
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => (
                    <TextField placeholder="nhập tên Xã" color="cam" {...params} />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={12}>
              <TextField
                id="outlined-basic"
                label="Địa chỉ cụ thể"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setNewDiaChi({
                    ...newDiaChi,
                    specificAddress: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Button
                onClick={() => onCreateDiaChi(newDiaChi)}
                variant="contained"
                color="cam"
                sx={{ float: 'right' }}>
                Tạo Mới
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Model update địa chỉ */}

      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h1>Update địa chỉ</h1>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Tên người nhận"
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
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                size="small"
                name="email"
                fullWidth
                value={detailDiaChi.email}
                onChange={(e) => {
                  setDetailDiaChi({ ...detailDiaChi, email: e.target.value })
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
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
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  id="combo-box-demo"
                  value={{ label: tinhName, id: detailDiaChi.provinceId }}
                  onChange={handleTinhChange}
                  options={
                    tinh && tinh.map((item) => ({ label: item.provinceName, id: item.provinceID }))
                  }
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => (
                    <TextField placeholder="nhập tên tỉnh" color="cam" {...params} />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  value={{ label: huyenName, id: detailDiaChi.districtId }}
                  onChange={handleHuyenChange}
                  options={
                    huyen &&
                    huyen.map((item) => ({ label: item.districtName, id: item.districtID }))
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField placeholder="Chọn huyện" color="cam" {...params} />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  value={{ label: xaName, id: detailDiaChi.wardId }}
                  onChange={handleXaChange}
                  options={xa && xa.map((item) => ({ label: item.wardName, id: item.wardCode }))}
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
              <TextField
                id="outlined-basic"
                label="Địa chỉ cụ thể"
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

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Button
                onClick={() => onUpdateDiaChi(detailDiaChi)}
                variant="contained"
                color="cam"
                sx={{ float: 'right' }}>
                Cập nhật
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
