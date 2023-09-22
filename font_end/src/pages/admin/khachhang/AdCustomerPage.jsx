import {
  Box,
  Button,
  IconButton,
  Pagination,
  Paper,
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
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import Toast from '../../../components/Toast'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import './AdCustomerPage.css'

// import SearchIcon from "@mui/icons-material/Search";

export default function AdCustomerPage() {
  const theme = useTheme()
  const [listKhachHang, setListKhachHang] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSearch, setPageSearch] = useState({ textSearch: '' })

  useEffect(() => {
    fetchData(initPage - 1, pageSearch)
  }, [initPage, pageSearch])

  const handleOnChangePage = (page) => {
    setInitPage(page)
  }

  const updateKhachHangListAfterDelete = (id) => {
    // Lọc ra các khách hàng mà không có id bị xóa
    const updatedListKhachHang = listKhachHang.filter((khachHang) => khachHang.id !== id)
    setListKhachHang(updatedListKhachHang)
  }

  const fetchData = (initPage, pageSearch) => {
    if (pageSearch.textSearch !== '') {
      khachHangApi
        .search(initPage, pageSearch.textSearch)
        .then((response) => {
          setListKhachHang(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } else {
      khachHangApi
        .get(initPage)
        .then((response) => {
          setListKhachHang(response.data.data.content)
          setTotalPages(response.data.data.totalPages)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
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
          updateKhachHangListAfterDelete(id)
        })
      }
    })
  }

  return (
    <div>
      <Box>
        <Toast />
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <TextField
            id="outlined-basic"
            sx={{ width: '40%' }}
            label="Tên hoặc số điện thoại khách hàng"
            variant="outlined"
            size="small"
            color="cam"
            onChange={(e) => setPageSearch({ textSearch: e.target.value })}
          />
          <Button
            variant="contained"
            style={{ float: 'right' }}
            color="cam"
            component={Link}
            to="/admin/customer/add">
            <Typography sx={{ ml: 1 }}>Tạo khách hàng</Typography>
          </Button>
        </Paper>
        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Table className="tableCss">
            <TableHead>
              <TableRow>
                <TableCell align="center" width={'5%'}>
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
                <TableCell align="center" width={'10%'}>
                  <span className="head-table">Thao tác</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listKhachHang.map((row, index) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{dayjs(row.dateBirth).format('MM/DD/YYYY')}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Xem chi tiết">
                      <IconButton
                        color="cam"
                        component={Link}
                        to={`/admin/customer/getOne/${row.id}`}
                        sx={{ fontSize: 20 }} // Tùy chỉnh kiểu
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton
                        color="error"
                        onClick={() => deleteKhachHang(row.id)}
                        sx={{ fontSize: 20 }} // Tùy chỉnh kiểu
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}>
            <Pagination
              page={initPage}
              onChange={(_, page) => handleOnChangePage(page)}
              count={totalPages}
              color="cam"
            />
          </div>
        </Paper>
      </Box>
    </div>
  )
}
