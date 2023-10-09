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
  TextField,
  FormControl,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Stack,
  InputAdornment,
  Typography,
} from '@mui/material'
import hoaDonApi from '../../../api/admin/hoadon/hoaDonApi'
import dayjs from 'dayjs'
import { getStatus } from '../../../services/constants/statusHoaDon'
import Tooltip from '@mui/material/Tooltip'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../services/common/formatCurrency '
import { getStatusStyle } from './getStatusStyle'
import { TbEyeEdit } from 'react-icons/tb'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import Empty from '../../../components/Empty'

export default function AdBillPage() {
  const [listHoaDon, setListHoaDon] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [inputSearch, setInputSearch] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
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

  const filterBill = (filter) => {
    hoaDonApi
      .getBillFilter(filter)
      .then((response) => {
        setListHoaDon(response.data.data)
        setTotalPages(response.data.totalPages)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get filter: ', error)
      })
  }

  return (
    <div className="hoa-don">
      <h3>Hoá đơn</h3>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
          style={{ marginBottom: '20px' }}>
          <TextField
            value={inputSearch}
            onChange={handleInputSearch}
            id="hd-input-search"
            sx={{ width: '50%' }}
            className="search-field"
            size="small"
            color="cam"
            placeholder="Tìm kiếm hoá đơn"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="cam" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            component={Link}
            to="/admin/sell"
            color="cam"
            variant="outlined"
            className="them-moi">
            <AiOutlinePlusSquare style={{ marginRight: '5px', fontSize: '17px' }} />
            Tạo hoá đơn
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
          style={{ marginTop: '10px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} style={{ flexBasis: '40%' }}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <div style={{ marginBottom: '10px' }}>
                <DatePicker
                  id="start-date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  slotProps={{
                    actionBar: {
                      actions: ['clear'],
                    },
                  }}
                  style={{
                    borderRadius: '5px',
                    width: '100%',
                  }}
                  className="dateTime"
                  label="Từ ngày"
                />
              </div>
              <div>
                <DatePicker
                  id="end-date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  slotProps={{
                    actionBar: {
                      actions: ['clear'],
                    },
                  }}
                  style={{
                    borderRadius: '5px',
                    width: '100%',
                  }}
                  className="dateTime"
                  label="Đến ngày"
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>

          <FormControl fullWidth style={{ flexBasis: '25%' }}>
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

          <FormControl fullWidth style={{ flexBasis: '20%' }}>
            <div className="filter">
              <b>Loại:</b>
              <Select
                displayEmpty
                size="small"
                value={typeBill}
                onChange={handleChangeSelectTypeBill}>
                <MenuItem value="all">Tất cả</MenuItem>
                {[
                  { id: true, name: 'Trực tuyến' },
                  { id: false, name: 'Tại quầy' },
                ]?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </FormControl>
        </Stack>
      </Paper>

      <Paper elevation={3}>
        {listHoaDon.length === 0 ? (
          <div>
            <Empty />
          </div>
        ) : (
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
                <TableRow key={row.code}>
                  <TableCell align="center" style={{ width: '5%' }}>
                    {row.stt}
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
                      <Chip className="chip-giao-hang" label="Trực tuyến" size="small" />
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
                          <TbEyeEdit fontSize={'25px'} color="#FC7C27" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Stack
          mt={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={0}
          style={{ padding: '10px' }}>
          <Typography component="span" variant={'body2'} mt={0.5}>
            <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Xem</Typography>
            <Select
              color="cam"
              onChange={(e) => {
                setFilter({ ...filter, size: e.target.value, page: 1 })
              }}
              sx={{ height: '25px', mx: 0.5 }}
              size="small"
              value={filter.size}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Hoá đơn</Typography>
          </Typography>
          <Pagination
            defaultPage={1}
            page={currentPage}
            onChange={handlePageChange}
            count={totalPages}
            variant="outlined"
            color="cam"
          />
        </Stack>
      </Paper>
    </div>
  )
}
