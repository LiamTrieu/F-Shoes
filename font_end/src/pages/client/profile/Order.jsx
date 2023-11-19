import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import './Order.css'
import ClientAccountApi from '../../../api/client/clientAccount'
import { getStatus } from '../../../services/constants/statusHoaDon'
import { Link } from 'react-router-dom'
import { TbEyeEdit } from 'react-icons/tb'
import dayjs from 'dayjs'

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
  return (
    <>
      <div className="order">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={valueTabHD} onChange={handleChangeTab} className="tabSttHD">
            <Tab label={'Tất cả'} key={'tabSttHd all'} value={'all'}></Tab>
            {listSttHD.map((row, i) => (
              <Tab label={getStatus(row)} key={'tabSttHd' + i} value={row}></Tab>
            ))}
          </Tabs>
        </Box>
        <TextField
          sx={{
            width: '100%',
            marginTop: '20px',
            border: 'none',
            backgroundColor: '#C0C0C0',
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
        <Paper elevation={3}>
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: '#FC8434' }}>
                <TableRow>
                  <TableCell align="center">Mã hóa đơn</TableCell>
                  <TableCell align="center">Ngày mua</TableCell>
                  <TableCell align="center">Ngày dự kiến nhận</TableCell>
                  <TableCell align="center">Ngày nhận</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getBillTable.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(row.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {' '}
                      {dayjs(row.desiredReceiptDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {row.completeDate
                        ? dayjs(row.completeDate).format('DD/MM/YYYY')
                        : 'Chưa nhận hàng'}
                    </TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      {' '}
                      <Link to={`/profile/get-by-idBill/${row.id}`}>
                        <Tooltip title="Xem chi tiết đơn hàng">
                          <IconButton sx={{ marginLeft: '30px' }} color="cam">
                            <TbEyeEdit />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    </>
  )
}
