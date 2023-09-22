import {
  Button,
  TextField,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
  Tooltip,
  IconButton,
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
        <Button
          variant="contained"
          style={{ float: 'right' }}
          color="cam"
          component={Link}
          to="/admin/staff/add">
          <Typography sx={{ ml: 1 }}>Tạo Nhân Viên</Typography>
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Table aria-label="simple table" className="tableCss">
          <TableHead>
            <TableRow>
              <TableCell width={'5%'}>STT</TableCell>
              <TableCell align="center" width={'7%'}>
                Ảnh
              </TableCell>
              <TableCell align="center" width={'15%'}>
                Họ và tên
              </TableCell>
              <TableCell align="center" width={'20%'}>
                Email
              </TableCell>
              <TableCell align="center" width={'10%'}>
                SDT
              </TableCell>
              <TableCell align="center" width={'10%'}>
                Ngày sinh
              </TableCell>
              <TableCell align="center" width={'8%'}>
                Giới tính
              </TableCell>
              {/* <TableCell align="center">CCCD</TableCell> */}
              <TableCell align="center" width={'15%'}>
                Trạng thái
              </TableCell>
              <TableCell align="center" width={'9%'}>
                Thao tác
              </TableCell>
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
                  <TableCell align="center">{dayjs(row.dateBirth).format('DD-MM-YYYY')}</TableCell>
                  <TableCell align="center">{row.gender ? 'Nam' : 'Nữ'}</TableCell>
                  {/* <TableCell align="center">{row.citizenId}</TableCell> */}
                  <TableCell align="center">
                    <Chip
                      className={row.status === 0 ? 'chip-hoat-dong' : 'chip-khong-hoat-dong'}
                      label={row.status === 0 ? 'Hoạt động' : 'Không hoạt động'}
                      size="small"
                    />
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}>
          <Pagination
            color="cam"
            defaultPage={1}
            page={currentPage}
            onChange={handlePageChange}
            count={totalPages}
          />
        </div>
      </Paper>
    </div>
  )
}
