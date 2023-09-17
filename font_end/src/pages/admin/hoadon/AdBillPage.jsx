import React, { useState, useEffect } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  IconButton,
} from '@mui/material'
import hoaDonApi from '../../../api/admin/hoadon/hoaDonApi'
import dayjs from 'dayjs'
import { getStatus } from '../../../services/constants/statusHoaDon'
import Tooltip from '@mui/material/Tooltip'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FaPlusCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../services/common/formatCurrency '
import { IoEye } from 'react-icons/io5'

export default function AdBillPage() {
  const tableRowStyle = {
    '&:hover': {
      backgroundColor: 'lightgray',
      cursor: 'pointer',
    },
  }

  const [listHoaDon, setListHoaDon] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [inputSearch, setInputSearch] = useState('')
  const [startDate, setStartDate] = useState(dayjs(dayjs().format('YYYY-MM-DD')))
  const [endDate, setEndDate] = useState(dayjs(dayjs().format('YYYY-MM-DD')))
  const [statusBill, setStatusBill] = useState('all')
  const [typeBill, setTypeBill] = useState('all')
  const [filter, setFilter] = useState({
    page: 1,
    size: 5,
    startDate: '',
    endDate: '',
    status: '',
    type: '',
    inputSearch: '',
  })

  useEffect(() => {
    filterBill(filter)
  }, [filter])

  //hàm khi thay đổi trang
  const handlePageChange = (event, newPage) => {
    const updatedFilter = { ...filter, page: newPage }
    setFilter(updatedFilter)
    setCurrentPage(newPage)
  }

  const handleInputSearch = (e) => {
    setInputSearch(e.target.value)
    const updatedFilter = { ...filter, inputSearch: e.target.value, page: 1 }
    setFilter(updatedFilter)
  }

  const handleChangeSelectStatusBill = (event) => {
    const updatedFilter = { ...filter, status: event.target.value, page: 1 }
    setStatusBill(event.target.value)
    setFilter(updatedFilter)
  }

  const handleChangeSelectTypeBill = (event) => {
    const updatedFilter = { ...filter, type: event.target.value, page: 1 }
    setTypeBill(event.target.value)
    setFilter(updatedFilter)
  }

  const handleStartDateChange = (newValue) => {
    const formattedStartDate = dayjs(newValue).format('DD-MM-YYYY')
    const startDateString = `${formattedStartDate} 00:00:00`
    const updatedFilter = { ...filter, startDate: startDateString, page: 1 }
    setFilter(updatedFilter)
    setStartDate(newValue)
  }

  const handleEndDateChange = (newValue) => {
    const formattedEndDate = dayjs(newValue).format('DD-MM-YYYY')
    const endDateString = `${formattedEndDate} 23:59:59`
    const updatedFilter = { ...filter, endDate: endDateString, page: 1 }
    setFilter(updatedFilter)
    setEndDate(newValue)
  }

  const handleClearStartDate = () => {
    setStartDate(null)
    const updatedFilter = { ...filter, startDate: null, page: 1 }
    setFilter(updatedFilter)
  }

  const handleClearEndDate = () => {
    setEndDate(null)
    const updatedFilter = { ...filter, endDate: null, page: 1 }
    setFilter(updatedFilter)
  }

  // haqfm filter:
  const filterBill = (filter) => {
    hoaDonApi
      .getBillFilter(filter)
      .then((response) => {
        setListHoaDon(response.data.data)
        setTotalPages(response.data.totalPages)
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get filter: ', error)
      })
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h3>Hoá đơn</h3>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={5} style={{ margin: '25px', padding: '8px' }}>
            {' '}
            <TextField
              value={inputSearch}
              onChange={handleInputSearch}
              id="hd-input-search"
              label="Tìm kiếm"
              type="text"
              size="small"
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={2.5} style={{ margin: '20px' }}></Grid>
          <Grid item xs={2.5} style={{ margin: '20px' }}>
            <Button sx={{ ml: 1, mt: 2 }} color="success" variant="contained">
              <FaPlusCircle />
              <Typography sx={{ ml: 1 }}>Tạo Hoá đơn</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5} style={{ height: '50px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="Từ ngày"
                  value={startDate}
                  onChange={handleStartDateChange}
                  componentsProps={{
                    actionBar: {
                      actions: ['clear'],
                      onClear: handleClearStartDate,
                    },
                  }}
                />
                <DatePicker
                  label="Đến ngày"
                  value={endDate}
                  onChange={handleEndDateChange}
                  componentsProps={{
                    actionBar: {
                      actions: ['clear'],
                      onClear: handleClearEndDate,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2} style={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="hd-select-status" shrink>
                Trạng thái
              </InputLabel>
              <Select
                id="hd-select-status"
                value={statusBill}
                onChange={handleChangeSelectStatusBill}
                label="Trạng thái"
                style={{ height: '40px' }}
                inputProps={{
                  name: 'Trạng thái',
                  id: 'hd-select-status',
                }}>
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="0">{getStatus(0)}</MenuItem>
                <MenuItem value="1">{getStatus(1)}</MenuItem>
                <MenuItem value="2">{getStatus(2)}</MenuItem>
                <MenuItem value="3">{getStatus(3)}</MenuItem>
                <MenuItem value="4">{getStatus(4)}</MenuItem>
                <MenuItem value="5">{getStatus(5)}</MenuItem>
                <MenuItem value="6">{getStatus(6)}</MenuItem>
                <MenuItem value="7">{getStatus(7)}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: '15px', marginLeft: '25px' }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="hd-select-type" shrink>
                Loại:
              </InputLabel>
              <Select
                id="hd-select-type"
                value={typeBill}
                onChange={handleChangeSelectTypeBill}
                style={{ height: '40px' }}
                label="Loại"
                inputProps={{
                  name: 'Loại',
                  id: 'hd-select-type',
                }}>
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="false">Tại quầy</MenuItem>
                <MenuItem value="true">Giao hàng</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Mã</TableCell>
                <TableCell align="center">Tổng sản phẩm</TableCell>
                <TableCell align="center">Tổng số tiền</TableCell>
                <TableCell align="center">Tên khách hàng</TableCell>
                <TableCell align="center">Số điện thoại KH</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center">Loại hoá đơn</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listHoaDon.map((row, index) => (
                <TableRow key={row.code} sx={tableRowStyle}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">
                    {row.totalProduct !== null ? row.totalProduct : 0}
                  </TableCell>
                  <TableCell align="center">
                    {row.totalMoney !== null ? formatCurrency(row.totalMoney) : 0}
                  </TableCell>
                  <TableCell align="center">
                    {row.fullName !== null ? row.fullName : 'Khách lẻ'}
                  </TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">
                    {dayjs(row.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Chip
                        size="small"
                        label={row.type ? 'Giao hàng' : 'Tại Quầy'}
                        color="primary"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Chip size="small" label={getStatus(row.status)} color="primary" />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/admin/bill-detail/${row.id}`}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton color="#C0C0C0'">
                          <IoEye style={{ fontSize: '20px' }} />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            paddingBottom: '20px',
          }}>
          <Pagination
            defaultPage={1}
            page={currentPage}
            onChange={handlePageChange}
            count={totalPages}
            variant="outlined"
          />
        </div>
      </Paper>
    </div>
  )
}
