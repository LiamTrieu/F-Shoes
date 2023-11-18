import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import React, { useEffect, useState } from 'react'
import { formatCurrency } from '../../../services/common/formatCurrency '
import ClientAccountApi from '../../../api/client/clientAccount'
import { useParams } from 'react-router-dom'
import TimeLine from '../../admin/hoadon/TimeLine'
import './Order.css'
import ModalUpdateAddressBillClient from './ModalUpdateAddressBillClient'
import { CiCircleRemove } from 'react-icons/ci'
import ClientModalThemSP from './ModalThemSPBillClient'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import clientCartApi from '../../../api/client/clientCartApi'
import DialogAddUpdate from '../../../components/DialogAddUpdate'

export default function OrderDetail() {
  const { id } = useParams()
  const [billDetail, setBillDetail] = useState([])
  const [listOrderTimeLine, setListOrderTimeLine] = useState([])
  const [loadingTimeline, setLoadingTimeline] = useState(true)
  const [billClient, setBillCilent] = useState()
  const [openModalUpdateAdd, setopenModalUpdateAdd] = useState(false)
  const [openModalThemSP, setOpenModalThemSP] = useState(false)
  const [listTransaction, setListTransaction] = useState([])
  const [openModalCancelBill, setOpenModalCancelBill] = useState(false)

  const getBillHistoryByIdBill = (id) => {
    setLoadingTimeline(true)
    ClientAccountApi.getBillHistoryByIdBill(id)
      .then((response) => {
        setListOrderTimeLine(response.data.data)
        setLoadingTimeline(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get orderTimeline: ', error)
        setLoadingTimeline(false)
      })
  }

  const getBillByIdBill = (id) => {
    ClientAccountApi.getBillDetailByIdBill(id).then((response) => {
      setBillDetail(response.data.data)
      console.log('data')
      console.log(response.data.data)
    })
  }

  const getTransactionByIdbill = (id) => {
    ClientAccountApi.getTransactionByIdBill(id).then((response) => {
      setListTransaction(response.data.data)
    })
  }

  const handleDecrementQuantity = (row, index) => {
    const updatedList = billDetail.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity - 1 } : item,
    )
    const updatedRow = { ...row, quantity: row.quantity - 1 }
    updatedList[index] = updatedRow
    setBillDetail(updatedList)
    const billDetailRequest = {
      productDetailId: updatedRow.productDetailId,
      idBill: billClient.id,
      quantity: updatedRow.quantity,
      price: updatedRow.price,
      status: 0,
    }
    handleChangeQuanity(billClient.id, billDetailRequest)
  }

  const handleIncrementQuantity = (row, index) => {
    const updatedList = billDetail.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item,
    )
    const updatedRow = { ...row, quantity: row.quantity + 1 }
    updatedList[index] = updatedRow
    setBillDetail(updatedList)
    const billDetailRequest = {
      productDetailId: updatedRow.productDetailId,
      idBill: billClient.id,
      quantity: updatedRow.quantity,
      price: updatedRow.price,
      status: 0,
    }
    handleChangeQuanity(billClient.id, billDetailRequest)
  }

  const handleChangeQuanity = (id, selectedProduct) => {
    const billDetailReq = {
      productDetailId: selectedProduct.productDetailId,
      idBill: id,
      quantity: selectedProduct.quantity,
      price: selectedProduct.price,
      status: 0,
    }
    ClientAccountApi.saveBillDetail(billDetailReq)
      .then((response) => {
        getBillByIdBill(id)
        toast.success('Đã thay đổi số lượng sản phẩm', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((error) => {
        toast.error('Đã xảy ra lỗi', {
          position: toast.POSITION.TOP_RIGHT,
        })
        console.error('Lỗi khi gửi yêu cầu APIsaveBillDetail: ', error)
      })
  }

  const handleTextFieldQuantityChange = (row, index, newValue) => {
    let soLuong
    if (!isNaN(newValue) && newValue > 0) {
      soLuong = newValue
    } else {
      soLuong = 1
    }
    const updatedList = billDetail.map((item, i) =>
      i === index ? { ...item, quantity: parseInt(soLuong, 10) || 0 } : item,
    )
    setBillDetail(updatedList)
    const billDetailRequest = {
      productDetailId: row.productDetailId,
      idBill: billClient.id,
      quantity: soLuong,
      price: row.price,
      status: 0,
    }
    handleChangeQuanity(billClient.id, billDetailRequest)
  }

  const getBillClient = (id) => {
    setLoadingTimeline(true)
    ClientAccountApi.getBillClient(id)
      .then((response) => {
        setBillCilent(response.data.data)
        console.log('data bill Client')
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get bill client: ', error)
        setLoadingTimeline(false)
      })
  }

  const handleTextFieldQuanityFocus = (event, index) => {
    if (!isNaN(event.target.value)) {
      if (event.target.value !== '' && event.target.value !== '0') {
        const updatedList = billDetail.map((item, i) =>
          i === index ? { ...item, quantity: 1 } : item,
        )
        setBillDetail(updatedList)
      }
    }
  }

  const deleteBillDetail = (id) => {
    ClientAccountApi.deleteBillDetail(id)
      .then((response) => {
        getBillByIdBill(id)
        toast.success('Đã xoá sản phẩm khỏi giỏ hàng', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch((error) => {
        toast.error('Đã xảy ra lỗi', {
          position: toast.POSITION.TOP_RIGHT,
        })
        console.error('Lỗi khi gửi yêu cầu xoá billDetail: ', error)
      })
  }
  const handleDeleteSPConfirmation = (hdct) => {
    confirmSatus('Xác nhận xoá', 'Bạn có chắc chắn muốn xoá sản phẩm này?').then((result) => {
      if (result.isConfirmed) {
        deleteBillDetail(hdct.id)
      }
    })
  }

  function ModalCancelBill({ open, setOpen, billDetail }) {
    const [ghiChu, setGhiChu] = useState('')

    const updateStatusBillRequest = {
      noteBillHistory: ghiChu,
    }
    const handlecancelBill = (id, updateStatusBillRequest) => {
      if (billClient.status === 1) {
        ClientAccountApi.cancelBill(id, updateStatusBillRequest)
          .then((response) => {
            toast.success('Đã huỷ đơn hàng', {
              position: toast.POSITION.TOP_RIGHT,
            })
            setOpen(false)
          })
          .catch((error) => {
            toast.error('Đã xảy ra lỗi', {
              position: toast.POSITION.TOP_RIGHT,
            })
            console.error('Lỗi khi gửi yêu cầu API huỷ đơn hàng: ', error)
          })
      }
    }

    return (
      <DialogAddUpdate
        open={open}
        setOpen={setOpen}
        title={'Huỷ đơn hàng'}
        buttonSubmit={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained"
            onClick={() => handlecancelBill(billDetail.id, updateStatusBillRequest)}>
            Lưu
          </Button>
        }>
        <div>
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

  useEffect(() => {
    getBillByIdBill(id)
    getBillHistoryByIdBill(id)
    getBillClient(id)
    getTransactionByIdbill(id)
  }, [id])

  return (
    <div>
      <ModalUpdateAddressBillClient
        open={openModalUpdateAdd}
        setOPen={setopenModalUpdateAdd}
        billDetail={billClient}
        listBillDetail={billDetail}
      />
      <ClientModalThemSP
        open={openModalThemSP}
        setOPen={setOpenModalThemSP}
        billDetail={billClient ? billClient : null}
        idBill={billClient ? billClient.id : null}
      />
      <ModalCancelBill
        setOpen={setOpenModalCancelBill}
        open={openModalCancelBill}
        billDetail={billClient}
      />
      <Container maxWidth="lg">
        <Paper elevation={3} className="time-line" sx={{ mt: 2, mb: 2, paddingLeft: 1 }}>
          <h3>Lịch sử đơn hàng</h3>
          {loadingTimeline ? <div>Loading...</div> : <TimeLine orderTimeLine={listOrderTimeLine} />}
        </Paper>

        <Paper style={{ marginBottom: '30px' }}>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {billDetail.length > 0 && (
                  <div>
                    <Typography variant="h5">ĐỊA CHỈ NHẬN HÀNG</Typography>
                    <Typography style={{ marginTop: '30px' }}>
                      {billDetail[0].nameCustomer}
                    </Typography>
                    <Typography style={{ marginTop: '10px', fontSize: '14px' }}>
                      {billDetail[0].phoneNumberCustomer}
                    </Typography>
                    <Typography style={{ fontSize: '14px' }}>{billDetail[0].address}</Typography>
                  </div>
                )}
              </Grid>
              <Grid item xs={4}>
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item xs={12}>
                    {billClient && billClient.status === 1 && listTransaction.length < 1 && (
                      <Button
                        variant="outlined"
                        style={{ minWidth: '30%', float: 'right', marginTop: '20px' }}
                        onClick={() => setopenModalUpdateAdd(true)}>
                        Cập nhật
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    {billClient && billClient.status === 1 && listTransaction.length < 1 && (
                      <Button
                        variant="contained"
                        className="them-moi"
                        color="error"
                        style={{ minWidth: '30%', float: 'right' }}
                        onClick={() => setOpenModalCancelBill(true)}>
                        Huỷ đơn
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <Paper style={{ marginBottom: '30px' }}>
          {billClient && billClient.status === 1 && listTransaction.length < 1 && (
            <Stack sx={{ float: 'right' }}>
              <Button
                variant="outlined"
                className="them-moi"
                color="cam"
                style={{ marginRight: '5px' }}
                onClick={() => setOpenModalThemSP(true)}>
                Thêm sản phẩm
              </Button>
            </Stack>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer sx={{ maxHeight: 300, marginBottom: 5 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {billDetail.map((row, index) => (
                      <TableRow key={row.id + index}>
                        <TableCell>
                          <img src={row.url} alt="" width={'100px'} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" fontFamily={'monospace'} fontWeight={'bolder'}>
                            {row.productName + ' ' + row.material + ' ' + row.sole} "{row.color}"
                          </Typography>
                          <Typography>
                            Phân loại hàng: {row.category} - {row.size}
                          </Typography>
                          <Typography>X{row.quantity}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            width={'65px'}
                            display="flex"
                            alignItems="center"
                            sx={{ border: '1px solid gray', borderRadius: '20px' }}
                            p={'3px'}>
                            <IconButton
                              sx={{ p: 0 }}
                              size="small"
                              onClick={() => handleDecrementQuantity(row, index)}
                              disabled={
                                (billClient && billClient.status > 1) || listTransaction.length > 0
                              }>
                              <RemoveIcon fontSize="1px" />
                            </IconButton>
                            <TextField
                              value={row.quantity}
                              inputProps={{ min: 1 }}
                              size="small"
                              sx={{
                                width: '30px',
                                '& input': { p: 0, textAlign: 'center' },
                                '& fieldset': {
                                  border: 'none',
                                },
                              }}
                              onChange={(e) =>
                                handleTextFieldQuantityChange(row, index, e.target.value)
                              }
                              disabled={
                                (billClient && billClient.status > 1) || listTransaction.length > 0
                              }
                            />

                            <IconButton
                              sx={{ p: 0 }}
                              size="small"
                              onClick={() => handleIncrementQuantity(row, index)}
                              disabled={
                                (billClient && billClient.status > 1) || listTransaction.length > 0
                              }>
                              <AddIcon fontSize="1px" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold', color: 'red' }}>
                          {row.price !== null ? formatCurrency(row.price * row.quantity) : 0}
                          <br />
                        </TableCell>
                        <TableCell>
                          {billClient &&
                            billClient.status === 1 &&
                            billDetail.length > 1 &&
                            listTransaction.length < 1 && (
                              <Tooltip title="Xoá sản phẩm">
                                <IconButton onClick={() => handleDeleteSPConfirmation(row)}>
                                  <CiCircleRemove />
                                </IconButton>
                              </Tooltip>
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Container maxWidth="lg">
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <div style={{ float: 'right' }}>Tổng tiền hàng:</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div style={{ float: 'right' }}>
                      {billClient ? formatCurrency(billClient.totalMoney) : formatCurrency(0)}
                    </div>
                  </Grid>
                  <Divider />
                  <Grid item xs={9}>
                    <div style={{ float: 'right' }}>Phí vận chuyển:</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div style={{ float: 'right' }}>
                      {billClient ? formatCurrency(billClient.moneyShip) : formatCurrency(0)}
                    </div>
                  </Grid>
                  <Divider />
                  <Grid item xs={9}>
                    <div style={{ float: 'right' }}>Giảm giá:</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div style={{ float: 'right' }}>
                      {billClient ? formatCurrency(billClient.moneyReduced) : formatCurrency(0)}
                    </div>
                  </Grid>
                  <Divider />
                  <Grid item xs={9}>
                    <div style={{ float: 'right' }}>Thành tiền:</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div
                      style={{ float: 'right', fontSize: '20px', color: 'red', fontWeight: 700 }}>
                      {billClient ? formatCurrency(billClient.moneyAfter) : formatCurrency(0)}
                    </div>
                  </Grid>
                  <Divider />
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}
