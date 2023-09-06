import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import Pagination from '@mui/material/Pagination'
// import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { GiCancel } from 'react-icons/gi'
import { BiDetail } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import dayjs from 'dayjs'

export default function AdVoucherPage() {
  const [listVoucher, setListVoucher] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchVoucher, setSearchVoucher] = useState({
    nameSearch: '',
    startDateSearch: '',
    endDateSearch: '',
  })

  useEffect(() => {
    fetchData(initPage - 1, searchVoucher)
  }, [initPage, listVoucher, searchVoucher])

  const handelOnchangePage = (page) => {
    setInitPage(page)
    fetchData(page - 1, searchVoucher)
  }

  const handelDeleteVoucer = (idDelete) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn hủy voucher này?')
    if (confirmDelete) {
      voucherApi
        .deleteVoucher(idDelete)
        .then(() => {
          alert('Hủy vouhcer thành công!')
        })
        .catch(() => {
          alert('Hủy vouhcer thất bại!')
        })
    } else {
    }
  }
  const fetchData = (initPage, searchVoucher) => {
    if (
      searchVoucher.nameSearch !== '' ||
      searchVoucher.startDateSearch !== '' ||
      searchVoucher.endDateSearch !== ''
    ) {
      voucherApi
        .searchVoucher(initPage, searchVoucher)
        .then((response) => {
          setListVoucher(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
        })
        .catch(() => {
          return alert('Error: Không tải được dữ liệu tìm kiếm API')
        })
    } else {
      voucherApi
        .getPageVoucher(initPage)
        .then((response) => {
          setListVoucher(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
        })
        .catch(() => {
          return alert('Error: Không tải được dữ liệu API')
        })
    }
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id="outlined"
              label="Nhập mã voucher"
              type="text"
              name="nameSearch"
              size="small"
              onChange={(e) =>
                setSearchVoucher({
                  ...searchVoucher,
                  nameSearch: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                onChange={
                  (e) => console.log('start search:', dayjs(e).format('DD-MM-YYYY HH:mm:ss'))
                  // setSearchVoucher({
                  //   ...searchVoucher,
                  //   startDateSearch: Number(dayjs(e).format('DD-MM-YYYY HH:mm:ss')),
                  // })
                }
                label="Từ ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                // onChange={(e) =>
                //   setSearchVoucher({
                //     ...searchVoucher,
                //     endDateSearch: Number(dayjs(e).format('DD-MM-YYYY HH:mm:ss')),
                //   })
                // }
                label="Đến ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1.5}></Grid>
          <Grid item xs={2.5}>
            <Link to={'/admin/voucher/add'}>
              <Button color="success" variant="contained">
                <AiOutlinePlusCircle />
                <Typography sx={{ ml: 1 }}>Tạo voucher</Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
      {/*----------------------------------------------------------------*/}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Mã</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Giá trị</TableCell>
                <TableCell align="center">Giá trị (tối đa)</TableCell>
                <TableCell align="center">Kiểu</TableCell>
                <TableCell align="center">Điều kiện</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Ngày bắt đầu</TableCell>
                <TableCell align="center">Ngày kết thúc</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listVoucher.map((row, index) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.value}%</TableCell>
                  <TableCell align="center">{row.maximumValue}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{
                        borderRadius: '90px',
                        textTransform: 'none',
                        backgroundColor: row.type === true ? '#90caf9' : '#fff59d',
                        color: row.type === true ? '#0d47a1' : '#f57f17',
                      }}>
                      {row.type === true ? 'Tất cả' : 'Cá nhân'}
                    </Button>
                  </TableCell>
                  <TableCell align="center">{row.minimumAmount}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{dayjs(row.startDate).format('DD-MM-YYYY')}</TableCell>
                  <TableCell align="center">{dayjs(row.endDate).format('DD-MM-YYYY')}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{
                        borderRadius: '90px',
                        textTransform: 'none',
                        backgroundColor: row.status === 0 ? '#ef9a9a' : '#a5d6a7',
                        color: row.status === 0 ? '#d50000' : '#1b5e20',
                      }}>
                      {row.status === 0 ? 'Hết hạn' : 'Còn hạn'}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Hủy voucher">
                      <Button onClick={() => handelDeleteVoucer(row.id)}>
                        <span>
                          <GiCancel />
                        </span>
                      </Button>
                    </Tooltip>
                    <Link to={`/admin/voucher/${row.id}/detail`}>
                      <Tooltip title="Detail">
                        <Button>
                          <span>
                            <BiDetail />
                          </span>
                        </Button>
                      </Tooltip>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Pagination
              page={initPage}
              onChange={(event, page) => handelOnchangePage(page)}
              count={totalPages}
              color="primary"
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Paper>
    </div>
  )
}
