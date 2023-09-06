import {
  Button,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import khachHangApi from '../../../api/admin/khachhang/KhachHangApi'
import dayjs from 'dayjs'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
// import SearchIcon from "@mui/icons-material/Search";

export default function AdCustomerPage() {
  const [listKhachHang, setlistKhachHang] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSearch, setPageSearch] = useState({ textSearch: '' })
  //
  useEffect(() => {
    fetchData(initPage - 1, pageSearch)
  }, [initPage, listKhachHang, pageSearch])

  const handelOnchangePage = (p) => {
    setInitPage(p)
    fetchData(p - 1, pageSearch)
  }

  const fetchData = (initPage, pageSearch) => {
    if (pageSearch.textSearch !== '') {
      khachHangApi.search(initPage, pageSearch.textSearch).then((response) => {
        setlistKhachHang(response.data.data.content)
        setTotalPages(response.data.data.totalPages)
      })
    } else {
      khachHangApi.get(initPage).then((response) => {
        setlistKhachHang(response.data.data.content)
        setTotalPages(response.data.data.totalPages)
      })
    }
  }
  const deleteKhachHang = (id) => {
    khachHangApi.delete(id).then(() => {
      alert('Xóa thành công')
    })
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TextField
          id="outlined-basic"
          label="Tên khách hàng"
          variant="outlined"
          size="small"
          onChange={(e) => setPageSearch({ textSearch: e.target.value })}
        />
        <Button
          variant="outlined"
          style={{ float: 'right' }}
          color="success"
          component={Link}
          to="/admin/customer/add">
          <Typography sx={{ ml: 1 }}>Tạo khách hàng</Typography>
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Họ tên</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Ngày tạo</TableCell>
                <TableCell align="center">trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listKhachHang.map((row, index) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center"> {dayjs(row.dateBirth).format('MM/DD/YYYY')}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center"> {dayjs(row.createdAt).format('MM/DD/YYYY')}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        backgroundColor: '#ffdb58',
                        color: '#fff',
                        borderRadius: '90px',
                        textTransform: 'none',
                        padding: '8px 16px',
                        display: 'inline-block',
                      }}>
                      {row.status ? 'hoạt động' : ''}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      component={Link}
                      to={`/admin/customer/getOne/${row.id}`}
                      sx={{ fontSize: 24, marginLeft: 2 }} // Tùy chỉnh kiểu
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteKhachHang(row.id)}
                      sx={{ fontSize: 24, marginLeft: 2 }} // Tùy chỉnh kiểu
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={5}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={3} sx={{ float: 'right' }}>
            <Pagination
              page={initPage}
              onChange={(event, page) => handelOnchangePage(page)}
              count={totalPages}
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
