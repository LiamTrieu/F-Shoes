import React, { useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { useNavigate, useParams } from 'react-router-dom'
import returnApi from '../../../api/admin/return/returnApi'
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { MdAssignmentReturned } from 'react-icons/md'
import './index.css'
import { RemoveCircle } from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import PersonIcon from '@mui/icons-material/Person'
import Carousel from 'react-material-ui-carousel'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import { GrSelect } from 'react-icons/gr'

const listBreadcrumbs = [{ name: 'Trả hàng', link: '/admin/return-order/0' }]
export default function ReturnOrderBill() {
  const param = useParams()
  const navigate = useNavigate()
  const [bill, setBill] = useState({})
  const [billDetail, setBillDetail] = useState([])
  const [phi, setPhi] = useState(0)
  const [traKhach, setTraKhach] = useState(0)
  const [typePay, setTypePay] = useState(0)
  const [codePay, setCodePay] = useState(null)

  useEffect(() => {
    returnApi.getBillId(param.id).then(
      (res) => {
        if (res.data.success) {
          setBill(res.data.data)
        } else {
          navigate(-1)
        }
      },
      () => {},
    )
    returnApi.getBillDetail(param.id).then(
      (res) => {
        if (res.data.success) {
          setBillDetail([...res.data.data.map((e) => ({ ...e, quantityReturn: 0 }))])
        } else {
          navigate(-1)
        }
      },
      () => {},
    )
  }, [])

  function changeNote(value, product) {
    const preBillDetail = [...billDetail]
    const index = preBillDetail.findIndex((item) => item.id === product.id)
    if (index !== -1) {
      preBillDetail[index] = {
        ...product,
        note: value,
      }
      setBillDetail(preBillDetail)
    }
  }
  function changeSL(value, product) {
    const preBillDetail = [...billDetail]
    const index = preBillDetail.findIndex((item) => item.id === product.id)

    let quantityReturn = parseInt(value)
    if (isNaN(quantityReturn) || quantityReturn < 0) {
      quantityReturn = 0
    }

    quantityReturn = Math.min(quantityReturn, product.quantity)

    if (index !== -1) {
      preBillDetail[index] = {
        ...product,
        quantityReturn,
      }
      setBillDetail(preBillDetail)
      setTraKhach(
        preBillDetail.reduce((total, e) => {
          return total + e.quantityReturn * e.price
        }, 0) *
          (1 - phi / 100),
      )
    }
  }

  function traHang() {
    const detail = billDetail
      .filter((bd) => bd.quantityReturn > 0)
      .map((bd) => ({
        name: bd.name,
        quantity: bd.quantityReturn,
        price: bd.price,
        idBillDetail: bd.id,
        note: bd.note,
      }))

    const returnBill = {
      idBill: bill.id,
      returnMoney:
        billDetail.reduce((total, e) => {
          return total + e.quantityReturn * e.price
        }, 0) *
        (1 - phi / 100),
      moneyPayment: traKhach,
      type: typePay,
      codePayment: codePay,
      fee: phi,
      listDetail: detail,
    }
    if (
      traKhach -
        billDetail.reduce((total, e) => {
          return total + e.quantity * e.price
        }, 0) *
          (1 - phi / 100) <
      0
    ) {
      toast.warning('Tiền trả khác phải lớn hơn hoặc bằng tiền khách nhận!')
    } else {
      const title = 'Xác nhận hoàn trả sản phẩm?'
      confirmSatus(title, '').then((result) => {
        if (result.isConfirmed) {
          returnApi.accept(returnBill).then(
            (res) => {
              if (res.data.success) {
                toast.success('Trả hàng thành công!')
                navigate('/admin/return-order/3')
              } else {
                navigate(-1)
              }
            },
            () => {},
          )
        }
      })
    }
  }

  return (
    <div className="tra-hang">
      <BreadcrumbsCustom nameHere={bill?.code} listLink={listBreadcrumbs} />
      <Grid container spacing={2} mt={2}>
        <Grid xs={8} style={{ paddingTop: 0 }}>
          <Paper className="paper-return" sx={{ mb: 2, p: 1 }}>
            <h4 style={{ margin: '0' }}>
              <GrSelect fontSize={20} style={{ marginBottom: '-6px' }} />
              &nbsp; Chọn sản phẩm cần trả
            </h4>
            <hr style={{ marginBottom: '0px' }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: 0 }} width={'5%'}>
                    <Checkbox
                      onChange={(e) => {
                        setBillDetail((prevBillDetail) => {
                          const newBillDetail = [...prevBillDetail]

                          if (e.target.checked) {
                            newBillDetail.forEach((item) => {
                              item.quantityReturn = item.quantity
                            })
                          } else {
                            newBillDetail.forEach((item) => {
                              item.quantityReturn = 0
                            })
                          }

                          return newBillDetail
                        })
                      }}
                      checked={billDetail.reduce((check, e) => {
                        if (e.quantity !== e.quantityReturn) {
                          check = false
                        }
                        return check
                      }, true)}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ padding: 0 }}
                    width={'55%'}
                    style={{ fontWeight: 'bold' }}>
                    Sản phẩm
                  </TableCell>
                  <TableCell
                    sx={{ padding: 0 }}
                    width={'20%'}
                    style={{ fontWeight: 'bold' }}
                    align="center">
                    Số lượng
                  </TableCell>
                  <TableCell
                    sx={{ padding: 0 }}
                    width={'20%'}
                    style={{ fontWeight: 'bold' }}
                    align="center">
                    Đơn giá
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Box
              sx={{
                '::-webkit-scrollbar': {
                  width: '0px',
                },
              }}
              style={{ overflow: 'auto', height: '24vh' }}>
              <Table>
                {billDetail.map((product) => (
                  <TableBody>
                    <TableCell sx={{ padding: 0 }} width={'5%'}>
                      <Checkbox
                        checked={product.quantity === product.quantityReturn}
                        onChange={(e) => {
                          if (e.target.checked) {
                            changeSL(product.quantity, product)
                          } else {
                            changeSL(0, product)
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '5px' }} width={'55%'}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          float: 'left',
                        }}>
                        <Carousel
                          indicators={false}
                          sx={{ minWidth: '60px', height: '60px' }}
                          navButtonsAlwaysInvisible>
                          {product.image.split(',').map((item, i) => (
                            <img
                              alt="anh-san-pham"
                              width={'60px'}
                              height={'60px'}
                              key={'anh' + i}
                              src={item}
                            />
                          ))}
                        </Carousel>
                        <div style={{ display: 'inline-block', paddingLeft: '10px' }}>
                          {product.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell sx={{ padding: '5px' }} width={'20%'} align="center">
                      <IconButton
                        size="small"
                        onClick={() => {
                          changeSL(product.quantityReturn - 1, product)
                        }}>
                        <RemoveCircle sx={{ color: '#BDC3C7' }} />
                      </IconButton>
                      <TextField
                        className="input-soluong-return"
                        sx={{ width: '60px' }}
                        size="small"
                        onChange={(e) => {
                          changeSL(e.target.value, product)
                        }}
                        value={product.quantityReturn}
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">/ {product.quantity}</InputAdornment>
                          ),
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          changeSL(product.quantityReturn + 1, product)
                        }}>
                        <AddCircleIcon sx={{ color: '#BDC3C7' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ padding: '5px' }} width={'20%'} align="center">
                      <TextField
                        className="input-soluong-return"
                        sx={{ width: '90px' }}
                        size="small"
                        disabled
                        value={product.price.toLocaleString('en-US')}
                        variant="standard"
                      />
                    </TableCell>
                  </TableBody>
                ))}
              </Table>
            </Box>
          </Paper>
          <Paper className="paper-return" sx={{ mb: 2, p: 1 }}>
            <h4 style={{ margin: '0' }}>
              <MdAssignmentReturned fontSize={20} style={{ marginBottom: '-6px' }} />
              &nbsp; Danh sách sản phẩm trả
            </h4>
            <hr style={{ marginBottom: '0px' }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ padding: '10px' }}
                    align="center"
                    style={{ fontWeight: 'bold' }}
                    width={'25%'}>
                    Sản phẩm
                  </TableCell>
                  <TableCell
                    sx={{ padding: '10px' }}
                    align="center"
                    style={{ fontWeight: 'bold' }}
                    width={'15%'}>
                    Số lượng
                  </TableCell>
                  <TableCell
                    sx={{ padding: 0 }}
                    align="center"
                    style={{ fontWeight: 'bold' }}
                    width={'15%'}>
                    Đơn giá
                  </TableCell>
                  <TableCell
                    sx={{ padding: '10px' }}
                    align="center"
                    style={{ fontWeight: 'bold' }}
                    width={'15%'}>
                    Tổng
                  </TableCell>
                  <TableCell
                    sx={{ padding: '10px' }}
                    align="center"
                    style={{ fontWeight: 'bold' }}
                    width={'20%'}>
                    Ghi chú
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Box
              sx={{
                '::-webkit-scrollbar': {
                  width: '0px',
                },
              }}
              style={{ overflow: 'auto', minHeight: '30vh' }}>
              <Table>
                {billDetail.filter((e) => e.quantityReturn > 0).length > 0 ? (
                  billDetail
                    .filter((e) => e.quantityReturn > 0)
                    .map((product) => (
                      <TableBody>
                        <TableCell sx={{ padding: '5px' }} align="center" width={'25%'}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Carousel
                              indicators={false}
                              sx={{ minWidth: '60px', height: '60px' }}
                              navButtonsAlwaysInvisible>
                              {product.image.split(',').map((item, i) => (
                                <img
                                  alt="anh-san-pham"
                                  width={'60px'}
                                  height={'60px'}
                                  key={'anh' + i}
                                  src={item}
                                />
                              ))}
                            </Carousel>
                            <div style={{ display: 'inline-block', paddingLeft: '10px' }}>
                              {product.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }} align="center" width={'15%'}>
                          <Chip label={product.quantityReturn} sx={{ fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }} align="center" width={'15%'}>
                          <TextField
                            className="input-soluong-return"
                            sx={{ width: '90px' }}
                            size="small"
                            disabled
                            value={product.price.toLocaleString('en-US')}
                            variant="standard"
                          />
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }} width={'15%'} align="center">
                          <b style={{ color: 'red' }}>
                            {(product.price * product.quantityReturn).toLocaleString('en-US')}
                          </b>
                        </TableCell>
                        <TableCell sx={{ padding: '5px' }} width={'20%'} align="center">
                          <TextField
                            value={product?.note}
                            onChange={(e) => {
                              changeNote(e.target.value, product)
                            }}
                            disabled={product.quantityReturn <= 0}
                            color="cam"
                            placeholder="Ghi chú"
                            multiline
                            rows={2}
                            sx={{ marginRight: '10px' }}
                          />
                        </TableCell>
                      </TableBody>
                    ))
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}>
                    <img
                      width={'400px'}
                      src={require('../../../assets/image/no-data.png')}
                      alt="No-data"
                    />
                  </div>
                )}
              </Table>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4} style={{ paddingTop: 0 }}>
          <Paper
            sx={{
              p: 2,
              height: '82vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Typography variant="h6" textAlign={'center'} color={'#229954'} fontWeight={'600'}>
              Thông tin hoàn trả
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#EBEBEB',
                padding: '10px',
                borderRadius: '10px',
              }}>
              <PersonIcon style={{ marginRight: '5px' }} />
              <b>{bill?.fullName ? bill?.fullName : 'Khách lẻ'}</b>
            </div>
            <Grid container>
              <Grid xs={6}>
                Tổng tiền{' '}
                <Chip
                  label={billDetail.reduce((total, e) => {
                    return total + (e.quantityReturn || 0)
                  }, 0)}
                  size="small"
                />
              </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b style={{ color: 'red' }}>
                  {billDetail
                    .reduce((total, e) => {
                      return total + e.quantityReturn * e.price
                    }, 0)
                    .toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                </b>
              </Grid>
            </Grid>

            <Grid container>
              <Grid xs={6}>Phí trả hàng</Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <TextField
                  className="input-soluong-return-2"
                  sx={{ width: '150px' }}
                  size="small"
                  value={phi}
                  onChange={(e) => {
                    const inputValue = e.target.value.trim() === '' ? 0 : parseInt(e.target.value)

                    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
                      setPhi(inputValue)
                    }
                  }}
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={6}>
                <b>Cần trả khách</b>
              </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b style={{ color: '#2874A6' }}>
                  {(
                    billDetail.reduce((total, e) => {
                      return total + e.quantityReturn * e.price
                    }, 0) *
                    (1 - phi / 100)
                  ).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </b>
              </Grid>
            </Grid>

            <Grid container>
              <Grid xs={6}>
                <b>Tiền trả khách</b>
              </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <TextField
                  className="input-soluong-return-2"
                  sx={{ width: '150px' }}
                  size="small"
                  value={traKhach}
                  onChange={(e) => {
                    const inputValue = e.target.value.trim() === '' ? 0 : parseInt(e.target.value)

                    if (!isNaN(inputValue) && inputValue >= 0) {
                      setTraKhach(inputValue)
                    }
                  }}
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={6}>
                <b>Tiền dư</b>
              </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b>
                  {(
                    traKhach -
                    billDetail.reduce((total, e) => {
                      return total + e.quantityReturn * e.price
                    }, 0) *
                      (1 - phi / 100)
                  ).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </b>
              </Grid>
            </Grid>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              value={typePay}
              onChange={(e) => {
                setTypePay(parseInt(e.target.value))
              }}>
              <FormControlLabel value={0} control={<Radio />} label="Tiền mặt" />
              <FormControlLabel value={1} control={<Radio />} label="Chuyển khoản" />
            </RadioGroup>
            {typePay === 1 && (
              <TextField
                onChange={(e) => {
                  setCodePay(e.target.value)
                }}
                placeholder="Mã giao dịch"
                size="small"
                variant="outlined"
                fullWidth
              />
            )}
            <Button onClick={traHang} sx={{ mt: 5 }} color="cam" variant="contained" fullWidth>
              TRẢ HÀNG
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
