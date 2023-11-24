import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import './Order.css'
import ClientAccountApi from '../../../api/client/clientAccount'
import { getStatus } from '../../../services/constants/statusHoaDon'
import { TbEyeEdit } from 'react-icons/tb'
import dayjs from 'dayjs'
import { getStatusStyle } from '../../admin/hoadon/getStatusStyle'
import { getStatusProfile } from '../../../services/constants/statusHoaDonProfile'
import { formatCurrency } from '../../../services/common/formatCurrency '
import ModalReturn from './ModalReturn'

import CloseIcon from '@mui/icons-material/Close'
import clientReturnApi from '../../../api/client/clientReturnApi'
import ReturnDetailClient from './ReturnDetailClient'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

var stompClient = null
export default function Order() {
  const [getBill, setGetBill] = useState([])
  const [getBillTable, setGetBillTable] = useState([])
  const [getBillReturn, setGetBillReturn] = useState([])
  const [valueTabHD, setValueTabHD] = React.useState('all')
  const listSttHD = [0, 1, 2, 3, 7]
  const [filter, setFilter] = useState({
    status: '',
    code: null,
  })
  const [openReturn, setOpenReturn] = useState(false)

  const handleChangeTab = (event, newValue) => {
    setValueTabHD(newValue)
    if (newValue !== 'traHang') {
      const updatedFilter = { ...filter, status: newValue === 'all' ? '' : newValue }
      setFilter(updatedFilter)
    }
  }

  useEffect(() => {
    ClientAccountApi.getAllBill(filter).then((response) => {
      setGetBill(response.data.data)
    })
  }, [filter])

  const fetchAllBillTable = (filter) => {
    ClientAccountApi.getAllBillTable(filter).then((response) => {
      setGetBillTable(response.data.data)
    })
  }

  useEffect(() => {
    fetchAllBillTable(filter)
  }, [filter])

  useEffect(() => {
    ClientAccountApi.getAllBillReturn().then((response) => {
      setGetBillReturn(response.data.data)
    })
  }, [])

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/shoes-websocket-endpoint')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, onConnect)

    return () => {
      stompClient.disconnect()
    }
  }, [getBillTable])

  const onConnect = () => {
    stompClient.subscribe('/topic/real-time-huy-don-bill-my-profile', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        updateRealTimeBillMyProdile(data)
      }
    })
    stompClient.subscribe('/topic/real-time-xac-nhan-bill-my-profile', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        updateRealTimeBillMyProdile(data)
      }
    })
    stompClient.subscribe('/topic/real-time-update-status-bill-my-profile', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        updateRealTimeBillMyProdile(data)
      }
    })
  }

  function updateRealTimeBillMyProdile(data) {
    const preBill = [...getBillTable]
    const index = preBill.findIndex((bill) => bill.id === data.id)
    if (index !== -1) {
      preBill[index] = data
      setGetBillTable(preBill)
    }
  }

  const [returnSelect, setReturnSelect] = useState(null)
  const [openReturnDetail, setOpenReturnDetail] = useState(false)

  function TraHang() {
    const [returns, setReturns] = useState([])
    const [filter, setFilter] = useState({ page: 0, text: '', status: null })
    const [total, setTotal] = useState(1)

    useEffect(() => {
      clientReturnApi.getReturn(filter).then((result) => {
        setTotal(result.data.data.totalPages)
        setReturns(result.data.data.data)
      })
    }, [filter])

    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
          style={{ marginBottom: '20px', marginTop: '20px' }}>
          <TextField
            onChange={(e) => {
              setFilter({ ...filter, text: e.target.value })
            }}
            fullWidth
            id="hd-input-search"
            className="search-field"
            size="small"
            color="cam"
            placeholder="Tìm kiếm mã trả hàng, mã hóa đơn"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="cam" />
                </InputAdornment>
              ),
            }}
          />
          <Select
            sx={{ width: '200px' }}
            displayEmpty
            size="small"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <MenuItem value={null}>Tất cả</MenuItem>
            <MenuItem value={0}>Chờ phê duyệt</MenuItem>
            <MenuItem value={3}>Đang xử lý</MenuItem>
            <MenuItem value={1}>Hoàn thành</MenuItem>
            <MenuItem value={2}>Đã hủy</MenuItem>
          </Select>
        </Stack>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width={'5%'}>
                <b>STT</b>
              </TableCell>
              <TableCell>
                <b>Mã trả hàng</b>
              </TableCell>
              <TableCell>
                <b>Mã hóa đơn</b>
              </TableCell>
              <TableCell>
                <b>Thời gian</b>
              </TableCell>
              <TableCell>
                <b>Số tiền</b>
              </TableCell>
              <TableCell>
                <b>Trạng thái</b>
              </TableCell>
              <TableCell align="center">
                <b>Chức năng</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {returns.map((data) => {
              return (
                <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {data.stt}
                  </TableCell>
                  <TableCell>
                    <b>{data.code}</b>
                  </TableCell>
                  <TableCell>
                    <Link to={`/profile/get-by-idBill/${data.idBill}`}>{data.codeBill}</Link>
                  </TableCell>
                  <TableCell>{dayjs(data.date).format('DD-MM-YYYY HH:mm')}</TableCell>
                  <TableCell>
                    <Chip size="small" label={formatCurrency(data.total)} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      className={
                        data.status === 0
                          ? 'chip-cho'
                          : data.status === 1
                          ? 'chip-hoat-dong'
                          : data.status === 2
                          ? 'chip-khong-hoat-dong'
                          : 'chip-dang'
                      }
                      size="small"
                      label={
                        data.status === 0
                          ? 'Chờ phê duyệt'
                          : data.status === 1
                          ? 'Hoàn thành'
                          : data.status === 2
                          ? 'Đã hủy'
                          : 'Đang xử lý'
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="cam"
                      onClick={() => {
                        setOpenReturnDetail(true)
                        setReturnSelect(data.id)
                      }}>
                      <TbEyeEdit fontSize={'25px'} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Stack mt={2} direction="row" justifyContent="center" alignItems="center" spacing={0}>
          <Pagination
            variant="outlined"
            color="cam"
            count={total}
            page={filter.page + 1}
            onChange={(_, value) => {
              setFilter({ ...filter, page: value - 1 })
            }}
          />
        </Stack>
      </>
    )
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '600px',
    minHeight: '600px',
    bgcolor: 'background.paper',
    borderRadius: '5px',
  }

  const [billSelect, setBillSelect] = useState(null)

  return (
    <>
      <div className="order">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'pink' }}>
          <Tabs value={valueTabHD} onChange={handleChangeTab} className="tabSttHD">
            <Tab label={'Tất cả'} key={'tabSttHd all'} value={'all'}></Tab>
            {listSttHD.map((row, i) => (
              <Tab label={getStatusProfile(row)} key={'tabSttHd' + i} value={row}></Tab>
            ))}
            <Tab label={'Trả hàng'} key={'traHang'} value={'traHang'}></Tab>
          </Tabs>
        </Box>
        {valueTabHD !== 'traHang' ? (
          <>
            <TextField
              sx={{
                width: '100%',
                marginTop: '20px',
                border: 'none',
                backgroundColor: 'white',
                marginBottom: '20px',
              }}
              placeholder="Tìm kiếm theo mã hóa đơn"
              size="small"
              onChange={(e) => setFilter({ ...filter, code: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="cam" />
                  </InputAdornment>
                ),
              }}
            />

            <div style={{ maxHeight: '500px', overflow: 'auto' }}>
              <Divider />
              {/* {getBill.map((item, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={2} style={{ marginTop: '5px', marginBottom: '20px' }}>
                <Grid item xs={2}>
                  <div style={{ width: '90px', height: '90px', backgroundColor: 'black' }}>
                    <img src={item.url} alt="error" style={{ width: '100%', height: '100%' }} />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" fontFamily={'monospace'} fontWeight={'bolder'}>
                    {item.nameProduct + ' ' + item.material + ' ' + item.sole} "{item.color}"
                  </Typography>
                  <Typography>
                    Phân loại hàng: {item.category} - {item.size}
                  </Typography>
                  <Typography>X{item.quantity}</Typography>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <span>
                      {item.price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <Link to={`/profile/get-by-idBill/${item.id}`}>
                    <Tooltip title="Xem chi tiết đơn hàng">
                      <IconButton sx={{ marginLeft: '30px' }} color="cam">
                        <TbEyeEdit />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Grid>
              </Grid>

              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))} */}
              {getBillTable.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2} style={{ marginTop: '5px', paddingBottom: '20px' }}>
                    <Grid item xs={12}>
                      <Paper elevation={3}>
                        <div
                          style={{
                            height: '250px',
                            backgroundColor: 'white',
                          }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}>
                            <span style={{ paddingTop: '20px', paddingLeft: '20px' }}>
                              {item.code}
                            </span>
                            <div style={{ paddingTop: '20px', paddingRight: '20px' }}>
                              <Chip
                                className={getStatusStyle(item.status)}
                                label={getStatus(item.status)}
                                size="small"
                              />
                            </div>
                          </Stack>

                          <Divider
                            sx={{ height: '1px', backgroundColor: 'black', marginTop: '20px' }}
                          />

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}>
                            <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
                              <Typography style={{ marginBottom: '20px' }}>
                                Ngày đặt hàng: {dayjs(item.createdAt).format('DD/MM/YYYY')}
                              </Typography>
                              {item.completeDate ? (
                                <Typography>
                                  Ngày Nhận hàng: {dayjs(item.completeDate).format('DD/MM/YYYY')}
                                </Typography>
                              ) : (
                                <Typography>
                                  Ngày dự kiến nhận:{' '}
                                  {dayjs(item.desiredReceiptDate).format('DD/MM/YYYY')}
                                </Typography>
                              )}
                              <Button
                                sx={{ marginTop: '30px' }}
                                component={Link}
                                to={`/profile/get-by-idBill/${item.id}`}
                                variant="outlined"
                                color="cam">
                                Thông tin chi tiết
                              </Button>
                            </div>
                            <div style={{ paddingTop: '20px', paddingRight: '20px' }}>
                              <Typography style={{ marginBottom: '20px' }}>
                                Tiền ship: {formatPrice(item.moneyShip)}
                              </Typography>
                              <Typography>Tổng tiền: {formatPrice(item.moneyAfter)}</Typography>
                              {item.status === 7 && getBillReturn.includes(item.id) && (
                                <Button
                                  onClick={() => {
                                    setOpenReturn(true)
                                    setBillSelect(item.id)
                                  }}
                                  sx={{ marginTop: '30px' }}
                                  variant="outlined"
                                  color="cam">
                                  Trả hàng
                                </Button>
                              )}
                            </div>
                          </Stack>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </div>
            <Modal
              open={openReturn}
              onClose={() => {
                setOpenReturn(false)
              }}>
              <Box sx={style}>
                <IconButton
                  onClick={() => {
                    setOpenReturn(false)
                  }}
                  aria-label="close"
                  color="error"
                  style={{
                    float: 'right',
                  }}>
                  <CloseIcon />
                </IconButton>
                {openReturn && billSelect && (
                  <ModalReturn id={billSelect} setTab={setValueTabHD} setOpen={setOpenReturn} />
                )}
              </Box>
            </Modal>
          </>
        ) : (
          <>
            <Modal
              open={openReturnDetail}
              onClose={() => {
                setOpenReturn(false)
              }}>
              <Box sx={style}>
                <IconButton
                  onClick={() => {
                    setOpenReturnDetail(false)
                  }}
                  aria-label="close"
                  color="error"
                  style={{
                    float: 'right',
                  }}>
                  <CloseIcon />
                </IconButton>
                {openReturnDetail && returnSelect && (
                  <ReturnDetailClient
                    id={returnSelect}
                    setOpen={setOpenReturnDetail}
                    setTab={setValueTabHD}
                  />
                )}
              </Box>
            </Modal>
            <TraHang />
          </>
        )}
      </div>
    </>
  )
}
