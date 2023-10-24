import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import LabelTitle from '../../layout/client/checkoutpage/LabelTitle'
import ghnAPI from '../../api/admin/ghn/ghnApi'
import './Checkout.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetCheckout } from '../../services/slices/checkoutSlice'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import clientCheckoutApi from '../../api/client/clientCheckoutApi'
import { toast } from 'react-toastify'
import confirmSatus from '../../components/comfirmSwal'
import { removeCart } from '../../services/slices/cartSlice'
import ModalVoucher from './ModalVoucher'

export default function Checkout() {
  const [request, setRequest] = useState({
    fullName: '',
    email: '',
    phone: '',
    tinh: '',
    huyen: '',
    xa: '',
    address: '',
    note: '',
    typePayment: '',
    idVoucher: '',
    shipMoney: '',
    totalMoney: '',
    duKien: '',
    billDetail: [],
  })
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])

  const [openModalVoucher, setOpenModalVoucher] = useState(false)

  const [voucher, setVoucher] = useState({ id: '', value: 0, name: '' })

  const navigate = useNavigate()

  const arrData = useSelector(GetCheckout)
  useEffect(() => {
    if (arrData.length === 0) navigate('/cart')
    loadTinh()
  }, [navigate, arrData])

  const loadTinh = () => {
    ghnAPI.getProvince().then((response) => {
      setTinh(response.data)
    })
  }

  const loadHuyen = (idProvince) => {
    ghnAPI.getDistrict(idProvince).then((response) => {
      setHuyen(response.data)
    })
  }

  const loadXa = (idDistrict) => {
    ghnAPI.getWard(idDistrict).then((response) => {
      setXa(response.data)
    })
  }

  const [selectedTinh, setSelectedTinh] = useState(null)
  const [selectedHuyen, setSelectedHuyen] = useState(null)
  const [selectedXa, setSelectedXa] = useState(null)
  const [giamGia, setGiamGia] = useState(0)
  const [timeShip, setTimeShip] = useState('')
  const [phiShip, setPhiShip] = useState('')
  const dispatch = useDispatch()

  const handleTinhChange = (_, newValue) => {
    setSelectedTinh(newValue)
    setSelectedHuyen(null)
    setRequest({ ...request, tinh: newValue.label })
    if (newValue) {
      loadHuyen(newValue.id)
    } else {
      setHuyen([])
    }
  }

  const handleHuyenChange = (_, newValue) => {
    setSelectedHuyen(newValue)
    setSelectedXa(null)
    setRequest({ ...request, huyen: newValue.label })
    if (newValue) {
      loadXa(newValue.id)
    } else {
      setXa([])
    }
  }
  const handleXaChange = (_, newValue) => {
    setSelectedXa(newValue)
    setRequest({ ...request, xa: newValue.label })
    const filtelService = {
      shop_id: '3911708',
      from_district: '3440',
      to_district: selectedHuyen.id,
    }

    ghnAPI.getServiceId(filtelService).then((response) => {
      const serviceId = response.data.body.serviceId
      const filterTotal = {
        from_district_id: '3440',
        service_id: serviceId,
        to_district_id: selectedHuyen.id,
        to_ward_code: newValue.id,
        weight: arrData.reduce((totalWeight, e) => totalWeight + parseInt(e.weight), 0),
        insurance_value: '10000',
      }

      ghnAPI.getTotal(filterTotal).then((response) => {
        setPhiShip(response.data.body.total)

        const filtelTime = {
          from_district_id: '3440',
          from_ward_code: '13010',
          to_district_id: selectedHuyen.id,
          to_ward_code: newValue.id,
          service_id: serviceId,
        }
        ghnAPI.getime(filtelTime).then((response) => {
          setTimeShip(response.data.body.leadtime * 1000)
        })
      })
    })
  }

  const [selectedValue, setSelectedValue] = useState(0)

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
  }

  function finishCheckout() {
    const title = 'Xác nhận đặt hàng?'
    confirmSatus(title, '').then((result) => {
      if (result.isConfirmed) {
        const preRequest = {
          ...request,
          shipMoney: phiShip,
          duKien: timeShip,
          totalMoney: arrData.reduce((tong, e) => tong + e.gia * e.soLuong, 0),
          billDetail: arrData.map((product) => {
            return {
              nameProduct: product.name + ' - ' + product.size,
              idProduct: product.id,
              quantity: product.soLuong,
              price: product.gia,
            }
          }),
        }
        if (selectedValue === 0) {
          clientCheckoutApi.datHang(preRequest).then((response) => {
            if (response.data.success) {
              arrData.forEach((e) => {
                dispatch(removeCart(e))
              })
              toast.success('Đặt hàng thành công')
              navigate('/home')
            }
          })
        } else {
          clientCheckoutApi
            .submitOrder(
              preRequest.totalMoney + preRequest.shipMoney,
              'Thanh toan don hang F-Shoes',
            )
            .then((response) => {
              console.log(response.data)
            })
        }
      }
    })
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Paper
        sx={{
          padding: '40px',
          paddingTop: 0,
          minHeight: '68vh',
          marginBottom: '15px',
          py: 2,
        }}>
        <Grid container spacing={2}>
          <Grid item lg={7} sx={{ px: { lg: '40px' } }} width={'100%'}>
            <h3>Thông tin giao hàng</h3>
            <Typography>
              <span className="required"> *</span>Họ và tên
            </Typography>
            <TextField
              onChange={(e) => {
                setRequest({ ...request, fullName: e.target.value })
              }}
              size="small"
              fullWidth
              id="fullname"
            />
            <Grid container mt={0} spacing={3}>
              <Grid item xs={12} lg={7}>
                <Typography>
                  <span className="required"> *</span>Email
                </Typography>
                <TextField
                  onChange={(e) => {
                    setRequest({ ...request, email: e.target.value })
                  }}
                  size="small"
                  fullWidth
                  id="email"
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <Typography>
                  <span className="required"> *</span>Số điện thoại
                </Typography>
                <TextField
                  onChange={(e) => {
                    setRequest({ ...request, phone: e.target.value })
                  }}
                  size="small"
                  fullWidth
                  id="phone"
                />
              </Grid>
            </Grid>
            <Grid container mt={0} spacing={3}>
              <Grid item xs={12} lg={4}>
                <Typography>
                  <span className="required"> *</span>Tỉnh/thành phố
                </Typography>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  id="input-tinh"
                  value={selectedTinh}
                  onChange={handleTinhChange}
                  options={tinh.map((item) => ({
                    label: item.provinceName,
                    id: item.provinceID,
                  }))}
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Typography>
                  <span className="required"> *</span>Quận/huyện
                </Typography>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  id="input-huyen"
                  value={selectedHuyen}
                  onChange={handleHuyenChange}
                  options={huyen.map((item) => ({
                    label: item.districtName,
                    id: item.districtID,
                  }))}
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Typography>
                  <span className="required"> *</span>Xã/thị trấn
                </Typography>
                <Autocomplete
                  popupIcon={null}
                  fullWidth
                  size="small"
                  className="search-field"
                  id="input-xa"
                  value={selectedXa}
                  onChange={handleXaChange}
                  options={xa.map((item) => ({ label: item.wardName, id: item.wardCode }))}
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <Typography>
                <span className="required"> *</span>Địa chỉ cụ thể
              </Typography>
              <TextField
                onChange={(e) => {
                  setRequest({ ...request, address: e.target.value })
                }}
                size="small"
                fullWidth
                id="dia-chi"
              />
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <Typography>Ghi chú</Typography>
              <TextField
                onChange={(e) => {
                  setRequest({ ...request, note: e.target.value })
                }}
                size="small"
                fullWidth
                id="dia-chi"
              />
            </Grid>
            <h3>Phương thức thanh toán</h3>
            <FormControl sx={{ width: '100%' }}>
              <RadioGroup
                value={selectedValue}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group">
                <div className="ck-pttt">
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio size="small" onChange={handleRadioChange} value={0} />
                    <img
                      alt="error"
                      src={require('../../assets/image/vnpay.jpg')}
                      style={{
                        maxWidth: '50px',
                        maxHeight: '50px',
                        verticalAlign: 'middle',
                      }}
                    />
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <div className="ck-pttt">
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio size="small" onChange={handleRadioChange} value={1} />
                    <img
                      alt="error"
                      src={require('../../assets/image/thanhtoan.jpg')}
                      style={{
                        maxWidth: '50px',
                        maxHeight: '50px',
                        verticalAlign: 'middle',
                      }}
                    />
                    Thanh toán ngay
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={5} width={'100%'}>
            <Paper sx={{ height: '100%' }} variant="outlined">
              <LabelTitle title="Đơn hàng của bạn" />
              <Table>
                {arrData.map((cart) => (
                  <TableBody>
                    <TableCell
                      to={`/product/${cart.id}`}
                      style={{ verticalAlign: 'middle' }}
                      sx={{ px: 0 }}>
                      <span
                        style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          marginLeft: '10px',
                        }}>
                        <p style={{ margin: 0 }}>{cart.name}</p>
                        <b style={{ margin: 0 }}>
                          size:{' '}
                          {parseFloat(cart.size) % 1 === 0
                            ? parseFloat(cart.size).toFixed(0)
                            : parseFloat(cart.size).toFixed(1)}
                        </b>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>Số Lượng: {cart.soLuong}</p>
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { md: 'table-cell', xs: 'none' },
                        color: 'red',
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      {(cart.gia * cart.soLuong).toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </TableCell>
                  </TableBody>
                ))}
              </Table>
              <Grid sx={{ mt: 2, ml: 2, mr: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                  sx={{ flex: 1, minWidth: '100px', width: '80%' }}
                  value={voucher.name === '' ? 'Chọn mã giảm giá' : voucher.name}
                  size="small"
                  disabled
                />
                <Button
                  sx={{ ml: 2, mr: 1, width: 'auto' }}
                  variant="outlined"
                  onClick={() => setOpenModalVoucher(true)}>
                  <b>Chọn mã</b>
                </Button>
                <ModalVoucher
                  open={openModalVoucher}
                  setOpen={setOpenModalVoucher}
                  setVoucher={setVoucher}
                  voucher={voucher}
                  arrData={arrData}
                  setGiamGia={setGiamGia}
                />
              </Grid>
              <Box sx={{ m: 1, ml: 2, mr: 2 }}>
                <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                  <Typography>Phí vận chuyển</Typography>
                  <Typography color={'red'}>
                    <b className="ck-phi">
                      {phiShip.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </b>
                  </Typography>
                </Stack>
                <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                  <Typography>Giảm giá</Typography>
                  <Typography color={'red'}>
                    <b className="ck-phi">
                      {giamGia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </b>
                  </Typography>
                </Stack>
                <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                  <Typography>Ngày nhận dự kiến: </Typography>
                  <Typography color={'red'}>
                    <b className="ck-phi">{dayjs(timeShip).format('DD-MM-YYYY')}</b>
                  </Typography>
                </Stack>
                <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                  <Typography>
                    <b className="ck-tong-tien">Tổng số tiền</b>
                  </Typography>
                  <Typography color={'red'}>
                    <b className="ck-tong-tien">
                      {(
                        arrData.reduce((tong, e) => tong + e.gia * e.soLuong, 0) +
                        phiShip -
                        giamGia
                      ).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </b>
                  </Typography>
                </Stack>
              </Box>
              <Button
                onClick={() => {
                  finishCheckout()
                }}
                size="sm"
                variant="contained"
                color="success"
                sx={{ float: 'right', my: 2, mr: 2 }}>
                <b>Đặt hàng</b>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
