import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import './Order.css'
import ClientAccountApi from '../../../api/client/clientAccount'
import { getStatus } from '../../../services/constants/statusHoaDon'
import { TbEyeEdit } from 'react-icons/tb'
import dayjs from 'dayjs'
import { getStatusStyle } from '../../admin/hoadon/getStatusStyle'
import { getStatusProfile } from '../../../services/constants/statusHoaDonProfile'

export default function Order() {
  const [getBill, setGetBill] = useState([])
  const [getBillTable, setGetBillTable] = useState([])
  const [valueTabHD, setValueTabHD] = React.useState('all')
  const listSttHD = [0, 1, 2, 3, 4, 5, 6, 7]
  const [filter, setFilter] = useState({
    status: '',
    code: null,
  })

  const handleChangeTab = (event, newValue) => {
    setValueTabHD(newValue)
    const updatedFilter = { ...filter, status: newValue === 'all' ? '' : newValue }
    setFilter(updatedFilter)
  }

  useEffect(() => {
    ClientAccountApi.getAllBill(filter).then((response) => {
      setGetBill(response.data.data)
    })
  }, [filter])

  useEffect(() => {
    ClientAccountApi.getAllBillTable(filter).then((response) => {
      setGetBillTable(response.data.data)
    })
  }, [filter])

  console.log(getBillTable + ' meifsidfnofjiwrqwpeqeqopwekwqpo')

  const data = Array.from({ length: 10 }).fill(null)

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }
  return (
    <>
      <div className="order">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'pink' }}>
          <Tabs value={valueTabHD} onChange={handleChangeTab} className="tabSttHD">
            <Tab label={'Tất cả'} key={'tabSttHd all'} value={'all'}></Tab>
            {listSttHD.map((row, i) => (
              <Tab label={getStatusProfile(row)} key={'tabSttHd' + i} value={row}></Tab>
            ))}
          </Tabs>
        </Box>
        <TextField
          sx={{
            width: '100%',
            marginTop: '20px',
            border: 'none',
            backgroundColor: 'white',
            marginBottom: '20px',
          }}
          placeholder="Tìm kiếm theo mã hóa đơn"
          size="small"
          onChange={(e) => setFilter({ ...filter, code: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="cam" />
              </InputAdornment>
            ),
          }}
        />

        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
          <Divider />
          {/* {getBill.map((item, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={2} style={{ marginTop: '5px', marginBottom: '20px' }}>
                <Grid item xs={2}>
                  <div style={{ width: '90px', height: '90px', backgroundColor: 'black' }}>
                    <img src={item.url} alt="error" style={{ width: '100%', height: '100%' }} />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" fontFamily={'monospace'} fontWeight={'bolder'}>
                    {item.nameProduct + ' ' + item.material + ' ' + item.sole} "{item.color}"
                  </Typography>
                  <Typography>
                    Phân loại hàng: {item.category} - {item.size}
                  </Typography>
                  <Typography>X{item.quantity}</Typography>
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <span>
                      {item.price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <Link to={`/profile/get-by-idBill/${item.id}`}>
                    <Tooltip title="Xem chi tiết đơn hàng">
                      <IconButton sx={{ marginLeft: '30px' }} color="cam">
                        <TbEyeEdit />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Grid>
              </Grid>

              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))} */}
          {getBillTable.map((item, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={2} style={{ marginTop: '5px', paddingBottom: '20px' }}>
                <Grid item xs={12}>
                  <Paper elevation={3}>
                    <div
                      style={{
                        height: '250px',
                        backgroundColor: 'white',
                      }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>
                        <span style={{ paddingTop: '20px', paddingLeft: '20px' }}>{item.code}</span>
                        <div style={{ paddingTop: '20px', paddingRight: '20px' }}>
                          <Chip
                            className={getStatusStyle(item.status)}
                            label={getStatus(item.status)}
                            size="small"
                          />
                        </div>
                      </Stack>

                      <Divider
                        sx={{ height: '1px', backgroundColor: 'black', marginTop: '20px' }}
                      />

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>
                        <div style={{ paddingTop: '20px', paddingLeft: '20px' }}>
                          <Typography style={{ marginBottom: '20px' }}>
                            Ngày đặt hàng: {dayjs(item.createdAt).format('DD/MM/YYYY')}
                          </Typography>
                          {item.completeDate ? (
                            <Typography>
                              Ngày Nhận hàng: {dayjs(item.completeDate).format('DD/MM/YYYY')}
                            </Typography>
                          ) : (
                            <Typography>
                              Ngày dự kiến nhận:{' '}
                              {dayjs(item.desiredReceiptDate).format('DD/MM/YYYY')}
                            </Typography>
                          )}
                          <Button
                            sx={{ marginTop: '30px' }}
                            component={Link}
                            to={`/profile/get-by-idBill/${item.id}`}
                            variant="outlined"
                            color="cam">
                            Thông tin chi tiết
                          </Button>
                        </div>
                        <div style={{ paddingTop: '20px', paddingRight: '20px' }}>
                          <Typography style={{ marginBottom: '20px' }}>
                            Tiền ship: {formatPrice(item.moneyShip)}
                          </Typography>
                          <Typography>Tổng tiền: {formatPrice(item.moneyAfter)}</Typography>
                          <Button sx={{ marginTop: '30px' }} variant="outlined" color="cam">
                            Trả hàng
                          </Button>
                        </div>
                      </Stack>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
