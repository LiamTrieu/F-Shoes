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
} from '@mui/material'
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
import CustomizedDialogs from './AdDialogOrderTimeLine'

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

  // Hàm để xác định nội dung của nút dựa trên trạng thái
  const getButtonText = () => {
    if (billDetail.status === 1) {
      return 'Xác nhận đơn hàng'
    } else if (billDetail.status === 2) {
      return 'Xác nhận giao hàng'
    } else if (billDetail.status === 4) {
      return 'Hoàn thành'
    } else {
      return 'Cập nhật'
    }
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
              {billDetail.status !== 7 ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ textTransform: 'none', marginRight: '10px' }}>
                    {getButtonText()}
                  </Button>
                </>
              ) : null}{' '}
            </Grid>
          )}

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: 'none', marginRight: '50px' }}
              onClick={() => setOpenDialog(true)} // Mở dialog khi bấm nút
            >
              Chi tiết
            </Button>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <CustomizedDialogs
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                listOrderTimeLine={listOrderTimeLine}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <h3>Thông tin đơn hàng</h3>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
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
              {billDetail?.phoneNumber}
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
              <label>Email:</label>
              {billDetail?.email}
            </Grid>
          </Grid>
        )}
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <h3>Lịch sử thanh toán</h3>
        {loadingTransaction ? (
          <div>Loading...</div>
        ) : (
          <AdBillTransaction listTransaction={listTransaction} />
        )}
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <h3>Hoá đơn chi tiết</h3>
        {loadingListBillDetail ? (
          <div>Loading BillDetail...</div>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead></TableHead>
              <TableBody>
                {listBillDetail.map((row, index) => (
                  <TableRow key={'billDetail' + row.id} sx={tableRowStyle}>
                    <TableCell align="center">
                      <img
                        src="https://down-vn.img.susercontent.com/file/vn-11134201-23020-f4064ep51mnv9c"
                        alt="Mô tả hình ảnh (nếu cần)"
                        width={'100px'}
                      />
                    </TableCell>
                    <TableCell>
                      {row.productDetail.product.name} <br></br>
                      {row.price !== null ? formatCurrency(row.price) : 0} <br />
                      Size: {row.productDetail.size.size}
                      <br />x{row.quantity}
                    </TableCell>
                    <TableCell align="center">
                      {row.price !== null ? formatCurrency(row.price * row.quantity) : 0} <br />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ textTransform: 'none', marginRight: '50px' }}>
                        Cập nhật
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ textTransform: 'none', marginRight: '50px' }}>
                        Huỷ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  )
}
