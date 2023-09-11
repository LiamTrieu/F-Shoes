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

export default function AdPromotionPage() {
  const [listKhuyenMai, setListKhuyenMai] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchByName, setSearchByName] = useState('')

  useEffect(() => {
    loadData(currentPage - 1, searchByName)
  }, [currentPage, listKhuyenMai, searchByName])

  const handelOnchangePage = (Page) => {
    loadData(Page - 1, searchByName)
    setCurrentPage(Page)
  }

  const loadData = (currentPage, searchByName) => {
    if (searchByName !== '') {
      khuyenMaiApi.searchPromotionByName(currentPage, searchByName).then((response) => {
        setListKhuyenMai(response.data.data.content)
        setTotalPages(response.data.data.totalPages)
      })
    } else {
      khuyenMaiApi.getPage(currentPage).then((response) => {
        setListKhuyenMai(response.data.data.content)
        setTotalPages(response.data.data.totalPages)
      })
    }
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
                // value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
              />
            </Grid>
            <Grid xs={6} md={2}></Grid>
            <Grid xs={6} md={2}>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                id="outlined-basic"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={6} md={2}>
              <TextField
                sx={{ mt: 2, width: '80%' }}
                id="outlined-basic"
                label="Đến ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <Button
                sx={{ ml: 9, mt: 2 }}
                color="success"
                variant="contained"
                component={Link}
                to="/admin/promotion/add">
                <AddIcon />
                <Typography sx={{ ml: 1 }}>Tạo Khuyến Mại</Typography>
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
                          backgroundColor: promotion.status === 0 ? '#00FF00' : '#99CCFF',
                        }}
                        label={promotion.status === 0 ? 'Hết hạn' : 'Còn hạn'}
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
            page={currentPage}
            onChange={(event, value) => handelOnchangePage(value)}
            count={totalPages}
            variant="outlined"
          />
        </div>
      </Paper>
    </Container>
  )
}
