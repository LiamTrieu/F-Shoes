import React, { useEffect, useState } from 'react'
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
  TextField,
  Typography,
} from '@mui/material'
import { TbEyeEdit } from 'react-icons/tb'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import khuyenMaiApi from '../../../api/admin/khuyenmai/khuyenMaiApi'
import dayjs from 'dayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import SearchIcon from '@mui/icons-material/Search'
import './home.css'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import { toast } from 'react-toastify'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

var stompClient = null
export default function AdPromotionPage() {
  const theme = useTheme()
  const [listKhuyenMai, setListKhuyenMai] = useState([])
  const [listKhuyenMaiUpdate, setListKhuyenMaiUpdate] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [filter, setFilter] = useState({
    page: 1,
    size: 5,
    name: '',
    timeStart: '',
    timeEnd: '',
    status: null,
    type: null,
  })

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/shoes-websocket-endpoint')
    stompClient = Stomp.over(socket)
    stompClient.debug = () => {}
    stompClient.connect({}, onConnect)

    return () => {
      stompClient.disconnect()
    }
  }, [])

  const onConnect = () => {
    stompClient.subscribe('/topic/promotionUpdates', (message) => {
      if (message.body) {
        const data = JSON.parse(message.body)
        setListKhuyenMaiUpdate(data)
      }
    })
  }

  useEffect(() => {
    const updatedKhuyenMai = listKhuyenMai.map((khuyenMai) => {
      const matchedData = listKhuyenMaiUpdate.find((item) => item.id === khuyenMai.id)
      if (matchedData) {
        return {
          ...khuyenMai,
          status: matchedData.status,
        }
      } else {
        return khuyenMai
      }
    })
    setListKhuyenMai(updatedKhuyenMai)
  }, [listKhuyenMaiUpdate, listKhuyenMai])

  const handleDelete = (id) => {
    if (listKhuyenMai?.status === 2) {
      toast.success('Khuyến mại đã kết thúc', {
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      const title = 'Bạn có muốn chuyển trạng thái không'
      const text = ''

      confirmSatus(title, text, theme).then((result) => {
        if (result.isConfirmed) {
          khuyenMaiApi.deletePromotion(id).then(() => {
            fecthData()
            toast.success('Chuyển trạng thái thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
        }
      })
    }
  }

  useEffect(() => {
    fecthData(filter)
  }, [filter])

  const fecthData = (filter) => {
    khuyenMaiApi.getAllPromotion(filter).then((response) => {
      setListKhuyenMai(response.data.data)
      setTotalPages(response.data.totalPages)

      console.log(filter)
    })
  }

  return (
    <>
      <div className="promotion">
        <Paper elevation={3} sx={{ mb: 2, padding: 2 }}>
          <Box sx={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <TextField
                sx={{ width: '50%' }}
                placeholder="Tìm kiếm theo tên khuyến mại"
                className="search-promotion"
                size="small"
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    name: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="cam" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* </Grid> */}

              <Button
                sx={{ borderRadius: '8px' }}
                color="cam"
                variant="contained"
                component={Link}
                to="/admin/promotion/add">
                <AddIcon />
                <Typography sx={{ ml: 0, fontWeight: '500' }}>Thêm mới</Typography>
              </Button>
            </Stack>
            <Stack
              my={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']} sx={{ mt: 0.9 }}>
                  <DateTimePicker
                    className="dateTime"
                    format="DD/MM/YYYY HH:mm:ss"
                    // value={dayjs(filter?.timeStart, 'DD/MM/YYYY HH:mm:ss')}
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        timeStart: dayjs(e).toDate().getTime(),
                      })
                    }
                    slotProps={{
                      actionBar: {
                        actions: ['clear'],
                        onClick: () => setFilter({ ...filter, timeStart: '' }),
                      },
                    }}
                    // label="Ngày bắt đầu"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']} sx={{ mt: 0.9 }}>
                  <DateTimePicker
                    className="dateTime"
                    format={'DD/MM/YYYY HH:mm:ss'}
                    // value={dayjs(filter?.timeEnd, 'DD/MM/YYYY HH:mm:ss')}
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        timeEnd: dayjs(e).toDate().getTime(),
                      })
                    }
                    slotProps={{
                      actionBar: {
                        actions: ['clear'],
                        onClick: () => setFilter({ ...filter, timeEnd: '' }),
                      },
                    }}
                    // label="Ngày kết thúc"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <div className="filter">
                <b>Trạng Thái: </b>
                <Select
                  displayEmpty
                  size="small"
                  value={filter.status}
                  onChange={(e) => {
                    setFilter({ ...filter, status: e.target.value })
                  }}>
                  <MenuItem value={null}>Trạng thái</MenuItem>
                  <MenuItem value={0}>Sắp diễn ra</MenuItem>
                  <MenuItem value={1}>Đang diễn ra</MenuItem>
                  <MenuItem value={2}>Đã kết thúc</MenuItem>
                  <MenuItem></MenuItem>
                </Select>
              </div>

              {/* <div className="filter">
                <b>Giá trị: </b>
                <Select displayEmpty size="small" value={''}>
                  <MenuItem value={''}>Giá trị</MenuItem>
                  <MenuItem value={8}>Tăng dần</MenuItem>
                  <MenuItem value={9}>Giảm dần</MenuItem>
                  <MenuItem></MenuItem>
                </Select>
              </div> */}
            </Stack>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2 }}>
          <Table aria-label="simple table" className="tableCss">
            <TableHead>
              <TableRow>
                <TableCell align="center" width={'5%'}>
                  STT
                </TableCell>
                <TableCell align="center">Tên Khuyến Mại</TableCell>
                <TableCell align="center" width={'6%'}>
                  Giá trị
                </TableCell>
                <TableCell align="center" width={'13%'}>
                  Trạng thái
                </TableCell>
                <TableCell align="center" width={'15%'}>
                  Thời gian bắt đầu
                </TableCell>
                <TableCell align="center" width={'15%'}>
                  Thời gian kết thúc
                </TableCell>
                <TableCell align="center" width={'10%'}>
                  Hoạt động
                </TableCell>
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
                    <Chip
                      onClick={() => handleDelete(promotion.id)}
                      className={
                        promotion.status === 0
                          ? 'chip-sap-hoat-dong'
                          : promotion.status === 1
                          ? 'chip-hoat-dong'
                          : 'chip-khong-hoat-dong'
                      }
                      size="small"
                      label={
                        promotion.status === 0
                          ? 'Sắp diễn ra'
                          : promotion.status === 1
                          ? 'Đang diễn ra'
                          : 'Đã kết thúc'
                      }
                    />
                  </TableCell>

                  <TableCell align="center">
                    {dayjs(promotion.timeStart).format('DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(promotion.timeEnd).format('DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/promotion/get-one/${promotion.id}`}>
                      <IconButton sx={{ marginLeft: '30px' }} color="cam">
                        <TbEyeEdit />
                      </IconButton>
                    </Link>
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
              page={filter.page}
              color="cam"
              onChange={(e, value) => {
                e.preventDefault()
                setFilter({
                  ...filter,
                  page: value,
                })
              }}
              count={totalPages}
              variant="outlined"
            />
          </div>
        </Paper>
      </div>
    </>
  )
}
