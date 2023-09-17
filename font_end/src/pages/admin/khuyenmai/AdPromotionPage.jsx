import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TextField,
  Typography,
} from '@mui/material'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import khuyenMaiApi from '../../../api/admin/khuyenmai/khuyenMaiApi'
import dayjs from 'dayjs'
import CreateIcon from '@mui/icons-material/Create'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import './home.css'

export default function AdPromotionPage() {
  const [listKhuyenMai, setListKhuyenMai] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [filter, setFilter] = useState({
    page: 1,
    size: 5,
    name: '',
    timeStart: '',
    timeEnd: '',
    status: '',
    type: '',
  })

  // useEffect(() => {
  //   loadData(currentPage, searchByName)
  // }, [currentPage, searchByName])

  const handelOnchangePage = (Page) => {
    loadData(Page)
    setCurrentPage(Page)
  }

  const handleDelete = (id) => {
    khuyenMaiApi.deletePromotion(id)
  }

  useEffect(() => {
    loadData(filter)
  }, [filter])

  const loadData = (filter) => {
    // khuyenMaiApi.getAll().then((response) => {
    //   setListKhuyenMai(response.data.data)
    //   setTotalPages(response.data.totalPages)
    // })
    khuyenMaiApi.getAllPromotion(filter).then((response) => {
      setListKhuyenMai(response.data.data)
      setTotalPages(response.data.totalPages)
    })
    console.log(filter)
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <TextField
                sx={{ width: '80%' }}
                id="outlined"
                label="Name"
                type="text"
                size="small"
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']} sx={{ mt: 0.9 }}>
                <DateTimePicker
                  className="dateTime"
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      timeStart: dayjs(e).format('DD/MM/YYYY'),
                    })
                  }
                  label="Ngày bắt đầu"
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']} sx={{ mt: 0.9 }}>
                <DateTimePicker
                  className="dateTime"
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      timeEnd: dayjs(e).format('DD/MM/YYYY'),
                    })
                  }
                  label="Ngày kết thúc"
                />
              </DemoContainer>
            </LocalizationProvider>
            {/* </Grid> */}
            <Grid xs={6} md={3}>
              <Button
                sx={{ ml: 9, mt: 2, borderRadius: '15px' }}
                color="success"
                variant="outlined"
                component={Link}
                to="/admin/promotion/add">
                <AddIcon />
                <Typography sx={{ ml: 0, fontWeight: '500' }}>Tạo Khuyến Mại</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Tên</TableCell>
                <TableCell align="center">Giá trị</TableCell>
                <TableCell align="center">Quyền</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thời gian bắt đầu</TableCell>
                <TableCell align="center">Thời gian kết thúc</TableCell>
                <TableCell align="center">Hoạt động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listKhuyenMai.map((promotion, index) => (
                <TableRow
                  key={promotion.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>

                  <TableCell align="center">{promotion.name}</TableCell>
                  <TableCell align="center">{promotion.value}%</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" sx={{ paddingLeft: '30px' }}>
                      <Chip
                        sx={{
                          backgroundColor: promotion.type === true ? '#FFFF66' : '#99FFFF',
                        }}
                        label={promotion.type === true ? 'Tất cả' : 'Giới hạn'}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} sx={{ paddingLeft: '30px' }}>
                      <Chip
                        sx={{
                          backgroundColor:
                            promotion.status === 0
                              ? '#00FF00'
                              : promotion.status === 1
                              ? '#99CCFF'
                              : '#FFCC00',
                        }}
                        label={
                          promotion.status === 0
                            ? 'Sắp diễn ra'
                            : promotion.status === 1
                            ? 'Đang diễn ra'
                            : 'Đã kết thúc'
                        }
                      />
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
                    {dayjs(promotion.timeStart).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(promotion.timeEnd).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/promotion/get-one/${promotion.id}`}>
                      <IconButton sx={{ marginLeft: '30px' }}>
                        <CreateIcon sx={{ color: '#FFCC00' }} />
                      </IconButton>
                    </Link>
                    <IconButton onClick={() => handleDelete(promotion.id)}>
                      <RestoreFromTrashIcon sx={{ color: '#FF0000' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
            page={filter.page}
            onChange={(page) => {
              setFilter({
                ...filter,
                page: page,
              })
            }}
            count={totalPages}
            variant="outlined"
          />
        </div>
      </Paper>
    </Container>
  )
}
