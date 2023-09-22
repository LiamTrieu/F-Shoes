import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Modal,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import Empty from '../../../components/Empty'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'
import { toast } from 'react-toastify'
// import PercentIcon from "@mui/icons-material/Percent";

export default function AdVoucherDetail() {
  const theme = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [openCustomer, setOpenCustomer] = useState(false)
  const [listCustomer, setListCustomer] = useState([])
  const [initPage, setInitPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [dataFetched, setDataFetched] = useState(false)
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const initialVoucher = {
    code: '',
    name: '',
    value: 0,
    maximumValue: 0,
    type: 0,
    minimumAmount: 0,
    quantity: 0,
    startDate: '',
    endDate: '',
    listIdCustomer: [],
  }
  const [voucherDetail, setVoucherDetail] = useState(initialVoucher)

  useEffect(() => {
    fetchData(id)
    handelCustomeFill(initPage)
  }, [id, initPage])

  useEffect(() => {
    fetchListIdCustomer(id)
  }, [id])

  useEffect(() => {
    setVoucherDetail({ ...voucherDetail, listIdCustomer: selectedCustomerIds })
  }, [voucherDetail, selectedCustomerIds])

  const fetchData = (id) => {
    voucherApi
      .getOneVoucherById(id)
      .then((response) => {
        const formattedStartDate = dayjs(response.data.data.startDate).format('DD-MM-YYYY HH:mm:ss')
        const formattedEndDate = dayjs(response.data.data.endDate).format('DD-MM-YYYY HH:mm:ss')

        setVoucherDetail({
          ...response.data.data,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        })

        setIsSelectVisible(response.data.data.type === 1)
      })
      .catch(() => {
        alert('Error: Không tải được dữ liệu API')
      })
  }

  const fetchListIdCustomer = (id) => {
    voucherApi
      .getListIdCustomerByIdVoucher(id)
      .then((response) => {
        setSelectedCustomerIds(response.data.data)
      })
      .catch(() => {
        console.log('NULL')
      })
  }

  const handleUpdateVoucher = (idUpdate, voucherDetail) => {
    console.log(voucherDetail)
    const title = 'Xác nhận cập nhật voucher?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        voucherApi
          .updateVoucher(idUpdate, voucherDetail)
          .then(() => {
            toast.success('Cập nhật voucher thành công', {
              position: toast.POSITION.TOP_RIGHT,
            })
            navigate('/admin/voucher')
          })
          .catch(() => {
            toast.error('Cập nhật voucher thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
      }
    })
  }

  const handelCustomeFill = (initPage) => {
    voucherApi
      .getPageCustomer(initPage - 1)
      .then((response) => {
        setListCustomer(response.data.data.content)
        setTotalPages(response.data.data.totalPages)
        setDataFetched(true)
      })
      .catch(() => {
        setDataFetched(false)
        toast.warning('Vui lòng f5 tải lại dữ liệu', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const handelOnchangePage = (page) => {
    setInitPage(page)
    handelCustomeFill(page - 1)
  }

  const handleSelectAllChange = (event) => {
    const selectedIds = event.target.checked ? listCustomer.map((row) => row.id) : []
    setSelectedCustomerIds(selectedIds)
    setSelectAll(event.target.checked)
  }

  const handleRowCheckboxChange = (event, customerId) => {
    const selectedIndex = selectedCustomerIds.indexOf(customerId)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = [...selectedCustomerIds, customerId]
    } else {
      newSelectedIds = [
        ...selectedCustomerIds.slice(0, selectedIndex),
        ...selectedCustomerIds.slice(selectedIndex + 1),
      ]
    }

    setSelectedCustomerIds(newSelectedIds)
    setSelectAll(newSelectedIds.length === listCustomer.length)
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 1 }}>
        <h1>Chi tiết Voucher</h1>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Mã voucher"
              type="text"
              size="small"
              value={voucherDetail?.code}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail,
                  code: e.target.value,
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Tên voucher"
              type="text"
              size="small"
              value={voucherDetail?.name}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail,
                  name: e.target.value,
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/*------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Giá trị"
              type="number"
              size="small"
              value={voucherDetail?.value}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail,
                  value: Number(e.target.value),
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Giá trị tối đa"
              type="number"
              size="small"
              value={voucherDetail?.maximumValue}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail,
                  maximumValue: Number(e.target.value),
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Số lượng"
              type="number"
              variant="outlined"
              size="small"
              value={voucherDetail?.quantity}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail,
                  quantity: Number(e.target.value),
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Điều kiện"
              type="number"
              size="small"
              value={voucherDetail?.minimumAmount}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail,
                  minimumAmount: Number(e.target.value),
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm:ss'}
                value={dayjs(voucherDetail?.startDate, 'DD-MM-YYYY HH:mm:ss')}
                onChange={(e) => {
                  setVoucherDetail({
                    ...voucherDetail,
                    startDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                  })
                }}
                label="Từ ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                format={'DD-MM-YYYY HH:mm:ss'}
                value={dayjs(voucherDetail?.endDate, 'DD-MM-YYYY HH:mm:ss')}
                onChange={(e) => {
                  setVoucherDetail({
                    ...voucherDetail,
                    endDate: dayjs(e).format('DD-MM-YYYY HH:mm:ss'),
                  })
                }}
                label="Đến ngày"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}>
            <FormControl size="small">
              <FormLabel>Kiểu</FormLabel>
              <RadioGroup row value={voucherDetail?.type}>
                <FormControlLabel
                  name="typeUpdate"
                  value={0}
                  control={<Radio />}
                  label="Tất cả"
                  onChange={(e) => setVoucherDetail({ ...voucherDetail, type: e.target.value })}
                  onClick={() => setIsSelectVisible(false)}
                />
                <FormControlLabel
                  name="typeUpdate"
                  value={1}
                  control={<Radio />}
                  label="Cá nhân"
                  onChange={(e) => setVoucherDetail({ ...voucherDetail, type: e.target.value })}
                  onClick={() => setIsSelectVisible(true)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            {isSelectVisible && (
              <Button
                onClick={() => {
                  setOpenCustomer(true)
                }}
                sx={{ width: 150, float: 'left', mt: 3 }}
                variant="contained">
                Chọn
              </Button>
            )}
            {openCustomer && (
              <Modal open={openCustomer} onClose={() => setOpenCustomer(false)}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 100,
                    p: 2,
                    width: '75%',
                  }}>
                  {dataFetched && (
                    <Table className="tableCss" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell width={'5%'}>
                            <Checkbox
                              name="tất cả"
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            />
                          </TableCell>
                          <TableCell align="center" width={'25%'}>
                            Tên
                          </TableCell>
                          <TableCell align="center" width={'20%'}>
                            Số điện thoại
                          </TableCell>
                          <TableCell align="center" width={'25%'}>
                            Email
                          </TableCell>
                          <TableCell align="center" width={'20%'}>
                            Ngày sinh
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listCustomer.map((row, index) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <Checkbox
                                key={row.id}
                                checked={selectedCustomerIds.indexOf(row.id) !== -1}
                                onChange={(event) => handleRowCheckboxChange(event, row.id)}
                              />
                            </TableCell>
                            <TableCell align="center">{row.fullName}</TableCell>
                            <TableCell align="center">{row.phoneNumber}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">
                              {dayjs(row.dateBirth).format('DD-MM-YYYY')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  {!dataFetched && (
                    <p>
                      <Empty />
                    </p>
                  )}
                  <Grid container sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                      page={initPage}
                      onChange={(_, page) => handelOnchangePage(page)}
                      count={totalPages}
                      color="primary"
                    />
                  </Grid>
                  <Button onClick={() => setOpenCustomer(false)}>Xác nhận</Button>
                </Box>
              </Modal>
            )}
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
        {/**?------------------------------------------------------------------------------------------------------- */}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <Button
              onClick={() => handleUpdateVoucher(id, voucherDetail)}
              variant="contained"
              fullWidth
              color="warning">
              Xác nhận
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  )
}
