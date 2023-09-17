import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Modal,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useState } from 'react'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import confirmSatus from '../../../components/comfirmSwal'
import { toast } from 'react-toastify'
import { useTheme } from '@emotion/react'

export default function AdVoucherAdd() {
  const initialVoucher = {
    code: '',
    name: '',
    value: 0,
    maximumValue: 0,
    type: 0,
    minimumAmount: 0,
    quantity: 0,
    startDate: '',
    endDate: '',
    status: 1,
  }
  const theme = useTheme()
  const navigate = useNavigate()
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [voucherAdd, setVoucherAdd] = useState(initialVoucher)
  const [openCustomer, setOpenCustomer] = useState(false)
  const [listCustomer, setListCustomer] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [dataFetched, setDataFetched] = useState(false)
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    if (selected.length === listCustomer.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [selected, listCustomer])

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelected([])
    } else {
      const newSelected = listCustomer.map((n) => n.id)
      setSelected(newSelected)
    }
  }

  const handleVoucherAdd = (voucherAdd) => {
    console.log('voucher :', voucherAdd)
    const title = 'Xác nhận thêm mới voucher?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        voucherApi
          .addVoucher(voucherAdd)
          .then(() => {
            toast.success('Thêm mới voucher thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            navigate('/admin/voucher')
          })
          .catch(() => {
            toast.error('Thêm mới voucher thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
      }
    })
  }

  const handelCustomeFill = (initPage) => {
    voucherApi
      .getPageCustomer(initPage - 1)
      .then((response) => {
        setListCustomer(response.data.data.content)
        setTotalPages(response.data.data.totalPages)
        setOpenCustomer(true)
        setDataFetched(true)
      })
      .catch((error) => {
        setDataFetched(false)
      })
  }

  const handelOnchangePage = (page) => {
    setInitPage(page)
    handelCustomeFill(page - 1)
  }

  const handleCheckboxClick = (customerId) => {
    if (selected.includes(customerId)) {
      setSelected(selected.filter((id) => id !== customerId))
    } else {
      setSelected([...selected, customerId])
    }

    if (selected.length === listCustomer.length - 1) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={11.8}>
            <h1>Thêm mới Voucher</h1>
          </Grid>
          <Grid item xs={0.1}></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Mã voucher"
              type="text"
              size="small"
              fullWidth
              onChange={(e) => setVoucherAdd({ ...voucherAdd, code: e.target.value })}
            />
          </Grid>
          <Grid item xs={0.6}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Tên voucher"
              type="text"
              size="small"
              fullWidth
              onChange={(e) => setVoucherAdd({ ...voucherAdd, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={0.3}></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Giá trị"
              type="number"
              size="small"
              fullWidth
              onChange={(e) => setVoucherAdd({ ...voucherAdd, value: Number(e.target.value) })}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 0, max: 100 },
              }}
            />
          </Grid>
          <Grid item xs={0.6}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Giá trị tối đa"
              type="number"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({
                  ...voucherAdd,
                  maximumValue: Number(e.target.value),
                })
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={0.3}></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Số lượng"
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({
                  ...voucherAdd,
                  quantity: Number(e.target.value),
                })
              }
            />
          </Grid>
          <Grid item xs={0.6}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Điều kiện"
              type="number"
              size="small"
              fullWidth
              onChange={(e) =>
                setVoucherAdd({
                  ...voucherAdd,
                  minimumAmount: Number(e.target.value),
                })
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={0.3}></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm:ss'}
                onChange={(e) =>
                  setVoucherAdd({
                    ...voucherAdd,
                    startDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                  })
                }
                label="Từ ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={0.6}></Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm:ss'}
                onChange={(e) =>
                  setVoucherAdd({
                    ...voucherAdd,
                    endDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                  })
                }
                label="Đến ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={0.3}></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.1}></Grid>
          <Grid item xs={3}>
            <FormControl size="small">
              <FormLabel>Kiểu</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  name="typeAdd"
                  value={0}
                  control={<Radio />}
                  label="Tất cả"
                  onChange={() => {
                    setVoucherAdd({ ...voucherAdd, type: 0 })
                    handleSelectAllClick()
                  }}
                  onClick={() => setIsSelectVisible(false)}
                  checked={isSelectVisible === false}
                />
                <FormControlLabel
                  name="typeAdd"
                  value={1}
                  control={<Radio />}
                  label="Cá nhân"
                  onChange={(e) => setVoucherAdd({ ...voucherAdd, type: e.target.value })}
                  onClick={() => setIsSelectVisible(true)}
                  checked={isSelectVisible === true}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            {isSelectVisible && (
              <Button
                onClick={() => handelCustomeFill(initPage)}
                sx={{ width: 150, float: 'left', mt: 3 }}
                variant="contained">
                Chọn
              </Button>
            )}
            {openCustomer && (
              <Modal open={openCustomer} onClose={() => setOpenCustomer(false)}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 100,
                    p: 2,
                    width: '75%',
                  }}>
                  {dataFetched && (
                    <TableContainer component={Paper}>
                      <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Checkbox id="checkBoxAll" onChange={handleSelectAllClick} />
                            </TableCell>
                            <TableCell align="center">Tên</TableCell>
                            <TableCell align="center">Số điện thoại</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Ngày sinh</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listCustomer.map((row, index) => (
                            <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell>
                                <Checkbox
                                  id={row.id}
                                  key={row.id}
                                  onChange={() => handleCheckboxClick(row.id)}
                                  checked={selected.includes(row.id)}
                                />
                              </TableCell>
                              <TableCell align="center">{row.fullName}</TableCell>
                              <TableCell align="center">{row.phoneNumber}</TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">
                                {dayjs(row.dateBirth).format('DD-MM-YYYY')}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  {!dataFetched && (
                    <p style={{ textAlign: 'center' }}>
                      <b>Không có dữ liệu</b>
                    </p>
                  )}
                  <Grid container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      page={initPage}
                      onChange={(_, page) => handelOnchangePage(page)}
                      count={totalPages}
                      color="primary"
                    />
                  </Grid>
                  <Button onClick={() => setOpenCustomer(false)}>Xác nhận</Button>
                </Box>
              </Modal>
            )}
          </Grid>
          <Grid item xs={6.6}></Grid>
          <Grid item xs={0.3}></Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <Button
              onClick={() => handleVoucherAdd(voucherAdd)}
              variant="contained"
              fullWidth
              color="success">
              Thêm mới
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  )
}
