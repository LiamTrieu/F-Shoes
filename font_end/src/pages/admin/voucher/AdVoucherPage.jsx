import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import Pagination from '@mui/material/Pagination'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SearchIcon from '@mui/icons-material/Search'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { TbEyeEdit } from 'react-icons/tb'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import './voucher.css'
import '../../../assets/styles/admin.css'
import Empty from '../../../components/Empty'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

function Row(props) {
  const { row, searchVoucher, fetchData } = props

  const [open, setOpen] = React.useState(false)

  const handelDeleteVoucher = (idDelete) => {
    const title = 'Xác nhận hủy voucher?'
    const text = ''
    confirmSatus(title, text).then((result) => {
      if (result.isConfirmed) {
        voucherApi
          .deleteVoucher(idDelete)
          .then(() => {
            toast.success('Hủy voucher thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(searchVoucher)
          })
          .catch(() => {
            toast.error('Hủy voucher thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
      }
    })
  }

  return (
    <Fragment>
      <TableRow>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.code}</TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">
          {row.type === 0 ? (
            <Chip className="chip-tat-ca" size="small" label="Tất cả" />
          ) : (
            <Chip className="chip-gioi-han" size="small" label="Cá nhân" />
          )}
        </TableCell>
        <TableCell align="center">{dayjs(row.startDate).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell align="center">{dayjs(row.endDate).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell align="center">
          {row.status === 2 ? (
            <Chip className="chip-khong-hoat-dong" size="small" label="Đã kết thúc" />
          ) : row.status === 1 ? (
            <Chip
              className="chip-hoat-dong"
              size="small"
              label="Đang diễn ra"
              onClick={() => handelDeleteVoucher(row.id)}
            />
          ) : (
            <Chip className="chip-sap-hoat-dong" size="small" label="Sắp diễn ra" />
          )}
        </TableCell>
        <TableCell align="center">
          <Link to={`/admin/voucher/${row.id}/detail`}>
            <Tooltip title="Xem chi tiết">
              <IconButton>
                <TbEyeEdit className="icon-css" />
              </IconButton>
            </Tooltip>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Giá trị</TableCell>
                  <TableCell align="center">Giá trị tối đa</TableCell>
                  <TableCell align="center">Điều kiện</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={row.id}>
                  <TableCell align="center">{row.value}%</TableCell>
                  <TableCell align="center">{row.maximumValue} VNĐ</TableCell>
                  <TableCell align="center">{row.minimumAmount} VNĐ</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

var stompClient = null
export default function AdVoucherPage() {
  const [listVoucher, setListVoucher] = useState([])
  const [listVoucherUpdate, setListVoucherUpdate] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [dataFetched, setDataFetched] = useState(false)
  const [searchVoucher, setSearchVoucher] = useState({
    nameSearch: '',
    startDateSearch: '',
    endDateSearch: '',
    typeSearch: '',
    statusSearch: '',
    page: 1,
  })

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/shoes-websocket-endpoint')
    stompClient = Stomp.over(socket)
    stompClient.debug = () => {}

    stompClient.connect({}, onConnect)

    return () => {
      stompClient.disconnect()
    }
  }, [])

  const onConnect = () => {
    stompClient.subscribe('/topic/voucherUpdates', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        setListVoucherUpdate(data)
      }
    })
  }

  useEffect(() => {
    const updatedVouchers = listVoucher.map((voucher) => {
      const matchedData = listVoucherUpdate.find((item) => item.id === voucher.id)
      if (matchedData) {
        return {
          ...voucher,
          code: matchedData.code,
          name: matchedData.name,
          value: matchedData.value,
          maximumValue: matchedData.maximumValue,
          type: matchedData.type,
          minimumAmount: matchedData.minimumAmount,
          quantity: matchedData.quantity,
          startDate: matchedData.startDate,
          endDate: matchedData.endDate,
          status: matchedData.status,
        }
      } else {
        return voucher
      }
    })
    setListVoucher(updatedVouchers)
  }, [listVoucher, listVoucherUpdate])

  const handelOnchangePage = (page) => {
    setSearchVoucher({ ...searchVoucher, page: page })
    fetchData(searchVoucher)
  }

  const fetchData = (searchVoucher) => {
    if (
      searchVoucher.nameSearch !== '' ||
      searchVoucher.startDateSearch !== '' ||
      searchVoucher.endDateSearch !== '' ||
      searchVoucher.typeSearch !== '' ||
      searchVoucher.statusSearch !== ''
    ) {
      voucherApi
        .searchVoucher(searchVoucher)
        .then((response) => {
          setListVoucher(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
          setDataFetched(true)
        })
        .catch(() => {
          setDataFetched(false)
          toast.warning('Vui lòng f5 tải lại dữ liệu', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    } else {
      voucherApi
        .getPageVoucher(searchVoucher.page)
        .then((response) => {
          setListVoucher(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
          setDataFetched(true)
        })
        .catch(() => {
          setDataFetched(false)
          toast.warning('Vui lòng f5 tải lại dữ liệu', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    }
  }

  const handelDeleteVoucher = (idDelete) => {
    const title = 'Xác nhận hủy voucher?'
    const text = ''
    confirmSatus(title, text).then((result) => {
      if (result.isConfirmed) {
        voucherApi
          .deleteVoucher(idDelete)
          .then(() => {
            toast.success('Hủy voucher thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            fetchData(searchVoucher)
          })
          .catch(() => {
            toast.error('Hủy voucher thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
      }
    })
  }

  useEffect(() => {
    fetchData(searchVoucher)
  }, [searchVoucher])

  return (
    <div className="voucher-css">
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              className="search-voucher"
              placeholder="Tìm voucher theo mã hoặc tên"
              type="text"
              size="small"
              fullWidth
              onChange={(e) =>
                setSearchVoucher({
                  ...searchVoucher,
                  nameSearch: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3.5}></Grid>
          <Grid item xs={2.5} className="icon-css">
            <Link to={'/admin/voucher/add'}>
              <Button color="success" variant="contained">
                <AiOutlinePlusCircle className="icon-css" />
                <Typography>Tạo voucher</Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 1 }} spacing={2}>
          <Grid item xs={3} className="dateTime">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm'}
                value={dayjs(searchVoucher?.startDateSearch)}
                onChange={(e) => {
                  setSearchVoucher({
                    ...searchVoucher,
                    startDateSearch: dayjs(e).toDate().getTime(),
                  })
                }}
                slotProps={{
                  actionBar: {
                    actions: ['clear'],
                    onClick: () => setSearchVoucher({ ...searchVoucher, startDateSearch: '' }),
                  },
                }}
                label="Từ ngày"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3} className="dateTime">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm'}
                value={dayjs(searchVoucher?.endDateSearch)}
                onChange={(e) => {
                  setSearchVoucher({
                    ...searchVoucher,
                    endDateSearch: dayjs(e).toDate().getTime(),
                  })
                }}
                slotProps={{
                  actionBar: {
                    actions: ['clear'],
                    onClick: () => setSearchVoucher({ ...searchVoucher, endDateSearch: '' }),
                  },
                }}
                label="Đến ngày"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
              <div className="filter">
                <b>Kiểu</b>
                <Select
                  displayEmpty
                  size="small"
                  value={searchVoucher.typeSearch}
                  onChange={(e) =>
                    setSearchVoucher({ ...searchVoucher, typeSearch: e.target.value })
                  }>
                  <MenuItem value={''}>Kiểu</MenuItem>
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Cá nhân</MenuItem>
                </Select>
                <b>Trạng thái</b>
                <Select
                  displayEmpty
                  size="small"
                  value={searchVoucher.statusSearch}
                  onChange={(e) =>
                    setSearchVoucher({ ...searchVoucher, statusSearch: e.target.value })
                  }>
                  <MenuItem value={''}>Trạng thái</MenuItem>
                  <MenuItem value={0}>Sắp diễn ra</MenuItem>
                  <MenuItem value={1}>Đang diễn ra</MenuItem>
                  <MenuItem value={2}>Đã kết thúc</MenuItem>
                </Select>
              </div>
            </Stack>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 1 }}>
          {dataFetched && (
            <Table className="tableCss" sx={{ mt: 4 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={'10%'}>
                    Mã
                  </TableCell>
                  <TableCell align="center" width={'15%'}>
                    Tên
                  </TableCell>
                  <TableCell align="center" width={'10%'}>
                    Kiểu
                  </TableCell>
                  <TableCell align="center" width={'20%'}>
                    Ngày bắt đầu
                  </TableCell>
                  <TableCell align="center" width={'20%'}>
                    Ngày kết thúc
                  </TableCell>
                  <TableCell align="center" width={'15%'}>
                    Trạng thái
                  </TableCell>
                  <TableCell align="center" width={'10%'}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listVoucher.map((row) => (
                  <TableRow>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      {row.type === 0 ? (
                        <Chip className="chip-tat-ca" size="small" label="Tất cả" />
                      ) : (
                        <Chip className="chip-gioi-han" size="small" label="Cá nhân" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(row.startDate).format('DD/MM/YYYY HH:mm')}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(row.endDate).format('DD/MM/YYYY HH:mm')}
                    </TableCell>
                    <TableCell align="center">
                      {row.status === 2 ? (
                        <Chip className="chip-khong-hoat-dong" size="small" label="Đã kết thúc" />
                      ) : row.status === 1 ? (
                        <Chip
                          className="chip-hoat-dong"
                          size="small"
                          label="Đang diễn ra"
                          onClick={() => handelDeleteVoucher(row.id)}
                        />
                      ) : (
                        <Chip className="chip-sap-hoat-dong" size="small" label="Sắp diễn ra" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/admin/voucher/${row.id}/detail`}>
                        <Tooltip title="Xem chi tiết">
                          <IconButton>
                            <TbEyeEdit style={{ color: '#c56729', fontSize: '30px' }} />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {!dataFetched && (
            <p>
              <Empty />
            </p>
          )}
          <Grid container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              page={searchVoucher.page}
              onChange={(_, page) => handelOnchangePage(page)}
              count={totalPages}
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
