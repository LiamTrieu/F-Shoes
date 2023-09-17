import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import { useTheme } from '@emotion/react'

export default function AdStaffDetail() {
  const initStaff = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateBirth: '',
    citizenId: '',
    password: null,
    role: '',
    gender: '',
    status: '',
    avatar: '',
  }
  const { id } = useParams()
  const [staffDetail, setStaffDetail] = useState(initStaff)
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    loadData(id)
  }, [id])

  const loadData = (id) => {
    staffApi
      .getOne(id)
      .then((response) => {
        const formatDateBirth = dayjs(response.data.dateBirth).format('DD-MM-YYYY')
        console.log('text')
        setStaffDetail({
          ...response.data,
          dateBirth: formatDateBirth,
        })
      })
      .catch(() => {
        console.error('Error')
      })
  }

  const handButtonUpdateStaff = (id, staffDetail) => {
    console.log(id)
    console.log(staffDetail)
    const title = 'Xác nhận cập nhật nhân viên?'
    const text = ''
    confirmSatus(title, text, theme).then((result) => {
      if (result.isConfirmed) {
        staffApi.update(id, staffDetail).then(() => {
          console.log(staffDetail)
          toast.success('Cập nhật nhân viên thành công!', {
            position: toast.POSITION.TOP_RIGHT,
          })
          navigate('/admin/staff')
        })
      } else {
        toast.error('Cập nhật nhân viên thất bại', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  }

  const handleRoleRadioChange = (event) => {
    setStaffDetail({
      ...staffDetail,
      role: parseInt(event.target.value),
    })
  }

  const handleStatusRadioChange = (event) => {
    setStaffDetail({
      ...staffDetail,
      status: parseInt(event.target.value),
    })
  }

  const handleGenderRadioChange = (event) => {
    setStaffDetail({
      ...staffDetail,
      gender: event.target.value,
    })
  }

  const setSelectImage = useState(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <h2>Nhân viên</h2>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Họ và Tên"
              type="text"
              value={staffDetail?.fullName}
              onChange={(e) => {
                setStaffDetail({
                  ...staffDetail,
                  fullName: e.target.value,
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
              label="Email"
              type="text"
              value={staffDetail?.email}
              onChange={(e) => {
                setStaffDetail({
                  ...staffDetail,
                  email: e.target.value,
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <TextField
              label="Số điện thoại"
              type="text"
              value={staffDetail?.phoneNumber}
              onChange={(e) => {
                setStaffDetail({
                  ...staffDetail,
                  phoneNumber: e.target.value,
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
              label="Số CCCD"
              type="text"
              value={staffDetail?.citizenId}
              onChange={(e) => {
                setStaffDetail({
                  ...staffDetail,
                  citizenId: e.target.value,
                })
              }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <FormControl size="small">
              <FormLabel>Chức vụ:</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  name="roleUpdate"
                  value={0}
                  control={<Radio />}
                  label="Quản lý"
                  checked={staffDetail?.role === '0'}
                  onChange={handleRoleRadioChange}
                />
                <FormControlLabel
                  name="roleUpdate"
                  value={1}
                  control={<Radio />}
                  label="Nhân viên"
                  checked={staffDetail?.role === '1'}
                  onChange={handleRoleRadioChange}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={5.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format={'DD-MM-YYYY'}
                label="Ngày sinh"
                sx={{ width: '100%' }}
                value={dayjs(staffDetail?.dateBirth, 'DD-MM-YYYY')}
                onChange={(e) => {
                  setStaffDetail({
                    ...staffDetail,
                    dateBirth: dayjs(e).format('DD-MM-YYYY'),
                  })
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <FormControl size="small">
              <FormLabel>Trạng thái:</FormLabel>
              <RadioGroup row value={staffDetail?.status}>
                <FormControlLabel
                  name="statusUpdate"
                  value={0}
                  control={<Radio />}
                  label="Hoạt động"
                  onChange={handleStatusRadioChange}
                />
                <FormControlLabel
                  name="statusUpdate"
                  value={1}
                  control={<Radio />}
                  label="Không hoạt động"
                  onChange={handleStatusRadioChange}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl size="small">
              <FormLabel>Giới tính:</FormLabel>
              <RadioGroup row value={staffDetail?.gender}>
                <FormControlLabel
                  name="genderUpdate"
                  value={true}
                  control={<Radio />}
                  label="Nam"
                  onChange={handleGenderRadioChange}
                />
                <FormControlLabel
                  name="genderUpdate"
                  value={false}
                  control={<Radio />}
                  label="Nữ"
                  onChange={handleGenderRadioChange}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <h4>Chọn ảnh nhân viên</h4>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <Button
              onClick={() => handButtonUpdateStaff(id, staffDetail)}
              variant="contained"
              fullWidth
              color="success"
              sx={{ float: 'right' }}>
              Cập Nhật
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
