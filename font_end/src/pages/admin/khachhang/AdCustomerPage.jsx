import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
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
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import khachHangApi from '../../../api/admin/khachhang/KhachHangApi'
import dayjs from 'dayjs'
import Toast from '../../../components/Toast'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import './AdCustomerPage.css'
import { TbEyeEdit } from 'react-icons/tb'
import SearchIcon from '@mui/icons-material/Search'
import { AiOutlinePlusSquare } from 'react-icons/ai'

export default function AdCustomerPage() {
  const theme = useTheme()
  const [listKhachHang, setListKhachHang] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [searchKhachHang, setSearchKhachHang] = useState({
    nameSearch: '',
    gender: '',
    statusSearch: '',
    size: 5,
    page: 1,
  })

  useEffect(() => {
    fetchData(searchKhachHang)
  }, [searchKhachHang])

  const fetchData = (searchKhachHang) => {
    khachHangApi.get(searchKhachHang).then((response) => {
      setListKhachHang(response.data.data.content)
      setTotalPages(response.data.data.totalPages)
      if (searchKhachHang.page > response.data.data.totalPages)
        if (response.data.data.totalPages > 0) {
          setSearchKhachHang({ ...searchKhachHang, page: response.data.data.totalPages })
        }
    })
  }

  const deleteKhachHang = (id) => {
    const title = 'Xác nhận xóa khách hàng?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        khachHangApi.delete(id).then(() => {
          toast.success('Xóa khách hàng thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          fetchData(searchKhachHang)
        })
      }
    })
  }

  return (
    <div className="khachhang">
      <Box>
        <Toast />
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <TextField
              sx={{ width: '40%' }}
              className="search-field"
              size="small"
              color="cam"
              value={searchKhachHang.nameSearch || ''}
              placeholder="Tìm kiếm tên hoặc sđt hoặc email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="cam" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSearchKhachHang({ ...searchKhachHang, nameSearch: e.target.value })
              }}
            />
            <Button
              variant="outlined"
              style={{ float: 'right' }}
              color="cam"
              className="them-moi"
              component={Link}
              to="/admin/customer/add">
              <AiOutlinePlusSquare style={{ marginRight: '5px', fontSize: '17px' }} />
              <Typography sx={{ ml: 1 }}>Tạo khách hàng</Typography>
            </Button>
          </Stack>
          <Stack my={2} direction="row" justifyContent="start" alignItems="center" spacing={1}>
            <div className="filter">
              <b>Giới tính: </b>
              <Select
                displayEmpty
                size="small"
                value={searchKhachHang.gender}
                onChange={(e) =>
                  setSearchKhachHang({ ...searchKhachHang, gender: e.target.value })
                }>
                <MenuItem value={''}>Tất cả</MenuItem>
                <MenuItem value={'true'}>Nam</MenuItem>
                <MenuItem value={'false'}>Nữ</MenuItem>
              </Select>
            </div>

            <div className="filter">
              <b>Trạng thái: </b>
              <Select
                displayEmpty
                size="small"
                value={searchKhachHang.statusSearch}
                onChange={(e) =>
                  setSearchKhachHang({ ...searchKhachHang, statusSearch: e.target.value })
                }>
                <MenuItem value={''}>Tất cả</MenuItem>
                <MenuItem value={'0'}>Hoạt động</MenuItem>
                <MenuItem value={'1'}>Không hoạt động</MenuItem>
                <MenuItem></MenuItem>
              </Select>
            </div>
          </Stack>

          <Table className="tableCss mt-5">
            <TableHead>
              <TableRow>
                <TableCell align="center" width={'7%'}>
                  <span className="head-table">STT</span>
                </TableCell>
                <TableCell align="center" width={'25%'}>
                  <span className="head-table">Email</span>
                </TableCell>
                <TableCell align="center" width={'12%'}>
                  <span className="head-table">Họ tên</span>
                </TableCell>
                <TableCell align="center" width={'15%'}>
                  <span className="head-table">Ngày sinh</span>
                </TableCell>
                <TableCell align="center" width={'15%'}>
                  <span className="head-table">Số điện thoại</span>
                </TableCell>
                <TableCell align="center" width={'15%'}>
                  <span className="head-table">Giới tính</span>
                </TableCell>
                <TableCell align="center" width={'15%'}>
                  <span className="head-table">Trạng thái</span>
                </TableCell>
                <TableCell align="center" width={'10%'}>
                  <span className="head-table">Thao tác</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listKhachHang.map((row) => {
                return (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{row.stt}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.fullName}</TableCell>
                    <TableCell align="center">
                      {dayjs(row.dateBirth).format('MM/DD/YYYY')}
                    </TableCell>
                    <TableCell align="center">{row.phoneNumber}</TableCell>
                    <TableCell align="center">{row.gender ? 'Nam' : 'Nữ'}</TableCell>
                    <TableCell align="center">
                      {row.status === 0 ? (
                        <Chip
                          onClick={() => deleteKhachHang(row.id)}
                          className="chip-hoat-dong"
                          size="small"
                          label="Hoạt động"
                        />
                      ) : (
                        <Chip
                          className="chip-khong-hoat-dong"
                          size="small"
                          label="Không hoạt động"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          color="cam"
                          component={Link}
                          to={`/admin/customer/getOne/${row.id}`}
                          sx={{ fontSize: 20 }}>
                          <TbEyeEdit fontSize={'25px'} color="#FC7C27" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
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
                  setSearchKhachHang({ ...searchKhachHang, size: e.target.value })
                }}
                sx={{ height: '25px', mx: 0.5 }}
                size="small"
                value={searchKhachHang.size}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
              <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                Khách hàng
              </Typography>
            </Typography>
            <Pagination
              page={searchKhachHang.page}
              onChange={(e, value) => {
                e.preventDefault()
                setSearchKhachHang({ ...searchKhachHang, page: value })
              }}
              count={totalPages}
              color="cam"
              variant="outlined"
            />
          </Stack>
        </Paper>
      </Box>
    </div>
  )
}
