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
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  Divider,
  Tooltip,
  Switch,
  Modal,
  Toolbar,
  TableHead,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { HiOutlineReceiptRefund } from 'react-icons/hi'
import CloseIcon from '@mui/icons-material/Close'
import { CiCircleRemove } from 'react-icons/ci'
import React, { useState, useEffect, useCallback } from 'react'
import hoaDonApi from '../../../api/admin/hoadon/hoaDonApi'
import { getStatus } from '../../../services/constants/statusHoaDon'
import { useParams } from 'react-router-dom'
import lichSuGiaoDichApi from '../../../api/admin/hoadon/lichSuGiaoDich'
import AdBillTransaction from './AdBillTransaction'
import lichSuHoaDonApi from '../../../api/admin/hoadon/lichSuHoaDonApi'
import hoaDonChiTietApi from '../../../api/admin/hoadon/hoaDonChiTiet'
import BillHistoryDialog from './AdDialogOrderTimeLine'
import { getStatusStyle } from './getStatusStyle'

import Empty from '../../../components/Empty'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { toast } from 'react-toastify'
import DialogAddUpdate from '../../../components/DialogAddUpdate'
import TimeLine from './TimeLine'
import AdBillModalThemSP from './AdBillModalThemSP'
import confirmSatus from '../../../components/comfirmSwal'
import ModalAdBillUpdateAddress from './AdBillModalUpdateAddress'

const listHis = [{ link: '/admin/bill', name: 'Hoá đơn' }]

