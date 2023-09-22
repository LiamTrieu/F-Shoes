import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Modal from '@mui/material/Modal'

import khuyenMaiApi from '../../../api/admin/khuyenmai/khuyenMaiApi'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
}

export default function AdPromotionAdd() {
  const theme = useTheme()
  const [getProduct, setGetProduct] = useState([])

  const [selectAll, setSelectAll] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const toggleSelectAll = () => {
    setSelectAll(!selectAll)
    setSelectedRows(selectAll ? [] : getProduct)
  }

  const handleRowCheckboxChange = (row) => {
    const selectedIndex = selectedRows.indexOf(row)
    const newSelected = [...selectedRows]

    if (selectedIndex === -1) {
      newSelected.push(row)
    } else {
      newSelected.splice(selectedIndex, 1)
    }

    setSelectedRows(newSelected)
  }

  const fetchProduct = () => {
    khuyenMaiApi.getAllProduct().then((response) => {
      setGetProduct(response.data.data)
    })
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  let navigate = useNavigate()

  const productDetailId = selectedRows.map((row) => row.id)

  const [addPromotionRe, setAddPromotionRe] = useState({
    name: '',
    value: '',
    type: '',
    status: '2',
    timeStart: '',
    timeEnd: '',
  })

  const handleInputChange = (e) => {
    setAddPromotionRe({ ...addPromotionRe, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    if (
      !addPromotionRe.name ||
      !addPromotionRe.value ||
      !addPromotionRe.timeStart ||
      !addPromotionRe.timeEnd
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin', {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }

    console.log(productDetailId)
    const title = 'bạn có muốn add Khuyến mại không'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        khuyenMaiApi.addPromotion(e).then(() => {
          toast.success('Add thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
        })
        navigate('/admin/promotion')
      }
      // if (result.isConfirmed) {
      //   khuyenMaiApi.addProductPromotion(e).then(() => {
      //     toast.success('Add thành công', {
      //       position: toast.POSITION.TOP_RIGHT,
      //     })
      //   })
      //   navigate('/admin/promotion')
      // }
    })
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <Box sx={{ pt: 4 }}>
          <Typography sx={{ fontSize: '30px', fontWeight: 1000 }}>Khuyến Mại</Typography>
          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Tên Khuyến Mại"
                variant="outlined"
                size="large"
                sx={{ width: '100%' }}
                name="name"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-basic"
                label="Giá trị"
                variant="outlined"
                size="large"
                sx={{ width: '100%' }}
                name="value"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    label="từ ngày"
                    size="large"
                    sx={{ width: '100%' }}
                    format={'DD-MM-YYYY HH:mm:ss'}
                    name="timeStart"
                    onChange={(e) =>
                      setAddPromotionRe({
                        ...addPromotionRe,
                        timeStart: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                      })
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    label="đến ngày"
                    format={'DD-MM-YYYY HH:mm:ss'}
                    size="large"
                    sx={{ width: '100%' }}
                    name="timeEnd"
                    onChange={(e) => {
                      setAddPromotionRe({
                        ...addPromotionRe,
                        timeEnd: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                      })
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Quyền sử dụng</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type"
                    label="Quyền sử dụng"
                    onChange={(e) => handleInputChange(e)}>
                    <MenuItem value={0}>Tất cả</MenuItem>
                    <MenuItem value={1}>Giới hạn</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="success"
                sx={{ float: 'left' }}
                onClick={handleOpen}>
                Chọn
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pl: 10, pr: 10, mt: 3 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                sx={{ float: 'right' }}
                onClick={() => onSubmit(addPromotionRe)}>
                Tạo Mới
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <TextField id="standard-basic" label="Search" variant="standard" />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mt: 3, mb: 3 }}>
              <Typography>Trạng Thái:</Typography>
              <TextField
                sx={{ mt: 2, width: '30%' }}
                id="outlined-basic"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                sx={{ mt: 2, width: '30%' }}
                id="outlined-basic"
                label="Từ ngày"
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
            <div style={{ height: 400, width: '100%' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tableCss">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '8%' }}>
                      <Checkbox checked={selectAll} onChange={toggleSelectAll} />
                    </TableCell>
                    <TableCell align="center" sx={{ width: '8%' }}>
                      STT
                    </TableCell>
                    <TableCell align="center" sx={{ width: '30%' }}>
                      Tên sản phẩm
                    </TableCell>
                    <TableCell align="center">Danh mục</TableCell>
                    <TableCell align="center">Hãng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getProduct.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(row)}
                          onChange={() => handleRowCheckboxChange(row)}
                        />
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {index + 1}
                      </TableCell>

                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">{row.brand}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}
