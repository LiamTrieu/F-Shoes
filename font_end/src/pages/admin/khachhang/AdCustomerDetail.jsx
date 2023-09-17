import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
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
  }, [id, idCustomer, initPage])
  const handleOnChangePage = (page) => {
    setInitPage(page)
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

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [xa, setXa] = useState('')
  const [huyen, setHuyen] = useState('')
  const [tinh, setTinh] = useState('')
  const [newDiaChi, setNewDiaChi] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    specificAddress: '',
    type: null,
    idCustomer: id,
  })

  const onCreateDiaChi = (newDiaChi) => {
    const title = 'Xác nhận Thêm mới địa chỉ?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        // Thêm mới địa chỉ
        DiaChiApi.add(newDiaChi).then((response) => {
          toast.success('Thêm địa chỉ thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          handleClose()
          setDiaChi([...diaChi, newDiaChi])
          loadDiaChi(initPage - 1, id)
        })
      }
    })
  }
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
    type: null,
    idCustomer: id,
  })

  const fillDetailDiaChi = (idDiaChi) => {
    DiaChiApi.getById(idDiaChi).then((response) => {
      console.log(response.data.data)
      const { name, email, phoneNumber, specificAddress } = response.data.data
      // Chia chuỗi specificAddress thành các phần tử
      const addressParts = specificAddress.split(', ')
      if (addressParts.length === 4) {
        const [address, xa, huyen, tinh] = addressParts
        setXa(xa)
        setHuyen(huyen)
        setTinh(tinh)
        setDetailDiaChi({
          ...detailDiaChi,
          id: idDiaChi,
          name: name,
          phoneNumber: phoneNumber,
          email: email,
          specificAddress: address,
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
          toast.success('xóa địa chỉ thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          loadDiaChi(initPage - 1, id)
        })
      }
    })
  }

  const onUpdateDiaChi = (detailDiaChi) => {
    const title = 'Xác nhận Cập nhật địa chỉ?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        detailDiaChi.specificAddress = `${detailDiaChi.specificAddress}, ${xa}, ${huyen}, ${tinh}`

        DiaChiApi.update(detailDiaChi.id, detailDiaChi)
          .then(() => {
            toast.success('Cập nhật địa chỉ thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            handleCloseUpdate()
            loadDiaChi(initPage - 1, id)
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật địa chỉ:', error)
            toast.error('Đã xảy ra lỗi khi cập nhật địa chỉ', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
      }
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
                <TextField
                  id="outlined-basic"
                  label="Tên khách hàng"
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
                <TextField
                  id="outlined-basic"
                  label="Email"
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
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Ngày sinh"
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
                      <IconButton aria-label="favorite" size="small">
                        <StarIcon />
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
                fullWidth
                onChange={(e) => {
                  setNewDiaChi({ ...newDiaChi, phoneNumber: e.target.value })
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
          <Grid container spacing={2} sx={{ mt: 3 }}>
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
                    specificAddress: e.target.value + ', ' + xa + ', ' + huyen + ', ' + tinh,
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
          <Grid container spacing={2} sx={{ mt: 3 }}>
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
