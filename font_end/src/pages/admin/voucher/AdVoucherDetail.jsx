import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import voucherApi from '../../../api/admin/voucher/VoucherApi'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
// import PercentIcon from "@mui/icons-material/Percent";

export default function AdVoucherDetail() {
  const initialVoucher = {
    code: '',
    name: '',
    value: 0,
    maximumValue: 0,
    type: true,
    minimumAmount: 0,
    quantity: 0,
    startDate: '',
    endDate: '',
  }
  const { id } = useParams()
  const navigate = useNavigate()
  const [voucherDetail, setVoucherDetail] = useState(initialVoucher)
  const [isSelectVisible, setIsSelectVisible] = useState(false)

  useEffect(() => {
    fetchData(id)
  }, [id])

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

        setIsSelectVisible(response.data.data.type === false)
      })
      .catch(() => {
        alert('Error: Không tải được dữ liệu API')
      })
  }

  const handleTypeChange = (event) => {
    const newValue = event.target.value === 'true'
    setVoucherDetail({
      ...voucherDetail,
      type: event.target.value,
    })

    setIsSelectVisible(newValue === false)
  }

  const handleUpdateVoucher = (idUpdate, voucherDetail) => {
    console.log(voucherDetail)
    voucherApi
      .updateVoucher(idUpdate, voucherDetail)
      .then(() => {
        alert('updateVoucher success!')
        navigate('/admin/voucher')
      })
      .catch(() => {
        alert('updateVoucher error!')
      })
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
                  value={true}
                  control={<Radio />}
                  label="Tất cả"
                  onChange={handleTypeChange}
                />
                <FormControlLabel
                  name="typeUpdate"
                  value={false}
                  control={<Radio />}
                  label="Cá nhân"
                  onChange={handleTypeChange}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            {isSelectVisible && (
              <Button sx={{ width: 150, float: 'left', mt: 2.5 }} variant="contained">
                Chọn
              </Button>
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
              Cập nhật
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Paper>
    </div>
  )
}
