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
import PaidIcon from '@mui/icons-material/Paid'
import PaymentIcon from '@mui/icons-material/Payment'

const arrData = [
  {
    id: 2,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 40,
    gia: '100.000',
    soLuong: 1,
    image: 'https://shorturl.at/dfhyC',
    checked: false,
  },
  {
    id: 1,
    name: 'Air Jordan 1 Mid - Neutral Grey',
    size: 43,
    gia: '500.000',
    soLuong: 3,
    image: 'https://shorturl.at/dfhyC',
    checked: false,
  },
]

export default function Checkout() {
  const [tinh, setTinh] = useState([])
  const [huyen, setHuyen] = useState([])
  const [xa, setXa] = useState([])
  useEffect(() => {
    loadTinh()
  }, [])
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

  const handleTinhChange = (_, newValue) => {
    setSelectedTinh(newValue)
    setSelectedHuyen(null)
    if (newValue) {
      loadHuyen(newValue.id)
    } else {
      setHuyen([])
    }
  }

  const handleHuyenChange = (_, newValue) => {
    setSelectedHuyen(newValue)
    setSelectedXa(null)
    if (newValue) {
      loadXa(newValue.id)
    } else {
      setXa([])
    }
  }
  const handleXaChange = (_, newValue) => {
    setSelectedXa(newValue)
  }

  const [selectedValue, setSelectedValue] = useState(null)

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
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
            <TextField size="small" fullWidth id="dia-chi" />
            <Grid container mt={0} spacing={3}>
              <Grid item xs={12} lg={7}>
                <Typography>
                  <span className="required"> *</span>Email
                </Typography>
                <TextField size="small" fullWidth id="dia-chi" />
              </Grid>
              <Grid item xs={12} lg={5}>
                <Typography>
                  <span className="required"> *</span>Số điện thoại
                </Typography>
                <TextField size="small" fullWidth id="dia-chi" />
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
              <TextField size="small" fullWidth id="dia-chi" />
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <Typography>Ghi chú</Typography>
              <TextField size="small" fullWidth id="dia-chi" />
            </Grid>
            <h3>Phương thức thanh toán</h3>
            <FormControl sx={{ width: '100%' }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Thanh toán khi nhận hàng."
                name="radio-buttons-group">
                <div className="ck-pttt">
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <Radio
                      size="small"
                      checked={selectedValue === 'Thanh toán khi nhận hàng.'}
                      onChange={handleRadioChange}
                      value="Thanh toán khi nhận hàng."
                    />
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
                    <Radio
                      size="small"
                      checked={selectedValue === 'Thanh toán ngay.'}
                      onChange={handleRadioChange}
                      value="Thanh toán ngay."
                    />
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
                      <Box component="span" display={{ lg: 'inline', xs: 'none' }}>
                        <img
                          alt="error"
                          src={cart.image}
                          style={{
                            maxWidth: '20%',
                            maxHeight: '20%',
                            verticalAlign: 'middle',
                          }}
                        />
                      </Box>
                      <span
                        style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          marginLeft: '10px',
                        }}>
                        <p style={{ margin: 0 }}>
                          <b>{cart.name}</b>
                        </p>
                        <p style={{ margin: 0 }}>size: {cart.size}</p>
                        <p style={{ margin: 0 }}>SL: {cart.soLuong}</p>
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: '100px',
                        display: { md: 'table-cell', xs: 'none' },
                        color: 'red',
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      {cart.gia}&#8363;
                    </TableCell>
                  </TableBody>
                ))}
              </Table>
              <Grid sx={{ mt: 2, ml: 2, mr: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                  sx={{ flex: 1, minWidth: '100px', width: '80%' }}
                  label="Mã giảm giá"
                  size="small"
                />
                <Button sx={{ ml: 2, mr: 1, width: 'auto' }} variant="outlined">
                  <b>Chọn mã</b>
                </Button>
              </Grid>
              <Box sx={{ m: 1, ml: 2, mr: 2 }}>
                <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                  <Typography>Phí vận chuyển</Typography>
                  <Typography color={'red'}>
                    <b className="ck-phi">30000₫</b>
                  </Typography>
                </Stack>
                <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                  <Typography>Giảm giá</Typography>
                  <Typography color={'red'}>
                    <b className="ck-phi">30000₫</b>
                  </Typography>
                </Stack>
                <Stack sx={{ my: '29px' }} direction={'row'} justifyContent={'space-between'}>
                  <Typography>
                    <b className="ck-tong-tien">Tổng số tiền</b>
                  </Typography>
                  <Typography color={'red'}>
                    <b className="ck-tong-tien">30000₫</b>
                  </Typography>
                </Stack>
              </Box>
              <Button
                size="sm"
                variant="contained"
                color="success"
                sx={{ float: 'right', my: 2, mr: 2 }}>
                <b>thanh toán</b>
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
