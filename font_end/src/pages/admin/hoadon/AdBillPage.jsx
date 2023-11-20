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
  Tabs,
  Box,
} from '@mui/material'
import Tab from '@mui/material/Tab'
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
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

var stompClient = null
export default function AdBillPage() {
  const [listHoaDon, setListHoaDon] = useState([])
  const [hoaDonUpdate, setHoaDonUpdate] = useState(null)
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
  const [valueTabHD, setValueTabHD] = React.useState('all')
  const listSttHD = [0, 1, 2, 3, 4, 5, 6, 7]

  useEffect(() => {
    filterBill(filter)
  }, [filter])

  const handleChangeTab = (event, newValue) => {
    setValueTabHD(newValue)
    const updatedFilter = { ...filter, status: newValue, page: 1 }
    setFilter(updatedFilter)
  }

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
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/shoes-websocket-endpoint')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, onConnect)

    return () => {
      stompClient.disconnect()
    }
  }, [])

  const onConnect = () => {
    stompClient.subscribe('/topic/bill-update', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        setHoaDonUpdate(data)
      }
    })
    stompClient.subscribe('/topic/real-time-bill-page-admin', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        billRealTime(data)
      }
    })
  }

  const billRealTime = (data) => {
    const preProduct = [...listHoaDon]
    const index = preProduct.findIndex((p) => p.id === data.id)
    if (index !== -1) {
      preProduct[index] = data
      setListHoaDon(preProduct)
    }
  }
  useEffect(() => {
    const preListHoaDon = [...listHoaDon]
    setListHoaDon([
      { ...hoaDonUpdate },
      ...preListHoaDon
        .slice(0, preListHoaDon.length === 5 ? preListHoaDon.length - 1 : preListHoaDon.length)
        .map((hd) => {
          hd.stt = hd.stt + 1
          return hd
        }),
    ])
  }, [hoaDonUpdate])

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

          <FormControl>
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={valueTabHD} onChange={handleChangeTab} className="tabSttHD">
                <Tab label={'Tất cả'} key={'tabSttHd all'} value={'all'}></Tab>
                {listSttHD.map((row, i) => (
                  <Tab label={getStatus(row)} key={'tabSttHd' + i} value={row}></Tab>
                ))}
              </Tabs>
            </Box>
            <Empty />
          </div>
        ) : (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={valueTabHD} onChange={handleChangeTab} className="tabSttHD">
                <Tab label={'Tất cả'} key={'tabSttHd all'} value={'all'}></Tab>
                {listSttHD.map((row, i) => (
                  <Tab label={getStatus(row)} key={'tabSttHd' + i} value={row}></Tab>
                ))}
              </Tabs>
            </Box>
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
                      {row.moneyAfter !== null ? formatCurrency(row.moneyAfter) : 0}
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
          </>
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
