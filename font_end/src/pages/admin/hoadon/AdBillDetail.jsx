import '../hoadon/hoaDonStyle.css'
import {
  Paper,
  Grid,
  Button,
  Chip,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import React, { useState, useEffect } from 'react'
import hoaDonApi from '../../../api/admin/hoadon/hoaDonApi'
import { getStatus } from '../../../services/constants/statusHoaDon'
import { useParams } from 'react-router-dom'
import lichSuGiaoDichApi from '../../../api/admin/hoadon/lichSuGiaoDich'
import AdBillTransaction from './AdBillTransaction'
import lichSuHoaDonApi from '../../../api/admin/hoadon/lichSuHoaDonApi'
import AdTimeLineBill from './AdTimeLineBill'
import hoaDonChiTietApi from '../../../api/admin/hoadon/hoaDonChiTiet'
import { formatCurrency } from '../../../services/common/formatCurrency '
import BillHistoryDialog from './AdDialogOrderTimeLine'
import { getStatusStyle } from './getStatusStyle'

import Empty from '../../../components/Empty'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { toast } from 'react-toastify'
import DialogAddUpdate from '../../../components/DialogAddUpdate'

const listHis = [{ link: '/admin/bill', name: 'Hoá đơn' }]

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
  const [listOrderTimeLine, setListOrderTimeLine] = useState([])
  const [loadingTimeline, setLoadingTimeline] = useState(true)
  const [listTransaction, setListTransaction] = useState([])
  const [loadingTransaction, setLoadinTransaction] = useState(true)
  const [listBillDetail, setListBillDetail] = useState([])
  const [loadingListBillDetail, setLoadingListBillDetail] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  // const [totalMoneyProduct, setTotalMoneyProduct] = useState(0)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [openModalConfirmDelive, setOpenModalConfirmDelive] = useState(false)
  const [isUpdateBill, setIsUpdateBill] = useState(false)

  useEffect(() => {
    if (!billDetail) {
      getOneBill(id)
      getBillHistoryByIdBill(id)
      getTransactionByIdBill(id)
      getBillDetailByIdBill(id)
    }

    if (isUpdateBill) {
      getOneBill(id)
      getBillHistoryByIdBill(id)
      getTransactionByIdBill(id)
      getBillDetailByIdBill(id)
      setIsUpdateBill(false)
    }
  }, [id, billDetail, isUpdateBill])

  const genBtnHandleBill = (billDetail, listTransaction) => {
    if (listTransaction.length > 0) {
      if (billDetail.status >= 2 && billDetail.status < 7) {
        return (
          <Button
            variant="contained"
            color="cam"
            style={{ textTransform: 'none' }}
            onClick={() => setOpenModalConfirm(true)}
            sx={{ minWidth: '30px' }}>
            Hoàn thành
          </Button>
        )
      }
    }
    //billDetail.type: giao hàng
    if (billDetail.type) {
      switch (billDetail.status) {
        case 1:
          return (
            <Button
              variant="contained"
              color="cam"
              style={{ textTransform: 'none' }}
              onClick={() => setOpenModalConfirm(true)}
              sx={{ minWidth: '30px' }}>
              Xác nhận đơn hàng
            </Button>
          )
        case 2:
          return (
            <Button
              variant="contained"
              color="cam"
              style={{ textTransform: 'none' }}
              onClick={() => setOpenModalConfirmDelive(true)}
              sx={{ minWidth: '30px' }}>
              Xác nhận giao hàng
            </Button>
          )
        default:
          return null
      }
    } else {
      switch (billDetail.status) {
        case 2:
          return null
        default:
          return null
      }
    }
  }

  function ModalConfirmBill({ open, setOpen, billDetail, listHDCT }) {
    const [ghiChu, setGhiChu] = useState('')

    const handleConfirmOrder = () => {
      const updatedBillConfirmRequest = {
        idVoucher: null,
        idCustomer: null,
        fullName: billDetail.fullName,
        phoneNumber: billDetail.phoneNumber,
        address: billDetail.address,
        note: billDetail.note,
        status: 2,
        noteBillHistory: ghiChu,
        idStaff: null,
        listHdctReq: listHDCT.map((item) => ({
          idProductDetail: item.productDetailId,
          idBill: billDetail.id,
          quanity: item.quantity,
          price: item.price,
          status: 1,
        })),
      }
      hoaDonApi
        .confirmBill(billDetail.id, updatedBillConfirmRequest)
        .then((response) => {
          toast.success('Đã xác nhận hoá đơn', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setIsUpdateBill(true)
          setOpen(false)
        })
        .catch((error) => {
          console.error('Lỗi xác nhận đơn hàng', error)
        })
    }
    return (
      <DialogAddUpdate
        open={open}
        setOpen={setOpen}
        title={'Xác nhận hoá đơn'}
        buttonSubmit={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained"
            onClick={handleConfirmOrder}>
            Lưu
          </Button>
        }>
        <div className="san-pham">
          <TextField
            color="cam"
            className="search-field"
            size="small"
            fullWidth
            label="Ghi chú"
            multiline
            rows={4}
            value={ghiChu}
            onChange={(e) => setGhiChu(e.target.value)}
          />
        </div>
      </DialogAddUpdate>
    )
  }

  function ModalConfirmDeliver({ open, setOpen, billDetail }) {
    const [ghiChu, setGhiChu] = useState('')

    const updateStatusBillRequest = {
      noteBillHistory: ghiChu,
      idStaff: '099b241f-f2cf-448f-909d-55f288dfea5b',
      statusBill: 3,
    }
    const handleConfirmDeliver = (id, updateStatusBillRequest) => {
      hoaDonApi
        .updateStatusBill(id, updateStatusBillRequest)
        .then((response) => {
          console.log(response.data.data)
          toast.success('Xác nhận giao hàng thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setIsUpdateBill(true)
          setOpen(false)
        })
        .catch((error) => {
          toast.error('Xác nhận giao hàng không thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          console.error('Lỗi khi gửi yêu cầu API update status bill: ', error)
        })
    }

    return (
      <DialogAddUpdate
        open={open}
        setOpen={setOpen}
        title={'Xác nhận gioa hàng'}
        buttonSubmit={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained"
            onClick={() => handleConfirmDeliver(billDetail.id, updateStatusBillRequest)}>
            Lưu
          </Button>
        }>
        <div className="san-pham">
          <TextField
            color="cam"
            className="search-field"
            size="small"
            fullWidth
            label="Ghi chú"
            multiline
            rows={4}
            value={ghiChu}
            onChange={(e) => setGhiChu(e.target.value)}
          />
        </div>
      </DialogAddUpdate>
    )
  }

  const getOneBill = (id) => {
    hoaDonApi
      .getOne(id)
      .then((response) => {
        setBillDetail(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get bill: ', error)
        setLoading(false)
      })
  }

  const getBillHistoryByIdBill = (id) => {
    setLoadingTimeline(true)
    lichSuHoaDonApi
      .getByIdBill(id)
      .then((response) => {
        setListOrderTimeLine(response.data.data)
        setLoadingTimeline(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get orderTimeline: ', error)
        setLoadingTimeline(false)
      })
  }

  const getTransactionByIdBill = (id) => {
    setLoadinTransaction(true)
    lichSuGiaoDichApi
      .getByIdBill(id)
      .then((response) => {
        setListTransaction(response.data.data)
        setLoadinTransaction(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get orderTimeline: ', error)
        setLoadinTransaction(false)
      })
  }

  const getBillDetailByIdBill = (id) => {
    setLoadingListBillDetail(true)
    hoaDonChiTietApi
      .getByIdBill(id)
      .then((response) => {
        setListBillDetail(response.data.data)
        setLoadingListBillDetail(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get orderTimeline: ', error)
        setLoadingListBillDetail(false)
      })
  }

  return (
    <div className="hoa-don">
      <ModalConfirmBill
        setOpen={setOpenModalConfirm}
        open={openModalConfirm}
        billDetail={billDetail}
        listHDCT={listBillDetail}
      />
      <ModalConfirmDeliver
        setOpen={setOpenModalConfirmDelive}
        open={openModalConfirmDelive}
        billDetail={billDetail}
      />
      <BreadcrumbsCustom listLink={listHis} nameHere={'Chi tiết hoá đơn'} />
      <Paper elevation={3} sx={{ mt: 2, mb: 2, paddingLeft: 1 }}>
        <h3>Lịch sử đơn hàng</h3>
        {/* timeline */}
        {loadingTimeline ? (
          <div>Loading...</div>
        ) : (
          <AdTimeLineBill key="unique-key" orderTimeLine={listOrderTimeLine} />
        )}
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          {!loading && genBtnHandleBill(billDetail, listTransaction)}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Button
              variant="contained"
              color="cam"
              style={{ textTransform: 'none' }}
              onClick={() => setOpenDialog(true)}>
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
          </Stack>
        </Grid>
      </Paper>
      {/* Thông tin đơn hàng */}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <h3>Thông tin đơn hàng</h3>
          <Button variant="contained" color="cam" style={{ textTransform: 'none' }}>
            Cập nhật
          </Button>
        </Stack>
        <hr />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Grid container spacing={2} className="billDetailInfo">
              <Grid item xs={12} sm={4}>
                <Typography>
                  <label>Mã: </label>
                  {billDetail?.code}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  <label>Tên khách hàng: </label>
                  {billDetail?.fullName ? billDetail.fullName : 'Khách lẻ'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="p">
                  <Stack direction="row" spacing={1}>
                    <label>Trạng thái: </label>
                    <Chip
                      className={getStatusStyle(billDetail.status)}
                      label={getStatus(billDetail.status)}
                      size="small"
                    />
                  </Stack>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  <label>Sđt người nhận: </label>
                  {billDetail?.recipientPhoneNumber ? billDetail.recipientPhoneNumber : ''}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="p" fontFamily={'Inter'}>
                  <Stack direction="row" spacing={1}>
                    <label>Loại:</label>
                    {billDetail.type ? (
                      <Chip className="chip-giao-hang" label=" Giao hàng" size="small" />
                    ) : (
                      <Chip className="chip-tai-quay" label=" Tại quầy" size="small" />
                    )}
                  </Stack>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  <label>Tên người nhận: </label>
                  {billDetail?.recipientName ? billDetail.recipientName : ''}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
      </Paper>
      {/* Lịch sử thanh toán */}
      {loadingTransaction ? (
        <div>Loading...</div>
      ) : listTransaction.length <= 0 ? (
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <h3>Lịch sửa thanh toán</h3>
            <Button variant="contained" color="cam" style={{ textTransform: 'none' }}>
              Xác nhận thanh toán
            </Button>
          </Stack>
          <hr />
          <Empty />
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <h3>Lịch sửa thanh toán</h3>
          </Stack>
          <hr />
          <AdBillTransaction listTransaction={listTransaction} />
        </Paper>
      )}
      {/* Hoá đơn chi tiết */}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, paddingLeft: 2 }}>
        <h3>Hoá đơn chi tiết</h3>
        {loadingListBillDetail ? (
          <div>Loading BillDetail...</div>
        ) : (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer
                  sx={{ maxHeight: 300, marginBottom: 5 }}
                  className="table-container-custom-scrollbar">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                    color: 'gray',
                                    textDecorationColor: 'gray',
                                    textDecorationLine: 'line-through',
                                  }}>
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
                            {row.price !== null ? formatCurrency(row.price * row.quantity) : 0}
                            <br />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
        )}
      </Paper>
    </div>
  )
}
