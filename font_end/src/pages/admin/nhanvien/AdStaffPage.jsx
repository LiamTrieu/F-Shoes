import {
  Button,
  TextField,
  Table,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
  Tooltip,
  IconButton,
  Stack,
  Chip,
} from '@mui/material'
import { Link } from 'react-router-dom'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import { useEffect, useState } from 'react'
import { IoEye } from 'react-icons/io5'
import dayjs from 'dayjs'

export default function AdCustomerPage() {
  const [listStaff, setListStaff] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setToTalPages] = useState(0)
  const [tenSearch, setTenSearch] = useState('')

  const fetchData = (currentPage, tenSearch) => {
    staffApi
      .get(currentPage, tenSearch)
      .then((response) => {
        console.log(response.data)
        setListStaff(response.data.data)
        setToTalPages(response.data.totalPages)
      })
      .catch(() => {
        alert('Error: Không tải dữ liệu API')
      })
  }

  useEffect(() => {
    console.log(currentPage)
    console.log(tenSearch)
    console.log(staffApi.get)
    fetchData(currentPage, tenSearch)
  }, [currentPage, tenSearch])

  const Search = (e) => {
    setTenSearch(e.target.value)
  }

  const handlePageChange = (event, newPage) => {
    fetchData(newPage)
    setCurrentPage(newPage)
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TextField
          sx={{ width: '50%' }}
          onChange={Search}
          id="outlined-basic"
          label="Tìm kiếm nhân viên bằng tên"
          variant="outlined"
          size="small"
        />

        {/* <Button
          onClick={() => {
            fetchData()
          }}
          variant="contained"
          style={{ marginLeft: '10px' }}
          AiOutlineSearch>
          Tìm kiếm
        </Button> */}
        <Button
          variant="outlined"
          style={{ float: 'right' }}
          color="success"
          component={Link}
          to="/admin/staff/add">
          <Typography sx={{ ml: 1 }}>Tạo Nhân Viên</Typography>
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Ảnh</TableCell>
                <TableCell align="center">Họ và tên</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">SDT</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Giới tính</TableCell>
                {/* <TableCell align="center">CCCD</TableCell> */}
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listStaff && listStaff.length > 0 ? (
                listStaff.map((row, index) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.avatar}</TableCell>
                    <TableCell align="center">{row.fullName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phoneNumber}</TableCell>
                    <TableCell align="center">
                      {dayjs(row.dateBirth).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell align="center">{row.gender ? 'Nam' : 'Nữ'}</TableCell>
                    {/* <TableCell align="center">{row.citizenId}</TableCell> */}
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <Chip
                          size="small"
                          label={row.status === 0 ? 'Hoạt động' : 'Không hoạt động'}
                          color="primary"
                        />
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          color="black"
                          component={Link}
                          to={`/admin/staff/detail/${row.id}`}>
                          <IoEye style={{ fontSize: '20px' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>Không có dữ liệu để hiển thị.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}>
          <Pagination
            defaultPage={1}
            page={currentPage}
            onChange={handlePageChange}
            count={totalPages}
            variant="outlined"
          />
        </div>
      </Paper>
    </div>
  )
}
