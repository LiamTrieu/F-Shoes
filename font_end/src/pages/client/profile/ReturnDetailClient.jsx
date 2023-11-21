import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import returnApi from '../../../api/admin/return/returnApi'
import {
  Button,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TextField,
  Typography,
} from '@mui/material'
import './returnDetailClient.css'
import { RiBillLine } from 'react-icons/ri'
import Carousel from 'react-material-ui-carousel'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import { TbTruckReturn } from 'react-icons/tb'
import clientReturnApi from '../../../api/client/clientReturnApi'

export default function ReturnDetailClient({ id, setOpen, setTab }) {
  const navigate = useNavigate()
  const [returnDetail, setReturnDetail] = useState({})
  const [billDetail, setBillDetail] = useState([])

  useEffect(() => {
    returnApi.getReturnDetail(id).then(
      (res) => {
        if (res.data.success) {
          setReturnDetail(res.data.data)
        }
      },
      () => {},
    )
    returnApi.getReturnDetail2(id).then(
      (res) => {
        if (res.data.success) {
          setBillDetail(res.data.data)
        }
      },
      () => {},
    )
  }, [])

  function huy() {
    const title = 'Hủy yêu cầu trả sản phẩm?'
    confirmSatus(title, '').then((result) => {
      if (result.isConfirmed) {
        clientReturnApi.huy(id).then(
          (res) => {
            if (res.data.success) {
              toast.success('Hủy yêu cầu thành công!')
              setOpen(false)
              setTab('traHang')
            } else {
              toast.error('Hủy yêu cầu thất bại!')
            }
          },
          () => {},
        )
      }
    })
  }

  return (
    <div className="tra-hang" style={{ padding: '15px' }}>
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
                    <Chip label={<b>Số lượng: {product.quantity}</b>} />
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
                    <b>{product?.note}</b>
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
                    : returnDetail?.status === 3
                    ? 'Đang xử lý'
                    : 'Đã hủy'
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
                <TbTruckReturn style={{ marginRight: '5px' }} />
                <b>
                  Mã đơn hoàn: &nbsp;
                  {returnDetail?.code}
                </b>
              </div>
              <div style={{ marginTop: '10px' }}>
                <RiBillLine style={{ marginRight: '5px' }} />
                <b>
                  Mã hóa đơn: &nbsp;
                  <Link to={`/profile/get-by-idBill/${returnDetail?.idBill}`}>
                    {returnDetail?.codeBill}
                  </Link>
                </b>
              </div>
            </div>
            <Grid container mt={2}>
              <Grid xs={6}>Tên người mua</Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b>{returnDetail?.customer}</b>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid xs={6}>Tổng sản phẩm </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b>
                  {billDetail.reduce((total, e) => {
                    return total + (e.quantity || 0)
                  }, 0)}
                </b>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid xs={6}>Tổng tiền </Grid>
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
                <b>{returnDetail?.fee}%</b>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid xs={6}>
                <b>Số tiền hoàn</b>
              </Grid>
              <Grid xs={6} sx={{ textAlign: 'right' }}>
                <b style={{ color: '#2874A6' }}>
                  {returnDetail?.status === 2
                    ? '0 VND'
                    : (
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

            {returnDetail?.status === 3 && (
              <div style={{ marginTop: '10px' }}>
                <b style={{ color: 'red' }}>
                  Lưu ý: Đóng gói hàng cận thận trước khi gửi. Và ghi rõ mã hoàn hàng{' '}
                  <span style={{ color: 'blue' }}>{returnDetail?.code}</span> khi gửi hàng lại shop
                </b>
              </div>
            )}
            {returnDetail?.status !== 2 && returnDetail?.status !== 1 && (
              <Stack direction="row" spacing={2} mt={2}>
                <Button onClick={huy} sx={{ mt: 5 }} color="error" variant="contained" fullWidth>
                  Hủy
                </Button>
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
