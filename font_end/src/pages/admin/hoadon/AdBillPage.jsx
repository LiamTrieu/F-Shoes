import React, { useState, useEffect } from 'react'
import '../hoadon/hoaDonStyle.css'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Button,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
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
import { getStatusStyle } from './getStatusStyle'

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
    const startDateString = `${formattedStartDate} `
    const updatedFilter = { ...filter, startDate: startDateString, page: 1 }
    setFilter(updatedFilter)
    setStartDate(newValue)
  }

  const handleEndDateChange = (newValue) => {
    const formattedEndDate = dayjs(newValue).add(1, 'day').format('DD-MM-YYYY')
    const updatedFilter = { ...filter, endDate: formattedEndDate, page: 1 }
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
    <div className="hoa-don">
      <h3>Hoá đơn</h3>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={5} style={{ margin: '25px', padding: '8px' }}>
            <TextField
              value={inputSearch}
              onChange={handleInputSearch}
              id="hd-input-search"
              label="Tìm kiếm"
              type="text"
              size="small"
              style={{ width: '100%' }}
              color="cam"
            />
          </Grid>
          <Grid item xs={3.5} style={{ margin: '20px' }}></Grid>
          <Grid item xs={2} style={{ margin: '20px' }}>
            <Button
              style={{
                borderRadius: '5px',
              }}
              color="cam"
              variant="contained">
              <FaPlusCircle style={{ fontSize: '17px' }} />
              Tạo hoá đơn
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
          <Grid item xs={3} style={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <div className="filter">
                <b>Trạng thái:</b>
                <Select
                  displayEmpty
                  size="small"
                  value={statusBill}
                  onChange={handleChangeSelectStatusBill}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {[
                    { id: 0, name: 'Đã huỷ' },
                    { id: 1, name: 'Chờ xác nhận' },
                    { id: 2, name: 'Đã xác nhận' },
                    { id: 3, name: 'Đang vận chuyển' },
                    { id: 4, name: 'Đã giao hàng' },
                    { id: 5, name: 'Đã thanh toán' },
                    { id: 6, name: 'Chờ thanh toán' },
                    { id: 7, name: 'Hoàn thành' },
                  ]?.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: '15px', marginLeft: '5px' }}>
            <FormControl fullWidth>
              <div className="filter">
                <b>Loại:</b>
                <Select
                  displayEmpty
                  size="small"
                  value={typeBill}
                  onChange={handleChangeSelectTypeBill}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {[
                    { id: true, name: 'Giao hàng' },
                    { id: false, name: 'Tại quầy' },
                  ]?.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3}>
        <Table className="tableCss">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: '5%' }}>
                #
              </TableCell>
              <TableCell align="center" style={{ width: '8%' }}>
                Mã
              </TableCell>
              <TableCell align="center" style={{ width: '8%' }}>
                Tổng SP
              </TableCell>
              <TableCell align="center">Tổng số tiền</TableCell>
              <TableCell align="center">Tên khách hàng</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Loại hoá đơn</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHoaDon.map((row, index) => (
              <TableRow key={row.code} sx={tableRowStyle}>
                <TableCell align="center" style={{ width: '5%' }}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" style={{ width: '8%' }}>
                  {row.code}
                </TableCell>
                <TableCell align="center" style={{ width: '8%' }}>
                  {row.totalProduct !== null ? row.totalProduct : 0}
                </TableCell>
                <TableCell align="center">
                  {row.totalMoney !== null ? formatCurrency(row.totalMoney) : 0}
                </TableCell>
                <TableCell align="center">
                  {row.fullName !== null ? (
                    row.fullName
                  ) : (
                    <Chip className="chip-khach-le" label="Khách lẻ" size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {dayjs(row.createdAt).format('DD/MM/YYYY  HH:mm')}
                </TableCell>
                <TableCell align="center">
                  {row.type ? (
                    <Chip className="chip-giao-hang" label="Giao hàng" size="small" />
                  ) : (
                    <Chip className="chip-tai-quay" label="Tại quầy" size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    className={getStatusStyle(row.status)}
                    label={getStatus(row.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Link to={`/admin/bill-detail/${row.id}`}>
                    <Tooltip title="Xem chi tiết">
                      <IconButton>
                        <IoEye fontSize={'25px'} color="#FC7C27" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
            color="cam"
          />
        </div>
      </Paper>
    </div>
  )
}
