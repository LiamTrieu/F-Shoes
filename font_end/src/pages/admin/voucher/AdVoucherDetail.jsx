import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
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
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [voucherDetail, setVoucherDetail] = useState(initialVoucher)

  useEffect(() => {
    fetchData(id)
  }, [id])

  const fetchData = (id) => {
    voucherApi
      .getOneVoucherById(id)
      .then((response) => {
        setVoucherDetail(response.data)
      })
      .catch(() => {
        alert('Error: Không tải được dữ liệu API')
      })
  }

  const handleTypeChange = (event) => {
    const newValue = event.target.value === 'true'
    setVoucherDetail({
      ...voucherDetail.data,
      data: { ...voucherDetail.data, type: Boolean(event.target.value) },
    })
    setIsSelectVisible(newValue === false)
  }

  const handleUpdateVoucher = (idUpdate, voucherDetail) => {
    console.log(voucherDetail.data)
    voucherApi
      .updateVoucher(idUpdate, voucherDetail.data)
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
              value={voucherDetail.data?.code}
              fullWidth
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail.data,
                  data: { ...voucherDetail.data, code: e.target.value },
                })
              }}
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
              value={voucherDetail.data?.name}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail.data,
                  data: { ...voucherDetail.data, name: e.target.value },
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
              value={voucherDetail.data?.value}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail.data,
                  data: { ...voucherDetail.data, value: Number(e.target.value) },
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
              value={voucherDetail.data?.maximumValue}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail.data,
                  data: { ...voucherDetail.data, maximumValue: Number(e.target.value) },
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
              value={voucherDetail.data?.quantity}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail.data,
                  data: { ...voucherDetail.data, quantity: Number(e.target.value) },
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
              value={voucherDetail.data?.minimumAmount}
              onChange={(e) => {
                setVoucherDetail({
                  ...voucherDetail.data,
                  data: { ...voucherDetail.data, minimumAmount: Number(e.target.value) },
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
                value={dayjs(voucherDetail.data?.startDate)}
                onChange={(e) => {
                  setVoucherDetail({
                    ...voucherDetail.data,
                    data: {
                      ...voucherDetail.data,
                      startDate: '03-09-2023 00:00:00',
                    },
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
                value={dayjs(voucherDetail.data?.endDate)}
                onChange={(e) => {
                  setVoucherDetail({
                    ...voucherDetail.data,
                    data: {
                      ...voucherDetail.data,
                      endDate: '05-09-2023 00:00:00',
                    },
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
              <RadioGroup row>
                <FormControlLabel
                  name="typeUpdate"
                  value={true}
                  control={<Radio />}
                  label="Tất cả"
                  checked={voucherDetail.data?.type === true}
                  onChange={handleTypeChange}
                />
                <FormControlLabel
                  name="typeUpdate"
                  value={false}
                  control={<Radio />}
                  label="Cá nhân"
                  checked={voucherDetail.data?.type === false}
                  onChange={handleTypeChange}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            {isSelectVisible && (
              <FormControl size="small" sx={{ mt: 2.5 }} fullWidth>
                <InputLabel>Quyền sử dụng</InputLabel>
                <Select>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={3}>
            {isSelectVisible && (
              <Button sx={{ width: 150, float: 'left', mt: 2.5 }} variant="contained">
                Chọn
              </Button>
            )}
          </Grid>
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
