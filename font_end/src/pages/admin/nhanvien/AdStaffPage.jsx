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
  Select,
  MenuItem,
  InputAdornment,
  Stack,
  Avatar,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import { useEffect, useState } from 'react'
import { TbEyeEdit } from 'react-icons/tb'
import dayjs from 'dayjs'
import './AdStaffPage.css'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import SearchIcon from '@mui/icons-material/Search'
import { AiOutlinePlusSquare } from 'react-icons/ai'

export default function AdCustomerPage() {
  const theme = useTheme()
  const [listStaff, setListStaff] = useState([])
  const [totalPages, setToTalPages] = useState(0)
  const [searchStaff, setSearchStaff] = useState({
    searchTen: '',
    genderSearch: '',
    statusSearch: '',
    roleSearch: '',
    size: 5,
    page: 1,
  })

  useEffect(() => {
    fetchData(searchStaff)
  }, [searchStaff])

  const fetchData = (searchStaff) => {
    staffApi.get(searchStaff).then((response) => {
      setListStaff(response.data.data.content)
      setToTalPages(response.data.data.totalPages)
      if (searchStaff.page > response.data.data.totalPages)
        if (response.data.data.totalPages > 0) {
          setSearchStaff({ ...searchStaff, page: response.data.data.totalPages })
        }
    })
  }

  const deleteNhanVien = (id) => {
    const title = 'Xác nhận thay đổi trạng thái hoạt động?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        staffApi.delete(id).then(() => {
          toast.success('Thay đổi trạng thái hoạt động thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          fetchData(searchStaff)
        })
      }
    })
  }

  return (
    <div className="nhanvien">
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <TextField
            onChange={(e) => {
              setSearchStaff({ ...searchStaff, searchTen: e.target.value })
            }}
            sx={{ width: '28%' }}
            className="search-field"
            size="small"
            color="cam"
            placeholder="tên hoặc sđt hoặc email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="cam" />
                </InputAdornment>
              ),
            }}
          />
          <div className="filter">
            <b>Giới tính: </b>
            <Select
              displayEmpty
              size="small"
              value={searchStaff.genderSearch}
              onChange={(e) => setSearchStaff({ ...searchStaff, genderSearch: e.target.value })}>
              <MenuItem value={''}>Tất cả</MenuItem>
              <MenuItem value={'true'}>Nam</MenuItem>
              <MenuItem value={'false'}>Nữ</MenuItem>
            </Select>
          </div>
          <div className="filter">
            <b>Chức vụ: </b>
            <Select
              displayEmpty
              size="small"
              value={searchStaff.roleSearch}
              onChange={(e) => setSearchStaff({ ...searchStaff, roleSearch: e.target.value })}>
              <MenuItem value={''}>Tất cả</MenuItem>
              <MenuItem value={'1'}>Quản lí</MenuItem>
              <MenuItem value={'0'}>Nhân viên</MenuItem>
            </Select>
          </div>
          <div className="filter">
            <b>Trạng thái: </b>
            <Select
              displayEmpty
              size="small"
              value={searchStaff.statusSearch}
              onChange={(e) => setSearchStaff({ ...searchStaff, statusSearch: e.target.value })}>
              <MenuItem value={''}>Tất cả</MenuItem>
              <MenuItem value={'0'}>Hoạt động</MenuItem>
              <MenuItem value={'1'}>Không hoạt động</MenuItem>
              <MenuItem></MenuItem>
            </Select>
          </div>
          <Button
            variant="outlined"
            style={{ float: 'right' }}
            color="cam"
            component={Link}
            to="/admin/staff/add">
            <AiOutlinePlusSquare style={{ marginRight: '5px', fontSize: '17px' }} />
            <Typography sx={{ ml: 1 }}>Tạo Nhân Viên</Typography>
          </Button>
        </Stack>

        <Table aria-label="simple table" className="tableCss mt-5">
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
              <TableCell align="center" width={'8%'}>
                Chức vụ
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
              listStaff.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.stt}</TableCell>
                  <TableCell align="center">
                    {row.avatar != null ? (
                      <img width={'100%'} src={row.avatar} alt="anh" />
                    ) : (
                      <Avatar />
                    )}
                  </TableCell>
                  <TableCell align="center">{row.fullName}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">{dayjs(row.dateBirth).format('DD-MM-YYYY')}</TableCell>
                  <TableCell align="center">{row.gender ? 'Nam' : 'Nữ'}</TableCell>
                  <TableCell align="center">{row.role === 0 ? 'Nhân viên' : 'Quản lí'}</TableCell>
                  {/* <TableCell align="center">{row.citizenId}</TableCell> */}
                  <TableCell align="center">
                    {row.status === 0 ? (
                      <Chip
                        onClick={() => deleteNhanVien(row.id)}
                        className="chip-hoat-dong"
                        size="small"
                        label="Hoạt động"
                      />
                    ) : (
                      <Chip
                        onClick={() => deleteNhanVien(row.id)}
                        className="chip-khong-hoat-dong"
                        size="small"
                        label="Không hoạt động"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Xem chi tiết">
                      <IconButton
                        color="black"
                        component={Link}
                        to={`/admin/staff/detail/${row.id}`}>
                        <TbEyeEdit fontSize={'25px'} color="#FC7C27" />
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
                setSearchStaff({ ...searchStaff, size: e.target.value })
              }}
              sx={{ height: '25px', mx: 0.5 }}
              size="small"
              value={searchStaff.size}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <Typography sx={{ display: { xs: 'none', md: 'inline-block' } }}>Nhân viên</Typography>
          </Typography>
          <Pagination
            color="cam"
            variant="outlined"
            defaultPage={1}
            page={searchStaff.page}
            onChange={(e, value) => {
              e.preventDefault()
              setSearchStaff({ ...searchStaff, page: value })
            }}
            count={totalPages}
          />
        </Stack>
      </Paper>
    </div>
  )
}
