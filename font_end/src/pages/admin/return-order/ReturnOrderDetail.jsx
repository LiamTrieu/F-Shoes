import React, { useEffect, useState } from 'react'
import BreadcrumbsCustom from '../../../components/BreadcrumbsCustom'
import { Link, useNavigate, useParams } from 'react-router-dom'
import returnApi from '../../../api/admin/return/returnApi'
import {
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import './index.css'
import { RiBillLine } from 'react-icons/ri'
import Carousel from 'react-material-ui-carousel'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'

import PersonIcon from '@mui/icons-material/Person'
import BusinessIcon from '@mui/icons-material/Business'

const listBreadcrumbs = [{ name: 'Trả hàng', link: '/admin/return-order/0' }]
export default function ReturnOrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [returnDetail, setReturnDetail] = useState({})
  const [billDetail, setBillDetail] = useState([])
  const [traKhach, setTraKhach] = useState(0)
  const [typePay, setTypePay] = useState(0)
  const [codePay, setCodePay] = useState(null)

  useEffect(() => {
    returnApi.getReturnDetail(id).then(
      (res) => {
        if (res.data.success) {
          setReturnDetail(res.data.data)
        } else {
          navigate(-1)
        }
      },
      () => {},
    )
    returnApi.getReturnDetail2(id).then(
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

  function xacNhan() {
    const title = 'Xác nhận yêu cầu trả sản phẩm?'
    confirmSatus(title, '').then((result) => {
      if (result.isConfirmed) {
        returnApi.xacNhan(id).then(
          (res) => {
            if (res.data.success) {
              toast.success('Xác nhận yêu cầu thành công!')
              navigate('/admin/return-order/0')
            } else {
              toast.error('Xác nhận yêu cầu thất bại!')
            }
          },
          () => {},
        )
      }
    })
  }

  function huy() {
    const title = 'Từ chối yêu cầu trả sản phẩm?'
    confirmSatus(title, '').then((result) => {
      if (result.isConfirmed) {
        returnApi.huy(id).then(
          (res) => {
            if (res.data.success) {
              toast.success('Từ chối yêu cầu thành công!')
              navigate('/admin/return-order/0')
            } else {
              toast.error('Từ chối yêu cầu thất bại!')
            }
          },
          () => {},
        )
      }
    })
  }

  function hoanThanh() {
    const returnBill = {
      idReturn: id,
      returnMoney:
        billDetail.reduce((total, e) => {
          return total + e.quantity * e.price
        }, 0) *
        (1 - returnDetail.fee / 100),
      moneyPayment: traKhach,
      type: typePay,
      codePayment: codePay,
      fee: returnDetail.fee,
      listDetail: [],
    }
    if (returnBill.listDetail && returnBill.listDetail.length <= 0) {
      toast.warning('Vui lòng chọn sản phẩm cần trả!')
    } else {
      const title = 'Xác nhận hoàn trả sản phẩm?'
      confirmSatus(title, '').then((result) => {
        if (result.isConfirmed) {
          returnApi.hoanThanh(returnBill).then(
            (res) => {
              if (res.data.success) {
                toast.success('Trả hàng thành công!')
                navigate('/admin/return-order/3')
              } else {
                toast.error('Trả hàng thất bại!')
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
          <Paper className="paper-return" sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={'20%'} style={{ fontWeight: 'bold' }}>
                    Sản phẩm
                  </TableCell>
                  <TableCell width={'15%'} style={{ fontWeight: 'bold' }} align="center">
                    Số lượng
                  </TableCell>
                  <TableCell width={'5%'} style={{ fontWeight: 'bold' }} align="center">
                    Đơn giá
                  </TableCell>
                  <TableCell width={'5%'} style={{ fontWeight: 'bold' }} align="center">
                    Tổng
                  </TableCell>
                  <TableCell width={'15%'} style={{ fontWeight: 'bold' }} align="center">
                    Ghi chú
                  </TableCell>
                </TableRow>
              </TableHead>
              {billDetail.map((product) => (
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
                  <TableCell width={'15%'} align="center">
                    <Chip label={<b>Số lượng: {product.quantity}</b>} />
                  </TableCell>
                  <TableCell width={'5%'} align="center">
                    <TextField
                      className="input-soluong-return"
                      sx={{ width: '90px' }}
                      size="small"
                      disabled
                      value={product.price.toLocaleString('en-US')}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell width={'5%'} align="center">
                    <b style={{ color: 'red' }}>
                      {(product.price * product.quantity).toLocaleString('en-US')}
                    </b>
                  </TableCell>
                  <TableCell width={'15%'} align="center">
                    <b>{product?.note}</b>
                  </TableCell>
                </TableBody>
              ))}
            </Table>
          </Paper>
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
                      : returnDetail?.status === 3
                        ? 'Đang xử lý'
                        : returnDetail?.status === 4
                          ? 'Đã hủy'
                          : 'Đã từ chối'
                }
                style={{
                  color:
                    returnDetail?.status === 1
                      ? 'green'
                      : returnDetail?.status === 0
                        ? '#F2741F'
                        : returnDetail?.status === 3
                          ? 'blue'
                          : 'red',
                }}
                size="small"
              />
            </Typography>
            <div
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                alignItems: 'center',
                backgroundColor: '#EBEBEB',
                padding: '10px',
                borderRadius: '10px',
              }}>
              <div>
                <RiBillLine style={{ marginRight: '5px' }} />
                <b>
                  Mã hóa đơn: &nbsp;
                  <Link to={`/admin/bill-detail/${returnDetail?.idBill}`}>
                    {returnDetail?.codeBill}
                  </Link>
                </b>
              </div>
              <div style={{ marginTop: '10px' }}>
                <PersonIcon style={{ marginRight: '5px', marginBottom: '-5px' }} />
                <span>
                  <b>Khách hàng: </b>
                  {returnDetail?.fullName ? returnDetail?.fullName : 'Khách lẻ'}
                </span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <PersonIcon style={{ marginRight: '5px', marginBottom: '-5px' }} />
                <span>
                  <b>Người nhận: </b>
                  {returnDetail?.customer ? returnDetail?.customer : 'Khách lẻ'}
                </span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <BusinessIcon style={{ marginRight: '5px', marginBottom: '-5px' }} />
                <span>
                  <b>Địa chỉ: </b>
                  {returnDetail?.address ? returnDetail?.address : ''}
                </span>
              </div>
            </div>
            <Grid container mt={2}>
              <Grid xs={6}>Số tiền hoàn trả </Grid>
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

            {returnDetail?.status !== 1 && returnDetail?.status !== 2 && (
              <>
                {returnDetail?.status !== 2 && (
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      onClick={huy}
                      sx={{ mt: 5 }}
                      color="error"
                      variant="contained"
                      fullWidth>
                      Từ chối
                    </Button>
                    {returnDetail?.status === 0 && (
                      <Button
                        onClick={xacNhan}
                        sx={{ mt: 5 }}
                        color="success"
                        variant="contained"
                        fullWidth>
                        Xác nhận
                      </Button>
                    )}
                    {returnDetail?.status === 3 && (
                      <Button
                        onClick={hoanThanh}
                        sx={{ mt: 5 }}
                        color="success"
                        variant="contained"
                        fullWidth>
                        Hoàn thành
                      </Button>
                    )}
                  </Stack>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
