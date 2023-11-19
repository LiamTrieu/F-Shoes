import React, { useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { Link, useNavigate, useParams } from 'react-router-dom'
import returnApi from '../../../api/admin/return/returnApi'
import {
  Button,
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
  TextField,
  Typography,
} from '@mui/material'
import './index.css'
import { RemoveCircle } from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import PersonIcon from '@mui/icons-material/Person'
import Carousel from 'react-material-ui-carousel'
import { toast } from 'react-toastify'

const listBreadcrumbs = [{ name: 'Trả hàng', link: '/admin/return-order/0' }]
export default function ReturnOrderDetail() {
  const param = useParams()
  const navigate = useNavigate()
  const [returnDetail, setReturnDetail] = useState({})
  const [billDetail, setBillDetail] = useState([])
  const [traKhach, setTraKhach] = useState(0)
  const [typePay, setTypePay] = useState(0)
  const [codePay, setCodePay] = useState(null)

  useEffect(() => {
    returnApi.getReturnDetail(param.id).then(
      (res) => {
        if (res.data.success) {
          setReturnDetail(res.data.data)
        } else {
          navigate(-1)
        }
      },
      () => {},
    )
    returnApi.getReturnDetail2(param.id).then(
      (res) => {
        if (res.data.success) {
          setBillDetail(res.data.data)
        } else {
          navigate(-1)
        }
      },
      () => {},
    )
  }, [])

  return (
    <div className="tra-hang">
      <BreadcrumbsCustom nameHere={returnDetail?.code} listLink={listBreadcrumbs} />
      <Grid container spacing={2} mt={2}>
        <Grid
          sx={{
            '::-webkit-scrollbar': {
              width: '0px',
            },
          }}
          item
          xs={8}
          style={{ overflow: 'auto', height: '77vh', paddingTop: 0 }}>
          {billDetail.map((product) => (
            <Paper className="paper-return" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  <TableCell width={'20%'}>
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                  <TableCell width={'15%'}>
                    <Chip label={<b>{product.quantity}</b>} />
                  </TableCell>
                  <TableCell width={'5%'}>
                    <TextField
                      className="input-soluong-return"
                      sx={{ width: '90px' }}
                      size="small"
                      disabled
                      value={product.price.toLocaleString('en-US')}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell width={'5%'}>
                    <b style={{ color: 'red' }}>
                      {(product.price * product.quantity).toLocaleString('en-US')}
                    </b>
                  </TableCell>
                  <TableCell width={'15%'}>
                    <TextField
                      value={product?.note}
                      disabled
                      color="cam"
                      placeholder="Ghi chú"
                      multiline
                      rows={2}
                      sx={{ marginRight: '10px' }}
                    />
                  </TableCell>
                </TableBody>
              </Table>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={4} style={{ paddingTop: 0 }}>
          <Paper
            sx={{
              p: 2,
              height: '77vh',
            }}>
            <Typography variant="h6" textAlign={'center'} color={'#229954'} fontWeight={'600'}>
              Thông tin hoàn trả{' '}
              <Chip
                label={
                  returnDetail?.status === 1
                    ? 'Hoàn thành'
                    : returnDetail?.status === 0
                    ? 'Chờ xác nhận'
                    : 'Đã hủy'
                }
                style={{
                  color:
                    returnDetail?.status === 1
                      ? 'green'
                      : returnDetail?.status === 0
                      ? 'yellow'
                      : 'red',
                }}
                size="small"
              />
            </Typography>
            <div
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#EBEBEB',
                padding: '10px',
                borderRadius: '10px',
              }}>
              <PersonIcon style={{ marginRight: '5px' }} />
              <b>
                {returnDetail?.customer} -{' '}
                <Link to={`/admin/bill-detail/bill/${returnDetail?.idBill}`}>
                  {returnDetail?.codeBill}
                </Link>
              </b>
            </div>
            <Grid container mt={2}>
              <Grid xs={6}>
                Tổng tiền{' '}
                <Chip
                  label={billDetail.reduce((total, e) => {
                    return total + (e.quantity || 0)
                  }, 0)}
                  size="small"
                />
              </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b style={{ color: 'red' }}>
                  {billDetail
                    .reduce((total, e) => {
                      return total + e.quantity * e.price
                    }, 0)
                    .toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                </b>
              </Grid>
            </Grid>

            <Grid container mt={2}>
              <Grid xs={6}>Phí trả hàng</Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <TextField
                  className="input-soluong-return-2"
                  sx={{ width: '150px' }}
                  size="small"
                  value={returnDetail?.fee}
                  disabled
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid xs={6}>
                <b>Cần trả khách</b>
              </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b style={{ color: '#2874A6' }}>
                  {(
                    billDetail.reduce((total, e) => {
                      return total + e.quantity * e.price
                    }, 0) *
                    (1 - returnDetail?.fee / 100)
                  ).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </b>
              </Grid>
            </Grid>

            {returnDetail?.status !== 1 && returnDetail?.status !== 2 && (
              <>
                <Grid container mt={2}>
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
                        const inputValue =
                          e.target.value.trim() === '' ? 0 : parseInt(e.target.value)

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
                <Grid container mt={2}>
                  <Grid xs={6}>
                    <b>Tiền dư</b>
                  </Grid>
                  <Grid xs={6} sx={{ textAlign: 'right' }}>
                    <b>
                      {/* {(
                    traKhach -
                    billDetail.reduce((total, e) => {
                      return total + e.quantityReturn * e.price
                    }, 0) *
                      (1 - phi / 100)
                  ).toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })} */}
                    </b>
                  </Grid>
                </Grid>
                <RadioGroup
                  sx={{ mt: 2 }}
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
                <Button sx={{ mt: 5 }} color="cam" variant="contained" fullWidth>
                  TRẢ HÀNG
                </Button>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
