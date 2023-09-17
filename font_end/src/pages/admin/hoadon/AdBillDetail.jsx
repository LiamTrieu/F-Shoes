import {
  Paper,
  Grid,
  Button,
  Chip,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import React, { useState, useEffect } from 'react'
import hoaDonApi from '../../../api/admin/hoadon/hoaDonApi'
import { getStatus } from '../../../services/constants/statusHoaDon'
import { useParams } from 'react-router-dom'
//transaction
import lichSuGiaoDichApi from '../../../api/admin/hoadon/lichSuGiaoDich'
import AdBillTransaction from './AdBillTransaction'
//timeline
import lichSuHoaDonApi from '../../../api/admin/hoadon/lichSuHoaDonApi'
import AdTimeLineBill from './AdTimeLineBill'
import hoaDonChiTietApi from '../../../api/admin/hoadon/hoaDonChiTiet'
import { formatCurrency } from '../../../services/common/formatCurrency '
import BillHistoryDialog from './AdDialogOrderTimeLine'

export default function AdBillDetail() {
  const tableRowStyle = {
    '&:hover': {
      backgroundColor: 'lightgray',
      cursor: 'pointer',
    },
  }
  const { id } = useParams()
  const [billDetail, setBillDetail] = useState()
  const [loading, setLoading] = useState(true)
  //timeline
  const [listOrderTimeLine, setListOrderTimeLine] = useState([])
  const [loadingTimeline, setLoadingTimeline] = useState(true)
  //transaction
  const [listTransaction, setListTransaction] = useState([])
  const [loadingTransaction, setLoadinTransaction] = useState(true)
  // danh sách hoá đơn chi tiết
  const [listBillDetail, setListBillDetail] = useState([])
  const [loadingListBillDetail, setLoadingListBillDetail] = useState(true)
  const [openDialog, setOpenDialog] = useState(false) // Trạng thái của dialog transaction list
  // const [billConfirmRequest, setBillConfirmRequest] = useState()
  const [totalMoneyProduct, setTotalMoneyProduct] = useState(0)

  // Hàm để xác định nội dung của nút dựa trên trạng thái
  const getButtonText = (billDetail) => {
    let buttonText = null

    switch (billDetail.status) {
      case 1:
        buttonText = 'Xác nhận đơn hàng'
        break
      case 2:
        buttonText = 'Xác nhận giao hàng'
        break
      case 7:
      case 0:
        buttonText = null
        break
      default:
        buttonText = 'Hoàn thành'
    }

    return buttonText
  }

  useEffect(() => {
    if (!billDetail) {
      getOneBill(id)
      //timeline
      getBillHistoryByIdBill(id)
      //transaction
      getTransactionByIdBill(id)
      getBillDetailByIdBill(id)
    }
  }, [id, billDetail])

  const getOneBill = (id) => {
    hoaDonApi
      .getOne(id)
      .then((response) => {
        setBillDetail(response.data.data)
        setLoading(false) // Đã tải xong dữ liệu, ngừng hiển thị loader
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get page: ', error)
        setLoading(false) // Ngừng hiển thị loader nếu có lỗi
      })
  }
  //timeline
  const getBillHistoryByIdBill = (id) => {
    setLoadingTimeline(true) // Bắt đầu tải lịch sử đơn hàng - hiển thị load=))
    lichSuHoaDonApi
      .getByIdBill(id)
      .then((response) => {
        setListOrderTimeLine(response.data.data)
        setLoadingTimeline(false) // Đã tải xong lịch sử đơn hàng, ngừng hiển thị loader
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get orderTimeline: ', error)
        setLoadingTimeline(false) // Ngừng hiển thị loader nếu có lỗi
      })
  }
  //transaction
  const getTransactionByIdBill = (id) => {
    setLoadinTransaction(true) // Bắt đầu tải lịch sử đơn hàng - hiển thị load=))
    lichSuGiaoDichApi
      .getByIdBill(id)
      .then((response) => {
        setListTransaction(response.data.data)
        setLoadinTransaction(false) // Đã tải xong lịch sử đơn hàng, ngừng hiển thị loader
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get orderTimeline: ', error)
        setLoadinTransaction(false) // Ngừng hiển thị loader nếu có lỗi
      })
  }

  const getBillDetailByIdBill = (id) => {
    setLoadingListBillDetail(true) // Bắt đầu tải danh sách hoá đơn chi tiết - hiển thị load=))
    hoaDonChiTietApi
      .getByIdBill(id)
      .then((response) => {
        setListBillDetail(response.data.data)
        setLoadingListBillDetail(false) // tải xong danh sách hdct, ngừng hiển thị loader
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get orderTimeline: ', error)
        setLoadingListBillDetail(false) // Ngừng hiển thị loader nếu có lỗi
      })
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <h3>Lịch sử đơn hàng</h3>
        {/* timeline */}
        {loadingTimeline ? (
          <div>Loading...</div>
        ) : (
          <AdTimeLineBill key="unique-key" orderTimeLine={listOrderTimeLine} />
        )}
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Grid item>
              {billDetail.status !== 7 && billDetail.status !== 0 && (
                <Button
                  variant="contained"
                  color="cam"
                  style={{ textTransform: 'none', marginRight: '10px' }}>
                  {getButtonText(billDetail)}
                </Button>
              )}
            </Grid>
          )}

          <Grid item>
            <Button
              variant="contained"
              color="cam"
              style={{ textTransform: 'none', marginRight: '50px' }}
              onClick={() => setOpenDialog(true)} // Mở dialog khi bấm nút
            >
              Chi tiết
            </Button>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <BillHistoryDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                listOrderTimeLine={listOrderTimeLine}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
      {/* Thông tin đơn hàng */}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <h3>Thông tin đơn hàng</h3>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="cam"
              style={{ textTransform: 'none', marginRight: '50px' }}>
              Cập nhật
            </Button>
          </Grid>
        </Grid>
        <hr />

        {/*  Nếu đang tải dữ liệu, hiển thị loader hoặc thông báo loading */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label>Mã: </label>
              {billDetail?.code}
            </Grid>
            <Grid item xs={6}>
              <label>Tên khách hàng: </label>
              {billDetail?.fullName ? billDetail.fullName : 'Khách lẻ'}
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1}>
                <label>Trạng thái: </label>
                <Chip size="small" label={getStatus(billDetail.status)} color="primary" />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <label>Sđt người nhận: </label>
              {billDetail?.recipientPhoneNumber ? billDetail.recipientPhoneNumber : ''}
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1}>
                <label>Loại: </label>
                <Chip
                  size="small"
                  label={billDetail.type ? 'Giao hàng' : 'Tại Quầy'}
                  color="primary"
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <label>Tên người nhận: </label>
              {billDetail?.recipientName ? billDetail.recipientName : ''}
            </Grid>
          </Grid>
        )}
      </Paper>
      {/* Lịch sử thanh toán */}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <h3>Lịch sử thanh toán</h3>
        {loadingTransaction ? (
          <div>Loading...</div>
        ) : (
          <AdBillTransaction listTransaction={listTransaction} />
        )}
      </Paper>
      {/* Hoá đơn chi tiếts */}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <h3>Hoá đơn chi tiết</h3>
        {loadingListBillDetail ? (
          <div>Loading BillDetail...</div>
        ) : (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: 300, marginBottom: 5 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead></TableHead>
                    <TableBody>
                      {listBillDetail.map((row, index) => (
                        <TableRow key={'billDetail' + row.id} sx={tableRowStyle}>
                          <TableCell align="center">
                            <img src={row.productImg} alt="" width={'100px'} />
                          </TableCell>
                          <TableCell>
                            {row.productName} <br></br>
                            {row.price !== row.productPrice ? (
                              <span>
                                <del
                                  style={{
                                    color: 'black',
                                    textDecorationColor: 'black',
                                    textDecorationLine: 'line-through',
                                  }}>
                                  {' '}
                                  {formatCurrency(row.productPrice)}
                                </del>
                                <span
                                  style={{
                                    color: 'red',
                                    marginLeft: 15,
                                  }}>
                                  {formatCurrency(row.price)}
                                </span>
                              </span>
                            ) : (
                              ''
                            )}
                            <br />
                            Size: {row.size}
                            <br />x{row.quantity}
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              width={'65px'}
                              display="flex"
                              alignItems="center"
                              sx={{
                                border: '1px solid gray',
                                borderRadius: '20px',
                              }}
                              p={'3px'}>
                              <IconButton sx={{ p: 0 }} size="small">
                                <RemoveIcon fontSize="1px" />
                              </IconButton>
                              <TextField
                                value={row.quantity}
                                inputProps={{ min: 1 }}
                                size="small"
                                sx={{
                                  width: '30px ',
                                  '& input': { p: 0, textAlign: 'center' },
                                  '& fieldset': {
                                    border: 'none',
                                  },
                                }}
                              />
                              <IconButton size="small" sx={{ p: 0 }}>
                                <AddIcon fontSize="1px" />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            {row.price !== null ? formatCurrency(row.price * row.quantity) : 0}1
                            <br />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={7}></Grid>
              <Grid item xs={5} style={{ fontWeight: '800' }}>
                <b>Tiền hàng: 120000</b> <br />
                <br />
                <b>Phí vận chuyển: {formatCurrency(billDetail.moneyShip)}</b>
                <br />
                <br />
                <b>Giảm giá: {formatCurrency(billDetail.moneyReduced)}</b>
                <br />
                <br />
                <b>Tổng tiền: 120000</b>
              </Grid>
            </Grid>
          </div>
        )}
      </Paper>
    </div>
  )
}