export default function AdBillDetail() {
  const { id } = useParams()
  const [billDetail, setBillDetail] = useState()
  const [loading, setLoading] = useState(true)
  const [listOrderTimeLine, setListOrderTimeLine] = useState([])
  const [loadingTimeline, setLoadingTimeline] = useState(true)
  const [listTransaction, setListTransaction] = useState([])
  const [loadingTransaction, setLoadinTransaction] = useState(true)
  const [listBillDetail, setListBillDetail] = useState([])
  const [listBillDetailUnactive, setListBillDetailUnactive] = useState([])
  const [lstBillDetailWaitingReturn, setLstBillDetailWaitingReturn] = useState([])
  const [loadingListBillDetail, setLoadingListBillDetail] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [moneyAfter, setMoneyAfter] = useState(0)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [openModalConfirmDelive, setOpenModalConfirmDelive] = useState(false)
  const [openModalConfirmPayment, setOpenModalConfirmPayment] = useState(false)
  const [openModalConfirmComplete, setOpenModalConfirmComplete] = useState(false)
  const [openModalReturnProduct, setOpenModalReturnProduct] = useState(false)
  const [openCodalConfirmReceived, setOpenModalConfirmReceived] = useState(false)
  const [openModalCancelBill, setOpenModalCancelBill] = useState(false)
  const [isUpdateBill, setIsUpdateBill] = useState(false)
  const [isShowBtnConfirmPayment, setIsShowBtnConfirmPayment] = useState(false)
  const [openModalThemSP, setOpenModalThemSP] = useState(false)
  const [billDetailReturn, setBillDetailReturn] = useState()

  const [openModalUpdateAdd, setopenModalUpdateAdd] = useState(false)

  const totalProductsCost = listBillDetail.reduce((total, row) => {
    return total + row.quantity * row.price
  }, 0)

  const handleIncrementQuantity = (row, index) => {
    if (row.quantity >= 0) {
      const updatedList = listBillDetail.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item,
      )
      const updatedRow = { ...row, quantity: row.quantity + 1 }
      updatedList[index] = updatedRow
      setListBillDetail(updatedList)
      incrementQuantity(row.id)
      if (billDetail.moneyReduced != null) {
        const newMoneyAfter =
          updatedList.reduce(
            (totalMoney, item) => billDetail.moneyShip + totalMoney + item.quantity * item.price,
            0,
          ) - billDetail.moneyReduced
        setMoneyAfter(newMoneyAfter + billDetail.moneyShip)
      } else {
        const newMoneyAfter = updatedList.reduce(
          (totalMoney, item) => billDetail.moneyShip + totalMoney + item.quantity * item.price,
          0,
        )
        setMoneyAfter(newMoneyAfter)
      }
    }
  }

  const handleDecrementQuantity = (row, index) => {
    if (row.quantity >= 0) {
      const updatedList = listBillDetail.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity - 1 } : item,
      )
      const updatedRow = { ...row, quantity: row.quantity - 1 }
      updatedList[index] = updatedRow
      setListBillDetail(updatedList)
      decrementQuantity(row.id)
      if (billDetail.moneyReduced != null) {
        const newMoneyAfter =
          updatedList.reduce(
            (totalMoney, item) => billDetail.moneyShip + totalMoney + item.quantity * item.price,
            0,
          ) - billDetail.moneyReduced
        setMoneyAfter(newMoneyAfter)
      } else {
        const newMoneyAfter = updatedList.reduce(
          (totalMoney, item) => billDetail.moneyShip + totalMoney + item.quantity * item.price,
          0,
        )
        setMoneyAfter(newMoneyAfter)
      }
    }
  }

  const handleTextFieldQuantityChange = (row, index, newValue) => {
    let soLuong = 1
    if (!isNaN(newValue) && newValue > 0) {
      soLuong = newValue
    }
    const updatedList = listBillDetail.map((item, i) =>
      i === index ? { ...item, quantity: parseInt(soLuong, 10) || 0 } : item,
    )
    setListBillDetail(updatedList)
    changeQuantity(row.id, soLuong)
    if (billDetail.moneyReduced != null) {
      const newMoneyAfter =
        updatedList.reduce(
          (totalMoney, item) => billDetail.moneyShip + totalMoney + item.quantity * item.price,
          0,
        ) - billDetail.moneyReduced
      setMoneyAfter(newMoneyAfter)
    } else {
      const newMoneyAfter = updatedList.reduce(
        (totalMoney, item) => billDetail.moneyShip + totalMoney + item.quantity * item.price,
        0,
      )
      setMoneyAfter(newMoneyAfter)
    }
  }

  const handleTextFieldQuanityFocus = (event, index) => {
    if (!isNaN(event.target.value)) {
      if (event.target.value !== '' && event.target.value !== '0') {
        const updatedList = listBillDetail.map((item, i) =>
          i === index ? { ...item, quantity: 1 } : item,
        )
        setListBillDetail(updatedList)
      }
    }
  }

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
  }, [id, billDetail, isUpdateBill, listTransaction])

  const showBtnConfirmPayment = useCallback(
    (billDetail, listTransaction) => {
      if (billDetail && billDetail.status !== 0) {
        if (!loading && !loadingTransaction) {
          if (billDetail.status === 1 || listTransaction.length === 0) {
            setIsShowBtnConfirmPayment(true)
          } else {
            setIsShowBtnConfirmPayment(true)
          }
        }
      }
    },
    [loading, loadingTransaction, setIsShowBtnConfirmPayment],
  )

  useEffect(() => {
    showBtnConfirmPayment(billDetail, listTransaction)
  }, [showBtnConfirmPayment, billDetail, listTransaction])

  const genBtnHandleBill = (billDetail, listTransaction) => {
    if (listTransaction.length > 0) {
      if (billDetail.status > 3 && billDetail.status < 7 && billDetail.status !== 0) {
        return (
          <Button
            variant="outlined"
            className="them-moi"
            color="cam"
            style={{ marginRight: '5px' }}
            onClick={() => setOpenModalConfirmComplete(true)}
            sx={{ minWidth: '30px' }}>
            Hoàn thành
          </Button>
        )
      }
    }
    //billDetail.type: giao hàng
    if (billDetail.type) {
      if (billDetail.status !== 0) {
        switch (billDetail.status) {
          case 1:
            return (
              <div>
                <Button
                  variant="outlined"
                  className="them-moi"
                  color="cam"
                  style={{ marginRight: '5px' }}
                  onClick={() => setOpenModalConfirm(true)}
                  sx={{ minWidth: '30px' }}>
                  Xác nhận đơn hàng
                </Button>
                <Button
                  variant="contained"
                  className="them-moi"
                  color="error"
                  style={{ marginRight: '5px' }}
                  onClick={() => setOpenModalCancelBill(true)}
                  sx={{ minWidth: '30px' }}>
                  Huỷ đơn
                </Button>
              </div>
            )
          case 2:
            return (
              <div>
                <Button
                  variant="outlined"
                  className="them-moi"
                  color="cam"
                  style={{ marginRight: '5px' }}
                  onClick={() => setOpenModalConfirmDelive(true)}
                  sx={{ minWidth: '30px' }}>
                  Xác nhận giao hàng
                </Button>
                <Button
                  variant="contained"
                  className="them-moi"
                  color="error"
                  style={{ marginRight: '5px' }}
                  onClick={() => setOpenModalCancelBill(true)}
                  sx={{ minWidth: '30px' }}>
                  Huỷ đơn
                </Button>
              </div>
            )
          case 3:
            return (
              <div>
                <Button
                  variant="outlined"
                  className="them-moi"
                  color="cam"
                  style={{ marginRight: '5px' }}
                  onClick={() => setOpenModalConfirmReceived(true)}
                  sx={{ minWidth: '30px' }}>
                  Xác nhận lấy hàng
                </Button>
              </div>
            )
          default:
            return null
        }
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
        fullName: billDetail.fullName,
        phoneNumber: billDetail.phoneNumber,
        address: billDetail.address,
        note: billDetail.note,
        status: 2,
        noteBillHistory: ghiChu,

        listHdctReq: listHDCT.map((item) => ({
          productDetailId: item.productDetailId,
          idBill: billDetail.id,
          quantity: item.quantity,
          price: item.price,
          status: 0,
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

  function ModalConfirmDeliver({ open, setOpen, billDetail }) {
    const [ghiChu, setGhiChu] = useState('')
    const updateStatusBillRequest = {
      noteBillHistory: ghiChu,
      idStaff: '099b241f-f2cf-448f-909d-55f288dfea5b',
      status: 3,
    }

    const handleConfirmDeliver = (id, updateStatusBillRequest) => {
      hoaDonApi
        .updateStatusBill(id, updateStatusBillRequest)
        .then((response) => {
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
        title={'Xác nhận giao hàng'}
        buttonSubmit={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained"
            onClick={() => handleConfirmDeliver(billDetail.id, updateStatusBillRequest)}>
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

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'code',
    })
    return formatter.format(value)
  }

  function ModalConfirmPayment({ open, setOpen, billDetail, listTransaction }) {
    const totalMoneyTrans = listTransaction
      .filter((transaction) => transaction.type === 0)
      .reduce((total, transaction) => total + transaction.totalMoney, 0)
    let tienCanHoanTra = 0
    billDetail ? (tienCanHoanTra = totalMoneyTrans - billDetail.moneyAfter) : (tienCanHoanTra = 0)
    const [ghiChu, setGhiChu] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('0')
    const [paymentAmount, setPaymentAmount] = useState(0)
    const [transactionCode, setTransactionCode] = useState('')

    const handleConfirmPayment = () => {
      const confirmPaymentRequest = {
        idStaff: '099b241f-f2cf-448f-909d-55f288dfea5b',
        noteBillHistory: ghiChu,
        type: isRefundMode ? 1 : 0,
        status: 0,
        paymentMethod: paymentMethod,
        paymentAmount: paymentAmount,
        transactionCode: transactionCode,
      }
      if (!isRefundMode) {
        if (cashReceived < billDetail.totalMoney) {
          toast.error('Không đủ tiền để xác nhận thanh toán', {
            position: toast.POSITION.TOP_CENTER,
          })
          return
        }
        if (paymentMethod === '0' && transactionCode.trim() === '') {
          toast.error('Vui lòng nhập mã giao dịch', {
            position: toast.POSITION.TOP_CENTER,
          })
          return
        }
      }
      hoaDonApi
        .confirmPayment(billDetail.id, confirmPaymentRequest)
        .then((response) => {
          toast.success('Đã xác nhận thanh toán', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setIsUpdateBill(true)
          console.log(listTransaction)
          setOpen(false)
        })
        .catch((error) => {
          console.error('Lỗi xác nhận thanh toán', error)
        })
    }
    const [cashReceived, setCashReceived] = useState(0)
    const [changeAmount, setChangeAmount] = useState(0)
    const [isRefundMode, setIsRefundMode] = useState(false)

    return (
      <DialogAddUpdate
        open={open}
        setOpen={setOpen}
        title={'Xác nhận thanh toán'}
        buttonSubmit={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained"
            onClick={handleConfirmPayment}>
            Lưu
          </Button>
        }
        buttonCancel={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained">
            Huỷ
          </Button>
        }>
        <div>
          <Box display={'inline'} sx={{ float: 'right', marginRight: 5 }}>
            <b>Hoàn tiền</b>
            <Switch
              color="warning"
              size="small"
              checked={isRefundMode}
              onChange={(e) => setIsRefundMode(e.target.checked)}
              disabled={tienCanHoanTra <= 0}
            />
          </Box>

          {isRefundMode ? (
            <>
              <TextField
                style={{ marginBottom: '10px' }}
                color="cam"
                value={formatCurrency(tienCanHoanTra)}
                className="search-field"
                size="small"
                fullWidth
                label="Số tiền cần hoàn trả"
              />

              <TextField
                style={{ marginBottom: '10px' }}
                color="cam"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="search-field"
                size="small"
                fullWidth
                label="Tiền hoàn trả"
              />
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
                style={{ marginBottom: '10px' }}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Phương thức thanh toán:</FormLabel>
                <RadioGroup
                  row
                  aria-label="payment-method"
                  name="payment-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="0" control={<Radio />} label="Chuyển khoản" />
                  <FormControlLabel value="1" control={<Radio />} label="Tiền mặt" />
                </RadioGroup>
              </FormControl>
              <TextField
                color="cam"
                className="search-field"
                size="small"
                fullWidth
                label="Mã giao dịch"
                value={transactionCode}
                onChange={(e) => setTransactionCode(e.target.value)}
                style={{ marginBottom: '10px' }}
                disabled={paymentMethod !== '0'}
                required={paymentMethod === '0'}
              />

              {paymentMethod === '0' && transactionCode.trim() === '' && (
                <span style={{ color: 'red', marginBottom: '5px' }}>
                  Vui lòng nhập mã giao dịch
                </span>
              )}
            </>
          ) : (
            <>
              <TextField
                style={{ marginBottom: '10px' }}
                color="cam"
                value={(billDetail && formatCurrency(billDetail.totalMoney)) || '0'}
                className="search-field"
                size="small"
                fullWidth
                label="Tổng tiền"
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                style={{ marginBottom: '10px' }}
                color="cam"
                value={cashReceived}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, '')

                  setCashReceived(formatCurrency(inputValue))

                  const totalAmount = parseFloat(billDetail ? billDetail.totalMoney : 0)
                  setChangeAmount(formatCurrency(inputValue).replace(/\D/g, '') - totalAmount)
                  setPaymentAmount(formatCurrency(inputValue).replace(/\D/g, ''))
                }}
                className="search-field"
                size="small"
                fullWidth
                label="Tiền khách đưa"
              />

              <TextField
                style={{ marginBottom: '10px' }}
                color="cam"
                value={formatCurrency(changeAmount)}
                className="search-field"
                size="small"
                fullWidth
                label="Tiền thừa"
                InputProps={{
                  readOnly: true,
                  style: {
                    color: changeAmount < 0 ? 'red' : 'black',
                  },
                }}
              />

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
                style={{ marginBottom: '10px' }}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Phương thức thanh toán:</FormLabel>
                <RadioGroup
                  row
                  aria-label="payment-method"
                  name="payment-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="0" control={<Radio />} label="Chuyển khoản" />
                  <FormControlLabel value="1" control={<Radio />} label="Tiền mặt" />
                </RadioGroup>
              </FormControl>
              <TextField
                color="cam"
                className="search-field"
                size="small"
                fullWidth
                label="Mã giao dịch"
                value={transactionCode}
                onChange={(e) => setTransactionCode(e.target.value)}
                style={{ marginBottom: '10px' }}
                disabled={paymentMethod !== '0'}
                required={paymentMethod === '0'}
              />

              {paymentMethod === '0' && transactionCode.trim() === '' && (
                <span style={{ color: 'red', marginBottom: '5px' }}>
                  Vui lòng nhập mã giao dịch
                </span>
              )}
            </>
          )}
        </div>
      </DialogAddUpdate>
    )
  }

  function ModalConfirmComplete({ open, setOpen, billDetail }) {
    const [ghiChu, setGhiChu] = useState('')

    const updateStatusBillRequest = {
      noteBillHistory: ghiChu,
      idStaff: '0b2b4301-623d-455b-b8fe-4d8213f16022',
      status: 7,
    }
    const handleConfirmComplete = (id, updateStatusBillRequest) => {
      hoaDonApi
        .updateStatusBill(id, updateStatusBillRequest)
        .then((response) => {
          toast.success('Xác nhận hoàn thành đơn hàng', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setIsUpdateBill(true)
          setOpen(false)
        })
        .catch((error) => {
          toast.error('Xác nhận hoàn thành đơn hàng không thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          console.error('Lỗi khi gửi yêu cầu API update status bill: ', error)
        })
    }

    return (
      <DialogAddUpdate
        open={open}
        setOpen={setOpen}
        title={'Xác nhận hoàn thành đơn hàng'}
        buttonSubmit={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained"
            onClick={() => handleConfirmComplete(billDetail.id, updateStatusBillRequest)}>
            Lưu
          </Button>
        }>
        {console.log(billDetailReturn)}
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

  function ModalReturnProduct({ open, setOpen, billDetailReturn, idBill }) {
    const [ghiChu, setGhiChu] = useState('')
    const [soLuong, setSoLuong] = useState(billDetailReturn ? billDetailReturn.quantity : 0)

    const hdBillDetailReq = {
      productDetailId: billDetailReturn ? billDetailReturn.productDetailId : null,
      idBill: idBill,
      quantity: soLuong,
      note: ghiChu,
    }
    const handleReturnProduct = (billDetailReturn, hdBillDetailReq) => {
      hoaDonChiTietApi
        .returnProduct(billDetailReturn.id, hdBillDetailReq)
        .then(() => {
          toast.success('Đã xác nhận hoàn trả', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setIsUpdateBill(true)
          setOpenModalReturnProduct(false)
        })
        .catch(() => {
          toast.error('Đã xảy ra lỗi', {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
    }
    const confirmReturnProduct = () => {
      if (isNaN(soLuong) || soLuong <= 0) {
        toast.error('Số lượng không hợp lệ', {
          position: toast.POSITION.TOP_CENTER,
        })
        return
      }
      if (soLuong > billDetailReturn.quantity) {
        toast.error('Số lượng hoàn trả lớn hơn số sản phẩm đã mua', {
          position: toast.POSITION.TOP_CENTER,
        })
        return
      }
      if (ghiChu.trim().length === 0) {
        toast.error('Vui lòng nhập ghi chú', {
          position: toast.POSITION.TOP_CENTER,
        })
        return
      }
      confirmSatus('Xác nhận ', 'Xác nhận hoàn hàng?').then((result) => {
        if (result.isConfirmed) {
          handleReturnProduct(billDetailReturn, hdBillDetailReq)
        }
      })
    }

    return (
      <Modal
        open={open}
        setOpen={setOpen}
        title={'Xác nhận hoàn hàng'}
        onClose={() => {
          setOpen(false)
        }}>
        <div>
          <Box sx={styleModalReturnProduct}>
            <Toolbar>
              <Box
                sx={{
                  color: 'black',
                  flexGrow: 1,
                }}>
                <Typography variant="h6" component="div">
                  Xác nhận hoàn hàng
                </Typography>
              </Box>
              <IconButton
                onClick={() => {
                  setOpen(false)
                }}
                aria-label="close"
                color="error"
                style={{
                  boxShadow: '1px 2px 3px 1px rgba(0,0,0,.05)',
                }}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
            {billDetailReturn && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TableContainer
                    sx={{ maxHeight: 300, marginBottom: 5 }}
                    className="table-container-custom-scrollbar">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        <TableRow key={'billDetail' + billDetailReturn.id}>
                          <TableCell align="center">
                            <img src={billDetailReturn.productImg} alt="" width={'100px'} />
                          </TableCell>
                          <TableCell>
                            {billDetailReturn.productName} <br></br>
                            {billDetailReturn.price !== billDetailReturn.productPrice ? (
                              <span>
                                <del
                                  style={{
                                    color: 'gray',
                                    textDecorationColor: 'gray',
                                    textDecorationLine: 'line-through',
                                  }}>
                                  {formatCurrency(billDetailReturn.productPrice)}
                                </del>

                                <span
                                  style={{
                                    color: 'red',
                                    marginLeft: 15,
                                  }}>
                                  {formatCurrency(billDetailReturn.price)}
                                </span>
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: 'red',
                                  marginLeft: 15,
                                }}>
                                {formatCurrency(billDetailReturn.productPrice)}
                              </span>
                            )}
                            <br />
                            Size: {billDetailReturn.size}
                            <br />x{billDetailReturn.quantity}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <TextField
                              color="cam"
                              className="search-field"
                              size="small"
                              fullWidth
                              label="Số lượng:"
                              value={soLuong}
                              onChange={(e) => setSoLuong(e.target.value)}
                              sx={{ marginBottom: 2 }}
                            />
                          </TableCell>
                          <TableCell>
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
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box>
                    <Button
                      variant="outlined"
                      color="cam"
                      style={{ width: '90%', marginLeft: '5%', marginBottom: 10 }}
                      onClick={() => confirmReturnProduct()}>
                      <b>Xác nhận</b>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </div>
      </Modal>
    )
  }
  const styleModalReturnProduct = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '50vw', md: '50vw' },
    bgcolor: 'white',
    borderRadius: 1.5,
    boxShadow: 24,
  }
  function ModalCancelBill({ open, setOpen, billDetail }) {
    const [ghiChu, setGhiChu] = useState('')

    const updateStatusBillRequest = {
      noteBillHistory: ghiChu,
      idStaff: '0b2b4301-623d-455b-b8fe-4d8213f16022',
      status: 0,
    }
    const handlecancelBill = (id, updateStatusBillRequest) => {
      if (billDetail.status !== 3 && billDetail.status !== 7 && billDetail.status !== 4) {
        hoaDonApi
          .cancelBill(id, updateStatusBillRequest)
          .then((response) => {
            toast.success('Đã huỷ đơn hàng', {
              position: toast.POSITION.TOP_RIGHT,
            })
            setIsUpdateBill(true)
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

  function ModalConfirmReceived({ open, setOpen, billDetail }) {
    const [ghiChu, setGhiChu] = useState('')

    const updateStatusBillRequest = {
      noteBillHistory: ghiChu,
      idStaff: '0b2b4301-623d-455b-b8fe-4d8213f16022',
      status: 4,
    }
    const handleConfirmReceived = (id, updateStatusBillRequest) => {
      hoaDonApi
        .updateStatusBill(id, updateStatusBillRequest)
        .then((response) => {
          toast.success('Xác nhận đã nhận được hàng thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setIsUpdateBill(true)
          setOpen(false)
        })
        .catch((error) => {
          toast.error('Đã xảy ra lỗi', {
            position: toast.POSITION.TOP_RIGHT,
          })
          console.error('Lỗi khi gửi yêu cầu API update status bill: ', error)
        })
    }

    return (
      <DialogAddUpdate
        open={open}
        setOpen={setOpen}
        title={'Xác nhận đã giao hàng'}
        buttonSubmit={
          <Button
            style={{ boxShadow: 'none', textTransform: 'none', borderRadius: '8px' }}
            color="cam"
            variant="contained"
            onClick={() => handleConfirmReceived(billDetail.id, updateStatusBillRequest)}>
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

  const getOneBill = (id) => {
    hoaDonApi
      .getOne(id)
      .then((response) => {
        setBillDetail(response.data.data)
        setMoneyAfter(response.data.data.moneyAfter)
        console.log(response.data.data)
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
        console.log('Time line:')
        console.log(response.data.data)
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
    const activeStt = 0
    hoaDonChiTietApi
      .getByIdBillAndStt(id, activeStt)
      .then((response) => {
        setListBillDetail(response.data.data)
        setLoadingListBillDetail(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get bill detail by bill: ', error)
        setLoadingListBillDetail(false)
      })
    const unActiveStt = 1
    hoaDonChiTietApi
      .getByIdBillAndStt(id, unActiveStt)
      .then((response) => {
        setListBillDetailUnactive(response.data.data)
        setLoadingListBillDetail(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get bill detail by bill: ', error)
        setLoadingListBillDetail(false)
      })
    const waitingSTT = 2
    hoaDonChiTietApi
      .getByIdBillAndStt(id, waitingSTT)
      .then((response) => {
        setLstBillDetailWaitingReturn(response.data.data)
        setLoadingListBillDetail(false)
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API get bill detail by bill chờ trả hàng: ', error)
        setLoadingListBillDetail(false)
      })
  }

  const decrementQuantity = (idBillDetail) => {
    hoaDonChiTietApi.decrementQuantity(idBillDetail).catch((error) => {
      console.error('NO ok', error)
    })
  }

  const incrementQuantity = (idBillDetail) => {
    hoaDonChiTietApi.incrementQuantity(idBillDetail).catch((error) => {
      console.error('NO ok', error)
    })
  }

  const changeQuantity = (idBillDetail, quantity) => {
    if (!isNaN(quantity) && quantity > 0) {
      hoaDonChiTietApi.changeQuantity(idBillDetail, quantity).catch((error) => {
        console.error('NO ok', error)
      })
    } else {
      hoaDonChiTietApi.changeQuantity(idBillDetail, 1).catch((error) => {
        console.error('NO ok', error)
      })
    }
  }

  const deleteBillDetail = (hdct, idBill) => {
    const hdBillDetailReq = {
      productDetailId: hdct.productDetailId,
      idBill: idBill,
      status: hdct.status,
    }
    hoaDonChiTietApi
      .delete(hdBillDetailReq)
      .then(() => {
        toast.success('Đã xoá sản phẩm khỏi đơn hàng', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setIsUpdateBill(true)
      })
      .catch(() => {
        toast.error('Đã sảy ra lỗi', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }

  const handleDeleteSPConfirmation = (hdct, idBill) => {
    confirmSatus('Xác nhận xoá', 'Bạn có chắc chắn muốn xoá sản phẩm này?').then((result) => {
      if (result.isConfirmed) {
        deleteBillDetail(hdct, idBill)
      }
    })
  }

  const handleReturnProduct = (item) => {
    setBillDetailReturn(item)
    setOpenModalReturnProduct(true)
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
      <ModalConfirmPayment
        setOpen={setOpenModalConfirmPayment}
        open={openModalConfirmPayment}
        billDetail={billDetail}
        listTransaction={listTransaction}
      />
      <ModalConfirmComplete
        setOpen={setOpenModalConfirmComplete}
        open={openModalConfirmComplete}
        billDetail={billDetail}
      />
      <ModalReturnProduct
        setOpen={setOpenModalReturnProduct}
        open={openModalReturnProduct}
        billDetailReturn={billDetailReturn}
        idBill={billDetail ? billDetail.id : null}
      />
      <ModalCancelBill
        setOpen={setOpenModalCancelBill}
        open={openModalCancelBill}
        billDetail={billDetail}
      />
      <ModalConfirmReceived
        setOpen={setOpenModalConfirmReceived}
        open={openCodalConfirmReceived}
        billDetail={billDetail}
      />
      <AdBillModalThemSP
        load={setIsUpdateBill}
        open={openModalThemSP}
        setOPen={setOpenModalThemSP}
        billDetail={billDetail ? billDetail : null}
        idBill={billDetail ? billDetail.id : null}
      />
      <ModalAdBillUpdateAddress
        load={setIsUpdateBill}
        open={openModalUpdateAdd}
        setOPen={setopenModalUpdateAdd}
        billDetail={billDetail}
        listBillDetail={listBillDetail}
      />
      <BreadcrumbsCustom listLink={listHis} nameHere={'Chi tiết hoá đơn'} />
      <Paper className="time-line" elevation={3} sx={{ mt: 2, mb: 2, paddingLeft: 1 }}>
        <h3>Lịch sử đơn hàng</h3>
        {loadingTimeline ? <div>Loading...</div> : <TimeLine orderTimeLine={listOrderTimeLine} />}
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          {!loading && genBtnHandleBill(billDetail, listTransaction)}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Button
              variant="outlined"
              className="them-moi"
              color="cam"
              style={{ marginRight: '5px' }}
              onClick={() => setOpenDialog(true)}>
              Chi tiết
            </Button>
            {loading ? (
              <div>Loading...</div>
            ) : (
              openDialog && (
                <BillHistoryDialog
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  listOrderTimeLine={listOrderTimeLine}
                />
              )
            )}
          </Stack>
        </Grid>
      </Paper>
      {/* Thông tin đơn hàng */}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <h3>Thông tin đơn hàng</h3>
          {(billDetail && billDetail.status === 1) ||
            (billDetail && billDetail.status === 2 && (
              <Button
                variant="outlined"
                className="them-moi"
                color="cam"
                style={{ marginRight: '5px' }}
                onClick={() => setopenModalUpdateAdd(true)}>
                Cập nhật
              </Button>
            ))}
        </Stack>

        <Divider
          style={{ backgroundColor: 'black', height: '1px', marginTop: 10, marginBottom: 10 }}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Grid container spacing={2} className="billDetailInfo">
              <Grid item xs={12} sm={4}>
                <Typography variant="p">
                  <label>Mã: </label>
                  {billDetail?.code}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="p">
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
                <Typography variant="p">
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
                <Typography variant="p">
                  <label>Tên người nhận: </label>
                  {billDetail?.recipientName ? billDetail.recipientName : ''}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
      </Paper>
      {loadingTransaction ? (
        <div>Loading...</div>
      ) : (
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <h3>Lịch sửa thanh toán</h3>
            {billDetail?.status > 0 && billDetail?.status < 7 && (
              <Button
                onClick={() => setOpenModalConfirmPayment(true)}
                variant="outlined"
                className="them-moi"
                color="cam"
                style={{ marginRight: '5px' }}>
                Xác nhận thanh toán
              </Button>
            )}
          </Stack>
          {listTransaction.length > 0 ? (
            <>
              <Divider style={{ backgroundColor: 'black', height: '1px', marginTop: 10 }} />
              <AdBillTransaction listTransaction={listTransaction} />
            </>
          ) : (
            <Empty />
          )}
        </Paper>
      )}

      {/* Hoá đơn chi tiết */}
      {listBillDetail.length > 0 && (
        <Paper elevation={3} sx={{ mt: 2, mb: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
          <div>
            {billDetail && (
              <div>
                {listBillDetail.length > 0 ? (
                  <div>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}>
                      <h3>Hoá đơn chi tiết</h3>
                      {billDetail &&
                        (billDetail.status === 1 ||
                          billDetail.status === 2 ||
                          billDetail.status === 6) && (
                          <Button
                            variant="outlined"
                            className="them-moi"
                            color="cam"
                            style={{ marginRight: '5px' }}
                            onClick={() => setOpenModalThemSP(true)}>
                            Thêm sản phẩm
                          </Button>
                        )}
                    </Stack>

                    <Divider style={{ backgroundColor: 'black', height: '1px', marginTop: 10 }} />
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
                                    <TableRow key={row.id + index}>
                                      <TableCell align="center">
                                        <img src={row.productImg} alt="" width={'100px'} />
                                      </TableCell>
                                      <TableCell>
                                        {row.productName} <br></br>
                                        <span
                                          style={{
                                            color: 'red',
                                          }}>
                                          {formatCurrency(row.price)}
                                        </span>
                                        <br />
                                        Size: {row.size}
                                        <br />x{row.quantity}
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
                                              (billDetail &&
                                                billDetail.status !== 6 &&
                                                billDetail.status > 2) ||
                                              billDetail.status === 0
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
                                              handleTextFieldQuantityChange(
                                                row,
                                                index,
                                                e.target.value,
                                              )
                                            }
                                            onFocus={(e) => handleTextFieldQuanityFocus(e, index)}
                                            disabled={
                                              (billDetail &&
                                                billDetail.status !== 6 &&
                                                billDetail.status > 2) ||
                                              billDetail.status === 0
                                            }
                                          />

                                          <IconButton
                                            sx={{ p: 0 }}
                                            size="small"
                                            onClick={() => handleIncrementQuantity(row, index)}
                                            disabled={
                                              (billDetail &&
                                                billDetail.status !== 6 &&
                                                billDetail.status > 2) ||
                                              billDetail.status === 0
                                            }>
                                            <AddIcon fontSize="1px" />
                                          </IconButton>
                                        </Box>
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ fontWeight: 'bold', color: 'red' }}>
                                        {row.price !== null
                                          ? formatCurrency(row.price * row.quantity)
                                          : 0}
                                        <br />
                                      </TableCell>
                                      <TableCell>
                                        {billDetail &&
                                          listBillDetail.length > 1 &&
                                          (billDetail.status === 6 || billDetail.status < 3) && (
                                            <Tooltip title="Xoá sản phẩm">
                                              <IconButton
                                                onClick={() =>
                                                  handleDeleteSPConfirmation(row, billDetail.id)
                                                }>
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
                          </Grid>
                        </Grid>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </Paper>
      )}

      {billDetail && lstBillDetailWaitingReturn.length > 0 ? (
        <div>
          <Paper
            elevation={3}
            sx={{ mt: 2, mb: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
            {/* list chờ hoàn trả */}
            <div>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}>
                <h3>Đang chờ hoàn trả</h3>
              </Stack>
              <Divider style={{ backgroundColor: 'black', height: '1px', marginTop: 10 }} />
              {lstBillDetailWaitingReturn.length === 0 ? (
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
                            {lstBillDetailWaitingReturn.map((row, index) => (
                              <TableRow key={'billDetail' + row.id}>
                                <TableCell align="center">
                                  <img src={row.productImg} alt="" width={'20%'} />
                                </TableCell>
                                <TableCell width={'45%'}>
                                  {row.productName} <br></br>
                                  <span
                                    style={{
                                      color: 'red',
                                    }}>
                                    {formatCurrency(row.price)}
                                  </span>
                                  <br />
                                  Size: {row.size}
                                  <br />x{row.quantity}
                                </TableCell>
                                <TableCell width={'20%'}>{row.note}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          </Paper>
        </div>
      ) : null}

      {billDetail && listBillDetailUnactive.length > 0 ? (
        <div>
          <Paper
            elevation={3}
            sx={{ mt: 2, mb: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
            <div>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}>
                <h3>Hoàn hàng</h3>
              </Stack>
              <Divider style={{ backgroundColor: 'black', height: '1px', marginTop: 10 }} />
              {listBillDetailUnactive.length === 0 ? (
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
                            {listBillDetailUnactive.map((row, index) => (
                              <TableRow key={'billDetail' + row.id}>
                                <TableCell align="center">
                                  <img src={row.productImg} alt="" width={'20%'} />
                                </TableCell>
                                <TableCell width={'45%'}>
                                  {row.productName} <br></br>
                                  <span
                                    style={{
                                      color: 'red',
                                    }}>
                                    {formatCurrency(row.price)}
                                  </span>
                                  <br />
                                  Size: {row.size}
                                  <br />x{row.quantity}
                                </TableCell>
                                <TableCell width={'20%'}>{row.note}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          </Paper>
        </div>
      ) : null}

      <Paper elevation={3} sx={{ mt: 2, mb: 2, paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
        <div>
          <Stack sx={{ marginLeft: 'auto', width: 300, paddingRight: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              Tổng tiền hàng:
              <span style={{ fontWeight: 'bold' }}>{formatCurrency(totalProductsCost)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Giảm giá:</span>
              <span style={{ fontWeight: 'bold' }}>
                {billDetail && billDetail.moneyReduced
                  ? formatCurrency(billDetail.moneyReduced)
                  : formatCurrency(0)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Phí vận chuyển:</span>
              <span style={{ fontWeight: 'bold' }}>
                {billDetail && billDetail.moneyShip
                  ? formatCurrency(billDetail.moneyShip)
                  : formatCurrency(0)}
              </span>
            </div>
            <Divider style={{ backgroundColor: 'black', height: '2px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Tổng tiền:</span>
              <span style={{ fontWeight: 'bold', color: 'red' }}>{formatCurrency(moneyAfter)}</span>
            </div>
          </Stack>
        </div>
      </Paper>
    </div>
  )
}
