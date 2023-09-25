import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import staffApi from '../../../api/admin/nhanvien/nhanVienApi'
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  CircularProgress,
  Typography, // Thêm CircularProgress
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import confirmSatus from '../../../components/comfirmSwal'
import './AdStaffPage.css'

export default function AdStaffDetail() {
  const { id } = useParams()
  const [staffDetail, setStaffDetail] = useState({ avatar: null, gender: '', role: '' }) // Khởi tạo giá trị ban đầu cho gender và role
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadData(id)
  }, [id])

  const loadData = (id) => {
    setLoading(true)

    staffApi
      .getOne(id)
      .then((response) => {
        const formatDateBirth = dayjs(response.data.dateBirth).format('DD-MM-YYYY')
        console.log(response.data)
        setStaffDetail({
          ...response.data,
          dateBirth: formatDateBirth,
        })
      })
      .catch(() => {
        console.error('Error')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleRoleRadioChange = (event) => {
    setStaffDetail({
      ...staffDetail,
      role: event.target.value,
    })
  }

  const handleGenderRadioChange = (event) => {
    setStaffDetail({
      ...staffDetail,
      gender: event.target.value,
    })
  }

  const handleImageChange = (event) => {
    let file = event.target.files[0]
    if (file) {
      setStaffDetail({ ...staffDetail, avatar: file })
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonUpdateStaff = () => {
    const title = 'Xác nhận cập nhật nhân viên?'
    const text = ''
    confirmSatus(title, text).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)

        staffApi
          .update(id, staffDetail)
          .then(() => {
            toast.success('Cập nhật nhân viên thành công!', {
              position: toast.POSITION.TOP_RIGHT,
            })
            navigate('/admin/staff')
          })
          .catch(() => {
            toast.error('Cập nhật nhân viên thất bại', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        toast.error('Cập nhật nhân viên thất bại', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  }

  return (
    <div className="nhanvienadd">
      <Paper elevation={3} sx={{ mt: 2, mb: 2, padding: 2, width: '97%' }}>
        <h2>Nhân viên</h2>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={7}>
            <div
              onClick={() => {
                document.getElementById('select-avatar').click()
              }}
              style={{
                border: '2px dashed #ddd',
                borderRadius: '50%',
                cursor: 'pointer',
                height: '150px',
                width: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                overflow: 'hidden',
              }}>
              {staffDetail.avatar || image ? (
                <img
                  src={image || staffDetail.avatar}
                  alt="Ảnh nhân viên"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                'Chọn ảnh'
              )}
            </div>
            <input
              hidden
              id="select-avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={5.5}>
            <Typography>Họ và tên</Typography>
            <TextField
              size="small"
              type="text"
              value={staffDetail.fullName || ''}
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
            <Typography>Email</Typography>
            <TextField
              size="small"
              type="text"
              value={staffDetail.email || ''}
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
            <Typography>Số Điện Thoại</Typography>
            <TextField
              type="text"
              size="small"
              value={staffDetail.phoneNumber || ''}
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
            <Typography>Số CCCD</Typography>
            <TextField
              size="small"
              type="text"
              value={staffDetail.citizenId || ''}
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
          <Grid item xs={2.5}>
            <Typography>Giới tính</Typography>
            <FormControl size="small">
              <RadioGroup
                name="gender"
                row
                value={staffDetail.gender}
                onChange={handleGenderRadioChange}>
                <FormControlLabel value={true} control={<Radio />} label="Nam" />
                <FormControlLabel value={false} control={<Radio />} label="Nữ" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Typography>Chức vụ</Typography>
            <FormControl size="small">
              <RadioGroup
                name="gender"
                row
                value={staffDetail.role}
                onChange={handleRoleRadioChange}>
                <FormControlLabel value={0} control={<Radio />} label="Nhân viên" />
                <FormControlLabel value={1} control={<Radio />} label="Quản lí" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={5.5}>
            <Typography>Ngày sinh</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format={'DD-MM-YYYY'}
                className="small-datepicker"
                sx={{ width: '100%' }}
                value={dayjs(staffDetail.dateBirth, 'DD-MM-YYYY')}
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
          <Grid item xs={3}></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {loading && (
                <div
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                  }}>
                  <CircularProgress size={50} />
                </div>
              )}
              <Button onClick={handleButtonUpdateStaff} variant="contained" fullWidth color="cam">
                {loading ? 'Đang cập nhật...' : 'Cập Nhật Nhân Viên'}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
