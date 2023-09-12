import {
  Button,
  Chip,
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
import { BiDetail } from 'react-icons/bi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { IoMdRefresh } from 'react-icons/io'
import dayjs from 'dayjs'
import { useTheme } from '@emotion/react'
import confirmSatus from '../../../components/comfirmSwal'
import { toast } from 'react-toastify'

export default function AdVoucherPage() {
  const theme = useTheme()
  const [listVoucher, setListVoucher] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [dataFetched, setDataFetched] = useState(false)
  const [searchVoucher, setSearchVoucher] = useState({
    nameSearch: '',
    startDateSearch: '',
    endDateSearch: '',
    typeSearch: '',
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
    const title = 'Xác nhận hủy voucher?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        voucherApi
          .deleteVoucher(idDelete)
          .then(() => {
            toast.success('Hủy voucher thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          .catch(() => {
            toast.error('Hủy voucher thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
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
      typeSearch: '',
      statusSearch: '',
    })
    fetchData(initPage - 1, searchVoucher)
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={2.5}>
            <TextField
              id="outlined"
              label="Tìm voucher theo mã"
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
          <Grid item xs={3.25}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm:ss'}
                value={dayjs(searchVoucher?.startDateSearch)}
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
          <Grid item xs={3.25}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm:ss'}
                value={dayjs(searchVoucher?.endDateSearch)}
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
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container sx={{ mt: 1 }} spacing={2}>
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
                <MenuItem value=""> </MenuItem>
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
                <MenuItem value={''}>Tất cả</MenuItem>
                <MenuItem value={'0'}>Hết hạn</MenuItem>
                <MenuItem value={'1'}>Còn hạn</MenuItem>
                <MenuItem value={'2'}>Chờ hoạt động</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={2.5}>
            <Link to={'/admin/voucher/add'}>
              <Button color="success" variant="contained" sx={{ borderRadius: '90px' }}>
                <AiOutlinePlusCircle style={{ width: '25px', height: '100%' }} />
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
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.value}%</TableCell>
                    <TableCell align="center">{row.maximumValue}</TableCell>
                    <TableCell align="center">
                      {row.type === true ? (
                        <Chip color="info" label="Tất cả" />
                      ) : (
                        <Chip color="warning" label="Cá nhân" />
                      )}
                    </TableCell>
                    <TableCell align="center">{row.minimumAmount}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      {dayjs(row.startDate).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell align="center">{dayjs(row.endDate).format('DD-MM-YYYY')}</TableCell>
                    <TableCell align="center">
                      {row.status === 0 ? (
                        <Chip color="error" label="Hết hạn" />
                      ) : row.status === 1 ? (
                        <Chip
                          color="success"
                          onClick={() => handelDeleteVoucer(row.id)}
                          label="Còn hạn"
                        />
                      ) : (
                        <Chip color="secondary" label="Chờ hoạt động" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/admin/voucher/${row.id}/detail`}>
                        <Tooltip title="Xem chi tiết">
                          <Button>
                            <span>
                              <BiDetail style={{ width: '25px', height: '50%' }} />
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
