import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
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
import LineChartDashBoard from './LineChartDashBoard'
import thongKeApi from '../../../api/admin/thongke/thongKeApi'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import './Dashboard.css'
import Empty from '../../../components/Empty'
import { formatCurrency } from '../../../services/common/formatCurrency '
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const DashboardCard = function ({ iconCart, title, total, product, order, color }) {
  return (
    <Grid2 lg={3} md={6} xs={12} justifyContent={'center'}>
      <Card variant="elevation" sx={{ p: 2, backgroundColor: color, color: 'white' }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {iconCart}
        </Box>
        <Typography mt={1} align="center" fontFamily={'monospace'} fontSize={'17px'}>
          {title}
        </Typography>
        <Typography
          my={1}
          fontWeight={'600'}
          align="center"
          fontSize={'20px'}
          fontFamily={'monospace'}>
          {formatCurrency(total)}
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
  const [dataProductSelling, setDataProductSelling] = useState([])
  const [dataProductTakeOut, setDataProductTakeOut] = useState([])
  const [indexButton, setIndexButton] = useState(1)
  const [doanhThu, setDoanhThu] = useState({})
  const [doanhThuCu, setDoanhThuCu] = useState({})
  const [dataBieuDo, setDataBieuDo] = useState([])
  const [filter, setFilter] = useState({
    page: 1,
    size: 5,
  })
  const [filterInCustom, setFilterInCustom] = useState({
    startDate: dayjs().format('DD-MM-YYYY'),
    endDate: dayjs().format('DD-MM-YYYY'),
    page: 1,
    size: 5,
  })
  const [filterTakeOut, setFilterTakeOut] = useState({
    page: 1,
    size: 5,
  })
  const [tkDoanhThuNgay, setTkDoanhThuNgay] = useState(null)
  const [tkDoanhThuTuan, setTkDoanhThuTuan] = useState(null)
  const [tkDoanhThuThang, setTkDoanhThuThang] = useState(null)
  const [tkDoanhThuNam, setTkDoanhThuNam] = useState(null)
  const [tkDonHangNgay, setTkDonHangNgay] = useState(null)
  const [tkDonHangTuan, setTkDonHangTuan] = useState(null)
  const [tkDonHangThang, setTkDonHangThang] = useState(null)
  const [tkDonHangNam, setTkDonHangNam] = useState(null)
  const [tkSanPhamNgay, setTkSanPhamNgay] = useState(null)
  const [tkSanPhamTuan, setTkSanPhamTuan] = useState(null)
  const [tkSanPhamThang, setTkSanPhamThang] = useState(null)
  const [tkSanPhamNam, setTkSanPhamNam] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [totalPagesTakeOut, setTotalPagesTakeOut] = useState(0)

  const fecthDataDay = (filter) => {
    thongKeApi.getAllProductInDay(filter).then((response) => {
      setDataProductSelling(
        response.data.data.data.map((e) => {
          return { ...e, image: e.image.split(',') }
        }),
      )
      setTotalPages(response.data.data.totalPages)
    })
  }

  const fecthDataWeek = (filter) => {
    thongKeApi.getAllProductInWeek(filter).then((response) => {
      setDataProductSelling(
        response.data.data.data.map((e) => {
          return { ...e, image: e.image.split(',') }
        }),
      )
      setTotalPages(response.data.data.totalPages)
    })
  }

  const fecthDataMonth = (filter) => {
    thongKeApi.getAllProductInMonth(filter).then((response) => {
      setDataProductSelling(
        response.data.data.data.map((e) => {
          return { ...e, image: e.image.split(',') }
        }),
      )
      setTotalPages(response.data.data.totalPages)
    })
  }

  const fecthDataYear = (filter) => {
    thongKeApi.getAllProductInYear(filter).then((response) => {
      setDataProductSelling(
        response.data.data.data.map((e) => {
          return { ...e, image: e.image.split(',') }
        }),
      )
      setTotalPages(response.data.data.totalPages)
    })
  }

  const fecthDataInCustom = (filter) => {
    thongKeApi.getProductInCustom(filter).then((response) => {
      setDataProductSelling(
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

  const fecthDoanhThuCu = () => {
    thongKeApi.getDoanhThuCu().then((response) => {
      setDoanhThuCu(response.data.data[0])
    })
  }

  const fetchThongKeDonHang = () => {
    thongKeApi.getThongKeDonHang().then((response) => {
      setDataBieuDo(response.data.data)
    })
  }

  const fecthDataTakeOut = (filter) => {
    thongKeApi.getProductTakeOut(filter).then((response) => {
      setDataProductTakeOut(
        response.data.data.data.map((e) => {
          return { ...e, image: e.image.split(',') }
        }),
      )
      setTotalPagesTakeOut(response.data.data.totalPages)
    })
  }

  const handleRateCalculation = (a, b) => {
    if (a === 0 && b === 0) {
      return null
    } else if (a === 0) {
      return parseFloat((((0 - b) / 1) * 100).toFixed(2))
    } else {
      return parseFloat((((a - b) / a) * 100).toFixed(2))
    }
  }

  const handleGrowthRate = () => {
    const dateRevenue = handleRateCalculation(doanhThu.doanhSoNgay, doanhThuCu.doanhSoNgayTruoc)
    const weekRevenue = handleRateCalculation(doanhThu.doanhSoTuanNay, doanhThuCu.doanhSoTuanTruoc)
    const monthRevenue = handleRateCalculation(
      doanhThu.doanhSoThangNay,
      doanhThuCu.doanhSoThangTruoc,
    )
    const yearRevenue = handleRateCalculation(doanhThu.doanhSoNamNay, doanhThuCu.doanhSoNamTruoc)
    const dateOrder = handleRateCalculation(doanhThu.soDonHangNgay, doanhThuCu.soDonNgayTruoc)
    const weekOrder = handleRateCalculation(doanhThu.soDonHangTuanNay, doanhThuCu.soDonTuanTruoc)
    const monthOrder = handleRateCalculation(doanhThu.soDonHangThangNay, doanhThuCu.soDonThangTruoc)
    const yearOrder = handleRateCalculation(doanhThu.soDonHangNamNay, doanhThuCu.soDonNamTruoc)
    const dateProduct = handleRateCalculation(
      doanhThu.soLuongSanPhamNgay,
      doanhThuCu.soLuongSanPhamNgayTruoc,
    )
    const weekProduct = handleRateCalculation(
      doanhThu.soLuongSanPhamTuanNay,
      doanhThuCu.soLuongSanPhamTuanTruoc,
    )
    const monthProduct = handleRateCalculation(
      doanhThu.soLuongSanPhamThangNay,
      doanhThuCu.soLuongSanPhamThangTruoc,
    )
    const yearProduct = handleRateCalculation(
      doanhThu.soLuongSanPhamNamNay,
      doanhThuCu.soLuongSanPhamNamTruoc,
    )

    setTkDoanhThuNgay(dateRevenue)
    setTkDoanhThuTuan(weekRevenue)
    setTkDoanhThuThang(monthRevenue)
    setTkDoanhThuNam(yearRevenue)
    setTkDonHangNgay(dateOrder)
    setTkDonHangTuan(weekOrder)
    setTkDonHangThang(monthOrder)
    setTkDonHangNam(yearOrder)
    setTkSanPhamNgay(dateProduct)
    setTkSanPhamTuan(weekProduct)
    setTkSanPhamThang(monthProduct)
    setTkSanPhamNam(yearProduct)

    console.log('=====' + handleRateCalculation(10, 1000))
  }

  useEffect(() => {
    if (indexButton === 1) {
      fecthDataDay(filter)
    } else if (indexButton === 2) {
      fecthDataWeek(filter)
    } else if (indexButton === 3) {
      fecthDataMonth(filter)
    } else if (indexButton === 4) {
      fecthDataYear(filter)
    }
    fecthDataTakeOut(filterTakeOut)
    fecthDataInCustom(filterInCustom)
  }, [filter, doanhThu, indexButton, filterTakeOut, filterInCustom])

  useEffect(() => {
    fecthDoanhThu()
    fecthDoanhThuCu()
  }, [])

  useEffect(() => {
    fetchThongKeDonHang()
  }, [])

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
          title={'Tuần này'}
          total={doanhThu.doanhSoTuanNay}
          product={doanhThu.soLuongSanPhamTuanNay}
          order={doanhThu.soDonHangTuanNay}
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
      {/* ------------------------------------------------------------------------- */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={7}>
          <Paper elevation={3} className="paper-css">
            <Typography variant="h6" fontWeight={'bold'} my={2} className="typography-css">
              Danh sách sản phẩm bán chạy theo tháng
            </Typography>
            <Grid>
              <Button
                className="button-css"
                sx={{
                  backgroundColor: indexButton === 1 ? '#f26b16' : 'white',
                  color: indexButton === 1 ? 'white' : 'black',
                }}
                onClick={() => setIndexButton(1)}>
                Ngày
              </Button>
              <Button
                className="button-css"
                sx={{
                  backgroundColor: indexButton === 2 ? '#f26b16' : 'white',
                  color: indexButton === 2 ? 'white' : 'black',
                }}
                onClick={() => setIndexButton(2)}>
                Tuần
              </Button>
              <Button
                className="button-css"
                sx={{
                  backgroundColor: indexButton === 3 ? '#f26b16' : 'white',
                  color: indexButton === 3 ? 'white' : 'black',
                }}
                onClick={() => setIndexButton(3)}>
                Tháng
              </Button>
              <Button
                className="button-css"
                sx={{
                  backgroundColor: indexButton === 4 ? '#f26b16' : 'white',
                  color: indexButton === 4 ? 'white' : 'black',
                }}
                onClick={() => setIndexButton(4)}>
                Năm
              </Button>
              <Button
                className="button-css"
                sx={{
                  backgroundColor: indexButton === 5 ? '#f26b16' : 'white',
                  color: indexButton === 5 ? 'white' : 'black',
                }}
                onClick={() => setIndexButton(5)}>
                Tùy chỉnh
              </Button>
            </Grid>
            {indexButton === 5 && (
              <Grid container mb={1} className="grid-date-dashboard">
                <Grid item xs={6} className="dateTime-dashboard">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format={'DD-MM-YYYY'}
                      ampm={false}
                      onChange={(e) =>
                        setFilterInCustom({
                          ...filterInCustom,
                          startDate: dayjs(e).format('DD-MM-YYYY'),
                        })
                      }
                      defaultValue={dayjs()}
                      slotProps={{
                        actionBar: {
                          actions: ['clear'],
                          onClick: () => setFilterInCustom({ ...filterInCustom, startDate: '' }),
                        },
                      }}
                      label="Từ ngày"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} className="dateTime-dashboard">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format={'DD-MM-YYYY'}
                      ampm={false}
                      onChange={(e) =>
                        setFilterInCustom({
                          ...filterInCustom,
                          endDate: dayjs(e).format('DD-MM-YYYY'),
                        })
                      }
                      defaultValue={dayjs()}
                      slotProps={{
                        actionBar: {
                          actions: ['clear'],
                          onClick: () => setFilterInCustom({ ...filterInCustom, endDate: '' }),
                        },
                      }}
                      label="Đến ngày"
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            )}
            <Table aria-label="simple table" className="table-css">
              <TableHead>
                <TableRow>
                  <TableCell width="15%">Ảnh sản phẩm</TableCell>
                  <TableCell width="45%">Tên sản phẩm</TableCell>
                  <TableCell align="right" width="10%">
                    Số lượng
                  </TableCell>
                  <TableCell align="right" width="20%">
                    Giá tiền
                  </TableCell>
                  <TableCell align="right" width="10%">
                    Kích cỡ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataProductSelling.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" width={'20%'}>
                      <img src={row.image[0]} width={'40%'} alt="error" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.nameProduct}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(row.price)}</TableCell>
                    <TableCell align="right">{row.size}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack
              mt={2}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={0}
              className="stack-css">
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
                <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  sản phẩm
                </Typography>
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
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3} className="paper-css" sx={{ height: '460px' }}>
            <LineChartDashBoard dataBieuDo={dataBieuDo} />
          </Paper>
        </Grid>
      </Grid>
      {/* ------------------------------------------------------------------------- */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={7}>
          <Paper elevation={3} className="paper-css">
            <Typography variant="h6" fontWeight={'bold'} my={2} className="typography-css">
              Danh sách sản phẩm sắp hết hàng
            </Typography>
            <Table aria-label="simple table" className="table-css">
              <TableHead>
                <TableRow>
                  <TableCell width="15%">Ảnh sản phẩm</TableCell>
                  <TableCell width="45%">Tên sản phẩm</TableCell>
                  <TableCell align="right" width="10%">
                    Số lượng
                  </TableCell>
                  <TableCell align="right" width="20%">
                    Giá tiền
                  </TableCell>
                  <TableCell align="right" width="10%">
                    Kích cỡ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataProductTakeOut.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" width={'20%'}>
                      <img src={row.image[0]} width={'40%'} alt="error" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.nameProduct}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(row.price)}</TableCell>
                    <TableCell align="right">{row.size}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack
              mt={2}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={0}
              className="stack-css">
              <Typography component="span" variant={'body2'} mt={0.5}>
                <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Xem</Typography>
                <Select
                  color="cam"
                  onChange={(e) => {
                    setFilterTakeOut({ ...filterTakeOut, size: e.target.value })
                  }}
                  sx={{ height: '25px', mx: 0.5 }}
                  size="small"
                  value={filterTakeOut.size}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
                <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  sản phẩm
                </Typography>
              </Typography>
              <Pagination
                variant="outlined"
                color="cam"
                count={totalPagesTakeOut}
                page={filterTakeOut.page}
                onChange={(e, value) => {
                  e.preventDefault()
                  setFilterTakeOut({ ...filterTakeOut, page: value })
                }}
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={3} className="paper-css-1">
            <Stack
              mt={2}
              mb={2}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={0}>
              <Typography variant="h6" fontWeight={'bold'}>
                Tốc độ tăng trưởng của cửa hàng
              </Typography>
              <Button
                className="button-reload-css"
                color="warning"
                onClick={() => handleGrowthRate()}>
                <AutorenewIcon />
              </Button>
            </Stack>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboarh" />
                Doanh thu ngày
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {formatCurrency(doanhThu.doanhSoNgay)}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDoanhThuNgay === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDoanhThuNgay > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDoanhThuNgay > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDoanhThuNgay !== null ? tkDoanhThuNgay + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboarh" />
                Doanh thu Tuần
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {formatCurrency(doanhThu.doanhSoTuanNay)}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDoanhThuTuan === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDoanhThuTuan > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDoanhThuTuan > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDoanhThuTuan !== null ? tkDoanhThuTuan + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Doanh thu Tháng
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {formatCurrency(doanhThu.doanhSoThangNay)}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDoanhThuThang === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDoanhThuThang > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDoanhThuThang > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDoanhThuThang !== null ? tkDoanhThuThang + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Doanh thu năm
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {formatCurrency(doanhThu.doanhSoNamNay)}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDoanhThuNam === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDoanhThuNam > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDoanhThuNam > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDoanhThuNam !== null ? tkDoanhThuNam + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Đơn hàng ngày
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soDonHangNgay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDonHangNgay === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDonHangNgay > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDonHangNgay > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDonHangNgay !== null ? tkDonHangNgay + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Đơn hàng tuần
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soDonHangTuanNay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDonHangTuan === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDonHangTuan > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDonHangTuan > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDonHangTuan !== null ? tkDonHangTuan + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Đơn hàng tháng
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soDonHangThangNay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDonHangThang === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDonHangThang > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDonHangThang > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDonHangThang !== null ? tkDonHangThang + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Đơn hàng năm
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soDonHangNamNay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkDonHangNam === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkDonHangNam > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkDonHangNam > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkDonHangNam !== null ? tkDonHangNam + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Sản phẩm ngày
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soLuongSanPhamNgay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkSanPhamNgay === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkSanPhamNgay > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkSanPhamNgay > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkSanPhamNgay !== null ? tkSanPhamNgay + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Sản phẩm tuần
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soLuongSanPhamTuanNay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkSanPhamTuan === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkSanPhamTuan > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkSanPhamTuan > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkSanPhamTuan !== null ? tkSanPhamTuan + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Sản phẩm tháng
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soLuongSanPhamThangNay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkSanPhamThang === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkSanPhamThang > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkSanPhamThang > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkSanPhamThang !== null ? tkSanPhamThang + '%' : ''}
                </span>
              </Grid>
            </Grid>
            <Grid container className="grid-tang-truong">
              <Grid item xs={5} className="grid-tang-truong-data">
                <EqualizerIcon className="icon-css-dashboard" />
                Sản phẩm năm
              </Grid>
              <Grid item xs={4} className="grid-tang-truong-data">
                {doanhThu.soLuongSanPhamNamNay}
              </Grid>
              <Grid item xs={3} className="grid-tang-truong-data">
                {tkSanPhamNam === null ? (
                  <span style={{ color: 'white' }}>---</span>
                ) : tkSanPhamNam > 0 ? (
                  <TrendingUpIcon className="icon-up-css" />
                ) : (
                  <TrendingDownIcon className="icon-down-css" />
                )}
                <span style={{ color: tkSanPhamNam > 0 ? '#00ff00' : '#ff0000' }}>
                  {tkSanPhamNam !== null ? tkSanPhamNam + '%' : ''}
                </span>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
