import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import LineChartDashBoard from './LineChartDashBoard'
import thongKeApi from '../../../api/admin/thongke/thongKeApi'

const DashboardCard = function ({ iconCart, title, total, product, order, color }) {
  return (
    <Grid2 lg={3} md={6} xs={12} justifyContent={'center'}>
      <Card variant="elevation" sx={{ p: 2, backgroundColor: color, color: 'white' }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {iconCart}
        </Box>
        <Typography mt={1} align="center" fontFamily={'monospace'} fontSize={'17px'}>
          Đơn hàng {title}
        </Typography>
        <Typography
          my={1}
          fontWeight={'600'}
          align="center"
          fontSize={'20px'}
          fontFamily={'monospace'}>
          {total} VND
        </Typography>
        <table
          style={{
            textAlign: 'center',
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '15px',
          }}>
          <thead>
            <tr>
              <td>Sản phẩm</td>
              <td>Đơn hàng</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold' }}>{product}</td>
              <td style={{ fontWeight: 'bold' }}>{order}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Grid2>
  )
}

export default function Dashboard() {
  const [getProductInMounth, setGetProductInMounth] = useState([])
  const [doanhThu, setDoanhThu] = useState({})
  const [dataBieuDo, setDataBieuDo] = useState([])
  const [filter, setFilter] = useState({
    page: 1,
    size: 5,
  })
  const [requestBieuDo, setRequestBieuDo] = useState({
    startDate: dayjs(new Date()).format('DD-MM-YYYY HH:mm:ss'),
    endDate: dayjs(new Date()).format('DD-MM-YYYY HH:mm:ss'),
  })
  const [typeBieuDo, setTypeBieuDo] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const fecthData = (filter) => {
    thongKeApi.getAllProductInMounth(filter).then((response) => {
      setGetProductInMounth(
        response.data.data.data.map((e) => {
          return { ...e, image: e.image.split(',') }
        }),
      )
      setTotalPages(response.data.data.totalPages)
    })
  }

  const fecthDoanhThu = () => {
    thongKeApi.getDoanhThu().then((response) => {
      setDoanhThu(response.data.data[0])
    })
  }

  const fetchThongKeTongTien = (requestBieuDo) => {
    thongKeApi.getThongKeTongTien(requestBieuDo).then((response) => {
      setDataBieuDo(response.data.data)
    })
  }

  const fetchThongKeDonHang = (requestBieuDo) => {
    thongKeApi.getThongKeDonHang(requestBieuDo).then((response) => {
      setDataBieuDo(response.data.data)
      console.log(response.data.data)
    })
  }

  useEffect(() => {
    fecthData(filter)
  }, [filter, doanhThu])

  useEffect(() => {
    fecthDoanhThu()
  }, [])

  useEffect(() => {
    if (typeBieuDo === 1) {
      fetchThongKeDonHang(requestBieuDo)
    } else {
      fetchThongKeTongTien(requestBieuDo)
    }
  }, [typeBieuDo, requestBieuDo])

  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Typography variant="h6" fontWeight={'bold'} my={2}>
        Dashboard Overview
      </Typography>
      <Grid2 container spacing={2} mb={2}>
        <DashboardCard
          iconCart={<EventNoteIcon />}
          title={'hôm nay'}
          total={doanhThu.doanhSoNgay}
          product={doanhThu.soLuongSanPhamNgay}
          order={doanhThu.soDonHangNgay}
          color={'#0694a2'}
        />
        <DashboardCard
          iconCart={<AutoAwesomeMotionIcon />}
          title={'hôm qua'}
          total={doanhThu.doanhSoHomQua}
          product={doanhThu.soLuongSanPhamHomQua}
          order={doanhThu.soDonHangHomQua}
          color={'#ff8a4c'}
        />
        <DashboardCard
          iconCart={<AssignmentIcon />}
          title={'tháng này'}
          total={doanhThu.doanhSoThangNay}
          product={doanhThu.soLuongSanPhamThangNay}
          order={doanhThu.soDonHangThangNay}
          color={'#3f83f8'}
        />
        <DashboardCard
          iconCart={<AssessmentIcon />}
          title={'năm nay'}
          total={doanhThu.doanhSoNamNay}
          product={doanhThu.soLuongSanPhamNamNay}
          order={doanhThu.soDonHangNamNay}
          color={'#0e9f6e'}
        />
      </Grid2>
      <Paper variant="outlined" sx={{ mb: 2 }}>
        <Typography fontWeight={'bold'} m={2}>
          Biểu đồ thống kê
        </Typography>
        <Box m={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid2 container spacing={2}>
              <Grid2 lg={3} md={4} xs={5}>
                <DatePicker
                  format="DD-MM-YYYY"
                  label="Từ ngày"
                  defaultValue={dayjs(new Date())}
                  onChange={(e) =>
                    setRequestBieuDo({
                      ...requestBieuDo,
                      startDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                    })
                  }
                />
              </Grid2>
              <Grid2 lg={3} md={4} xs={5}>
                <DatePicker
                  sx={{ mx: 2 }}
                  format="DD-MM-YYYY"
                  label="Đến ngày"
                  defaultValue={dayjs(new Date())}
                  onChange={(e) =>
                    setRequestBieuDo({
                      ...requestBieuDo,
                      endDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                    })
                  }
                />
              </Grid2>
              <Grid2 lg={3} md={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Giá trị hiện thị</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Giá trị hiện thị"
                    onChange={(e) => setTypeBieuDo(e.target.value)}
                    value={typeBieuDo}>
                    <MenuItem value={1}>Đơn hàng</MenuItem>
                    <MenuItem value={2}>Tổng tiền</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
            </Grid2>
          </LocalizationProvider>
          <LineChartDashBoard dataBieuDo={dataBieuDo} typeBieuDo={typeBieuDo} />
        </Box>
      </Paper>
      <Typography variant="h6" fontWeight={'bold'} my={2}>
        Danh sách sản phẩm bán chạy trong tháng
      </Typography>
      <Paper variant="outlined" sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ảnh sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá tiền</TableCell>
              {/* <TableCell align="right">Kích cỡ</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {getProductInMounth.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left" width={'20%'}>
                  <img src={row.image[0]} width={'40%'} alt="error" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.nameProduct}
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                {/* <TableCell align="right">{row.size}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack
          mt={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={0}>
          <Typography component="span" variant={'body2'} mt={0.5}>
            <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Xem</Typography>
            <Select
              color="cam"
              onChange={(e) => {
                setFilter({ ...filter, size: e.target.value })
              }}
              sx={{ height: '25px', mx: 0.5 }}
              size="small"
              value={filter.size}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>sản phẩm</Typography>
          </Typography>
          <Pagination
            variant="outlined"
            color="cam"
            count={totalPages}
            page={filter.page}
            onChange={(e, value) => {
              e.preventDefault()
              setFilter({ ...filter, page: value })
            }}
          />
        </Stack>
      </Paper>
    </Container>
  )
}
