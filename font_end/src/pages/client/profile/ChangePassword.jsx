import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import authenticationAPi from '../../../api/authentication/authenticationAPi'
import { Navigate, useNavigate } from 'react-router-dom'
import { getCookie } from '../../../services/cookie'

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const navigate = useNavigate()
  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast.error('Vui lòng nhập mật khẩu cũ')
      return
    }

    if (!newPassword) {
      toast.error('Vui lòng nhập mật khẩu mới')
      return
    }

    if (!confirmNewPassword) {
      toast.error('Vui lòng xác nhận lại mật khẩu mới')
      return
    }

    if (newPassword !== confirmNewPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu mới không khớp')
      return
    }

    try {
      const response = await authenticationAPi.changePassword(currentPassword, newPassword)

      if (response.data.success) {
        toast.success('Đổi mật khẩu thành công')
        navigate('/profile')
      } else {
        toast.error('Đổi mật khẩu không thành công. Vui lòng kiểm tra lại mật khẩu cũ.')
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.')
    }
  }

  const token = getCookie('ClientToken')
  return !token ? (
    <Navigate to={'/home'} />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component="h1" variant="h5">
          Đổi Mật Khẩu
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Mật Khẩu Cũ"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="Mật Khẩu Mới"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmNewPassword"
            label="Xác Nhận Mật Khẩu Mới"
            name="confirmNewPassword"
            type="password"
            autoComplete="new-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleChangePassword}>
            Đổi Mật Khẩu
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ChangePassword
