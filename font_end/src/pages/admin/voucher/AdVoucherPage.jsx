import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { IoMdRefresh } from 'react-icons/io'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'

export default function AdVoucherPage() {
  const [listVoucher, setListVoucher] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [dataFetched, setDataFetched] = useState(false)
  const [searchVoucher, setSearchVoucher] = useState({
    nameSearch: '',
    startDateSearch: '',
    endDateSearch: '',
    typeSearch: 1,
    statusSearch: '',
  })

  useEffect(() => {
    fetchData(initPage - 1, searchVoucher)
  }, [initPage, listVoucher, searchVoucher])

  const handelOnchangePage = (page) => {
    setInitPage(page)
    fetchData(page - 1, searchVoucher)
  }

  const handelDeleteVoucer = (idDelete) => {
    Swal.fire({
      title: 'Xác nhận hủy voucher!',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        voucherApi
          .deleteVoucher(idDelete)
          .then(() => {
            Swal.fire('Hủy voucher thành công!', '', 'success')
          })
          .catch(() => {
            Swal.fire('Hủy voucher thất bại!', '', 'error')
          })
      }
    })
  }
  const fetchData = (initPage, searchVoucher) => {
    if (
      searchVoucher.nameSearch !== '' ||
      searchVoucher.startDateSearch !== '' ||
      searchVoucher.endDateSearch !== '' ||
      searchVoucher.typeSearch !== '' ||
      searchVoucher.statusSearch !== ''
    ) {
      voucherApi
        .searchVoucher(initPage, searchVoucher)
        .then((response) => {
          setListVoucher(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
          setDataFetched(true)
        })
        .catch(() => {
          setDataFetched(false)
        })
    } else {
      voucherApi
        .getPageVoucher(initPage)
        .then((response) => {
          setListVoucher(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
          setDataFetched(true)
        })
        .catch(() => {
          setDataFetched(false)
        })
    }
  }

  const handleRefresh = (initPage, searchVoucher) => {
    setSearchVoucher({
      nameSearch: '',
      startDateSearch: '',
      endDateSearch: '',
      typeSearch: 1,
      statusSearch: '',
    })
    fetchData(initPage - 1, searchVoucher)
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
                format={'DD-MM-YYYY HH:mm:ss'}
                onChange={(e) => {
                  setSearchVoucher({
                    ...searchVoucher,
                    startDateSearch: dayjs(e).toDate().getTime(),
                  })
                }}
                label="Từ ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm:ss'}
                onChange={(e) => {
                  setSearchVoucher({
                    ...searchVoucher,
                    endDateSearch: dayjs(e).toDate().getTime(),
                  })
                }}
                label="Đến ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="hd-select-type" shrink>
                Kiểu
              </InputLabel>
              <Select
                id="hd-select-type"
                label="Kiểu"
                value={searchVoucher.typeSearch}
                onChange={(e) => setSearchVoucher({ ...searchVoucher, typeSearch: e.target.value })}
                sx={{ height: '40px' }}
                inputProps={{
                  name: 'Kiểu',
                  id: 'hd-select-type',
                }}>
                <MenuItem value="1">Tất cả</MenuItem>
                <MenuItem value="0">cá nhân</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="hd-select-status" shrink>
                Trạng thái
              </InputLabel>
              <Select
                id="hd-select-status"
                label="Trạng thái"
                value={searchVoucher.statusSearch}
                onChange={(e) =>
                  setSearchVoucher({ ...searchVoucher, statusSearch: e.target.value })
                }
                sx={{ height: '40px' }}
                inputProps={{
                  name: 'Trạng thái',
                  id: 'hd-select-status',
                }}>
                <MenuItem value={0}>Hết hạn</MenuItem>
                <MenuItem value={1}>Còn hạn</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={2.5}>
            <Button
              color="info"
              variant="contained"
              sx={{ borderRadius: '90px' }}
              onClick={() => handleRefresh(initPage, searchVoucher)}>
              <IoMdRefresh />
              <Typography sx={{ ml: 1 }}>Tải lại</Typography>
            </Button>
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={2.5}>
            <Link to={'/admin/voucher/add'}>
              <Button
                color="success"
                variant="contained"
                sx={{ height: '100%', borderRadius: '90px' }}>
                <AiOutlinePlusCircle style={{ width: '35px', height: '100%' }} />
                <Typography sx={{ ml: 1 }}>Tạo voucher</Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
      {/*----------------------------------------------------------------*/}
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        {dataFetched && (
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
                    <TableCell align="center">
                      {dayjs(row.startDate).format('DD-MM-YYYY')}
                    </TableCell>
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
        )}
        {!dataFetched && (
          <p style={{ textAlign: 'center' }}>
            <b>Không có dữ liệu</b>
          </p>
        )}
        <Grid container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            page={initPage}
            onChange={(event, page) => handelOnchangePage(page)}
            count={totalPages}
            color="primary"
          />
        </Grid>
      </Paper>
    </div>
  )
}
